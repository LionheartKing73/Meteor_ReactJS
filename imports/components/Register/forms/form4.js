import React, { Component } from 'react';
import { Link, DefaultRoute } from 'react-router';
const { uniqBy } = require('lodash');
import Select from 'react-select';
import className from 'classnames';

const tags = [
  { text: 'Livro', name: 'Livro' },
  { text: 'Cinema', name: 'Cinema' },
  { text: 'Teatro', name: 'Teatro' },
  { text: 'Show', name: 'Show' },
  { text: 'Esportes', name: 'Esportes' },
  { text: 'SPA/Estética', name: 'SPA/Estética' },
  { text: 'Música', name: 'Música' },
  { text: 'Viagem', name: 'Viagem' },
  { text: 'Colecionador', name: 'Colecionador' },
  { text: 'Empreendorismo', name: 'Empreendorismo' },
  { text: 'Networking', name: 'Networking' },
  { text: 'Vendas', name: 'Vendas' },
  { text: 'Investimento', name: 'Investimento' },
  { text: 'Educação', name: 'Educação' },
  { text: 'Comunicação', name: 'Comunicação' },
  { text: 'Inovação', name: 'Inovação' },
  { text: 'Sustentabilidade', name: 'Sustentabilidade' },
  { text: 'Planejamento', name: 'Planejamento' },
  //{ "text": "Economia", "name": "Economia"},
  //{ "text": "Marketing Digital", "name": "Marketing Digital"},
  //{ "text": "Saúde", "name": "Saúde"},
  //{ "text": "Contabilidade", "name": "Contabilidade"}
];

const timesSelectArray = [
  { label: 'América-MG', value: 'América-MG' },
  { label: 'Atlético-GO', value: 'Atlético-GO' },
  { label: 'Atlético-MG', value: 'Atlético-MG' },
  { label: 'Atlético-PR', value: 'Atlético-PR' },
  { label: 'Avaí', value: 'Avaí' },
  { label: 'Bahia', value: 'Bahia' },
  { label: 'Botafogo', value: 'Botafogo' },
  { label: 'Chapecoense', value: 'Chapecoense' },
  { label: 'Corinthians', value: 'Corinthians' },
  { label: 'Coritiba', value: 'Coritiba' },
  { label: 'Cruzeiro', value: 'Cruzeiro' },
  { label: 'Figueirense', value: 'Figueirense' },
  { label: 'Flamengo', value: 'Flamengo' },
  { label: 'Fluminense', value: 'Fluminense' },
  { label: 'Grêmio', value: 'Grêmio' },
  { label: 'Internacional', value: 'Internacional' },
  { label: 'Palmeiras', value: 'Palmeiras' },
  { label: 'Ponte Preta', value: 'Ponte Preta' },
  { label: 'Santa Cruz', value: 'Santa Cruz' },
  { label: 'Santos', value: 'Santos' },
  { label: 'São Paulo', value: 'São Paulo' },
  { label: 'Sport', value: 'Sport' },
  { label: 'Vasco', value: 'Vasco' },
  { label: 'Vitória', value: 'Vitória' },
];

class Form4 extends Component {
  
