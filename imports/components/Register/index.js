import React, {Component, PropTypes} from 'react';

import Sider from './sider';
import Form1 from './forms/form1';
import Form2 from './forms/form2';
import Form3 from './forms/form3';
import Form4 from './forms/form4';
import Form5 from './forms/form5';

import './cadastro.scss';

class Register extends Component {

  constructor(props) {
    super(props);
  }

  getForm(formNumber) {
    switch (formNumber) {
      case '5': return (Form5);
      case '4': return (Form4);
      case '3': return (Form3);
      case '2': return (Form2);
      default : return (Form1);
    }
  }

  render() {
  	const { user, params, loading } = this.props;
  	const registrationIsComplete = (user || {}).registrationIsComplete || false;
    const { form } = this.props.params;
    const Form = this.getForm(form);

    if(loading) {
    	return (
				<div className="div-cadastro loading" style={{height:'100vh'}}/>
			)
		}

    return (
      <div className="div-cadastro">
        <div className="row">
          <div className="col-lg-2">
            <Sider
							step={params.form}
							registrationIsComplete={registrationIsComplete}
							{...this.props}
						/>
          </div>
          <div className="col-lg-10  formulario" name="formulario_registro" method="get">
            <Form {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default GLOBAL.createContainer((props) => {
	const user = Meteor.user() || {};
	const loading = !user._id;
	return {
		...props,
		user,
		loading
	};
}, Register);

