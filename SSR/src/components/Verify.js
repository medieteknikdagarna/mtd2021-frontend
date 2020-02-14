import React, { Component } from 'react';
import settings from "../settings.json";
import { Link } from 'react-router-dom';
// import lowResLogo from '../bilder/eyeLeagueLowestRes.png';
import logo from '../bilder/logo.svg';

import '../css/verify.scss';
import '../css/index.scss';

class Verify extends Component {
  constructor(props) {
  	super(props);
  	document.title = "Verifiera konto";

    let string = "";

    if(this.props.match.params.string != null) {
      string = this.props.match.params.string.split("-");

      this.state = {
    		username: string[0],
        hash: string[1],
        verified: false,
        loading: true
    	};
    }

    this.verify = this.verify.bind(this);
    this.imageload = this.imageload.bind(this);
    this.verify();
  }

  verify() {
    fetch(settings.api + "verify/", {
            method: "POST",
            credentials: "include",
            body: `username=${this.state.username}&hash=${this.state.hash}`
        }).then(response => {
          this.setState({loading: false});
      		if(!response.ok){console.log(response); throw Error(response.status);}
          else {this.setState({verified: true});}
      		return response.json()
  	    }).then(response => response.json())
		      .then(response => {
    		});
  }

  imageload(e) {
		e.target.style.display = "block";
		e.target.parentNode.childNodes[0].style.display = "none";
	}

  /*---------------------------RENDER--------------------------*/

  render() {
    let content = "";

    if(this.state.verified) {
      content = (
    		<h3>Hej {this.state.username}. Ditt konto är nu aktiverat.</h3>
  		);
    }
    else {
      content = (
    		<h3>Något gick tyvärr fel. Kontot kunde inte aktiveras.</h3>
  		);
    }

    if(this.state.loading === true) {
      content = <div className="loading"></div>;
    }

    return (
      <div id="verify">
        <div className="container">
          <div className="logo">
            <img className="highreslogo" src={logo} alt="logo" onLoad={this.imageload}></img>
          </div>
          <div className="box">
            <div className="content">
              {content}
            </div>
            <div className="buttons">
              <Link to={settings.url + "login/"}><span onClick={this.props.goBack}>&#x2190; Till inloggning.</span></Link>
            </div>
          </div>
        </div>

      </div>
    );
	}
}

export default Verify;
