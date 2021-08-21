import StopwatchUsecase from './stopwatch';

export default function Usecase (repo) {
  const stopwatch = new StopwatchUsecase(repo);

  this.Stopwatch = () => stopwatch;
}
