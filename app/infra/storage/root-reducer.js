import { combineReducers } from 'redux';
import Storage from 'infra/storage';

const storage = new Storage();

export default combineReducers({
  stopwatch: storage.Stopwatch().getReducer(),
});
