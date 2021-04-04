import React, { Component, Fragment } from 'react';
import Norma from './Norma';
import axios from "axios";
import { API } from "aws-amplify";
const config = require('../config.json');
const formState = { name: '', email: '', message: '' };

export default class Consultorias extends Component {

  state = {
    newnorma: {
      "id": "",
      "acoes": "",
      "area": "",
      "codigo": "",
      "consequencias": "",
      "descarte": "",
      "descricao": "",
      "fonte": "",
      "normasobjects": "",
      "objects": "",
      "riscos": "",
      "sigla": "",
      "situation": "",
      "titulo": "",
      "usocorreto": "",
      "vigencia": ""
    },
    normas: []
  }

  addContact = async (e) => {
    e.preventDefault();
    try {
      const data = {
        id: formState.id,
        acoes: formState.acoes,
        area: formState.area,
        codigo: formState.codigo,
        consequencias: formState.consequencias,
        descarte: formState.descarte,
        descricao: formState.descricao,
        fonte: formState.fontes,
        normasobjects: formState.normasobjects,
        objects: formState.objects,
        riscos: formState.riscos,
        sigla: formState.sigla,
        situation: formState.situation,
        titulo: formState.titulo,
        usocorreto: formState.usocorreto,
        vigencia: formState.vigencia
      }
      // const apiData = await API.post(`${config.api.invokeUrl}/normas/${formState.id}`, data);
      // const apiData = 
      await axios.post(`${config.api.invokeUrl}/normas/${formState.id}`, data);
      // console.log({ apiData });
    }catch (err) {
      console.log(`Error updating norma: ${err}`);
    }
  }

updateFormState(key, value) {
  formState[key] = value;
}

handleAddNorma = async (id, event) => {
  event.preventDefault();
  // add call to AWS API Gateway add norma endpoint here
  try {
    const params = {
      "id": id,
      "acoes": this.state.newnorma.acoes,
      "area": this.state.newnorma.area,
      "codigo": this.state.newnorma.codigo,
      "consequencias": this.state.newnorma.consequencias,
      "descarte": this.state.newnorma.descarte,
      "descricao": this.state.newnorma.descricao,
      "fonte": this.state.newnorma.fontes,
      "normasobjects": this.state.newnorma.normasobjects,
      "objects": this.state.newnorma.objects,
      "riscos": this.state.newnorma.riscos,
      "sigla": this.state.newnorma.sigla,
      "situation": this.state.newnorma.situation,
      "titulo": this.state.newnorma.titulo,
      "usocorreto": this.state.newnorma.usocorreto,
      "vigencia": this.state.newnorma.vigencia        
    };
    await axios.post(`${config.api.invokeUrl}/normas/${id}`, params);
    // this.componentDidMount();
    // const apiData = await API.post(`${config.api.invokeUrl}/normas/${id}`, params);
    // console.log({ apiData });
    this.setState({ normas: [...this.state.normas, this.state.newnorma] });
    this.setState({ newnorma: { "id": "", "acoes": "", "area": "", "codigo": "", "consequencias": "", "descarte": "", "descricao": "", "fonte": "", "normasobjects": "", "objects": "", "riscos": "", "sigla": "", "situation": "", "titulo": "", "usocorreto": "", "vigencia": "" }});
  }catch (err) {
    console.log(`An error has occurred: ${err}`);
  }
}

