import React, { Component, Fragment } from 'react';
import axios from "axios";

const config = require('../config.json');
const formState = { "id": "", "acoes": "", "area": "", "codigo": "", "consequencias": "", "descarte": "", "descricao": "", "fonte": "", "normasobjects": "", "objects": "", "riscos": "", "sigla": "", "situation": "", "titulo": "", "usocorreto": "", "vigencia": "", "method": "post" };

export default class Normas extends Component {

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
    normas: [],
    search: ""
  }

  onSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20)})
  }

updateFormState(key, value) {
  formState[key] = value;
}

handleAddNorma = async (id, event) => {
  event.preventDefault();
  try {
    const params = {
      "id": id,
      "acoes": this.state.newnorma.acoes,
      "area": this.state.newnorma.area,
      "codigo": this.state.newnorma.codigo,
      "consequencias": this.state.newnorma.consequencias,
      "descarte": this.state.newnorma.descarte,
      "descricao": this.state.newnorma.descricao,
      "fonte": this.state.newnorma.fonte,
      "normasobjects": this.state.newnorma.normasobjects,
      "objects": this.state.newnorma.objects,
      "riscos": this.state.newnorma.riscos,
      "sigla": this.state.newnorma.sigla,
      "situation": this.state.newnorma.situation,
      "titulo": this.state.newnorma.titulo,
      "usocorreto": this.state.newnorma.usocorreto,
      "vigencia": this.state.newnorma.vigencia        
    };
    await axios.post(`${config.apiNormas.invokeUrl}/normas/${id}`, params);
    this.componentDidMount();
    this.setState({ newnorma: { "id": "", "acoes": "", "area": "", "codigo": "", "consequencias": "", "descarte": "", "descricao": "", "fonte": "", "normasobjects": "", "objects": "", "riscos": "", "sigla": "", "situation": "", "titulo": "", "usocorreto": "", "vigencia": "" }});
  }catch (err) {
    console.log(`An error has occurred: ${err}`);
  }
}

  handleClearNorma = async () => {
    try {
      this.setState({ newnorma: { "id": "", "acoes": "", "area": "", "codigo": "", "consequencias": "", "descarte": "", "descricao": "", "fonte": "", "normasobjects": "", "objects": "", "riscos": "", "sigla": "", "situation": "", "titulo": "", "usocorreto": "", "vigencia": "" }});
    }catch (err) {
      console.log(`Error updating norma: ${err}`);
    }
  }

  handleUpdateNorma = async (id) => {
    try {
      const normaToUpdate = [...this.state.normas].find(norma => norma.id === id);
      this.setState({ newnorma: normaToUpdate});
    }catch (err) {
      console.log(`Error updating norma: ${err}`);
    }
  }

  handleDeleteNorma = async (id, event) => {
    event.preventDefault();
    try {
      await axios.delete(`${config.apiNormas.invokeUrl}/normas/${id}`)
      const deletednormas = [...this.state.normas].filter(norma => norma.id !== id);
      this.setState({normas: deletednormas});
      this.handleClearNorma();
    }catch (err) {
      console.log(`Unable to delete norma: ${err}`);
    }
  }

  fetchnormas =   async () => {
    try {
      const res = await axios.get(`${config.apiNormas.invokeUrl}/normas`);
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

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>A????es</th>
            <th>??rea</th>
            <th>C??digo</th>
            <th>Consequ??ncias</th>
            <th>Descarte</th>
            <th>Descri????o</th>
            <th>Riscos</th>
            <th>Sigla</th>
            <th>Situa????o</th>
            <th>Uso Correto</th>
            <th>Vig??ncia</th>
            <th>A????o</th>
          </tr>
        </thead>
        <tbody>{ this.renderRows() }</tbody>
      </table>
    );
  }

  renderRows() {
    let filteredNormas = this.state.normas.filter(
      (norma) => {
        return norma.id.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );
    return filteredNormas.map( norma => {    
      return (
        <tr key={norma.id}>
          <td>{norma.id}</td>
          <td>{norma.acoes}</td>
          <td>{norma.area}</td>
          <td>{norma.codigo}</td>
          <td>{norma.consequencias}</td>
          <td>{norma.descarte}</td>
          <td>{norma.descricao}</td>
          <td>{norma.riscos}</td>
          <td>{norma.sigla}</td>
          <td>{norma.situation}</td>
          <td>{norma.usocorreto}</td>
          <td>{norma.vigencia}</td>
          <td>
            <button className="button is-small is-warning"
              onClick={event => this.handleUpdateNorma(norma.id)}>Editar
            </button>
            <button className="button is-small is-danger"
              onClick={event => this.handleDeleteNorma(norma.id, event)}>Excluir
            </button>            
          </td>
        </tr>
      )
    }
  );
}

  renderForm() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="field is-horizontal">
              <form onSubmit={event => this.handleAddNorma(this.state.newnorma.id, event)}></form>
                <div className="column is-desktop is-mobile">
                  <div className="field has-addons">
                    {/* <label className="label">ID</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="id"
                      placeholder="ID"
                      value={this.state.newnorma.id}
                      onChange={this.onAddNormaIdChange}
                    />  
                    {/* <label className="label">A????es</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="acoes"
                      placeholder="Digite A????es"
                      value={this.state.newnorma.acoes}
                      onChange={this.onAddNormaAcoesChange}
                    />   
                    {/* <label className="label">??rea</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="area"
                      placeholder="Digite ??rea"
                      value={this.state.newnorma.area}
                      onChange={this.onAddNormaAreaChange}
                    />       
                    {/* <label className="label">C??digo</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="codigo"
                      placeholder="Digite C??digo"
                      value={this.state.newnorma.codigo}
                      onChange={this.onAddNormasCodigoChange}
                    />                                  
                  </div>          
                  <div className="field has-addons">
                    {/* <label className="label">Consequ??ncias</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="consequencias"
                      placeholder="Digite Consequ??ncias"
                      value={this.state.newnorma.consequencias}
                      onChange={this.onAddNormaConsequenciasChange}
                    />  
                    {/* <label className="label">Descarte</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="descarte"
                      placeholder="Digite Descarte"
                      value={this.state.newnorma.descarte}
                      onChange={this.onAddNormaDescarteChange}
                    />   
                    {/* <label className="label">Descri????o</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="descricao"
                      placeholder="Digite Descri????o"
                      value={this.state.newnorma.descricao}
                      onChange={this.onAddNormaDescricaoChange}
                    />       
                    {/* <label className="label">Fonte</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="fonte"
                      placeholder="Digite Fonte"
                      value={this.state.newnorma.fonte}
                      onChange={this.onAddNormaFonteChange}
                    />                                  
                  </div>  
                  <div className="field has-addons">
                    {/* <label className="label">Objetos Normas</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="normasobjects"
                      placeholder="Digite Objetos Normas"
                      value={this.state.newnorma.normasobjects}
                      onChange={this.onAddNormaObjectsNormasChange}
                    />  
                    {/* <label className="label">Objetos</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="objects"
                      placeholder="Digite Objetos"
                      value={this.state.newnorma.objects}
                      onChange={this.onAddNormaObjectsChange}
                    />   
                    {/* <label className="label">Riscos</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="riscos"
                      placeholder="Digite Riscos"
                      value={this.state.newnorma.riscos}
                      onChange={this.onAddNormaRiscosChange}
                    />       
                    {/* <label className="label">Sigla</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="sigla"
                      placeholder="Digite Sigla"
                      value={this.state.newnorma.sigla}
                      onChange={this.onAddNormaSiglaChange}
                    />                                  
                  </div>      
                  <div className="field has-addons">
                    {/* <label className="label">Situa????o</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="situation"
                      placeholder="Digite Situa????o"
                      value={this.state.newnorma.situation}
                      onChange={this.onAddNormaSituationChange}
                    />  
                    {/* <label className="label">T??tulo</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="titulo"
                      placeholder="Digite T??tulo"
                      value={this.state.newnorma.titulo}
                      onChange={this.onAddNormaTituloChange}
                    />   
                    {/* <label className="label">Uso Correto</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="usocorreto"
                      placeholder="Digite Uso Correto"
                      value={this.state.newnorma.usocorreto}
                      onChange={this.onAddNormaUsoCorretoChange}
                    />       
                    {/* <label className="label">Vig??ncia</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="vigencia"
                      placeholder="Digite Vig??ncia"
                      value={this.state.newnorma.vigencia}
                      onChange={this.onAddNormaVigenciaChange}
                    />                                  
                  </div>                                             
                  <div className="field is-grouped is-grouped-right">
                  <p className="control">
                    <button className="button is-primary" onClick={event => this.handleAddNorma(this.state.newnorma.id, event)}>
                      Submit
                    </button>
                  </p>
                  <p className="control">
                    <button className="button is-light" onClick={event => this.handleClearNorma()}>
                      Cancel
                    </button>
                  </p>
                </div>             
              </div>         
            </div>
          </div>
      </div>
    </section>             
    );
  }

  render() {
    return(
      <Fragment>
        <h1>Normas</h1>
        <p className="subtitle is-5">Adicionar, Editar ou Apagar consultoria usando o form abaixo:</p>
        {this.renderForm()}
        <p className="control has-icons-left">
          <input className="input is-primary" type="text" placeholder="Search" value={this.state.search} onChange={this.onSearch.bind(this)}/>
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>       
        <div className="table-container">
          {this.renderTable()}
        </div> 
      </Fragment>
    )
  }
}
