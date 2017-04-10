import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Carousel } from 'react-bootstrap';
import './style.scss';

class CommunicationsList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			communications: {
				index: 0,
				direction: null,
			}
		};
	}

	onSelectCommunication(event) {

		this.setState({
			communications: {
				...this.state.communications,
				index: event.activeIndex,
				direction: event.direction,
			},
		});
	}

	/**
	 * @memberOf CommunicationsList
	 * @summary Shares social media on facebook
	 * @param {event} event - Event which called function
	 * @param {String} title - Title of the shared social media
	 * @param {String} mediaUrl - URL of the shared social media
	 */
	onClickCommunication(event, mediaUrl, title) {
		window.open("https://www.facebook.com/sharer.php?u=" + mediaUrl);
	}

	renderCommunicationsHeader() {
		return (
			<div className="div-content-categoria-header">
				<h1>{GLOBAL.communications.lblHeaderCommunications}</h1>
			</div>
		);
	}

	/**
	 * @memberOf CommunicationsList
	 * @summary Gets image from express server. Thats needed for not reloading page automatically when saved
	 *
	 *          Check /server/communications/expressimages.js
	 * @param {String} id - Id of social media doc
	 */
	checkURLIsImage(id) {
		var urlImage = 'http://' + location.hostname + ':3009/' + id + '.jpg';
		//return <img src="http://www.w3schools.com/css/paris.jpg" />;
		return <img src={urlImage} />;
	}


	renderCommunicationsItens() {
		return (
			<div className="Communications__container div-content-comunicacoes-itens">
				<div className="comunicacoes-item" style={{width:288, height:140}} frameBorder="0" allowFullScreen>
					<Carousel activeIndex={this.state.communications.index} direction={this.state.communications.direction} onSelect={this.onSelectCommunication.bind(this)}>
						{this.props.communicationsList.map((socialmedia) =>
							<Carousel.Item key={"carousel-item-" + socialmedia._id}>
								{ this.checkURLIsImage(socialmedia._id) }
								<Carousel.Caption key={"carousel-caption-" + socialmedia._id}>
									<h3>{socialmedia.title}</h3>
									<button className="btn btn-primary" onClick={this.onClickCommunication.bind(this, socialmedia.title, socialmedia.mediaUrl)}>Compartilhar</button>
								</Carousel.Caption>
							</Carousel.Item>
						)}
					</Carousel>
				</div>
			</div>
		);
	}

	renderCommunicationsContent() {
		return (
			<div className="row div-content-categoria div-content-comunicacoes">
				{ this.renderCommunicationsHeader() }
				{ this.renderCommunicationsItens() }
			</div>
		);
	}

	render() {
		return (this.renderCommunicationsContent());
	}
}

export default createContainer((props) => {

	const communicationsHandle = GlobalSubsManager('communications.all');
	// const communicationsList = Communications.find({"brokerId": Meteor.userId()}).fetch().reverse();
	const communicationsList = Communications.find({}).fetch().reverse();

	return {
		communicationsList,
		loading: !communicationsHandle.ready(),
		user: Meteor.user()
	}
}, CommunicationsList);
