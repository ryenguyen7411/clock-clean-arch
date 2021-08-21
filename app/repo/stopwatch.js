import { useDispatch } from 'react-redux';

export default function StopwatchRepo (entity, storage) {
  const dispatch = useDispatch();

  this.getStopwatch = function () {
    const laps = storage.Stopwatch().getLaps();
    return new entity.Stopwatch(laps?.data);
  };

  this.save = function (stopwatch) {
    const [SUCCESS] = storage.Stopwatch().saveLaps.actions;
    dispatch(SUCCESS({ data: stopwatch.getLaps() }));
  };
}
