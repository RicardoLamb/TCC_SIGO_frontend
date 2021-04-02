import React, { Fragment } from 'react';
import Hero from './Hero';
import HomeContent from './HomeContent';

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <div className="box cta">
        <p className="has-text-centered">
          <span className="tag is-primary">SIGO</span> Proporcionando agilidade e conformidade no processo fábril, garantindo maior gestão e acertividade!
        </p>
      </div>
      <HomeContent />
    </Fragment>
  )
}
