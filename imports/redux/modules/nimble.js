import uniqBy from 'lodash.uniqby';
import merge from 'lodash.merge';

global.__merge = merge;

const INIT = 'nimble/INIT';
const NEXT = 'nimble/NEXT';
const GOTO_FORM = 'nimble/GOTO_FORM';
const GOTO_COMPONENT = 'nimble/GOTO_COMPONENT';
const BACK = 'nimble/BACK';
const GOOD = 'nimble/GOOD';
const BAD = 'nimble/BAD';
const SUBMIT = 'nimble/SUBMIT';
const SET_VALUE = 'nimble/SET_VALUE';
const SET_ARGS = 'nimble/SET_ARGS';
const REMOVE_ARGS_FROM_CALLER = 'nimble/REMOVE_ARGS_FROM_CALLER';
const SUBMIT_VOTE = 'nimble/SUBMIT_VOTE';
const REPLACE = 'nimble/REPLACE';
const SET_LOCAL_COMPONENT_STATE = 'nimble/SET_LOCAL_COMPONENT_STATE';
const LOADING_DATA_FROM_SERVER = 'nimble/LOADING_DATA_FROM_SERVER';
const HANDLE_INPUT_ERRORS = 'nimble/HANDLE_INPUT_ERRORS';
const SAVE_INPUT_DATASETS = 'nimble/SAVE_INPUT_DATASETS';
const EXTEND_LOCAL_DATA = 'nimble/EXTEND_LOCAL_DATA';

global.LocalArgumentsCollecion = getDB('nimble.arguments');

function activeSteps(state, action) {
  const { idToGo, argumentos, caller } = action;
  const responseTo = caller;
  const stepToAdd = state.steps.find(step =>
    // console.log(step.id, id, step, state.steps);
  step.id == idToGo);

  if (!stepToAdd) {
    console.warn(
      `${idToGo} não encontrou resultados em ${JSON.stringify(
        state.steps,
        null,
        2,
      )}`,
    );
  }

  const activeSteps = state.activeSteps.filter(
    step => step.responseTo !== responseTo,
  );

  // console.log({stepToAdd, id, action});

  return [...activeSteps, { ...stepToAdd, responseTo }];
  // return uniqBy([...activeSteps, {...stepToAdd, responseTo}], 'responseTo');
}

const initialState = {
  _id: undefined, // id da cotacao
  steps: [],
  currentStepID: undefined,
  stepsHistory: [],
  activeSteps: [],
  initialStepID: localStorage.getItem('initialStepID') || 'possuiVeiculo',
  argumentos: [],
  values: {},
  localComponentStates: {},
  argumentoFeedbacks: [],
  currentCustomer: {},
  productName: undefined,
  loadingDataFromServer: false,
  questionsToShow: [],
  currentStep: {},
  inputDatasets: []
};

