import React, { Component } from 'react';

import IframeResizer from 'iframe-resizer-react'

class Studentexpo extends Component {
	constructor(props) {
		super(props);

		this.setIframeHeight = this.setIframeHeight.bind(this);
	}

	setIframeHeight() {
		// console.log(document.getElementById("studentExpoForm").contentWindow.document.body.scrollHeight);
		
	}

	componentDidMount() {
		// document.getElementById("studentExpoForm").style.height = document.querySelector(".freebirdFormviewerViewEmbedded").offsetHeight + 'px';
	}

	render() {
    return (
			<div id="studentexpoContainer">
				<IframeResizer
					// src="http://localhost:3000"
					src="https://docs.google.com/forms/d/e/1FAIpQLSe6ZXLa5CJU945LMNSnyU0WvN3uOb665kbWEGloyZUPthlcIA/viewform?embedded=true"
					style={{ width: '1px', minWidth: '100%', border: "none"}}
					heightCalculationMethod= 'max'
				/>
			</div>
		);
	}
}


export default Studentexpo;
