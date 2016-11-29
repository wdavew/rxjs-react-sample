const Rx = require('rxjs/Rx');

class Upstream {
  constructor() {
    this.stream = new Rx.BehaviorSubject();
    this.history = 'hello';
    this.getHistory();
  }

  dispatch(data) {
    if (!(data.hasOwnProperty('data') && data.hasOwnProperty('type'))) {
      throw new Error('Actions dispatched upstream must be objects with data and type properties')
    }
    this.stream.next(data);
  }

  filterForAction(actionType) {
    return this.stream.filter(el => {
      return el ? (el.type === actionType) : el
    })
      .map(el => el ? el.data : el)
  }

  getHistory() {
    this.historyStream = this.stream
      .scan((acc, cur) => {
        acc.push(cur);
        return acc;
      }, [])
    this.historyStream.subscribe((el) => this.history = el)
  }

  logHistory() {
    return this.history;
  }
}



export default function createUpstream() {
  return new Upstream();
}
