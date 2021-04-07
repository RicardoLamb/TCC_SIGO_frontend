import React, { Component, Fragment } from 'react';
import axios from "axios";

const config = require('../config.json');
const formState = { "id": "", "sigla": "", "codigo": "", "descricao": "", "datadefinicao": "", "datavigencia": "", "origem": "", "categoria": ""};

export default class Abnt extends Component {

  state = {
    newabnt: {
      "id": "",
      "sigla": "", 
      "codigo": "", 
      "descricao": "", 
      "datadefinicao": "", 
      "datavigencia": "", 
      "origem": "", 
      "categoria": ""
    },
    abnts: [],
    search: ""
  }

  onSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20)})
  }

updateFormState(key, value) {
  formState[key] = value;
}

  fetchAbnts =   async () => {
    try {
      const res = await axios.get(`${config.apiAbnt.invokeUrl}/abnt`);
      const abnts = res.data;
      this.setState({ abnts: abnts });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchAbnts();
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sigla</th>
            <th>Codigo</th>
            <th>Descrição</th>
            <th>Data de Definição</th>
            <th>Data de Vigência</th>
            <th>Origem</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>{ this.renderRows() }</tbody>
      </table>
    );
  }

  renderRows() {
    let filteredAbnts = this.state.abnts.filter(
      (abnt) => {
        return abnt.id.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );     
    return filteredAbnts.map( abnt => {
        return (
          <tr key={abnt.id}>
            <td>{abnt.id}</td>
            <td>{abnt.sigla}</td>
            <td>{abnt.codigo}</td>
            <td>{abnt.descricao}</td>
            <td>{abnt.datadefinicao}</td>
            <td>{abnt.datavigencia}</td>
            <td>
              <a href={abnt.origem} target="_blank">
              {abnt.origem}
              </a>
            </td>
            <td>{abnt.categoria}</td>
          </tr>
        )
      }
    );
  }

  render() {
    return(
      <Fragment>
        <h1>ABNT</h1>
        <p className="subtitle is-5">Consultar normas ABNT usando o form abaixo:</p>
        <p class="control has-icons-left">
          <input class="input is-primary" type="text" placeholder="Search" value={this.state.search} onChange={this.onSearch.bind(this)}/>
          <span class="icon is-left">
            <i class="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>           
        {this.renderTable()}
      </Fragment>
    )
  }
}
