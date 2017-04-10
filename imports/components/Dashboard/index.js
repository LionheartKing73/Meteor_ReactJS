import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import ActivitiesList from '../../../imports/components/Dashboard/Activities';
import ProductPanel from '../../../imports/components/Dashboard/ProductsPanel';
import Gamefication from '../../../imports/components/Dashboard/Gamefication';
import CommunicationsList from '../../../imports/components/Dashboard/Communications';
import MessagesList from '../../../imports/components/Dashboard/Messages';
import DashboardSideBar from '../../../imports/components/Dashboard/DashboardSideBar';
import './style.scss';

class DashBoard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    	route: this.props.location.pathname,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location) { this.setState({ route: nextProps.location.pathname }); }
  }

  _handleLogout() {
    Meteor.logout(() => this.props.router.go('/'));
  }

  render() {
  	if(this.props.children) {
  		return (
				<div className="Dashboard__container">
					<DashboardSideBar
						onLogout={this._handleLogout.bind(this)}
						route={this.state.route}/>
					<div id="div-main">
							{this.props.children}
					</div>
				</div>
			)
		}
		else {
			return (
				<div className="Dashboard__container">
					<DashboardSideBar
						onLogout={this._handleLogout.bind(this)}
						route={this.state.route}/>


					<div id="div-main">
						<div className="row">
							<div className="div-content col-md-10">
								<ActivitiesList/>
								<ProductPanel/>
								<div className="row border-content">
									<div className="col-md-5">
										<Gamefication/>
									</div>
									<div className="col-md-7">
										<CommunicationsList/>
									</div>
								</div>
							</div>
							<div className="div-mensagens col-md-2">
								<MessagesList/>
							</div>
						</div>
					</div>
				</div>
			);
		}
  }
}

export default createContainer(() => ({
  profile: {},
}), DashBoard);
