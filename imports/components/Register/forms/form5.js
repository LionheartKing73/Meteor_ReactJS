import React from 'react';
import { Link, DefaultRoute } from 'react-router';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

const defaultLabel = 'Selecionar arquivo';

// File input component
class FileInputDropzone extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      label: defaultLabel,
      socialBoxInformation: this.props.input || false,
      output: this.props.output || false,
      loadingStatus: false,
      error: false
    };
    
    //Mongoloid Blessing
    const mongoloidOptions = {
      self: this,
      mongoloidStateKey: 'form5',
      method: 'users.update',
      schema: Schemas.Users,
      opType: 'update',
    };
    Mongoloid(mongoloidOptions);
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.output || nextProps.input) {
      this.setState({
        output: nextProps.output,
        socialBoxInformation: nextProps.input
      });
    }
  }
  
  onDrop(acceptedFiles, rejectedFiles) {
    const { socialBoxInformation } = this.state;
    const brokerId = (((Meteor.user() || {}).services || {}).facebook || {}).id;
    
    if(rejectedFiles.length) {
      return swal('', `Arquivo com formatação incorreta. (${(rejectedFiles || []).map(f => f.name).join(", ")})`, 'error');
    }
    
    // Check for the file receveid in the client side
    if (acceptedFiles[0]) {
      // File receveid in client side is ok
      console.log(`Filename to upload: ${acceptedFiles[0].name}`);
      
      const data = {
        broker: brokerId,
        social: socialBoxInformation.socialCode,
        files: acceptedFiles[0],
        url: 'http://dev-tomcat.sciensa.click:8081/brokersmanager/service/brokerscontacts/saveloadcontacts'
      };
      
      this.setState({
        loadingStatus: false,
        label: data.files.name,
        error: false
      });
      
      setTimeout(() => {
        acelUpload(data, (status, response) => {
          if (status == 'complete') {
            this._onSuccess(data);
          }
          else if (status == 'error') {
            this._onError(response);
          }
          else {
            this.setState({
              loadingStatus: response
            })
          }
        });
      }, 200);
    }
  }
  
  _onError(error) {
    sweetAlert('Erro de sistema', `Descrição do erro: ${error}`, 'error');
    this.setState({
      label: defaultLabel,
      loadingStatus: false,
      error
    })
  }
  
  _onSuccess(data) {
    const { socialBoxInformation } = this.state;
    
    // Flush with name of the file in the label and set file id of upload
    socialBoxInformation.uploadIsDone = false; //Secure reset input
    
    this.setState({
      socialBoxInformation,
      loadingStatus: 'ready'
    });
    
    // Call callback to set file id in external state
    return this.state.output(socialBoxInformation.socialCode, data.files.name);
  }
  
  render() {
    const { socialBoxInformation, label, error, loadingStatus } = this.state;
    
    //Currently Loading File
    let isLoading = (loadingStatus && loadingStatus != 'ready');
    
    //File's ready
    let isReady = (loadingStatus == 'ready');
    
    // Check if upload is done or not
    let isUploadDone = (socialBoxInformation.uploadIsDone == true);
    
    // Check if is Lock or unlock box
    let isDisabled = !socialBoxInformation.inputEnable;
    
    // Dynamic social button class name
    let socialClass = `btn-${socialBoxInformation.nameInCSS}`;
    
    const btnClass = classNames({
      'btn btn-upload': true,
      [socialClass]: true,
      'btn-file': true,
      'upload-secundario': true,
      'disabled': isDisabled,
      'hasError': !!(error),
      'completo': isUploadDone
    });
    
    // Return the html component
    return (
      <div className="col-md-4">
        <div className="upload-line">
          <Dropzone
            onDrop={this.onDrop.bind(this)}
            style={{ borderStyle: '' }}
            multiple={false}
            accept={(socialBoxInformation.accept || '')}
            disableClick={isDisabled}
          >
          <span className={btnClass}>
            <div className="upload-progress" style={{width: loadingStatus}}/>
            {isLoading && <i className="fa fa-circle-o-notch fa-spin" />}
            {isReady && <i className="fa fa-check" />}
            {!isUploadDone &&
            <span className="upload-line-name"
                  style={{ display: 'inline-block', marginLeft: '5px' }}>
							{label}
						</span>
            }
            <div className="icon-btn">
              <i className={`fa fa-${socialBoxInformation.nameInCSS}`} aria-hidden="true" />
            </div>
          </span>
          </Dropzone>
        </div>
      </div>
    );
  }
}

