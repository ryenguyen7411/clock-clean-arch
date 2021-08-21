import React from 'infra/renderer';

export default function Stopwatch ({ usecase }) {
  const laps = usecase.Stopwatch().getLaps();

  return (
    <div className="stopwatch">
      STOP WATCH
      <button className="ml-10" onClick={usecase.Stopwatch().setLap}>+</button>

      <div>
        LAPS
        <div>{JSON.stringify(laps)}</div>
      </div>
    </div>
  );
}
