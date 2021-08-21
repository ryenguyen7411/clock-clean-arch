import StopwatchStorage from './stopwatch';

export default function Storage () {
  const stopwatch = new StopwatchStorage();

  this.Stopwatch = () => stopwatch;
}

export * from './configure';
