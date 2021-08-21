export default function StopwatchUsecase (repo) {
  let _stopwatch;

  this.getLaps = () => {
    _stopwatch = repo.Stopwatch().getStopwatch();
    return _stopwatch.getLaps();
  };

  this.start = () => {};
  this.stop = () => {};
  this.pause = () => {};
  this.resume = () => {};

  this.setLap = () => {
    _stopwatch.setLap();
    repo.Stopwatch().save(_stopwatch);
  };
}
