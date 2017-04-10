import React, { Component } from 'react';
import { Link } from 'react-router';
import './admin.scss';

class TelaAdmin extends Component {
  render() {
    return (
      <div className="admin row">
        {/*---------Sidebar-----------*/}
        <div className="admin-sidebar">
          <div className="admin-sidebar-conteudo">
            <div className="admin-foto"
                 style={{ background: `url(https://cdn.pastemagazine.com/www/articles/ted%20lead.jpg)` }}>
              <Link to="/admin/corretor"> </Link>
            </div>
            <ul>
              <li><Link to="/admin/corretor"><img
                src="/icons/corretor.png"/></Link></li>
              <li><Link to="/admin/produto"><img
                src="/icons/produto.png"/></Link>
              </li>
              <li><Link to="/admin/midia-social"><img
                src="/icons/midiasocial.png"/></Link></li>
              <li><Link to="/admin/corretornew">EdiTable</Link></li>
            </ul>
          </div>
        </div>
        {/*---------Conteúdo-----------*/}
        <div className="admin-conteudo">
          <div className="admin-header">
            <h1>Dashboard Administrativo</h1>
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default TelaAdmin;