export default function reducer(state = initialState, action = {}) {
  let currentStepID;

  switch (action.type) {
    case SET_VALUE: {
      return {
        ...state,
        values: { ...state.values, ...action.payload },
        currentStep: action.step,
        questionsToShow: action.step.questionsToShow || []
        // argumentos: action.argumentos || state.argumentos,
      };
    }

    case SET_LOCAL_COMPONENT_STATE: {
      return {
        ...state,
        localComponentStates: { ...state.localComponentStates, ...action.payload },
      };
    }

    case SUBMIT_VOTE: {
      return {
        ...state,
        argumentoFeedbacks:
          [
            ...state.argumentoFeedbacks,
            {
              ...action.payload,
              ...action.step,
            },
          ],
      };
    }

    case SET_ARGS: {
      return {
        ...state,
        argumentos: action.argumentos
      };
    }

    case INIT: {
      const {
        customer,
        argumentos,
        steps,
        quoteNum
      } = action.payload;

      const currentStepID = state.initialStepID;
      const currentStep = steps.find(s => s.id === currentStepID);
      const started = (currentStep) ? true : false;

      return {
        ...state,
        quoteNum,
        currentStepID,
        stepsHistory: [currentStep],
        activeSteps: [currentStep],
        steps,
        customer,
        argumentos,
        currentStep,
        started,
      };
    }

    case GOTO_FORM: {
      const steps = state.steps;
      const { idToGo, argumentos } = action;
      const step = steps.find(f => f.id == idToGo);

      return {
        ...state,
        currentStepID: idToGo,
        stepsHistory: [...state.stepsHistory, step],
        activeSteps: activeSteps(state, action),
        // argumentos: argumentos || state.argumentos,
      };
    }

    case SAVE_INPUT_DATASETS: {
      return {
        ...state,
        inputDatasets: uniqBy([
          ...state.inputDatasets,
          ...action.dataSetValues
        ], 'query'),
      };
    }

    case GOTO_COMPONENT: {
      const steps = state.steps;
      const { caller = {} } = action;
      const { argumentos, idToGo } = caller;
      const stepToAdd = steps.find(s => s.id == idToGo);

      if (!stepToAdd) {
        console.warn('404', step);
        return state;
      }

      return {
        ...state,
        currentStepID: idToGo,
        stepsHistory: [...state.stepsHistory, stepToAdd],
        activeSteps: [
          ...state.activeSteps,
          { ...stepToAdd, responseTo: caller.idToGo },
        ],
        // argumentos: argumentos || state.argumentos,
      };
    }

    case GOOD:
      feedbacks = uniqBy(
        [
          ...state.feedbacks,
          {
            name: action.name,
            question: action.question,
            feedback: 'good',
            argumento: action.argumento,
          },
        ],
        'argumento',
      );

      return { ...state, feedbacks };

    case BAD:
      feedbacks = uniqBy(
        [
          ...state.feedbacks,
          {
            name: action.name,
            question: action.question,
            feedback: 'bad',
            argumento: action.argumento,
          },
        ],
        'argumento',
      );

      return { ...state, feedbacks };

    case SUBMIT:
      currentStepID = state.currentStepID;
      if (currentStepID >= 1) return state;
      return { ...state, currentStepID: currentStepID - 1 };

    case REPLACE:
      return { ...state, currentStepID: action.id };

    case LOADING_DATA_FROM_SERVER:
      return {
        ...state,
        loadingDataFromServer: action.loading
      };

    case EXTEND_LOCAL_DATA: {
      return {
        ...state,
        ...action.payload
      };
    }

    default:
      return state;
  }
}

//

export const execActionAndSyncServer = (options = {}) => (dispatch, getState) => {
  const {
    steps,
    before = INIT,
    after = EXTEND_LOCAL_DATA,
    dataToExtendPayload = {},
    payload = {},
    dataToExtendAction = {}
  } = options;

  if (before) dispatch({
    type: before,
    payload: {...payload, ...dataToExtendPayload},
    ...dataToExtendAction
  });

  const {customerId, productName} = Router.params;
  dispatch({ type: LOADING_DATA_FROM_SERVER, loading: true });

  function getMethodObject(){
    return  {
      customerId,
      productName,
      clientReduxState: getState().nimble
    };
  }

  /**
   * Send data to server
   */
  Meteor.call('nimble.sync', getMethodObject(), (err, res) => {
    console.log(err, res);
    if (typeof res !== 'object') res = {};
    dispatch({ type: LOADING_DATA_FROM_SERVER, loading: false });

    if(steps) res.steps = steps;

    if(err) return Alert.error(err.reason, {effect: 'genie'});
    if(!res) return Alert.error('Erro ao salvar dados', {effect: 'genie'}); //TODO: padronizar mensagens de erro

    if (after) dispatch({
      type: after,
      payload: {...res, ...dataToExtendPayload},
      ...dataToExtendAction
    });
  });
};


export const init = (steps) => (dispatch, getState) => {
  dispatch(
    execActionAndSyncServer({
      after: EXTEND_LOCAL_DATA,
      payload: {steps}
    })
  );
};

export const goToForm = (step, name, value) => {
  const { responses, id: caller, question } = step;

  let response;
  if (responses.length > 1 && value && value.match) {
    response = responses.find((res) => {
      const matches = value.match(res.regex);
      return matches;
    });
  } else {
    response = responses[0];
  }

  const { goto, regex } = response;

  return ({
    type: GOTO_FORM,
    idToGo: goto,
    caller,
    question,
    regex,
  });
};

export const replace = id => dispatch => {
  $("html,body").animate({ scrollTop: 0 }, "slow");

  dispatch({
    type: REPLACE,
    id,
  });
};

