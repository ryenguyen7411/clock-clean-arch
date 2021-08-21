import React from 'infra/renderer';
import Stopwatch from 'presentations/partials/stopwatch';
import Repo from 'repo';
import Usecase from 'usecase';

export default function HomePage () {
  const repo = new Repo();
  const usecase = new Usecase(repo);

  return (
    <div className="home-page">
      HOMEPAGE

      <Stopwatch usecase={usecase} />
    </div>
  );
}
