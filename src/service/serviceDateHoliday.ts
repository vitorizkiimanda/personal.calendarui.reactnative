interface HolidayDate {
  holiday_date: string;
  holiday_name: string;
  is_national_holiday: Boolean;
}
const timeout = (ms: number, promise: Promise<Response>) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('TIMEOUT'));
    }, ms);

    promise
      .then((value: Response) => {
        clearTimeout(timer);
        resolve(value.json());
      })
      .catch(reason => {
        clearTimeout(timer);
        reject(reason);
      });
  });
};

export const getListDateHoliday = async (month: number, year: number) => {
  try {
    const val: any = await timeout(
      10000,
      fetch(`https://api-harilibur.vercel.app/api?month=${month}&year=${year}`),
    );
    return {data: val, error: null};
  } catch (err) {
    return {data: null, error: err};
  }
};
