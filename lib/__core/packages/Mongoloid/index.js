import MongolDB from "./lib/datastore";
import React from "react";
import {findDOMNode} from "react-dom";
import DatePicker from "react-bootstrap-date-picker";
import Select from "react-select";
import makeNimbleHandlers, {getInitialNimbleStateDataFromReduxBackup} from "./nimble";

function getStoreValueFromDataset(dataset) {
  if (!dataset) return;
  const dataArr = (typeof dataset === 'string') ? dataset.split(`.`) : dataset.autocompleteQuery.split(`.`);
  const state = global.STORE.getState();

  const valueFoundByQuery = g(state, ...dataArr);

  const valueSavedInReduxInputDatasets = (
    state.nimble.inputDatasets
      .find(datasetQuery => datasetQuery.query === dataset)
    || {}
  ).value;

  return (typeof valueSavedInReduxInputDatasets !== 'undefined')
    ? valueSavedInReduxInputDatasets
    : valueFoundByQuery;
}

function handleDataAutoCompleteOnMount(self, resetValues) {
  const elems = document.querySelectorAll(`input[data-autocomplete-query]`);

  Array.prototype.slice.call(elems).map(function (el) {

    if (self.state[el.name]) return;

    try {
      const dataset = el.dataset;
      const value = getStoreValueFromDataset(dataset);

      if (value) self._setMongoloidValue({[el.name]: value}, el);
    } catch (e) {
      console.warn(e.message);
    }
  });
}

/**
 *
 */
function updateAndCheck(self, name, value, target) {
  const ownSchemaValidation = self.schemas[name];
  const _prepareData = (ownSchemaValidation && ownSchemaValidation.prepareData) ? ownSchemaValidation.prepareData : self.prepareData || (data => data);

  self.setState({[name]: value});

  const arrayQueryMatch = name.match(/(\w*)\.\$\.(\w*)/);
  let updateQuery = {};

  if (arrayQueryMatch) {
    const [, $1, $2] = arrayQueryMatch;
    updateQuery = {$set: {[$1]: [{[$2]: value}]}};
  } else {
    updateQuery = {$set: {[name]: value}};
  }

  self.updateQuery = updateQuery;

  self.db.update({_id: self._mongoloidStateKey}, updateQuery);

  const prepareData = function (data) {
    const _data = data;
    if (target && target.type === 'date') throw new Error('Use Mongoloid.Components.Date instead.');
    if (target && target.type === 'number') _data[name] = Number(_data[name]);
    return _prepareData(_data);
  };

  (async() => {
    const data = await self.db.findOne({_id: self._mongoloidStateKey});
    delete data._id;

    global._lastMongoloidName = name;
    global._lastMongoloidData = prepareData(data);

		if (target) {
			const $target = $(target);
			const $parent = $target.parent('label');

			try {
				if (ownSchemaValidation) {
					ownSchemaValidation.schema.verify(prepareData(data, ev), {keys: ownSchemaValidation.keys});
				} else {
					self.schema.verify(prepareData(data), {keys: [name]});
				}

				$parent.removeClass('mongoloid__error');
				$parent.find('.mongol__error-message').remove();
			} catch (e) {
				$parent.addClass('mongoloid__error').find('.mongol__error-message').remove();
				$parent.append(`<label class="mongol__error-message">${e.reason}</label>`);
			}
		}
	})();
}


/**
 * Verifica Schema e seta valores no mongoloid
 * @param self
 * @param opType
 */
const createSetValues = (self, opType = 'insert') => function (obj, target) {
  const keys = Object.keys(obj);
  keys.map(key => {
    updateAndCheck(self, key, obj[key], target);
  });
};


/**
 * Verifica Schema e seta classes css
 * @param self
 * @param opType
 */
const getHandler = (self, opType = 'insert') => function (ev, inputName) {
  if (!ev) return console.warn(ev);

  if (typeof ev.persist === 'function') ev.persist();
  let target,
    name,
    value,
    type;

  if (ev.target) {
    target = ev.target;
    name = target.name;
    value = target.value;
  }

  if (name == 'profile.tipoPessoa') {
    if (value == 'pf') {
      self.setState({disabled: true});
    } else {
      self.setState({disabled: false});
    }
  }

  if (!name && inputName) {
    target = $(`input[name="${inputName}"]`).first();
    name = inputName;
    value = ev;
  }

  if (!target) return console.warn('Target not found: ', {ev, target, self});

  updateAndCheck(self, name, value, target);
};


/**
 * Mongoloid Storage
 * @param self
 * @returns {{getItem: getItem, setItem: setItem, removeItem: removeItem}}
 */
