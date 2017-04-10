import React from 'react';
import { Link, DefaultRoute } from 'react-router';
import Dropzone from 'react-dropzone';

export default class FileInputDropzone extends React.Component {

  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.onOpenClick = this.onOpenClick.bind(this);
  }

  onDrop(acceptedFiles) {
    const uploadFile = new FS.File(acceptedFiles[0]);
    const internalFileType = 'fbHTML';
    const localId = `${Meteor.userId()}_${Date.now()}_${Random.id()}_${internalFileType}`;
    const userId = Meteor.userId();

    this.setState({
      localId,
      userId,
      internalFileType
    });

    uploadFile.aceleradoraFileData = {
      userId,
      internalFileType,
      localId
    };

    FacebookHTMLUploads.insert(uploadFile, (err, fileObj) => {
      console.log({ fileObj });
      err && alert(JSON.stringify(err))
    });
  }

  onOpenClick(event) {
    event.preventDefault();
    this.refs.dropzone.open();
  }

  render() {
    return (
      <div className="col-md-4">
        <div className="upload-line">
          <Dropzone ref="dropzone" onDrop={this.onDrop}/>

          <span className='btn btn-upload btn-file'>
            <span className="upload-line-name">
              Upload
            </span>

             <input type="file" onClick={this.onOpenClick}/>
          </span>
        </div>
      </div>
    );
  }
}



