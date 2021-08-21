import { createAction, createReducer } from '@reduxjs/toolkit';
import { initialState, setData } from 'infra/helpers';
import { useSelector } from 'infra/storage';
import { iife } from 'utils/helpers';

const storage = new StopwatchStorage();

const reducer = createReducer(initialState, {
  ...storage.saveLaps.handlers,
});

export default function StopwatchStorage () {
  this.getReducer = function () {
    return reducer;
  };

  this.getLaps = () => {
    return useSelector((state) => state.stopwatch.laps);
  };

  this.saveLaps = iife(() => {
    const type = '@action/stopwatch_save_laps';
    const PENDING = createAction(type + '_PENDING');
    const FAILED = createAction(type + '_FAILED');
    const SUCCESS = createAction(type);

    return {
      actions: [SUCCESS, PENDING, FAILED],
      handlers: {
        [SUCCESS]: (state, action) => {
          if (!action.payload) return;
          const { data } = action.payload;
          setData(state, 'laps', data);
        },
      },
    };
  });
}
