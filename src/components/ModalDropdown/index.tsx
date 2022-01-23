import React from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ModalDropdownInterface {
  list: Array<string | number>;
  selected: string | number;
  updateSelected: (val: string | number) => void;
}

const ModalDropdown = (props: ModalDropdownInterface) => {
  const {list, selected, updateSelected} = props;
  if (list.length === 0 && !selected) return null;

  // UI render
  const renderItemDropdown: ListRenderItem<string | number> = ({item}) => {
    return (
      <TouchableOpacity
        key={item}
        style={{marginTop: 8}}
        onPress={() => updateSelected(item)}>
        <Text style={{color: item === selected ? 'black' : 'gray'}} key={item}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <TouchableOpacity>
        <Text>{selected}</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        visible={false}
        transparent
        //   onRequestClose={this._onRequestClose}
        supportedOrientations={[
          'portrait',
          'portrait-upside-down',
          'landscape',
          'landscape-left',
          'landscape-right',
        ]}>
        <FlatList
          keyExtractor={(item: string | number) => `${item}`}
          data={list}
          renderItem={renderItemDropdown}
          style={{maxHeight: 100, position: 'absolute'}}
          scrollEnabled={true}
          //   initialScrollIndex={saveScrollPosition ? selectedIndex : -1}
          //   style={styles.list}
          automaticallyAdjustContentInsets={false}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              //   this.flatList.scrollToIndex({index: info.index, animated: true});
            });
          }}
        />
      </Modal>
    </View>
  );
};

ModalDropdown.defaultProps = {
  list: [],
  selected: '',
  updateSelected: () => {},
};

export default ModalDropdown;