const getStorage = function getStorage(self) {
  const thisIsAReactComponent = typeof self.setState === 'function';

  if (!thisIsAReactComponent) {
    self.__state__ = self.__state__ || {};
  } else {
    self.state = self.state || {};
  }

  self.setState = self.setState || function (obj = {}) {
      self.__state__ = {...self.__state__, ...obj};
      return self.__state__;
    };

  const getItem = function (mongoloidStateKey, cb) {
    const state = self.__state__ || self.state || {};
    cb(null, state[mongoloidStateKey]);
  };

  const setItem = function (mongoloidStateKey, contents, cb) {

    const state = self.__state__ || self.state || {};
    self.setState({[mongoloidStateKey]: contents});
    cb(null, contents);
  };

  const removeItem = function (mongoloidStateKey, cb) {
    self.setState({[mongoloidStateKey]: ''});
    cb();
  };

  return {getItem, setItem, removeItem};
};


/**
 * Handle method result
 * @param err
 * @param res
 */
const defaultOnMethodResult = function handleSubmit(err, res) {
  if (err) {
    console.log('Form error:', err);
  }


  if (!this.hideMethodMessages) {
    if (res && res.successMessage) {
      swal(
        '',
        res.successMessage,
        'success',
      );
    } else {
      swal(
        'Concluído',
        '',
        'success',
      );
    }
  }

  if (err) {
    swal(
      '',
      err.reason,
      'error',
    );
  }

  if (err) return;

  const dom = findDOMNode(this);
  this.state = {};
  this.setState({methodLoading: false, methodError: err, methodResult: res});
  setTimeout(() => {
    if (this.opType == 'insert') $(dom).find('input').prop('checked', false).val(null);
  }, 1000);
};


/**
 * Mongoloid
 * @param options
 * @private
 */
const _Mongoloid = function Mongoloid(options = {}) {
  let {
    self,
    mongoloidStateKey = 'db',
    method,
    schema,
    schemas = {},
    opType = 'insert',
  } = options;

  mongoloidStateKey = `mongoloidKey_${mongoloidStateKey}`;

  self._mongoloidStateKey = mongoloidStateKey;
  self.schema = schema;
  self.schemas = schemas;

  const state = self.state || {};
  const nimbleStateBackup = getInitialNimbleStateDataFromReduxBackup(self);
  self.state = {...state, ...nimbleStateBackup};

  self.db = new MongolDB({
    autoload: true,
    filename: mongoloidStateKey,
    storage: getStorage(self),
  });

  self.db.insert({_id: mongoloidStateKey});

  self._handleChange = getHandler(self, opType);
  self._handleBlur = self._handleBlur || (() => {
    });
  self._setMongoloidValue = createSetValues(self, opType);
  makeNimbleHandlers(self);

  /**
   * HandleSubmit
   * @param ev
   * @returns {Promise.<void>}
   */
  const defaultHandleSubmit = async function _handleSubmit(ev) {
    self.setState({methodLoading: true});

    let data = await self.db.findOne({_id: self._mongoloidStateKey});
    delete data._id;
    const dbData = data;

    if (opType == 'update') data = (self.updateQuery || {}).$set || {};

    const prepareData = self.prepareData || self.prepareSubmitData || (data => data);
    data = prepareData(data);

    const selfOnMethodResult = self.onMethodResult && self.onMethodResult.bind(self);

    Meteor.call(method, data, dbData, self.state, selfOnMethodResult || defaultOnMethodResult.bind(self));
  };

  /**
   * HandleSubmit para Nimble
   */
  const nimbleHandleSubmit = async function nimbleHandleSubmit() {
    const {steps = [], currentStepID, next} = self.props;

    let data = await self.db.findOne({_id: self._mongoloidStateKey});
    delete data._id;

    const prepareData = self.prepareData || self.prepareSubmitData || (data => data);
    data = prepareData(data);

    const step = steps.find(s => s.id == currentStepID);

    const errors = await self._getValidationErrors({entireErrors: true});

    const nimbleDataToSaveOnServer = {};

    const props = self.props;
    for (let key in props) {
      if (typeof props[key] !== 'function' && props.propertyIsEnumerable(key)) {
        nimbleDataToSaveOnServer[key] = props[key];
      }
    }

    next({errors, step, value: data}, self.state);
  };


  if (opType == 'nimble') {
    self._handleSubmit = nimbleHandleSubmit;
  } else {
    self._handleSubmit = self._handleSubmit || defaultHandleSubmit;
  }


  if (!mongoloidStateKey && self.componentWillUnmount) {
    const _componentWillUnmount = self.componentWillUnmount;
    self.componentWillUnmount = function () {
      self.db == null;
      _componentWillUnmount.bind(self)(...arguments);
    };
  }

  /**
   * Reaproveitando dados existentes de acordo com a
   * propriedade $(`input[data-autocomplete-query]`) de cada elem.
   */

  const _componentDidMount = self.componentDidMount;
  self.componentDidMount = function () {
    _componentDidMount && _componentDidMount.bind(self)(...arguments);
    handleDataAutoCompleteOnMount(self)
  };


  /**
   * Validate Data
   */
  self._getValidationErrors = async function _getValidationErrors(options = {entireErrors: true}) {
    if (!schema) {
      console.warn('Schema não informado, validação ignorada');
      return [];
    }

    const data = await self.db.findOne({_id: self._mongoloidStateKey});
    delete data._id;

    const prepareData = self.prepareData || self.prepareSubmitData || (data => data);

    const ctx = schema.newContext();
    ctx.validate(prepareData(data));

    if (!options.entireErrors) return ctx.validationErrors().map(i => ctx.keyErrorMessage(i.name));
    if (options.entireErrors) return ctx.validationErrors().map(error => {
      return {
        error,
        message: ctx.keyErrorMessage(error.name)
      }
    });
  };
};


