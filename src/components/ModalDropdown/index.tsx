import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ThemeContext} from '../../../App';
import unicodeCharacters from '../../constants/unicodeCharacters';

import {styles, styleItemFlatlist} from './styles';

interface ModalDropdownInterface {
  isFullWidth: Boolean;
  list: Array<string | number>;
  selected: string | number;
  updateSelected: (val: string | number) => void;
}

interface PositionStyleInterface {
  left: Number | undefined;
  right: Number | undefined;
  top: Number | undefined;
  bottom: Number | undefined;
  height: Number | undefined;
  width: Number | undefined;
}

const ModalDropdown = (props: ModalDropdownInterface) => {
  const {colorTheme} = useContext(ThemeContext);
  const {isFullWidth, list, selected, updateSelected} = props;

  if (list.length === 0 && !selected) return null;

  const refButton = useRef<TouchableOpacity | null>(null);
  const refFlatlist = useRef<FlatList | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [buttonFrame, setButtonFrame] = useState({x: 0, y: 0, w: 0, h: 0});

  useEffect(() => {
    setIsModalVisible(false);
  }, []);

  // UI function
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    updatePosition();
  };

  const onPressFlatlistItem = (item: string | number) => {
    setIsModalVisible(!isModalVisible);
    updateSelected(item);
  };

  const updatePosition = () => {
    if (refButton.current && refButton.current.measure) {
      refButton.current.measure((fx, fy, width, height, px, py) => {
        setButtonFrame({
          x: px,
          y: py,
          w: width,
          h: height,
        });
      });
    }
  };

  const calcPosition = () => {
    const dimensions = Dimensions.get('window');
    const windowWidth = dimensions.width;
    const windowHeight = dimensions.height;
    const fullHeight =
      StyleSheet.flatten(styles(colorTheme).dropdown).height * list.length;
    const dropdownHeight =
      fullHeight > windowHeight / 2 ? windowHeight / 2 : fullHeight;
    const bottomSpace = windowHeight - buttonFrame.y - buttonFrame.h;
    const rightSpace = windowWidth - buttonFrame.x;
    const showInBottom =
      bottomSpace >= dropdownHeight || bottomSpace >= buttonFrame.y;
    const showInLeft = rightSpace >= buttonFrame.x;
    const positionStyle: PositionStyleInterface = {
      height: dropdownHeight,
      top: showInBottom
        ? buttonFrame.y + buttonFrame.h
        : Math.max(0, buttonFrame.y - dropdownHeight),
      left: undefined,
      right: undefined,
      bottom: undefined,
      width: undefined,
    };

    if (showInLeft) {
      positionStyle.left = buttonFrame.x;
      if (isFullWidth) {
        positionStyle.right = rightSpace - buttonFrame.w;
      }
    } else {
      positionStyle.right = rightSpace - buttonFrame.w;
    }

    return positionStyle;
  };

  const getIntialScrollIndex = () => list.findIndex(val => val === selected);

  // UI render
  const renderItemDropdown: ListRenderItem<string | number> = ({item}) => {
    return (
      <TouchableOpacity
        key={item}
        style={styleItemFlatlist(colorTheme, item === selected).container}
        onPress={() => onPressFlatlistItem(item)}>
        <Text
          style={styleItemFlatlist(colorTheme, item === selected).text}
          key={item}
          numberOfLines={1}
          adjustsFontSizeToFit>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <TouchableOpacity
        onPress={toggleModal}
        ref={refButton}
        style={styles(colorTheme).containerButton}>
        <Text style={styles(colorTheme).textButton}>{selected}</Text>
        <Text style={styles(colorTheme).textButtonChevron}>
          {isModalVisible
            ? unicodeCharacters.upPointingTriangle
            : unicodeCharacters.downPointingTriangle}
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles(colorTheme).centeredView}>
            <View style={[styles(colorTheme).dropdown, calcPosition()]}>
              <FlatList
                ref={refFlatlist}
                keyExtractor={(item: string | number) => `${item}`}
                data={list}
                renderItem={renderItemDropdown}
                getItemLayout={(data, index) => {
                  return {
                    length: 33 + StyleSheet.hairlineWidth,
                    index,
                    offset: (33 + StyleSheet.hairlineWidth) * index,
                  };
                }}
                scrollEnabled={true}
                initialScrollIndex={getIntialScrollIndex()}
                automaticallyAdjustContentInsets={false}
                onScrollToIndexFailed={info => {
                  const wait = new Promise(resolve => setTimeout(resolve, 500));
                  wait.then(() => {
                    if (!!refFlatlist && !!refFlatlist.current) {
                      refFlatlist.current.scrollToIndex({
                        index: info.index,
                        animated: true,
                      });
                    }
                  });
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

ModalDropdown.defaultProps = {
  isFullWidth: false,
  list: [],
  selected: '',
  updateSelected: () => {},
};

export default ModalDropdown;
