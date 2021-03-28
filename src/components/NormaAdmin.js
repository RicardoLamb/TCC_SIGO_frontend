import React, { Component, Fragment } from 'react';
import Norma from './Norma';
import axios from "axios";
const config = require('../config.json');

export default class NormaAdmin extends Component {

  state = {
    newnorma: { 
      "codigo": "", 
      "id": ""
    },
    normas: []
  }

  handleAddNorma = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add norma endpoint here
    try {
      const params = {
        "id": id,
        "codigo": this.state.newnorma.codigo
      };
      await axios.post(`${config.api.invokeUrl}/normas/${id}`, params);
      this.setState({ normas: [...this.state.normas, this.state.newnorma] });
      this.setState({ newnorma: { "codigo": "", "id": "" }});
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  handleUpdateNorma = async (id, codigo) => {
    // add call to AWS API Gateway update norma endpoint here
    try {
      const params = {
        "id": id,
        "codigo": codigo
      };
      await axios.patch(`${config.api.invokeUrl}/normas/${id}`, params);
      const normaToUpdate = [...this.state.normas].find(norma => norma.id === id);
      const updatednormas = [...this.state.normas].filter(norma => norma.id !== id);
      normaToUpdate.codigo = codigo;
      updatednormas.push(normaToUpdate);
      this.setState({normas: updatednormas});
    }catch (err) {
      console.log(`Error updating norma: ${err}`);
    }
  }

  handleDeleteNorma = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete norma endpoint here
    try {
      await axios.delete(`${config.api.invokeUrl}/normas/${id}`);
      const updatednormas = [...this.state.normas].filter(norma => norma.id !== id);
      this.setState({normas: updatednormas});
    }catch (err) {
      console.log(`Unable to delete norma: ${err}`);
    }
  }

  fetchnormas = async () => {
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

  onAddcodigoChange = event => this.setState({ newnorma: { ...this.state.newnorma, "codigo": event.target.value } });
  onAddNormaIdChange = event => this.setState({ newnorma: { ...this.state.newnorma, "id": event.target.value } });

  componentDidMount = () => {
    this.fetchnormas();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Norma Admin</h1>
            <p className="subtitle is-5">Add and remove normas using the form below:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddNorma(this.state.newNorma.id, event)}>
                  <div className="field has-addons">
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter codigo"
                        value={this.state.newnorma.codigo}
                        onChange={this.onAddcodigoChange}
                      />
                    </div>
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter id"
                        value={this.state.newnorma.id}
                        onChange={this.onAddNormaIdChange}
                      />
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Add norma
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.normas.map((norma, index) => 
                        <Norma 
                          isAdmin={true}
                          handleUpdateNorma={this.handleUpdateNorma}
                          handleDeleteNorma={this.handleDeleteNorma} 
                          codigo={norma.codigo} 
                          id={norma.id}
                          key={norma.id}
                        />)
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