// Form5 component
class Form5 extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      previousStep: '/register/4',
      nextStep: GLOBAL.DASHBOARD_ROUTE,
      uploadStatus: '',
      uploads: [
        {
          name: 'facebook',
          socialName: 'facebook',
          socialCode: 'face',
          inputEnable: true,
          nameInCSS: 'facebook',
          uploadIsDone: false,
          uploadFile: false,
          accept: [
            'text/html'
          ].join(',')
        },
        {
          name: 'excel',
          socialName: 'file-excel-o',
          socialCode: 'load',
          inputEnable: true,
          nameInCSS: 'file-excel-o',
          uploadFile: false,
          uploadIsDone: false,
          accept: [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          ].join(',')
        },
        {
          name: 'linkedin',
          socialName: 'linkedin',
          socialCode: 'link',
          inputEnable: true,
          nameInCSS: 'linkedin',
          uploadFile: false,
          uploadIsDone: false,
          accept: [
            '.csv'
          ].join(',')
        },
        {
          name: 'googleplus',
          socialName: 'google-plus',
          socialCode: 'goog',
          inputEnable: true,
          nameInCSS: 'google-plus',
          uploadFile: false,
          uploadIsDone: false,
          accept: [
            '.vcf',
          ].join(',')
        },
        {
          name: 'skype',
          socialName: 'skype',
          socialCode: 'skyp',
          inputEnable: true,
          nameInCSS: 'skype',
          uploadFile: false,
          uploadIsDone: false,
          accept: [
            '.csv'
          ].join(',')
        },
        {
          name: 'cloud',
          socialName: 'cloud',
          socialCode: 'clou',
          inputEnable: true,
          nameInCSS: 'cloud',
          uploadFile: false,
          uploadIsDone: false,
          accept: [
            '.vcf'
          ].join(',')
        }
      ],
    };
    
    // Bind the functions
    this._callbackInputUploadBox = this._callbackInputUploadBox.bind(this);
    this._renderInputUploadBox = this._renderInputUploadBox.bind(this);
    this._renderBasesToUploadButtons = this._renderBasesToUploadButtons.bind(this);
  }
  
  componentDidMount() {
    const { user } = this.props;
    const facebookProfile = (((user || {}).services || {}).facebook || {});
    const brokerId = facebookProfile.id;
    
    if(brokerId) {
      this.setState({loading: true});
      
      Meteor.call('uploads.callBrokersManager', 'createbroker', ( err, res ) => {
        if (err) {
          swal('Erro de sincronização.', (err || ''), 'error');
        }
        return this.setState( { loading: false } );
      })
    }
  }
  
  _callbackInputUploadBox(socialCode, file) {
    const uploadInfo = this.state.uploads.find(upload => (upload.socialCode == socialCode));
    if (uploadInfo != undefined) {
      uploadInfo.uploadFile = file;
      this.setState({
        ...this.state.uploads,
        uploadInfo,
        uploadStatus: 'ready',
      });
    }
  }
  
  _renderInputUploadBox(upload) {
    if (upload != undefined) {
      return (
        <FileInputDropzone
          key={upload.name}
          input={upload}
          output={(socialCode, file) => (this._callbackInputUploadBox(socialCode, file))}
        />
      );
    }
  }
  
  _onClickBasesToUploadButtons(event) {
    event.preventDefault();
    const brokerId = (this.props.facebookProfile).id;
    const userId = (this.props.user || {})._id;
    
    this.setState({ uploadStatus: 'merging' });
    //socialInformations.uploadIsDone = true;
    
    Meteor.call('uploads.callBrokersManager', 'savecontacts', (err, res) => {
      console.log('uploads.callBrokersManager.savecontacts', brokerId, err, res);
      
      if(err) {
        sweetAlert('Erro de sistema', (err.reason || `Erro ao consolidar dados.`), 'error');
        return this.setState({
          uploadStatus: 'ready',
        });
      }
      
      if(res) {
        Meteor.call('uploads.callBrokersManager', 'contacts', (errContacts, resContacts) => {
          console.log('uploads.callBrokersManager.contacts', brokerId, errContacts, resContacts);
          
          if(resContacts && resContacts.data) {
            this.setState({ uploadStatus: 'saving' });
            Meteor.call('uploads.customerInsert', resContacts.data, (errInsert, resInsert) => {
              console.log('upload.response.insert', errInsert, resInsert);
              
              if(errInsert) {
                sweetAlert( 'Erro de sistema', `Descrição do erro: ${errInsert}`, 'error' );
                return this.setState({ uploadStatus: 'ready' });
              }
              
              if(resInsert != undefined) {
                Meteor.call('flagUserRegistrationAsComplete', userId);
                swal('', `Upload Concluído (${resInsert || 'Nenhum'} contato(s) inserido(s))`, 'success');
                this.setState({
                  uploadStatus: 'done',
                });
              }
            })
          }
        });
      }
    });
  }
  
  _renderBasesToUploadButtons() {
    const { uploadStatus } = this.state;
    switch (uploadStatus) {
      case ('ready'):
        return (
          <button ref="btnUparBases" type="button" className="btn btn-uparbases"
                  onClick={this._onClickBasesToUploadButtons.bind(this)}>
            <i className="fa fa-upload" /> Upar bases
          </button>
        );
        break;
      case ('loading'):
        return (
          <button ref="btnCarregandoBases" type="button" disabled className="btn disabled btn-carregando">
            <i className="fa fa-circle-o-notch fa-spin" /> Carregando...
          </button>
        );
        break;
      case ('merging'):
        return (
          <button ref="btnCarregandoBases" type="button" disabled className="btn disabled btn-carregando">
            <i className="fa fa-circle-o-notch fa-spin" /> Consolidando bases...
          </button>
        );
        break;
      case ('saving'):
        return (
          <button ref="btnCarregandoBases" type="button" disabled className="btn disabled btn-carregando">
            <i className="fa fa-circle-o-notch fa-spin" /> Salvando contatos...
          </button>
        );
        break;
      case ('done'):
        return (
          <button ref="btnCarregandoBases" type="button" disabled className="btn disabled btn-success">
            Upload concluído!
          </button>
        );
        break;
      default:
        return (
          <button ref="btnCarregandoBases" type="button" disabled className="hidden disabled btn btn-carregando">
            <i className="fa fa-upload" aria-hidden="true" /> Waiting
          </button>
        );
    }
  }
  
  render() {
    const { uploads, uploadStatus, previousStep, nextStep } = this.state;
    const { facebookProfile, params, user } = this.props;
    const userPic = `https://graph.facebook.com/${facebookProfile.id}/picture?type=large`;
    const totalBaseUploaded = (uploads.filter(u => u.uploadFile) || []).length;
    const isLoading = (uploadStatus == 'merging' || uploadStatus == 'saving');
    
    return (
      <div className="step5 div-form-cadastro">
        <div className="container-fluid">
          <div className="header-form col-md-12">
            <div className="photo-cadastro" style={{ background: `url(${userPic})` }} />
            <div>
              <span>Etapa {params.form}/5</span>
              <h1 className="cadastro-titulo">Upload de bases</h1>
            </div>
          </div>
          <div className="content-form col-md-12">
            <div className="form-group">
              <div className="contenedor-formulario">
                <div className="formulario">
                  <div className="row">
                    <div className="div-upload">
                      <div className={`col-md-12 ${isLoading && 'loading'}`}>
                        {uploads.map(u => this._renderInputUploadBox(u))}
                        <div className="col-md-12">
                          <div className="upload-info">
                            {totalBaseUploaded > 0 && <p>{totalBaseUploaded} base(s) a ser carregada(s)</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 div-infos-upload">
                      <p className={`info-upload ${isLoading && 'hidden'}`}>
                        Selecione os arquivos para upload
                      </p>
                      <div className="col-md-12 div-infos-upload">
                        {this._renderBasesToUploadButtons()}
                      </div>
                    </div>
                  </div>
                  <div className="row footer-form">
                    <div className="col-md-12 text-right">
                      <Link id="previousStep" className="pull-left" to={previousStep}>
                        <button type="button" className="pull-left btn-md-lg">
                          Voltar
                        </button>
                      </Link>
                      {user.registrationIsComplete &&
                      <Link id="nextStep" className="pull-right" to={nextStep}>
                        <button id="btnHandleSubmit" type="button" className="pull-right btn-md-lg finalizar-dash principal">
                          Finalizar
                        </button>
                      </Link>
                      }
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

// Form5 Container
export default GLOBAL.createContainer((props) => {
  // Subscribe the collections
  const subUser = GlobalSubsManager('user.selfProfile');
  const uploads = GlobalSubsManager('Uploads');
  
  // Return the container
  return {
    ...props,
    facebookProfile: (((props.user || {}).services || {}).facebook) || {},
    loading: !subUser.ready(),
    uploads,
  };
}, Form5);



// onDrop(acceptedFiles, rejectedFiles) {
// 	const { socialBoxInformation } = this.state;
//
// 	if(rejectedFiles.length) {
// 	return swal('', `Arquivo com formatação incorreta. (${(rejectedFiles || []).map(f => f.name).join(", ")})`, 'error');
// }
//
//   // Check for the file receveid in the client side
//   if (acceptedFiles.length) {
//     // File receveid in client side is ok
//     console.log(`Filename to upload: ${acceptedFiles[0].name}`);
//
//     // Create file to upload
//     const uploadFile = new FS.File(acceptedFiles[0]);
//     uploadFile.creatorId = '1366189566747952';
//
//     // Upload the file to server
//     Uploads.insert(uploadFile, (err, fileObj) => {
//       // check for the response of upload status
//       if (err) {
// 			// Erro in file upload
// 			console.log('Error in upload: ', err);
//       } else {
//         // Flush with name of the file in the label and set file id of upload
// 			socialBoxInformation.uploadIsDone = false; //Secure reset input
//         this.setState({
// 				socialBoxInformation,
//           label: fileObj.name(),
//           fileId: fileObj._id
//         });
//
//         // Call callback to set file id in external state
// 			return this.state.output(this.state.socialBoxInformation.socialCode, fileObj._id);
//       }
//     });
//   }
// }

// _onClickBasesToUploadButtons(event) {
// 	const totalBaseToUpload = (this.state.uploads.filter(u => !!u.uploadFileId) || []).length;
// 	const totalBaseUploaded = (this.state.uploads.filter(u => u.uploadIsDone) || []).length;
//
// 	this.setState({
// 		uploadStatus: 'loading',
// 	});
//
// 	for (let indexPosition = 0; indexPosition < this.state.uploads.length; indexPosition++) {
// 		const brokerId = (this.props.facebookProfile).id;
// 		const brokerName = (this.props.facebookProfile).name;
// 		const socialInformations = this.state.uploads[indexPosition];
//
// 		if (socialInformations.uploadFileId != null) {
// 			const socialCode = socialInformations.socialCode;
// 			const uploadId = socialInformations.uploadFileId;
//
// 			Meteor.call('brokerscontacts.services.importCustomers', brokerId, brokerName, socialCode, uploadId,
// 				(error, result) => {
// 					if (error) {
// 						sweetAlert('Erro de sistema', `Descrição do erro: ${error}`, 'error');
// 						socialInformations.hasError = true;
// 						return this.setState({uploadStatus: 'ready'});
// 					} else if (result.status == false) {
// 						sweetAlert('Erro de sistema', `Erro apresentando em: ${result.errorFunction}`, 'error');
// 						socialInformations.hasError = true;
// 						return this.setState({uploadStatus: 'ready'});
// 					} else {
// 						//User registrationIsComplete flag
// 						if(totalBaseToUpload > 0 && (totalBaseUploaded + 1) >= totalBaseToUpload) {
// 							const userId = Meteor.userId();
// 							Meteor.call('flagUserRegistrationAsComplete', userId, (err, res) => {
// 								swal('', `Upload Concluído`, 'success');
// 							});
// 						}
//
// 						socialInformations.hasError = false;
// 						socialInformations.uploadIsDone = true;
// 						this.setState({
// 							...this.state.uploads,
// 							socialInformations,
// 							uploadStatus: 'ready',
// 						});
// 					}
// 				}
// 			);
// 		}
// 	}
// }


// _renderBrokersManagerAPITests() {
// 	if (FORM5_TEST_AREA_BROKERS_API == true) {
// 		const _brokerId = '1366189566747952';
// 		const _brokerName = 'Mohamad Jameh';
// 		let _social;
// 		let _fileId;
// 		return (
// 			<div className="Ramires-Test">
// 				<div className="Ramires-Test-Import">
// 					<FileInputDropzone context={function (socialCode, fileId) {
// 						_social = socialCode;
// 						_fileId = fileId;
// 					}
// 					}/>
// 					<button id="btnHandleSubmit" type="button" className="btn-md-lg finalizar-dash principal"
// 									onClick={() => Meteor.call('brokerscontacts.services.importCustomers', _brokerId, _brokerName, _social, _fileId)}>
// 						Upload the file and generate Customers Collection
// 					</button>
// 				</div>
// 				<div><p /></div>
// 				<div><p /></div>
// 				<div className="Ramires-Test-Driver">
// 					<button id="btnHandleSubmit" type="button" className="btn-md-lg finalizar-dash principal"
// 									onClick={() => Meteor.call('brokerscontacts.connector.brokers')}>
// 						brokerscontacts.brokers
// 					</button>
// 					<button id="btnHandleSubmit" type="button" className="btn-md-lg finalizar-dash principal"
// 									onClick={() => Meteor.call('brokerscontacts.connector.createbroker', _brokerId, _brokerName)}>
// 						brokerscontacts.createbroker
// 					</button>
// 					<button id="btnHandleSubmit" type="button" className="btn-md-lg finalizar-dash principal"
// 									onClick={() => Meteor.call('brokerscontacts.connector.contacts', _brokerId)}>
// 						brokerscontacts.contacts
// 					</button>
// 					<button id="btnHandleSubmit" type="button" className="btn-md-lg finalizar-dash principal"
// 									onClick={() => Meteor.call('brokerscontacts.connector.loadcontacts', _brokerId)}>
// 						brokerscontacts.loadcontacts
// 					</button>
// 					<button id="btnHandleSubmit" type="button" className="btn-md-lg finalizar-dash principal"
// 									onClick={() => Meteor.call('brokerscontacts.connector.savecontacts', _brokerId)}>
// 						brokerscontacts.savecontacts
// 					</button>
// 				</div>
// 				<div><p /></div>
// 				<div><p /></div>
// 			</div>
// 		);
// 	}
// }
