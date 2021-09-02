export default function StopwatchUsecase (repo) {
  let _stopwatch;

  function animateStopwatchInput (ref) {
    return function (hiresTimestamp) {
      ref.current.value = _stopwatch.getTimer(hiresTimestamp);
      ref.current.anim = requestAnimationFrame(animateStopwatchInput(ref));
    };
  }

  this.getLaps = () => {
    const stopwatch = repo.Stopwatch().getStopwatch();
    if (!_stopwatch) _stopwatch = stopwatch;
    else _stopwatch.setLaps(stopwatch.getLaps());

    return _stopwatch.getLaps();
  };

  this.setLap = () => {
    _stopwatch.setLap();
    repo.Stopwatch().save(_stopwatch);
  };

  this.init = (ref) => {
    ref.current.value = _stopwatch.getTimer(0);
  };

  this.start = (ref) => {
    ref.current.anim = requestAnimationFrame(animateStopwatchInput(ref));
    _stopwatch.start();
    return _stopwatch.getState();
  };
  this.stop = (ref) => {
    cancelAnimationFrame(ref.current.anim);
    ref.current.value = _stopwatch.stop();

    repo.Stopwatch().save(_stopwatch);
    return _stopwatch.getState();
  };
  this.pause = (ref) => {
    cancelAnimationFrame(ref.current.anim);
    ref.current.value = _stopwatch.pause();
    return _stopwatch.getState();
  };
  this.resume = (ref) => {
    ref.current.anim = requestAnimationFrame(animateStopwatchInput(ref));
    _stopwatch.resume();
    return _stopwatch.getState();
  };
}
