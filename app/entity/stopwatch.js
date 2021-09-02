import { produce } from 'infra/helpers';
import DateFns from 'utils/date-fns';

export default function Stopwatch (data = []) {
  let _state = 'STOP';
  let _timer = 0;
  let _laps = data;

  let _start = 0;

  function parseTimer (timer, previous = 0) {
    const duration = DateFns().getDuration(previous, timer);
    return `
      ${String(duration.hours).padStart(2, '0')}
      :${String(duration.minutes).padStart(2, '0')}
      :${String(duration.seconds).padStart(2, '0')}
      .${String(duration.milliseconds).padStart(3, '0')}`.replace(/\s/g, '');
  }

  function getCurrentTimer (timestamp) {
    return _timer + (timestamp - _start);
  }

  this.start = () => {
    _state = 'RUNNING';
    _laps = [];
    _timer = 0;
    _start = performance.now();
  };

  this.stop = () => {
    _state = 'STOP';
    _timer = 0;
    _start = 0;
    _laps = [];
    return parseTimer(_timer);
  };

  this.pause = () => {
    _state = 'PAUSE';
    _timer += performance.now() - _start;
    return parseTimer(_timer);
  };

  this.resume = () => {
    _state = 'RUNNING';
    _start = performance.now();
  };

  this.setLap = () => {
    const now = performance.now();
    const timer = getCurrentTimer(now);

    const lastTimer = _laps[0];

    _laps = produce(_laps, (draft) => {
      draft.unshift({
        idx: (lastTimer?.idx || 0) + 1,
        result: parseTimer(timer),
        diff: '+ ' + parseTimer(timer, lastTimer?.raw),
        raw: timer,
      });
    });
  };

  this.setLaps = (laps) => {
    _laps = laps;
  };
  this.getLaps = () => {
    return _laps;
  };

  this.getState = () => {
    return _state;
  };

  this.getTimer = (timestamp) => {
    const timer = getCurrentTimer(timestamp);
    return parseTimer(timer);
  };
}
