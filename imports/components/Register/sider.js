import React, { Component, PropTypes } from 'react';

class Sider extends Component {

  constructor(props) {
    super(props);

    this.state = {
    	step: (this.props.step || 1),
			registrationIsComplete: this.props.registrationIsComplete,
			maxSteps: 5
		}
  }

  componentWillReceiveProps(nextProps) {
  	if(nextProps.step || nextProps.registrationIsComplete) {
  		this.setState({
  			step: (nextProps.step || 1),
				registrationIsComplete: nextProps.registrationIsComplete
  		})
		}
	}

  render() {
    const { step, maxSteps, registrationIsComplete } = this.state;
    const height = (((step - 1) * 100) / maxSteps) || 5; //% of current step - Fix CSS with default 5%

		if(registrationIsComplete) {
			return (
				<div className="div-steps-cadastro">
					<div>
						<div className="budget-cadastro activeBudget">
						</div>
						<p className="congrats"><span>Perfil completo</span>Parabéns, você completou todo seu perfil e ganhou um budget!</p>
						<div className="div-line-budget">
							<div className="line-budget hidden">
								<div className="step" style={{height:'100%'}}/>
							</div>
						</div>
					</div>
				</div>
			)
		}

    return (
      <div className="div-steps-cadastro">
        <div>
          <div className="budget-cadastro" />
          <div className="div-line-budget">
            <div className="line-budget">
              <div className="step" style={{ height: `${height}%` }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Sider.protoTypes = {
	step: PropTypes.number,									//Current Step
	registrationIsComplete: PropTypes.bool 	//registrationIsComplete
};

export default Sider;
