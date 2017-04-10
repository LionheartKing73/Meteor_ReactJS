import qs from 'qs';

/**
 * recebe um xhr e envia o arquivo considerando o clientArgs
 * @param xhr
 * @param file
 * @param clientArgs {Object} - {url, broker, social, query }
 * @param cb
 * @private
 */
const _sendXHR = (xhr, file, clientArgs, cb) => {
  let { url, broker = '', social = '', query = false } = clientArgs;
  const _cb = cb || function () {};
  
  if (typeof query === 'object') {
    query = qs.stringify(query);
  }
  
  //Open Request
  xhr.open('POST', `${url}${query ? '?' + query : ''}`);
  
  const formData = new FormData();
  //formData.append('file', file);
  formData.append('part', file);
  formData.append('broker', broker);
  formData.append('social', social);
  
  xhr.addEventListener('readystatechange', () => {
    let response = '';
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        try {
          response = JSON.parse(xhr.responseText);
        } catch (e) {
          response = xhr.responseText;
        }
        _cb('complete', response, xhr);
      } else {
        try {
          response = JSON.parse(xhr.responseText);
        } catch (e) {
          response = xhr.responseText;
        }
        _cb('error', response, xhr);
      }
    }
  });
  
  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      const percentage = Math.round((e.loaded * 100) / e.total);
      _cb('progress', `${percentage}%`);
      console.log(`%c${moment().format('HH\\h:mm:str')}: ${percentage}% ...`, 'font: 1em sans-serif; color: white; text-tranform: uppercase; background-color: #2ecc71;');
    }
  }, false);
  
  xhr.send(formData);
};


/**
 * Copia o arquivo, porém com outro nome, retorna novo arquivo no callback
 * @param file
 * @param cb
 * @private
 */
const _cloneAndRename = (file, cb) => {
  const reader = new FileReader();
  
  // ao treminar de ler
  reader.onloadend = () => {
    //const originalName = file.name.replace((/[^a-z0-9\.]/img, '_'));
    //const fileRenomeado = new File([reader.result], `${Meteor.userId()}_${Date.now()}_${originalName}`);
    //cb(fileRenomeado);
    cb(new File([reader.result], file.name))
  };
  
  // inicia leitura
  reader.readAsArrayBuffer(file);
};


/**
 * Renomeia arquivo e faz upload para API
 * @param clientArgs
 * @param cb
 * @returns {global.XMLHttpRequest|XMLHttpRequest}
 * @constructor
 */
const _acelUpload = function (clientArgs, cb) {
  const xhr = new XMLHttpRequest();
  _cloneAndRename(clientArgs.files, (newFile) => {
    _sendXHR(xhr, newFile, clientArgs, cb);
  });
  
  return xhr;
};
export default _acelUpload;
global.acelUpload = _acelUpload;
