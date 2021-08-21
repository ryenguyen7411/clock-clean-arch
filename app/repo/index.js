import Storage from 'infra/storage';
import Entity from 'entity';
import StopwatchRepo from './stopwatch';

export default function Repo () {
  const entity = new Entity();
  const storage = new Storage();

  const stopwatch = new StopwatchRepo(entity, storage);

  this.Stopwatch = () => stopwatch;
}
