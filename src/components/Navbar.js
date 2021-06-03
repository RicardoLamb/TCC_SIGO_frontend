import Auth from '@aws-amplify/auth';
import React, { Component } from 'react'

export default class Navbar extends Component {

  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      this.props.history.push("/");
    }catch(error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="Sigo.jpg" width="112" height="28" alt="sigo logo" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Início
            </a>
            {this.props.auth.isAuthenticated && (
              <div className="navbar-start">
                <a href="/normas" className="navbar-item">
                  Normas
                </a>
                <a href="/consultorias" className="navbar-item">
                  Consultorias
                </a>
                <a href="/abnt" className="navbar-item">
                  ABNT
                </a>                
                <a href="/dashboard" className="navbar-item">
                  Gestão de Contratos
                </a>                  
              </div>
            )}            
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>
                  Seja Bem Vindo {this.props.auth.user.username}!
                </p>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                <div>
                  <a href="/register" className="button is-primary">
                    <strong>Registrar</strong>
                  </a>
                  <a href="/login" className="button is-light">
                    Acessar
                  </a>
                </div>
                )}
                {this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/" onClick={this.handleLogOut} className="button is-light">
                      Sair
                    </a>
                    <a href="/changepassword" className="button is-primary">
                      Alterar a senha
                    </a>                    
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
