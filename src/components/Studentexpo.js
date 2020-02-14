import React, { Component } from 'react';

import content from "../components/content/studentexpo.json";

import '../css/studentexpo.scss';

class Studentexpo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lang: props.lang
		};

		this.setIframeHeight = this.setIframeHeight.bind(this);
	}

	setIframeHeight() {
		// console.log(document.getElementById("studentExpoForm").contentWindow.document.body.scrollHeight);
		
	}

	componentDidMount() {
		// document.getElementById("studentExpoForm").style.height = document.querySelector(".freebirdFormviewerViewEmbedded").offsetHeight + 'px';
	}

	componentDidUpdate(prevProps) {
		if(prevProps.lang !== this.props.lang) {
			this.setState({ lang: this.props.lang });
		}
	}

	render() {
		let src = "https://docs.google.com/forms/d/e/1FAIpQLSe6ZXLa5CJU945LMNSnyU0WvN3uOb665kbWEGloyZUPthlcIA/viewform?embedded=true";
		if(this.state.lang === "en") {
			src = "https://docs.google.com/forms/d/e/1FAIpQLSdbbFoiJG7QgOMqewg4FPfqd3fG3Iux8pzSMsF7bQbY-pPIjA/viewform?embedded=true";
		}

    return (
			<div id="studentExpoContainer">
				<div id="studentExpoInfo">
					<h1>{content[this.state.lang].title}</h1>
					<p className="ingress">{content[this.state.lang].ingress}</p>
					<p>{content[this.state.lang].body}</p>
				</div>

				<iframe
					id="studentExpoForm"
					title="Student Expo form"
					src={src}
				>
					{content[this.state.lang].loading}
				</iframe>
			</div>
		);
	}
}


export default Studentexpo;
