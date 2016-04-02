
class ClassDateTools {
  constructor() {
    this.weekArray = new Array(7);
  }

  init() {
    this.weekArray[0] = 'Sunday';
    this.weekArray[1] = 'Monday';
    this.weekArray[2] = 'Tuesday';
    this.weekArray[3] = 'Wednesday';
    this.weekArray[4] = 'Thursday';
    this.weekArray[5] = 'Friday';
    this.weekArray[6] = 'Saturday';
  }

  getTodayDay() {
    const d = new Date();
    return this.weekArray[d.getDay()];
  }

  getPreviousDay(dayRef, indexRef) {
    return new Date(dayRef + (indexRef*24*60*60*1000));
  }

  parseDateFromString(dateString) {
    if (!dateString) {
      return null;
    }
    return Date.parse(this.filterDateString(dateString));
  }

  filterDateString(dateString) {
    // get rid of timezone for Date.parse
    if (!dateString) {
      return '';
    }
    const slicedDate = dateString.split(/\s/);
    const date = slicedDate[0] ? slicedDate[0] : '';
    const time = slicedDate[1] ? slicedDate[1] : '';
    const ApmPm = slicedDate[2] ? slicedDate[2] : '';

    return `${date} ${time} ${ApmPm}`;
  }
}

export default new ClassDateTools();
