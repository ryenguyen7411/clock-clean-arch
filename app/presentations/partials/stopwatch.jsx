import cx from 'classnames';
import React, { useEffect, useRef, useState } from 'infra/renderer';
import { iife } from 'utils/helpers';

export default function Stopwatch ({ usecase }) {
  const ref = useRef();
  const laps = usecase.Stopwatch().getLaps();

  const [state, setState] = useState(false);

  function handleStart () {
    const nextState = usecase.Stopwatch().start(ref);
    setState(nextState);
  }

  function handleStop () {
    const nextState = usecase.Stopwatch().stop(ref);
    setState(nextState);
  }

  function handlePause () {
    const nextState = usecase.Stopwatch().pause(ref);
    setState(nextState);
  }

  function handleResume () {
    const nextState = usecase.Stopwatch().resume(ref);
    setState(nextState);
  }

  useEffect(() => {
    usecase.Stopwatch().init(ref);
  }, []);

  return (
    <div className="stopwatch">
      STOP WATCH

      <div className="stopwatch-timer">
        <input ref={ref} readOnly className={cx('input', laps.length === 0 && 'empty')} />

        <div className="laps-wrapper">
          <div className="laps">
            {laps.map((lap) => (
              <div key={lap.idx} className="lap">
                <div className="lap-num">{String(lap.idx).padStart(2, '0')}</div>
                <div className="lap-diff">{lap.diff}</div>
                <div className="lap-result">{lap.result}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {iife(() => {
        if (state === 'RUNNING') {
          return (
            <div className="actions">
              <button className="lap" onClick={usecase.Stopwatch().setLap}>Lap</button>
              <button className="pause" onClick={handlePause}>Pause</button>
            </div>
          );
        }
        if (state === 'PAUSE') {
          return (
            <div className="actions">
              <button className="stop" onClick={handleStop}>Stop</button>
              <button className="resume" onClick={handleResume}>Play</button>
            </div>
          );
        }
        return (
          <div className="actions">
            <button className="start" onClick={handleStart}>Play</button>
          </div>
        );
      })}

    </div>
  );
}
