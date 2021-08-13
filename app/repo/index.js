import Storage from 'infra/storage';
import Entity from 'entity';

export default function Repo () {
  const entity = new Entity();
  const storage = new Storage();
  // TODO: pass entity & storage as dependencies of child repo
}