// TODO: separar em arquivos
_Mongoloid.Components = {};


_Mongoloid.Components.Date = class extends React.PureComponent {
  constructor(props) {
    super(props);

    this._clearValue = this._clearValue.bind(this);
  }

  componentDidMount() {
    let value = getStoreValueFromDataset(this.props['data-autocomplete-query']);
    value = (value) ? moment(value).toISOString() : '';
    this.props.self._setMongoloidValue({[this.props.name]: value});
  }

  _clearValue(message){
    const {self, name} = this.props;
    self.setState({[name]: ''});
    let updateQuery = updateQuery = {$set: {[name]: ''}};
    self.updateQuery = updateQuery;
    self.db.update({_id: self._mongoloidStateKey}, updateQuery);
    self.setState({error: message})
  }

  _saveReduxHtmlDataset(value) {
    if (!this.props['data-autocomplete-query']) return;
    global.STORE.dispatch({
      type: 'nimble/SAVE_INPUT_DATASETS',
      dataSetValues: [{
        query: this.props['data-autocomplete-query'],
        value
      }]
    })
  }

  render() {
    const {value, self, name, minYear, maxYear} = this.props;
    const dateString = (typeof value === 'object' && value.toISOString) ? value.toISOString() : value;
    return (
      <DatePicker
        showClearButton={false}
        previousButtonElement=""
        nextButtonElement=""
        dateFormat="DD/MM/YYYY"
        dayLabels={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']}
        monthLabels={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
        value={dateString}
        onChange={isoDate => {
          const date = moment(isoDate);
          const value = date.format();
          const year = moment().year() - date.year();

          if(maxYear && year > maxYear ) {
            this._clearValue("Data de Nascimento inválido.");
            return console.warn('max >', year);
          }

          if(minYear && year < minYear ) {
            this._clearValue("Data de Nascimento – É necessário que o cliente seja maior que 25 anos.");
            return console.warn('min <', year);
          }

          self.setState({error: null});

          this._saveReduxHtmlDataset(isoDate, name);
          if (typeof self.validateDate === 'function') self.validateDate(name, value);
          self._handleChange(value, name)
        }}
      />
    );
  }
};


_Mongoloid.Components.Select = class extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const value = getStoreValueFromDataset(this.props['data-autocomplete-query']);
    this.props.self._setMongoloidValue({[this.props.name]: value});
  }

  _saveReduxHtmlDataset(value) {
    if (!this.props['data-autocomplete-query']) return;
    global.STORE.dispatch({
      type: 'nimble/SAVE_INPUT_DATASETS',
      dataSetValues: [{
        query: this.props['data-autocomplete-query'],
        value
      }]
    })
  }

  render() {
    let {value, name, options, self, placeholder} = this.props;

    return (
      <Select
        {...this.props}
        name={name}
        value={value}
        options={options}
        onChange={({value}) => {
          this._saveReduxHtmlDataset(value, name);
          self._handleChange(value, name)
        }}
        // searchable={(typeof props.searchable !== 'undefined') ? props.searchable : false}
        placeholder={placeholder || 'Selecione...'}
      />
    );
  }
};


if (typeof Meteor !== 'undefined' && Meteor.isClient) {
  global.Mongoloid = _Mongoloid;
}


const _getDB = (key, self = window) => new MongolDB({
  autoload: true,
  filename: key,
  storage: getStorage(self),
});
global.getDB = _getDB;


export default _Mongoloid;
