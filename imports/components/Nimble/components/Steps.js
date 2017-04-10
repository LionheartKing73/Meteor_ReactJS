import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { next, replace } from '../../../redux/modules/nimble';
import uniqBy from 'lodash.uniqby';

class _Component extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

	componentDidMount() {
		$('[data-toggle="tooltip"]').tooltip();
	}

	componentDidUpdate() {
		$('[data-toggle="tooltip"]').tooltip();
	}

	_handleGoTo(step) {
    const { stepsHistory = [], currentStepID } = this.props;
    if (currentStepID == step.id) return;

    if (stepsHistory.find(s => s.id == step.id)) {
      this.props.replace(step.id);
    } else {
      const lastID = (_.last(stepsHistory) || {}).id;
      const $last = $(`#${lastID}`);
      $last.addClass('shake-it');
      setTimeout(() => { $last.removeClass('shake-it'); }, 1000);
    }
  }

  _normalizeSteps(steps) {
    const cycleIconClasses = uniqBy(steps.reduce((prev, next) => {
      if (next.cycleIconClass) return prev.concat({ cycle: next.cycle, iconClassNameToRender: next.cycleIconClass });
      return prev;
    }, []), 'cycle');

    // adiciona os steps que contem os icones para cada cyclo de steps
    const normalizedSteps = cycleIconClasses.reduce((prev, next) => {
      const cycleSteps = steps.filter(s => s.cycle == next.cycle);
      return prev.concat({
        ...next,
        id: cycleSteps[0].id, // para que o _handleGoto va para o primeiro step deste cyclo ao clica-lo
      }).concat(cycleSteps);
    }, []);

    return normalizedSteps;
  }

  render() {
    const { steps = [], currentStepID, activeSteps } = this.props;

    const normalizedSteps = this._normalizeSteps(steps);

    const lastActiveStepKey = normalizedSteps.map(s => s.id).lastIndexOf(currentStepID);

    const currentCycle = (normalizedSteps.find(s => s.id == currentStepID) || {}).cycle;
		
    return (
      <ul className="fake-steps nimble-top-steps-ul">
        {normalizedSteps.map((step, key) => {
          const active = (step.id == currentStepID); //(key <= lastActiveStepKey);
          const done = activeSteps.find(s => step.id == s.id) && !active;
          const className = classnames('nimble-acel ludico form2', {
            active,
						done,
            hasIcon: step.iconClassNameToRender,
						hidden: (!step.iconClassNameToRender && step.cycle != currentCycle)
          });

          return (
            <li
              key={key}
              className={className}
              title={step.question}
              onClick={() => this._handleGoTo(step)}
							data-toggle="tooltip"
							data-placement="top"
            >
              {(step.icon || step.iconClassNameToRender) ? <i className={step.icon || step.iconClassNameToRender} /> : null}
            </li>
          );
        })}
      </ul>

    );
  }
}

export default connect(state => state.nimble, {
  next, replace,
})(_Component);