export const goToComponent = caller => ({
  type: GOTO_COMPONENT,
  caller,
});

export const setValue = (step, name, value, cb) => (dispatch, getState) => {
  const state = getState().nimble;
  const id = step.id;
  const previousValue = state.values[id] || {};

  let payload;


  if (typeof value === 'object') {
    payload = {
      ...state.values,
      [id]: {
        ...previousValue,
        ...value,
      }
    };
  } else {
    payload = {
      ...state.values,
      [id]: {
        ...previousValue,
        [name]: value,
      }
    };
  }

  dispatch({
    type: SET_VALUE,
    payload,
    step,
  });

  const argumentosQuery = {
    currentStepID: state.currentStepID,
    responseValue: value,
    productName: Router.params.productName
  };

  dispatch({ type: LOADING_DATA_FROM_SERVER, loading: true, dataType: 'args' });

  Meteor.call('nimble.getArgs', argumentosQuery, (err, argumentos) => {
    console.log(err, argumentos);

    dispatch({ type: LOADING_DATA_FROM_SERVER, loading: false, dataType: 'args' });

    if(err || !argumentos) return;

    argumentos = argumentos.concat(getState().nimble.argumentos);

    argumentos = uniqBy(argumentos, 'text');

    dispatch({
      type: SET_ARGS,
      argumentos
    });

    if(typeof cb === 'function') cb();

    //TODO: integrate with execActionAndSyncServer()
    Meteor.call('quote.saveLastState', STORE.getState().nimble, (err, res) => console.log(err, res))
  });
};

export const localComponentStates = (step, localAppState) => (dispatch, getState) => {
  const oldStates = getState().nimble.localComponentStates;

  const payload = {
    ...oldStates,
    [step.id]: localAppState
  };

  dispatch({
    type: SET_LOCAL_COMPONENT_STATE,
    payload
  });
};

export const handleInputErrors = (payload) => (dispatch, getState) => {
  const {step, errors} = payload;

  const $div = $(`#${step.id}`);

  errors.map(err => {
    const name = err.error.name;

    const nameCaps = name.slice(0,1).toUpperCase()+name.slice(1);

    let $field = $div.find(`[name="${name}"]`);

    $field = ($field.length) ? $field : $div.find(`span:contains(${(nameCaps)})`);

    const $parent = $field.parent('label');

    $parent.addClass('mongoloid__error');
    $parent.find('.mongol__error-message').remove();
    $parent.append(`<label class="mongol__error-message">${err.message}</label>`);
  });

  dispatch({
    type: HANDLE_INPUT_ERRORS,
    errors,
    step,
  });
};


export const saveDatasetValues = (props) => (dispatch, getState) => {
  const stepID = props.step.id;
  const $stepDiv = $(`#${stepID}`);
  const $dataSetItems = $stepDiv.find('input[data-autocomplete-query]');

  const dataSetValues = [];

  $dataSetItems.map((key, el) => {
    dataSetValues.push({
      query: el.dataset.autocompleteQuery,
      value: el.value
    })
  });

  dispatch({
    type: SAVE_INPUT_DATASETS,
    dataSetValues
  })
};


export const next = (nextProps, localAppState) => (dispatch, getState) => {
  const { errors, name, value, step, component, loading} = nextProps;

  if (errors && errors.length) return dispatch(
    handleInputErrors({
      step,
      errors
    })
  );

  dispatch(saveDatasetValues(nextProps));

  if (component) return dispatch(goToComponent(nextProps));

  if (typeof loading !== 'undefined') return console.log(loading); // TODO

  dispatch(setValue(step, name, value));
  dispatch(goToForm(step, name, value));

  if (localAppState) {
    localComponentStates(step, localAppState)(dispatch, getState);
  }
};

export const handleGood = (name, question, argumento) => ({
  type: GOOD,
  name,
  question,
  argumento,
});

export const handleBad = (name, question, argumento) => ({
  type: BAD,
  name,
  question,
  argumento,
});

export const handleSubmit = (name, question, value) => ({
  type: SUBMIT,
  name,
  question,
  value,
});

export const handleSubmitVoto = (step, payload) => ({
  type: SUBMIT_VOTE,
  step,
  payload: { ...payload, feedbackID: `${step.id}__${payload.argumento}` },
});