  constructor(props) {
    console.log('construiu!');
    super(props);
    //this._renderLabels = this._renderLabels.bind(this);
    this.state = {
      initialTags: tags,
      activeTags: [],
      step: 4,
      tagNoClick: '',
      primeiraVez: true,
    };
    this.hideMethodMessages = true;
    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'form4',
      method: 'users.update',
      schema: Schemas.Users,
      opType: 'update',
    };
    Mongoloid(mongoloidOptions);
    //this._toggleActiveTag = this._toggleActiveTag.bind(this);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.loading === false && !this.setadoTags) {
      this.setadoTags = true;
      if (this.props.tags.length > 4) {
        this.setState({ tagNoClick: ' tagNoClick' });
      } else {
        this.setState({ tagNoClick: '' });
      }
      this.setState({ activeTags: this.props.tags });
    }
    if (nextState.methodResult) {
      this.props.router.replace('/register/5');
      return false;
    }
    return true;
  }
  
  prepareData(data) {
    return data;
  }
  
  //componentDidMount() {
  //  if (this.state.primeiraVez == true) {
  //    console.log('ja tem tags no profile, vai vir juntu ');
  //    this.state['activeTags'] = Meteor.user().profile.preferencias.tags;
  //    if (this.state['activeTags'].length > 4) {
  //      this.state['tagNoClick'] = ' tagNoClick'
  //    }
  //    this.state['primeiraVez'] = false;
  //    console.log(this.state.activeTags);
  //  }
  //}
  
  //_getField(field) {
  //  const state = this.state;
  //  const profile = this.props.user.profile || {};
  //  const lastField = _.last(field.split('.'));
  //  return (typeof state[field] !== 'undefined') ? state[field] : profile[lastField] || state[lastField];
  //}
  
  _getField(field) {
    const { preferencias = {} } = (this.props.user.profile || {});
    const { time = '', tags = [] } = preferencias;
    const state = this.state;
    if (field == 'time') {
      if (typeof state.time !== 'undefined') {
        return state.time;
      }
      state.time = time;
      return state.time;
    }
    if (field == 'tags') return state.initialTags;
    if (field == 'activeTags') return uniqBy(tags.concat(state.activeTags || []).filter(t => t.active), 'name');
    //if (field == 'time') return (typeof state['time'] !== 'undefined') ? state['time'] : time;
  }
  
  _handleTime(time) {
    this.setState({ time });
  }
  
  /**
   *   Authenticates into Google Social Network in order to get Token for importing contacts
   */
  _handleGoogle() {
    Meteor.loginWithGoogle({
      requestPermissions: [
        'profile',
        'email',
        'https://www.googleapis.com/auth/yt-analytics.readonly',
        'https://www.googleapis.com/auth/youtube'
      ],
    });
  }
  
  /**
   * Authenticates into Linkedin Social Network in order to get Token for importing contacts
   */
  _handleLinkedin() {
    Meteor.loginWithLinkedin({ loginStyle: 'popup' });
  }
  
  _toggleActiveTag(ev, tagToToggle) {
    ev.preventDefault();
    ev.stopPropagation();
    const activeTags = this._getField('activeTags').concat([{
      ...tagToToggle,
      active: !tagToToggle.active
    }]);
    if (this.state.activeTags.find(e => e.name == tagToToggle.name)) {
      const activeTagIndex = this._getField('activeTags').indexOf(this.state.activeTags.find(e => e.name == tagToToggle.name));
      this.state.tagNoClick = '';
      this.setState(this.state.activeTags.splice(activeTagIndex, 1));
    } else {
      console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      console.log(`ativou uma tag no state = ${tagToToggle.name}`);
      this.setState({ activeTags });
      if (this.state.activeTags.length > 3) return this.setState({ tagNoClick: ' tagNoClick' });
    }
  }
  
  _renderLabels() {
    const activeTags = this.state.activeTags;
    if (this.state.primeiraVez == true) {
      if (this.props.user.profile.preferencias == 'undefined') {
        //this.state['activeTags'] = this.props.user.profile.preferencias.tags;
        //if (this.state['activeTags'].length > 4) {
        //  this.state['tagNoClick'] = ' tagNoClick'
        //}
        //this.state['primeiraVez'] = false;
        console.log('ainda nao existe tags');
      }
    }
    //if (this.props.user.profile.preferencias.tags == 'undefined') {
    //  console.log('profile sem tags de preferencia');
    //} else {
    //  if (this.state.primeiraVez == true) {
    //    console.log('ja tem tags no profile, vai vir juntu ');
    //    this.state['activeTags'] = this.props.user.profile.preferencias.tags;
    //    if (this.state['activeTags'].length > 4) {
    //      this.state['tagNoClick'] = ' tagNoClick'
    //    }
    //    this.state['primeiraVez'] = false;
    //    console.log(this.state.activeTags);
    //  }
    //}
    return (
      this._getField('tags').map((tag, key) => {
        const _classeAtivo = className('btn ', {
          active: true,
        });
        const _classeNaoAtivo = className('btn ', {
          active: false,
          tagNoClick: this.state.tagNoClick,
        });
        let _classeLabel = _classeAtivo;
        if (this.state.activeTags.find(a => a.name == tag.name)) {
          console.log(`>>>>>gerado uma tag ativa = ${tag.name}`);
        } else {
          _classeLabel = _classeNaoAtivo;
          console.log(`tag nao ativa = ${tag.name}`);
        }
        return (
          <label className={_classeLabel} key={key} onClick={ev => this._toggleActiveTag(ev, tag)}>
            {tag.text}
          </label>
        );
      })
    );
  }
  
  render() {
    if (this.props.loading) return <h2>Carregando...</h2>;
    const userPic = `https://graph.facebook.com/${(this.props.facebookProfile).id}/picture?type=large`;
    return (
      <div className="step4 div-form-cadastro">
        <div className="container-fluid">
          <div className="header-form col-md-12">
            <div className="photo-cadastro" style={{ background: `url(${userPic})` }}/>
            <div>
              <span>Etapa 4/5</span>
              <h1 className="cadastro-titulo">Preferências</h1>
            </div>
          </div>
          <div className="content-form col-md-12">
            <div className="form-group">
              <div className="contenedor-formulario">
                <div className="formulario">
                  <p></p>
                  <p></p>
                  <div className="row">
                    <div className="col-md-12">
                      <p className="title-p">Escolha até 5 preferências</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="btn-group class-hashtag class-preferencias" data-toggle="buttons">
                        {this._renderLabels()}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-group">
                        <label className="label cadastro-label" htmlFor="time">Time do Coração:</label>
                        <Select name={'time'}
                                value={this._getField('time')}
                                options={timesSelectArray}
                                onChange={({ value }) => this._handleTime(value)}
                                placeholder="Selecione"/>
                      </div>
                    </div>
                  </div>
                  <div className="row space-md">
                    <div className="col-md-12">
                      <p className="title-p">Conecte sua rede social na plataforma.</p>
                    </div>
                  </div>
                  <div className="row space-md">
                    <div className="col-md-2">
                      <button type="button"
                              className="btn-md"
                              onClick={this._handleLinkedin}>
                        Linkedin
                      </button>
                    </div>
                    <div className="col-md-2 text-left">
                      <button type="button"
                              className="btn-md"
                              onClick={this._handleGoogle}>
                        Google+
                      </button>
                    </div>
                  </div>
                  <div className="row footer-form">
                    <div className="col-md-12 text-right">
                      <Link id="footer" className="pull-left"
                            to="/register/3">
                        <button type="button" className="pull-left btn-md-lg">
                          Voltar
                        </button>
                      </Link>
                      <button type="button"
                              className="pull-right btn-md-lg principal"
                              onClick={ev => this._handleSubmit(ev)}>
                        Continuar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GLOBAL.createContainer(() => {
  const subUser = GlobalSubsManager('user.selfProfile');
  const user = Meteor.user();
  const tags = user && user.profile && user.profile.preferencias && user.profile.preferencias.tags;
  return {
    user: user || {},
    tags: tags || [],
    facebookProfile: (((Meteor.user() || {}).services || {}).facebook) || {},
    loading: !subUser.ready(),
  };
}, Form4);
