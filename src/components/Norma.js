import React, { Component, Fragment }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class normaAdmin extends Component {

  state = {
    isEditMode: false,
    updatednormaname: this.props.name
  }

  handleNormaEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateNorma(this.props.id, this.state.updatednormaname);
  }

  onAddNormaNameChange = event => this.setState({ "updatednormaname": event.target.value });

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
              <p>Edit norma name</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Enter name"
                value={this.state.updatednormaname}
                onChange={this.onAddNormaNameChange}
              />
              <p className="norma-id">id: { this.props.id }</p>
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >save</button>
            </div>
          : <div>
              <p className="norma-title">{ this.props.name }</p>
              <p className="norma-id">id: { this.props.id }</p>
            </div>
        }
      </div>
    )
  }
}
