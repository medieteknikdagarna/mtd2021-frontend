import React, { Component } from 'react';

import content from "./content/privacyPolicy.json";

import '../css/privacyPolicy.scss';

class PrivacyPolicy extends Component {

	render() {
    return (
			<div id="privacyPolicyContainer">
				<h1>{content[this.props.lang].title}</h1>
				<p className="ingress" dangerouslySetInnerHTML={{ __html: content[this.props.lang].ingress }}/>

				<h2>{content[this.props.lang].contactForm.title}</h2>
				<p>{content[this.props.lang].contactForm.body}</p>
				<div className="indrag">
					<h3>{content[this.props.lang].contactForm.storedData.title}</h3>
					<p>{content[this.props.lang].contactForm.storedData.body}</p>
					<h3>{content[this.props.lang].contactForm.why.title}</h3>
					<p>{content[this.props.lang].contactForm.why.body}</p>
					<h3>{content[this.props.lang].contactForm.editOrDeleteData.title}</h3>
					<p dangerouslySetInnerHTML={{ __html: content[this.props.lang].contactForm.editOrDeleteData.body }}/>
				</div>

				<h2>{content[this.props.lang].thirdParty.title}</h2>
				<p dangerouslySetInnerHTML={{ __html: content[this.props.lang].thirdParty.body }}/>

				<h2>{content[this.props.lang].cookies.title}</h2>
				<p dangerouslySetInnerHTML={{ __html: content[this.props.lang].cookies.body }}/>
				<div className="indrag">
					<h3>{content[this.props.lang].cookies.googleAnalytics.title}</h3>
					<p>{content[this.props.lang].cookies.googleAnalytics.body}</p>
					<a className="linkByItsOwn" href={content[this.props.lang].cookies.googleAnalytics.link.url} target="_blank" rel="noopener noreferrer">{content[this.props.lang].cookies.googleAnalytics.link.text}</a>

					<h3>{content[this.props.lang].cookies.youtube.title}</h3>
					<p>{content[this.props.lang].cookies.youtube.body}</p>
					<a className="linkByItsOwn" href={content[this.props.lang].cookies.youtube.link.url} target="_blank" rel="noopener noreferrer">{content[this.props.lang].cookies.googleAnalytics.link.text}</a>

					<h3>{content[this.props.lang].cookies.facebook.title}</h3>
					<p>{content[this.props.lang].cookies.facebook.body}</p>
					<a className="linkByItsOwn" href={content[this.props.lang].cookies.facebook.link.url} target="_blank" rel="noopener noreferrer">{content[this.props.lang].cookies.googleAnalytics.link.text}</a>
				</div>

				<h2>{content[this.props.lang].consent.title}</h2>
				<p dangerouslySetInnerHTML={{ __html: content[this.props.lang].consent.body }}/>

				<h2>{content[this.props.lang].externalParty.title}</h2>
				<p>{content[this.props.lang].externalParty.body}</p>
				<ul>
					<li>{content[this.props.lang].externalParty.punkt1}</li>
					<li>{content[this.props.lang].externalParty.punkt2}</li>
				</ul>

				<h2>{content[this.props.lang].dataManager.title}</h2>
				<p dangerouslySetInnerHTML={{ __html: content[this.props.lang].dataManager.body }}/>
			</div>
		);
	}
}

export default PrivacyPolicy;
