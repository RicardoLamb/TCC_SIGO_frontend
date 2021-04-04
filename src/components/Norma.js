import React, { Component, Fragment }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class normaAdmin extends Component {

  state = {
    isEditMode: false,
    updatednormaacoes: this.props.acoes
  }

  handleNormaEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateNorma(this.props.id, this.state.updatednormaacoes);
  }

  onAddNormaAcoesChange = event => this.setState({ "updatednormaacoes": event.target.value });

  render() {
    return (
      <div className="tile is-child box notification is-success">
        {
          this.props.isAdmin && 
          <Fragment>
            <a href="/" onClick={this.handleNormaEdit} className="norma-edit-icon">
              <FontAwesomeIcon icon="edit" />
            </a>
            <button onClick={event => this.props.handleDeleteNorma(this.props.id, event)} className="delete"></button>
          </Fragment>
        }
        {
          this.state.isEditMode 
          ? <div>
              <p className="norma-id">id: { this.props.id }</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder={ this.props.acoes }
                value={this.state.updatednormaacoes}
                onChange={this.onAddNormaAcoesChange}
              />
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >save</button>
            </div>
          : <div>
              <p className="norma-title">{ this.props.acoes }</p>
              <p className="norma-id">id: { this.props.id }</p>
            </div>
        }
      </div>
    )
  }
}
