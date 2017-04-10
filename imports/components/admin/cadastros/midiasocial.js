import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class AdminMidiaSocial extends Component {

  constructor(props) {
    super(props);
    this.state = { error: '' };
  }

  saveMedia(id, title, mediaUrl) {
    const socialmedia = {
      id,
      title,
      mediaUrl };

    Meteor.call('communications.saveMedia', socialmedia);

    this.refs.id.value = '';
    this.refs.title.value = '';
    this.refs.mediaUrl.value = '';
  }

  onCancelEdit() {
    this.refs.id.value = '';
    this.refs.title.value = '';
    this.refs.mediaUrl.value = '';

    this.setState({ update: false });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.update) {
      Meteor.call('communications.update', this.refs.id.value, this.refs.title.value, this.refs.mediaUrl.value);
      this.setState({ update: false });

      // Take a screenshot of the Url and saves into disk
      this.saveMedia(this.refs.id.value, this.refs.title.value, this.refs.mediaUrl.value);
    } else {
      // Important : This is important because the "insecure" package was removed
      // from project. That way Meteor methods are needed.
      Meteor.call('communications.insert', this.refs.title.value, this.refs.mediaUrl.value, (error, result) => {
        if (error) {
          this.setState({ error: 'Enter a valid URL' });
        } else {
          this.setState({ error: '' });
          // Take a screenshot of the Url and saves into disk
          this.saveMedia(result, this.refs.title.value, this.refs.mediaUrl.value);
        }
      });
    }
  }

  onMediaRemove(media) {
    Meteor.call('communications.remove', media);
  }

  onMediaEdit(media) {
    this.refs.id.value = media._id;
    this.refs.title.value = media.title;
    this.refs.mediaUrl.value = media.mediaUrl;

    this.setState({ update: true });
  }

  renderRows() {
    return this.props.communicationsList.map((socialmedia) => {
      const { title, mediaUrl } = socialmedia;

      return (
        <tr key={mediaUrl}>
          <td>{title}</td>
          <td><a href={mediaUrl}>{mediaUrl}</a></td>
          <td><button className="btn btn-edit" onClick={() => this.onMediaEdit(socialmedia)}>Editar</button></td>
          <td><button className="btn btn-danger" onClick={() => this.onMediaRemove(socialmedia)}>Remover</button></td>
        </tr>
      );
    });
  }

  renderTable() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Url da Mídia Social</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div id="div-main">
        <div className="row">
          <div className="div-content col-md-10">
            <div className="div-content-produtodetail">
              <h1 className="cadastro-titulo">Cadastro midia-social</h1>

              <table className="table table-hover">
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className="form-group">
                    <input type="hidden" ref="id" className="form-control" />
                    <label>Título</label>
                    <input ref="title" className="form-control" />
                    <label>Url da Mídia Social</label>
                    <input ref="mediaUrl" className="form-control" />
                  </div>
                  <div className="text-danger">{this.state.error}</div>
                  { this.state.update ? <button className="btn btn-primary">Atualizar</button> : <button className="btn btn-primary">Cadastrar</button>}
                  { this.state.update ? <button className="btn btn-primary" onClick={() => this.onCancelEdit()}>Cancelar</button> : ''}
                </form>
                <br />
                {this.renderTable()}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer((props) => {
  const communicationsHandle = GlobalSubsManager('communications.all');
  const communicationsList = Communications.find({ brokerId: Meteor.userId() }).fetch().reverse();

  return {
    communicationsList,
    loading: !communicationsHandle.ready(),
    user: Meteor.user(),
  };
}, AdminMidiaSocial);
