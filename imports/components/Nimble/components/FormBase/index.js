import React, { Component } from 'react';
import { connect } from 'react-redux';
import { next, replace, init } from '../../../../redux/modules/nimble';
import classnames from 'classnames';
import components from '../Dynamic';
import fake_allSteps from '../../_steps';

function getValue(inputProps, step, self) {
  const { values } = self.props.nimble;
  const previousValue = (values[step.id] || {})[step.id];
  const value = inputProps.value || inputProps.defaultValue || ((self.props.nimble || {})[step.id] || {})[(inputProps).name];
  return (typeof value !== 'undefined') ? value : previousValue;
}
function getCheckedValue(inputProps, step, self) {
  const { values } = self.props.nimble;
  const previousValue = (values[step.id] || {})[step.id];
  const value = inputProps.value || inputProps.defaultValue || ((self.props.nimble || {})[step.id] || {})[(inputProps).name];
  return value && previousValue && value === previousValue;
}
function getHandler(inputProps, step, self) {
  return (function (ev) {
    const { name, value } = ev.target;
    this.props.next({ name, value, step, inputProps }, this.state);
  }).bind(self);
}


class FormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this._getItemClassName = this._getItemClassName.bind(this);
    this._renderActiveDiv = this._renderActiveDiv.bind(this);
  }

  componentDidMount(){
    if(!this.props.nimble.started) this.props.init(fake_allSteps);
  }

  _handleGoTo(step) {
    const { stepsHistory = [], currentStepID, initialStepID } = this.props.nimble || {};
    if (currentStepID === step.id) return;

    if (stepsHistory.find(s => s.id === step.id || step.id === initialStepID)) {
      this.props.replace(step.id);
    } else {
      const lastID = (_.last(stepsHistory) || {}).id;
      const $last = $(`#${lastID}`);
      $last.addClass('shake-it');
      setTimeout(() => {
        $last.removeClass('shake-it');
      }, 1000);
    }
  }

  _renderInput({ inputProps, key, step }) {
    const { type, name, className, spreadProps = {}, label } = inputProps;
    return (
      <div className="input-container" key={`input-container_${key}_${step.id}`}>
        <label
          className={`nimble__input-label type_${type} name_${name} key_${key}`}
        >
          <input
            type={type}
            name={name}
            className={className}
            value={getValue(inputProps, step, this)}
            key={`input_${key}_${step.id}`}
            onChange={getHandler(inputProps, step, this)}
            checked={getCheckedValue(inputProps, step, this)}
            {...spreadProps}
          />

          {(label) ? <span className="span">{label}</span> : null}
        </label>
      </div>
    );
  }

  _renderActiveDiv(step) {
    const { values = {}, steps, nimble } = this.props;

    let valueObj = values[step.id];

    let inputValue;

    if (typeof valueObj === 'object') {
      let key = Object.keys(valueObj)[0];
      if(typeof valueObj[key] !== 'string') ++key;
      if(typeof valueObj[key] !== 'string') ++key;

      inputValue = valueObj.name || valueObj.nome || valueObj[key];
      if (step.form) {
        valueObj = step.form.find(input => input.value === inputValue || input.defaultValue === inputValue);
      }
    }

    return (
      <div className="nimble_icons-wrapper">
        <div className="img-container">
          <img id="form2-img" src={step.pngUrl} className="img-card"/>
        </div>

        <div className="span-container">
          <span className="span-t span-b">
            {((valueObj) ? valueObj.label : null) || inputValue || step.question}
          </span>
        </div>
      </div>
    );
  }

  _renderFormStep({ step, next, key, replace, currentStepID }) {
    if (!step || !step.id) return null;

    const atualStep = this.props.nimble.steps.find(s => s.id === currentStepID);
    if (!atualStep) return null;

    const atualCycle = atualStep.cycle;
    if (step.cycle !== atualCycle) return null;

    const active = currentStepID === step.id;
    const wrapperClassName = classnames({
      active,
      concluido: !active,
    }, 'nimble-acel animate-transition-2');
    const tileClassName = classnames({ active }, 'tile purple');

    const componentToRender = (
      <div className="form-group col-md-12">
        <div className="form-wrapper" key={`form-wrapper${key}_${step.id}`}>

          {
            (!step.hideTitle) ? (
                <div>
                  <img className="icon-p" src={step.pngUrl}/>
                  <p className="form-question">{step.question}</p>
                </div>
              ) : null
          }

          <div className="inputs-wrapper">
            {step.form.map((inputProps, key) => this._renderInput({
              stepID: step.id,
              question: step.question,
              step,
              inputProps,
              next,
              replace,
              key,
            }))}
          </div>

        </div>
      </div>
    );


    return (
      <div className={wrapperClassName} key={`form-wrapper${key}_${step.id}-${wrapperClassName}`}>
        <div className={tileClassName}>
          {(!active) ? this._renderActiveDiv(step) : componentToRender}
        </div>
      </div>
    );
  }

  _renderStepComponent(step, key) {
    const { goto, cycle, component, pngUrl, fullScreen, last } = step;
    const { currentStepID } = this.props.nimble;
    const atualStep = this.props.nimble.steps.find(s => s.id === currentStepID);
    if (!atualStep) return null;

    const atualCycle = atualStep.cycle;
    if (step.cycle !== atualCycle) return null;

    if (!goto || !cycle || !component) {
      console.warn('Dados faltantes', { goto, cycle, component });
      return null;
    }

    const DynamicComp = components[component];

    const active = currentStepID === step.id;
    const wrapperClassName = classnames({
      active,
      concluido: !active,
    }, 'nimble-acel animate-transition-2');
    const tileClassName = classnames({ active }, 'tile purple');

    const componentToRender = (
      <div className="form-group col-md-12" key={`form-group${key}_${step.id}`}>
        <div className="form-wrapper">

          {
            (!step.hideTitle) ? (
                <div>
                  <img className="icon-p" src={step.pngUrl}/>
                  <p className="form-question">{step.question}</p>
                </div>
              ) : null
          }

          <div className="inputs-wrapper">
            <DynamicComp />
          </div>

        </div>
      </div>
    );

    return (
      <div className={wrapperClassName} key={`tile_${step.id}__${key}`}>
        <div id="tile2" className={tileClassName}>
          {(!active) ? this._renderActiveDiv(step) : componentToRender}
        </div>
      </div>
    );
  }

  _getItemClassName(step, key, props) {
    const { nimble = {} } = props;
    const { loadingDataFromServer } = nimble;
    const active = nimble.currentStepID === step.id;
    return classnames('card-item', { active, loadingDataFromServer });
  }

  _getItemStyle(step, key, props) {
    const { nimble = {} } = props;
    const active = nimble.currentStepID === step.id;
    const _style = step.style || {};
    return ((active) ? _style.active : { ..._style, active: null }) || {};
  }

  render() {
    const { steps, currentStepID, loadingDataFromServer, questionsToShow = [], currentStep } = this.props.nimble;
    const { next, replace } = this.props;
    const className = classnames({loading: loadingDataFromServer}, "nimble__cards-wraper");

    return (
      <div className={className}>
        <div className="forms-cntainer">

          <div className="nimble-step-itens-row">
            {steps.map((step, key) => {
				if(
					questionsToShow.indexOf(step.id) === -1
					&& step.id !== currentStepID
				) return null;
              return (
                <div
                  key={`step_${step.id}`}
                  id={step.id}
                  style={this._getItemStyle(step, key, this.props)}
                  className={this._getItemClassName(step, key, this.props)}
                  onClick={() => this._handleGoTo(step)}
                >
                  {(step.form) ? this._renderFormStep({
                      step,
                      next,
                      replace,
                      currentStepID,
                      key
                    }) : null}
                  {(step.component) ? this._renderStepComponent(step, key) : null }
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}


export default connect(state => ({
  nimble: state.nimble,
  values: state.nimble.values,
}), { next, init, replace })(FormBase);
