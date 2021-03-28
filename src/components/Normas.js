import React, { Component, Fragment } from 'react';
import Norma from './Norma';
import axios from "axios";
const config = require('../config.json');

export default class Normas extends Component {

  state = {
    newnorma: null,
    normas: []
  }

  fetchNormas = async () => {
    // add call to AWS API Gateway to fetch normas here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/normas`);
      const normas = res.data;
      this.setState({ normas: normas });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchNormas();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Energy Normas</h1>
            <p className="subtitle is-5">Invest in a clean future with our efficient and cost-effective green energy normas:</p>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.normas && this.state.normas.length > 0
                      ? this.state.normas.map(norma => <Norma name={norma.acoes} id={norma.id} key={norma.id} />)
                      : <div className="tile notification is-warning">No normas available</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
