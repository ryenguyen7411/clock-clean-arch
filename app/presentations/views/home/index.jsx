import React from 'infra/renderer';
import Repo from 'repo';
import Usecase from 'usecase';

export default function HomePage () {
  const repo = new Repo();
  const usecase = new Usecase(repo);
  // TODO: pass usecase as dependencies of child component

  return (
    <div className="home-page">
      HOMEPAGE
    </div>
  );
}
