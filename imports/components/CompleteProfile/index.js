import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PersonalInfo from './personalInfo.js';
import ProfessionalInfo from './professionalInfo.js';
import FamilyInfo from './familyInfo.js';
import PropertyInfo from './propertyInfo.js';
import VehicleInfo from './vehicleInfo.js';
import BankInfo from './bankInfo.js';
import MessagesList from '../Dashboard/Messages';

import '../../../client/select-bootstrap';
import './style.scss';

class CompleteProfile extends React.Component {

  constructor(props) {
    super(props);
  }

  footer() {

    return (
      <div className="nav-fixed">
        <button className="btn btn-acoes-icon"><img src='/icons/alarmemonitoramento/alarme_b.png'/></button>
        <button className="btn btn-acoes-icon"><img src='/icons/Carro-facil/car-frontal-view.png' /></button>
        <button className="btn btn-acoes-icon"><img src='/icons/conecta/conect_b.png' /></button>
        <p>3 Produtos em potencial</p>
        <button className="btn btn-acoes-icon"><img src="/icones/perfil/calendar.png" /></button>
        <button className="btn btn-acoes-icon"><img src="/icones/perfil/prince.png" /></button>
      </div>
    )
  }

  menu() {

    return (
      <div className="content-breadcrumb">
        <ol className="breadcrumb">
          <li><a href="dashboard.html">Dashboard</a></li>
          <li><a href="perfil-resumido.html">Perfil Resumido</a></li>
          <li className="active">Perfil Completo</li>
        </ol>
      </div>
    )
  }

  customerHeader() {

    if (this.props.loading) return <div className="div-content col-md-12 loading"></div>;

    return (

      <div className="div-content__headerPC col-md-12 div-after-breadcrumb">
        <div className="div-content__headerPC_photo">
          <img src="/img/leads/gui.jpg"/>
        </div>
        <div className="div-content__headerPC__infocontent">
          <div className="col-md-12">
            <div className="div-content__headerPC___infocontent__info">
              <span>Grupo:</span><img src="/icons/family-of-three.png" />
            </div>
            <div className="div-content__headerPC___infocontent__info div-content__headerPC___infocontent__info--origem">
              <span>Origem:</span><p>Indicação</p><div className="quem-indicou"><span>Maria Clara Ventura</span></div>
            </div>
            <div className="div-content__headerPC___infocontent__info">
              <span className="grau-rel">Grau de relacionamento:</span>
              <div className="btn-group class-hashtag" data-toggle="buttons">
                <input type="text" className="rating text-center" data-size="lg"/>
              </div>
            </div>

          </div>
          <div className="col-md-12">

            <div className="div-content__headerPC___infocontent__info">
              <span>Tratar renovação:</span>
              <div className="material-switch pull-right">
                <input id="someSwitchOptionSuccess" name="someSwitchOption001" type="checkbox"/>
                <label for="someSwitchOptionSuccess" className="label-success"></label>
              </div>
            </div>
            <div className="div-content__headerPC___infocontent__info">
              <img src="/icons/coin-stack.png" />
              <p>R$4.000,00 a R$5.300,00</p>
            </div>
          </div>
        </div>
      </div>

    )
  }

  tabs() {

    return (

      <div className="tabsacel-header col-md-12">
        <ul className="nav nav-tabs nav-tabsacel">
          <li className="active">
            <a data-toggle="tab" href="#pessoais"><img src="/icons/idade.png"/>
              <p>Pessoais</p>
            </a>
          </li>
          <li><a data-toggle="tab" href="#profissionais">
            <img src="/icons/profissao.png"/>
            <p>Profissionais</p>
          </a>
          </li>
          <li>
            <a data-toggle="tab" href="#familiares">
              <img src="/icons/estadocivil.png"/>
              <p>Familiares</p>
            </a>
          </li>
          <li>
            <a data-toggle="tab" href="#imoveis">
              <img src="/icons/home-variant.png"/>
              <p>Imóveis</p>
            </a>
          </li>
          <li>
            <a data-toggle="tab" href="#automoveis">
              <img src="/icons/modelo-veiculo.png"/>
              <p>Automóveis</p>
            </a>
          </li>
          <li><a data-toggle="tab" href="#bancarias">
            <img src="/icons/renda.png"/>
            <p>Bancárias</p>
          </a>
          </li>
        </ul>

      </div>

    )
  }

  render() {

    if (this.props.loading) return <div className="div-content col-md-12 loading"></div>;

    return (

      <div className="row">
        <div className="div-content col-md-10 container-perfilcompleto">
          {this.footer()}
          {this.menu()}
          {this.customerHeader()}
          {this.tabs()}
          <div className="tab-content col-md-12 tabsacel__content">
            <PersonalInfo/>
            <ProfessionalInfo/>
            <FamilyInfo/>
            <PropertyInfo/>
            <VehicleInfo/>
            <BankInfo/>
          </div>
        </div>
        <div className="div-mensagens col-md-2">
          <MessagesList/>
        </div>
      </div>

    );
  }
}

export default CompleteProfile;