  handleUpdateNorma = async (id, acoes) => {
    // add call to AWS API Gateway update norma endpoint here
    try {
      const params = {
        "id": id,
        "acoes": acoes
      };
      await axios.patch(`${config.api.invokeUrl}/normas/${id}`, params);
      const normaToUpdate = [...this.state.normas].find(norma => norma.id === id);
      const updatednormas = [...this.state.normas].filter(norma => norma.id !== id);
      normaToUpdate.acoes = acoes;
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
      await axios.delete(`${config.api.invokeUrl}/normas/${id}`)
      const deletednormas = [...this.state.normas].filter(norma => norma.id !== id);
      this.setState({normas: deletednormas});
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

  onAddNormaIdChange = event => this.setState({ newnorma: { ...this.state.newnorma, "id": event.target.value } });
  onAddNormaAcoesChange = event => this.setState({ newnorma: { ...this.state.newnorma, "acoes": event.target.value } });
  onAddNormaAreaChange = event => this.setState({ newnorma: { ...this.state.newnorma, "area": event.target.value } });
  onAddNormasCodigoChange = event => this.setState({ newnorma: { ...this.state.newnorma, "codigo": event.target.value } });
  onAddNormaConsequenciasChange = event => this.setState({ newnorma: { ...this.state.newnorma, "consequencias": event.target.value } });
  onAddNormaDescarteChange = event => this.setState({ newnorma: { ...this.state.newnorma, "descarte": event.target.value } });
  onAddNormaDescricaoChange = event => this.setState({ newnorma: { ...this.state.newnorma, "descricao": event.target.value } });
  onAddNormaFonteChange = event => this.setState({ newnorma: { ...this.state.newnorma, "fonte": event.target.value } });
  onAddNormaObjectsNormasChange = event => this.setState({ newnorma: { ...this.state.newnorma, "normasobjects": event.target.value } });
  onAddNormaObjectsChange = event => this.setState({ newnorma: { ...this.state.newnorma, "objects": event.target.value } });
  onAddNormaRiscosChange = event => this.setState({ newnorma: { ...this.state.newnorma, "riscos": event.target.value } });
  onAddNormaSiglaChange = event => this.setState({ newnorma: { ...this.state.newnorma, "sigla": event.target.value } });
  onAddNormaSituationChange = event => this.setState({ newnorma: { ...this.state.newnorma, "situation": event.target.value } });
  onAddNormaTituloChange = event => this.setState({ newnorma: { ...this.state.newnorma, "titulo": event.target.value } });
  onAddNormaUsoCorretoChange = event => this.setState({ newnorma: { ...this.state.newnorma, "usocorreto": event.target.value } });
  onAddNormaVigenciaChange = event => this.setState({ newnorma: { ...this.state.newnorma, "vigencia": event.target.value } });

  componentDidMount = () => {
    this.fetchnormas();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Consultorias</h1>
            <p className="subtitle is-5">Adicionar, Editar ou Apagar consultoria usando o form abaixo:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddNorma(this.state.newnorma.id, event)}>
                  <div className="field has-addons">
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Digite ID"
                        value={this.state.newnorma.id}
                        onChange={this.onAddNormaIdChange}
                      />
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Digite ações"
                        value={this.state.newnorma.acoes}
                        onChange={this.onAddNormaAcoesChange}
                      />
                    <input
                        className="input is-medium"
                        type="text"
                        placeholder="Digite área"
                        value={this.state.newnorma.area}
                        onChange={this.onAddNormaAreaChange}
                      />
                    <input
                        className="input is-medium"
                        type="text"
                        placeholder="Digite código"
                        value={this.state.newnorma.codigo}
                        onChange={this.onAddNormasCodigoChange}
                      />
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Digite consequências"
                        value={this.state.newnorma.consequencias}
                        onChange={this.onAddNormaConsequenciasChange}
                      />
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Digite descarte"
                        value={this.state.newnorma.descarte}
                        onChange={this.onAddNormaDescarteChange}
                      />
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Digite descrição"
                        value={this.state.newnorma.descricao}
                        onChange={this.onAddNormaDescricaoChange}
                      />
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Digite fonte"
                        value={this.state.newnorma.fonte}
                        onChange={this.onAddNormaFonteChange}
                      />
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Digite objeto de normas"
                        value={this.state.newnorma.normasobjects}
                        onChange={this.onAddNormaObjectsNormasChange}
                      />
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Digite objeto"
                        value={this.state.newnorma.objects}
                        onChange={this.onAddNormaObjectsChange}
                      />
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Digite riscos"
                        value={this.state.newnorma.riscos}
                        onChange={this.onAddNormaRiscosChange}
                      />
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Digite sigla"
                        value={this.state.newnorma.sigla}
                        onChange={this.onAddNormaSiglaChange}
                      />
                     <input
                        className="input is-medium"
                        type="text"
                        placeholder="Digite Situação"
                        value={this.state.newnorma.situation}
                        onChange={this.onAddNormaSituationChange}
                      />
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Digite título"
                        value={this.state.newnorma.titulo}
                        onChange={this.onAddNormaTituloChange}
                      />
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Digite uso correto"
                        value={this.state.newnorma.usocorreto}
                        onChange={this.onAddNormaUsoCorretoChange}
                      />
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Digite vigência"
                        value={this.state.newnorma.vigencia}
                        onChange={this.onAddNormaVigenciaChange}
                      />
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Add norma
                      </button>
                    </div>
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
