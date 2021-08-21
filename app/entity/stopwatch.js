import { produce } from 'infra/helpers';

export default function Stopwatch (data = []) {
  let _state = 'STOP';
  let _timer = 0;
  let _laps = data;

  function getTick () {
    return Date.now() - _timer;
  }

  this.start = function () {
    _state = 'RUNNING';
    _timer = Date.now();
    _laps = [];
  };

  this.stop = function () {
    _state = 'STOP';
    _timer = 0;
    _laps = [];
  };

  this.pause = function () {
    _state = 'STOP';
    _timer = Date.now();
  };

  this.resume = function () {
    _state = 'RUNNING';
  };

  this.setLap = () => {
    _laps = produce(_laps, (draft) => {
      draft.push(getTick());
    });
  };

  this.getLaps = () => {
    return _laps;
  };
}
