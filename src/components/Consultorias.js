import React, { Component, Fragment } from 'react';
import axios from "axios";

const config = require('../config.json');
const formState = { "id": "", "area": "", "cnpj": "", "empresa": "", "endereco": "", "fantasia": "", "iniciodecontrato": "", "modalidade": "", "objects": "", "normas": "", "vigenciadecontrato": ""};

export default class Consultorias extends Component {

  state = {
    newconsultoria: {
      "id": "",
      "area": "",
      "cnpj": "",
      "empresa": "",
      "endereco": "",
      "fantasia": "",
      "iniciodecontrato": "",
      "modalidade": "",
      "objects": "",
      "normas": "",
      "vigenciadecontrato": ""
    },      
    consultorias: [],
    search: ""
  }

  onSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20)})
  }

updateFormState(key, value) {
  formState[key] = value;
}

handleAddConsultoria = async (id, event) => {
  event.preventDefault();
  try {
    const params = {
      "id": id,
      "area": this.state.newconsultoria.area,
      "cnpj": this.state.newconsultoria.cnpj,
      "empresa": this.state.newconsultoria.empresa,
      "endereco": this.state.newconsultoria.endereco,
      "fantasia": this.state.newconsultoria.fantasia,
      "iniciodecontrato": this.state.newconsultoria.iniciodecontrato,
      "modalidade": this.state.newconsultoria.modalidade,
      "objects": this.state.newconsultoria.objects,
      "normas": this.state.newconsultoria.normas,
      "vigenciadecontrato": this.state.newconsultoria.vigenciadecontrato     
    };
    await axios.post(`${config.apiConsultorias.invokeUrl}/consultorias/${id}`, params);
    this.componentDidMount();
    this.setState({ newconsultoria: { "id": "", "area": "", "cnpj": "", "empresa": "", "endereco": "", "fantasia": "", "iniciodecontrato": "", "modalidade": "", "objects": "", "normas": "", "vigenciadecontrato": ""}});
  }catch (err) {
    console.log(`An error has occurred: ${err}`);
  }
}

  handleClearConsultoria = async () => {
    try {
      this.setState({ newconsultoria: { "id": "", "area": "", "cnpj": "", "empresa": "", "endereco": "", "fantasia": "", "iniciodecontrato": "", "modalidade": "", "objects": "", "normas": "", "vigenciadecontrato": "" }});
    }catch (err) {
      console.log(`Error updating consultoria: ${err}`);
    }
  }

  handleUpdateConsultoria = async (id) => {
    try {
      const consultoriaToUpdate = [...this.state.consultorias].find(consultoria => consultoria.id === id);
      this.setState({ newconsultoria: consultoriaToUpdate});
    }catch (err) {
      console.log(`Error updating consultoria: ${err}`);
    }
  }

  handleDeleteConsultoria = async (id, event) => {
    event.preventDefault();
    try {
      await axios.delete(`${config.apiConsultorias.invokeUrl}/consultorias/${id}`)
      const deletedconsultorias = [...this.state.consultorias].filter(consultoria => consultoria.id !== id);
      this.setState({consultorias: deletedconsultorias});
      this.handleClearConsultoria();
    }catch (err) {
      console.log(`Unable to delete consultoria: ${err}`);
    }
  }

  fetchConsultorias =   async () => {
    try {
      const res = await axios.get(`${config.apiConsultorias.invokeUrl}/consultorias`);
      const consultorias = res.data;
      this.setState({ consultorias: consultorias });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchConsultorias();
  }

  onAddConsultoriaIdChange = event => this.setState({ newconsultoria: { ...this.state.newconsultoria, "id": event.target.value } });
  onAddConsultoriaAreaChange = event => this.setState({ newconsultoria: { ...this.state.newconsultoria, "area": event.target.value } });
  onAddconsultoriasCNPJChange = event => this.setState({ newconsultoria: { ...this.state.newconsultoria, "cnpj": event.target.value } });
  onAddConsultoriaEmpresaChange = event => this.setState({ newconsultoria: { ...this.state.newconsultoria, "empresa": event.target.value } });
  onAddConsultoriaEnderecoChange = event => this.setState({ newconsultoria: { ...this.state.newconsultoria, "endereco": event.target.value } });
  onAddConsultoriaFantasiaChange = event => this.setState({ newconsultoria: { ...this.state.newconsultoria, "fantasia": event.target.value } });
  onAddConsultoriaInicioDeContratoChange = event => this.setState({ newconsultoria: { ...this.state.newconsultoria, "iniciodecontrato": event.target.value } });
  onAddConsultoriaModalidadeChange = event => this.setState({ newconsultoria: { ...this.state.newconsultoria, "modalidade": event.target.value } });
  onAddConsultoriaObjectsChange = event => this.setState({ newconsultoria: { ...this.state.newconsultoria, "objects": event.target.value } });
  onAddConsultoriaNormasChange = event => this.setState({ newconsultoria: { ...this.state.newconsultoria, "normas": event.target.value } });
  onAddConsultoriaVigenciaDeContratoChange = event => this.setState({ newconsultoria: { ...this.state.newconsultoria, "vigenciadecontrato": event.target.value } });

  renderTable() {
    return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>??rea</th>
          <th>CNPJ</th>
          <th>Empresa</th>
          <th>Endereco</th>
          <th>Fantasia</th>
          <th>normas</th>
          <th>Modalidade</th>
          <th>vigenciadecontrato</th>
          <th>A????o</th>
        </tr>
      </thead>
      <tbody>{ this.renderRows() }</tbody>
    </table>
    );
  }

  renderRows() {
    let filteredConsultorias = this.state.consultorias.filter(
      (consultoria) => {
        return consultoria.id.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );    
    return filteredConsultorias.map( consultoria => {
        return (            
          <tr key={consultoria.id}>
            <td>{consultoria.id}</td>
            <td>{consultoria.area}</td>
            <td>{consultoria.cnpj}</td>
            <td>{consultoria.empresa}</td>
            <td>{consultoria.endereco}</td>
            <td>{consultoria.fantasia}</td>
            <td>{consultoria.normas}</td>
            <td>{consultoria.modalidade}</td>
            <td>{consultoria.vigenciadecontrato}</td>
            <td>
              <button className="button is-small is-warning"
                onClick={event => this.handleUpdateConsultoria(consultoria.id)}>Editar
              </button>
              <button className="button is-small is-danger"
                onClick={event => this.handleDeleteConsultoria(consultoria.id, event)}>Excluir
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
              <form onSubmit={event => this.handleAddConsultoria(this.state.newconsultoria.id, event)}></form>
                <div className="column">
                  <div className="field has-addons">
                    {/* <label className="label">ID</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="id"
                      placeholder="ID"
                      value={this.state.newconsultoria.id}
                      onChange={this.onAddConsultoriaIdChange}
                    />  
                    {/* <label className="label">A????es</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="cnpj"
                      placeholder="Digite CNPJ"
                      value={this.state.newconsultoria.cnpj}
                      onChange={this.onAddconsultoriasCNPJChange}
                    />   
                    {/* <label className="label">??rea</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="area"
                      placeholder="Digite ??rea"
                      value={this.state.newconsultoria.area}
                      onChange={this.onAddConsultoriaAreaChange}
                    />                                        
                  </div>          
                  <div className="field has-addons">  
                    {/* <label className="label">endereco</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="endereco"
                      placeholder="Digite Endereco"
                      value={this.state.newconsultoria.endereco}
                      onChange={this.onAddConsultoriaEnderecoChange}
                    />        
                    {/* <label className="label">iniciodecontrato</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="iniciodecontrato"
                      placeholder="Digite Inicio de Contrato"
                      value={this.state.newconsultoria.iniciodecontrato}
                      onChange={this.onAddConsultoriaInicioDeContratoChange}
                    />             
                    {/* <label className="label">empresa</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="empresa"
                      placeholder="Digite Empresa"
                      value={this.state.newconsultoria.empresa}
                      onChange={this.onAddConsultoriaEmpresaChange}
                    />                                    
                  </div>  
                  <div className="field has-addons">
                    {/* <label className="label">Objetos</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="objects"
                      placeholder="Digite Objetos"
                      value={this.state.newconsultoria.objects}
                      onChange={this.onAddConsultoriaObjectsChange}
                    />   
                    {/* <label className="label">normas</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="normas"
                      placeholder="Digite Normas"
                      value={this.state.newconsultoria.normas}
                      onChange={this.onAddConsultoriaNormasChange}
                    />       
                    {/* <label className="label">vigenciadecontrato</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="vigenciadecontrato"
                      placeholder="Digite Vigencia de Contrato"
                      value={this.state.newconsultoria.vigenciadecontrato}
                      onChange={this.onAddConsultoriaVigenciaDeContratoChange}
                    />                                  
                  </div>      
                  <div className="field has-addons">
                    {/* <label className="label">Fantasia</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="fantais"
                      placeholder="Digite Fantasia"
                      value={this.state.newconsultoria.fantasia}
                      onChange={this.onAddConsultoriaFantasiaChange}
                    />   
                    {/* <label className="label">modalidade</label> */}
                    <input
                      className="input is-normal"
                      type="text"
                      name="modalidade"
                      placeholder="Digite Modalidade"
                      value={this.state.newconsultoria.modalidade}
                      onChange={this.onAddConsultoriaModalidadeChange}
                    />       
                  </div>                             
                  <div className="field is-grouped is-grouped-right">
                  <p className="control">
                    <button className="button is-primary" onClick={event => this.handleAddConsultoria(this.state.newconsultoria.id, event)}>
                      Submit
                    </button>
                  </p>
                  <p className="control">
                    <button className="button is-light" onClick={event => this.handleClearConsultoria()}>
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
        <h1>Consultorias</h1>
        <p className="subtitle is-5">Adicionar, Editar ou Apagar consultoria usando o form abaixo:</p>
        {this.renderForm()}
        <p className="control has-icons-left">
          <input className="input is-primary" type="text" placeholder="Search" value={this.state.search} onChange={this.onSearch.bind(this)}/>
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>         
        {this.renderTable()}
      </Fragment>
    )
  }
}
