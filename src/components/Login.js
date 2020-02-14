import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import '../css/login.scss';
// import lowResLogo from '../bilder/eyeLeagueLowestRes.png';
import logo from '../bilder/logo.svg';

import settings from "../settings.json";

var isEmail = require('../../node_modules/is-email/lib/index.js');

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			login: false,
			error: null,
			username: "",
			password: "",
			username_style: {},
			password_style: {},
			loading: false,
			userPlacehStyle: {},
			passPlacehStyle: {},
			creatingUser: false,
			userSignup: false,
			lostCredentials: false,
			errormsg: "",
			hash: props.match.params.hash
		};

		this.username = this.username.bind(this);
    this.password = this.password.bind(this);
		this.submit = this.submit.bind(this);
		this.focus = this.focus.bind(this);
		this.blurUser = this.blurUser.bind(this);
		this.blurPass = this.blurPass.bind(this);
		this.clickFieldText = this.clickFieldText.bind(this);
		this.linkToNewUser = this.linkToNewUser.bind(this);
		this.linkToLostCredentials = this.linkToLostCredentials.bind(this);
		this.goBack = this.goBack.bind(this);
		this.imageload = this.imageload.bind(this);

		document.title = "Log in - eyeLeague";
	}

	clickFieldText(e) {
		e.currentTarget.parentNode.childNodes[1].focus();
	}

	focus(e) {
		e.preventDefault();
		e.currentTarget.parentNode.childNodes[2].className = 'placeToLabel';
		if(e.currentTarget.parentNode.className === "pass text") {
			this.setState({passPlacehStyle: {color: "#557a95"}});
		}
		else {
			this.setState({userPlacehStyle: {color: "#557a95"}});
		}
	}

	blurUser(e) {
		e.preventDefault();

		if(document.querySelector(".user").childNodes[1].value.toString() === "") {
			e.currentTarget.parentNode.childNodes[2].className = 'placeh';
			this.setState({userPlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}

		else {
			this.setState({userPlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}
	}

	blurPass(e) {
		e.preventDefault();

		if(document.querySelector(".pass").childNodes[1].value.toString() === "") {
			e.currentTarget.parentNode.childNodes[2].className = 'placeh';
			this.setState({passPlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}

		else {
			this.setState({passPlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}
	}

	username(e){
		e.preventDefault();
    this.setState({username: e.target.value, username_style: {}, error: false});
		this.focus(e);
  }

  password(e){
		e.preventDefault();
    this.setState({password: e.target.value, password_style: {}, error: false});
		this.focus(e);
  }

	submit(e){
		e.preventDefault();

		if(this.state.username === "" || this.state.password === ""){
			if(this.state.username === ""){
				this.setState({
					username_style: {borderColor: "red", transition: "border-color 1s"},
					userPlacehStyle: {color: "red"}
				});
			}
			if(this.state.password === ""){
				this.setState({
					password_style: {borderColor: "red", transition: "border-color 1s"},
					passPlacehStyle: {color: "red"}
				});
			}
			return;
		}

		this.setState({loading: true});
		fetch(settings.api + "login/", {
            method: "POST",
            credentials: "include",
            body: `username=${this.state.username}&password=${this.state.password}`
        })
		.then(response => response.json())
		.then(response => {
			console.log(response);
			this.setState({loading: false});
            if(response.login === true && response.activated === true){
              this.setState({login: true});
            }
						if(response.activated === false) {
							this.setState({error: true, errormsg: "The account is not verified. A new e-mail with instructions has been sent.", password: "", password_style: {borderColor: "red", transition: "border-color 1s"}});
							document.getElementById("password").value = ""; // borde göras i render()?
						}
						if(response.login === false) {
							this.setState({
								error: true,
								errormsg: "Wrong username or password.",
								password: "",
								password_style: {borderColor: "red", transition: "border-color 1s"},
								username_style: {borderColor: "red", transition: "border-color 1s"},
								passPlacehStyle: {color: "red"},
								userPlacehStyle: {color: "red"}
							});
							document.getElementById("password").value = ""; // borde göras i render()?
            }
		});
	}

	componentDidMount() {
		if(this.state.hash == null) {
			this.setState({username: document.querySelector(".user").childNodes[1].value.toString()});
			this.setState({password: document.querySelector(".pass").childNodes[1].value.toString()});

			if(document.querySelector(".user").childNodes[1].value.toString() === "") {
				document.querySelector(".user").childNodes[2].className = 'placeh';
				this.setState({userPlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
			}

			else {
				this.setState({userPlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
			}

			if(document.querySelector(".pass").childNodes[1].value.toString() === "") {
				document.querySelector(".pass").childNodes[2].className = 'placeh';
				this.setState({passPlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
			}

			else {
				this.setState({passPlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
			}
		}
	}

	linkToNewUser(e) {
		this.setState({userSignup: true});
	}

	linkToLostCredentials(e) {
		this.setState({lostCredentials: true});
	}

	async goBack(e) {
		await this.setState({userSignup: false, lostCredentials: false, hash: null});
		window.history.replaceState( {} , 'Log in - eyeLeague', '/login' );
		document.title = "Log in - eyeLeague";

		this.setState({username: document.querySelector(".user").childNodes[1].value.toString()});
		this.setState({password: document.querySelector(".pass").childNodes[1].value.toString()});

		if(document.querySelector(".user").childNodes[1].value.toString() === "") {
			document.querySelector(".user").childNodes[2].className = 'placeh';
			this.setState({userPlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}

		else {
			this.setState({userPlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}

		if(document.querySelector(".pass").childNodes[1].value.toString() === "") {
			document.querySelector(".pass").childNodes[2].className = 'placeh';
			this.setState({passPlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}

		else {
			this.setState({passPlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}
	}

	imageload(e) {
		e.target.style.display = "block";
		e.target.parentNode.childNodes[0].style.display = "none";
	}

	render() {
		if(this.state.login) {
			return <Redirect to={settings.url + ""} />;
		}

		if(this.state.hash != null && this.state.hash.length > 30) {
			return <NewPassword imageload={this.imageload} goBack={this.goBack} hash={this.state.hash}></NewPassword>;
		}

		if(this.state.userSignup) {
			return <NewUser imageload={this.imageload} goBack={this.goBack}></NewUser>;
		}

		if(this.state.lostCredentials) {
			return <LostCredentials imageload={this.imageload} goBack={this.goBack}></LostCredentials>;
		}

		let submit = "Log in";
		if(this.state.loading){
			submit = <div className="loading"></div>;
		}

		let error = <div className="error-hide"></div>;
		if(this.state.error){
			error = <div className="error-show">{this.state.errormsg}</div>;
		}

    	return (
			<div id="login" style={this.state.show}>
				<div className="container">
					<div className="logo">
						<img className="highreslogo" src={logo} alt="logo" onLoad={this.imageload}></img>
					</div>

					<div className="box">
						<form onSubmit={this.submit}>
							<div className="user text">
								<label htmlFor="username">Användarnamn</label>
								<input style={this.state.username_style} id="username" type="text" onChange={this.username} onFocus={this.focus} onBlur={this.blurUser}></input>
								<p className="placeToLabel" style={this.state.userPlacehStyle} onClick={this.clickFieldText}>Username / E-mail</p>
							</div>
							<div className="pass text">
								<label htmlFor="password">Lösenord</label>
								<input style={this.state.password_style} id="password" type="password" onChange={this.password} onFocus={this.focus} onBlur={this.blurPass}></input>
								<p className="placeToLabel" style={this.state.passPlacehStyle} onClick={this.clickFieldText}>Password</p>
							</div>
							{error}
							<div className="buttons">
								<p><span onClick={this.linkToLostCredentials}>Forgot password?</span></p>
								<div className="submit" onClick={this.submit}>
									{submit}
									<input type="submit"></input>
								</div>
							</div>
							<div className="newUser">
								<p>New to eyeLeague? <span onClick={this.linkToNewUser}>Create an account.</span></p>
							</div>
						</form>
					</div>
				</div>

			</div>

		);
	}
}

class NewUser extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: "",
			email: "",
			password1: "",
			password2: "",
			username_style: {},
			email_style: {},
			password1_style: {},
			password2_style: {},
			loading: false,
			userPlacehStyle: {},
			emailPlacehStyle: {},
			pass1PlacehStyle: {},
			pass2PlacehStyle: {},
			userError: null,
			emailError: null,
			passError: null,
			userErrormsg: "",
			emailErrormsg: "",
			passErrormsg: ""
		};

		this.username = this.username.bind(this);
		this.email = this.email.bind(this);
    this.password1 = this.password1.bind(this);
    this.password2 = this.password2.bind(this);
		this.submitUser = this.submitUser.bind(this);
		this.focus = this.focus.bind(this);
		this.blurUser = this.blurUser.bind(this);
		this.blurEmail = this.blurEmail.bind(this);
		this.blurPass1 = this.blurPass1.bind(this);
		this.blurPass2 = this.blurPass2.bind(this);
		this.clickFieldText = this.clickFieldText.bind(this);

		document.title = "Sign up - eyeLeague";
	}

	clickFieldText(e) {
		e.currentTarget.parentNode.childNodes[1].focus();
	}

	focus(e) {
		e.preventDefault();
		e.currentTarget.parentNode.childNodes[2].className = 'placeToLabel';
		if(e.currentTarget.parentNode.className === "pass1 text") {
			this.setState({pass1PlacehStyle: {color: "#557a95"}, password1_style: {borderColor: "#557a95"}});
		}
		else if(e.currentTarget.parentNode.className === "pass2 text") {
			this.setState({pass2PlacehStyle: {color: "#557a95"}, password2_style: {borderColor: "#557a95"}});
		}
		else if(e.currentTarget.parentNode.className === "email text") {
			this.setState({emailPlacehStyle: {color: "#557a95"}, email_style: {borderColor: "#557a95"}});
		}
		else {
			this.setState({userPlacehStyle: {color: "#557a95"}, username_style: {borderColor: "#557a95"}});
		}
	}

	blurUser(e) {
		e.preventDefault();
		if(document.querySelector(".user").childNodes[1].value.toString().match(/[^a-zA-Z0-9-]|-{2,}/)) {
			this.setState({
				username_style: {borderColor: "red"},
				userPlacehStyle: {color: "red"},
				userError: true,
				userErrormsg: "Invalid characters in the username."
			});
		}
		else {
			this.setState({
				username_style: {borderColor: "#557a95"},
				userPlacehStyle: {color: "#557a95"},
				userError: false,
				userErrormsg: ""
			});
		}

		if(document.querySelector(".user").childNodes[1].value.toString() === "") {
			e.currentTarget.parentNode.childNodes[2].className = 'placeh';
			this.setState({userPlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}

		else {
			//this.setState({userPlacehStyle: {color: "#557a95"}});
		}
	}

	blurEmail(e) {
		e.preventDefault();
		if(!isEmail(e.target.value.toString()) && e.target.value.toString() !== "") {
			this.setState({
				email_style: {borderColor: "red"},
				emailPlacehStyle: {color: "red"},
				emailError: true,
				emailErrormsg: "Enter a valid e-mail address."
			});
		}
		else {
			this.setState({
				email_style: {borderColor: "#557a95"},
				emailPlacehStyle: {color: "#557a95"},
				emailError: false,
				emailErrormsg: ""
			});
		}

		if(document.querySelector(".email").childNodes[1].value.toString() === "") {
			e.currentTarget.parentNode.childNodes[2].className = 'placeh';
			this.setState({emailPlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}

		else {
			// this.setState({emailPlacehStyle: {color: "black"}});
		}
	}

	blurPass1(e) {
		e.preventDefault();
		if(e.target.value.toString() !== document.querySelector(".pass2").childNodes[1].value.toString()) {
			this.setState({
				password2_style: {borderColor: "red"},
				pass2PlacehStyle: {color: "red"},
				password1_style: {borderColor: "red"},
				pass1PlacehStyle: {color: "red"},
				passError: true,
				passErrormsg: "The fields must match."
			});
		}

		else {
			this.setState({
				password1_style: {borderColor: "#557a95"},
				pass1PlacehStyle: {color: "#557a95"},
				passError: false
			});
		}

		if(document.querySelector(".pass1").childNodes[1].value.toString() === "") {
			e.currentTarget.parentNode.childNodes[2].className = 'placeh';
			this.setState({pass1PlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}

		else {
			// if(this.state.passError) {this.setState({pass1PlacehStyle: {color: "red"}});}
			// else {this.setState({pass1PlacehStyle: {color: "#557a95"}});}
		}
	}

	blurPass2(e) {
		e.preventDefault();
		if(e.target.value.toString() !== document.querySelector(".pass1").childNodes[1].value.toString()) {
			this.setState({
				password2_style: {borderColor: "red"},
				pass2PlacehStyle: {color: "red"},
				password1_style: {borderColor: "red"},
				pass1PlacehStyle: {color: "red"},
				passError: true,
				passErrormsg: "The fields must match."
			});
		}

		else {
			this.setState({
				password2_style: {borderColor: "#557a95"},
				pass2PlacehStyle: {color: "#557a95"},
				passError: false
			});
		}

		if(document.querySelector(".pass2").childNodes[1].value.toString() === "") {
			e.currentTarget.parentNode.childNodes[2].className = 'placeh';
			this.setState({pass2PlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}

		else {
			// if(this.state.passError) {this.setState({pass2PlacehStyle: {color: "red"}});}
			// else {this.setState({pass2PlacehStyle: {color: "black"}});}
		}
	}

	username(e){
		e.preventDefault();
		this.focus(e);

		if(e.target.value.toString().length === 40) {
			let remove = e.target.value.toString().slice(0, -1);
			e.target.value = remove;
			this.setState({username: remove, user_style: {}, userPlacehStyle: {}, userError: false});
		}

		else if(!(e.target.value.toString().match(/[^a-zA-Z0-9-]|-{2,}/))) {
			this.setState({username: e.target.value, user_style: {}, userPlacehStyle: {}, userError: false});
		}
  }

	email(e){
		e.preventDefault();
		this.focus(e);

		if(e.target.value.toString().length === 40) {
			let remove = e.target.value.toString().slice(0, -1);
			e.target.value = remove;
			this.setState({email: remove, email_style: {}, emailPlacehStyle: {}, emailError: false});
		}
		else {
			this.setState({email: e.target.value, email_style: {}, emailPlacehStyle: {}, emailError: false});
		}
  }

  password1(e) {
		e.preventDefault();
		this.focus(e);

		if(e.target.value.toString().length === 40) {
			let remove = e.target.value.toString().slice(0, -1);
			e.target.value = remove;
			this.setState({password1: remove, password1_style: {}, pass1PlacehStyle: {}, passError: false});
		}
		else {
			this.setState({password1: e.target.value, password1_style: {}, pass1PlacehStyle: {}, passError: false});
		}

		if(e.target.value.toString() === document.querySelector(".pass2").childNodes[1].value.toString()) {
			this.setState({
				password2_style: {},
				pass2PlacehStyle: {},
				password1_style: {},
				pass1PlacehStyle: {},
				passError: false
			});
			if(document.querySelector(".pass2").childNodes[1].value.toString() !== "") {this.setState({pass2PlacehStyle: {color: "#557a95"}});}
			else {this.setState({pass2PlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});}
		}
  }

  password2(e){
		e.preventDefault();
		this.focus(e);

		if(e.target.value.toString().length === 40) {
			let remove = e.target.value.toString().slice(0, -1);
			e.target.value = remove;
			this.setState({password2: remove, password2_style: {}, pass2PlacehStyle: {}, error: false});
		}
		else {
			this.setState({password2: e.target.value, password2_style: {}, pass2PlacehStyle: {}, error: false});
		}

		if(e.target.value.toString() === document.querySelector(".pass1").childNodes[1].value.toString()) {
			this.setState({
				password2_style: {},
				pass2PlacehStyle: {},
				password1_style: {},
				passError: false
			});
			if(document.querySelector(".pass1").childNodes[1].value.toString() !== "") {this.setState({pass1PlacehStyle: {color: "#557a95"}});}
			else {this.setState({pass1PlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});}
		}
  }

	submitUser(e){
		e.preventDefault();

		if(this.state.username === "" || this.state.password1 === "" || this.state.password2 === "" || this.state.email === "") {
			if(this.state.username === ""){this.setState({username_style: {borderColor: "red", transition: "border-color 1s"}, userPlacehStyle: {color: "red"}});}
			if(this.state.password1 === ""){this.setState({password1_style: {borderColor: "red", transition: "border-color 1s"}, pass1PlacehStyle: {color: "red"}});}
			if(this.state.password2 === ""){this.setState({password2_style: {borderColor: "red", transition: "border-color 1s"}, pass2PlacehStyle: {color: "red"}});}
			if(this.state.email === ""){this.setState({email_style: {borderColor: "red", transition: "border-color 1s"}, emailPlacehStyle: {color: "red"}});}
			return;
		}

		if(!isEmail(this.state.email.toString())) {
			this.setState({
				email_style: {borderColor: "red"},
				emailPlacehStyle: {color: "red"},
				emailError: true,
				emailErrormsg: "Enter a valid e-mail address."
			});
			return;
		}

		if(this.state.password1 !== this.state.password2) {
			this.setState({passErrormsg: "The fields must match.", passError: true});
			this.setState({password2_style: {borderColor: "red", transition: "border-color 1s"}});
			return;
		}

		if(this.state.userError === true || this.state.emailError === true || this.state.passError === true) {
			return;
		}

		this.setState({loading: true});
		fetch(settings.api + "user/", {
            method: "POST",
            credentials: "include",
            body: `email=${this.state.email}&password=${this.state.password1}&username=${this.state.username}`
        })
		.then(response => response.json())
		.then(response => {
			console.log(response);
			this.setState({loading: false});
            if(response.user === true && response.email === true && response.pass === true) {
              document.querySelector(".usercreated").style.display = "block";
              document.querySelector(".createuser").style.display = "none";
            }
						if(response.user === false) {
							this.setState({
								username_style: {borderColor: "red"},
								userPlacehStyle: {color: "red"},
								userError: true,
								userErrormsg: "The username is taken."
							});
						}
						if(response.email === false) {
							this.setState({
								email_style: {borderColor: "red"},
								emailPlacehStyle: {color: "red"},
								emailError: true,
								emailErrormsg: "There is already an account with that e-mail address."
							});
						}
		});
	}

	componentDidMount() {
		this.setState({username: document.querySelector(".user").childNodes[1].value.toString()});
		this.setState({email: document.querySelector(".email").childNodes[1].value.toString()});
		this.setState({password1: document.querySelector(".pass1").childNodes[1].value.toString()});
		this.setState({password2: document.querySelector(".pass2").childNodes[1].value.toString()});

		if(document.querySelector(".user").childNodes[1].value.toString() === "") {
			document.querySelector(".user").childNodes[2].className = 'placeh';
			this.setState({userPlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}
		else {
			this.setState({userPlacehStyle: {color: "#557a95"}});
		}

		if(document.querySelector(".email").childNodes[1].value.toString() === "") {
			document.querySelector(".email").childNodes[2].className = 'placeh';
			this.setState({emailPlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}
		else {
			this.setState({emailPlacehStyle: {color: "#557a95"}});
		}

		if(document.querySelector(".pass1").childNodes[1].value.toString() === "") {
			document.querySelector(".pass1").childNodes[2].className = 'placeh';
			this.setState({pass1PlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}
		else {
			this.setState({pass1PlacehStyle: {color: "#557a95"}});
		}

		if(document.querySelector(".pass2").childNodes[1].value.toString() === "") {
			document.querySelector(".pass2").childNodes[2].className = 'placeh';
			this.setState({pass2PlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}
		else {
			this.setState({pass2PlacehStyle: {color: "#557a95"}});
		}
	}

	render() {
		let submit = "Sign up";
		if(this.state.loading){
			submit = <div className="loading"></div>;
		}

		let usererror = <div className="error-hide"></div>;
		if(this.state.userError){
			usererror = <div className="error-show">{this.state.userErrormsg}</div>;
		}
		let emailerror = <div className="error-hide"></div>;
		if(this.state.emailError){
			emailerror = <div className="error-show">{this.state.emailErrormsg}</div>;
		}
		let passerror = <div className="error-hide"></div>;
		if(this.state.passError){
			passerror = <div className="error-show">{this.state.passErrormsg}</div>;
		}

		let emailAddress = "";
		if(this.state.email !== "") {
			const emailArr = this.state.email.split("@");
			emailAddress = emailArr[0].substring(0, 3) + "***@" + emailArr[1];
		}

		return(
			<div id="newuser">
				<div className="container">
					<div className="logo">
						<img className="highreslogo" src={logo} alt="logo" onLoad={this.imageload}></img>
					</div>

					<div className="box">
						<div className="usercreated">
							<h3>Welcome to eyeLeague!</h3>
							<p>Follow the instructions in the e-mail, sent to {emailAddress}, to confirm your identity.</p>
							<div className="buttons" style={{marginTop: "30px"}}>
								<span onClick={this.props.goBack}>&#x2190; Back to login page.</span>
							</div>
						</div>

						<div className="createuser">
							<h3>Sign up</h3>
							<form onSubmit={this.submit}>

								<div className="user text">
									<label htmlFor="username">Användarnamn</label>
									<input style={this.state.username_style} id="username" type="text" onChange={this.username} onFocus={this.focus} onBlur={this.blurUser}></input>
									<p className="placeToLabel" style={this.state.userPlacehStyle} onClick={this.clickFieldText}>Username</p>
								</div>
								{usererror}
								<div className="email text">
									<label htmlFor="email">Email</label>
									<input style={this.state.email_style} id="email" type="text" onChange={this.email} onFocus={this.focus} onBlur={this.blurEmail}></input>
									<p className="placeToLabel" style={this.state.emailPlacehStyle} onClick={this.clickFieldText}>E-mail address</p>
								</div>
								{emailerror}
								<div className="pass1 text">
									<label htmlFor="password">Lösenord</label>
									<input style={this.state.password1_style} id="password1" type="password" onChange={this.password1} onFocus={this.focus} onBlur={this.blurPass1}></input>
									<p className="placeToLabel" style={this.state.pass1PlacehStyle} onClick={this.clickFieldText}>Password</p>
								</div>

								<div className="pass2 text">
									<label htmlFor="password">Lösenord</label>
									<input style={this.state.password2_style} id="password2" type="password" onChange={this.password2} onFocus={this.focus} onBlur={this.blurPass2}></input>
									<p className="placeToLabel" style={this.state.pass2PlacehStyle} onClick={this.clickFieldText}>Confirm password</p>
								</div>
								{passerror}
								<div className="buttons">
									<span onClick={this.props.goBack}>&#x2190; Back to login page.</span>
									<div className="submit" onClick={this.submitUser}>
										{submit}
										<input type="submit"></input>
									</div>
								</div>
							</form>
						</div>
					</div>

				</div>
			</div>
		);
	}
}

class LostCredentials extends Component {
	constructor(props){
		super(props);
		this.state = {
			email: "",
			email_style: {},
			loading: false,
			emailPlacehStyle: {},
			emailError: null,
			emailErrormsg: ""
		};

		this.email = this.email.bind(this);
		this.submitEmail = this.submitEmail.bind(this);
		this.focus = this.focus.bind(this);
		this.blurEmail = this.blurEmail.bind(this);
		this.clickFieldText = this.clickFieldText.bind(this);

		document.title = "Forgot your password? - eyeLeague";
	}

	clickFieldText(e) {
		e.currentTarget.parentNode.childNodes[1].focus();
	}

	focus(e) {
		e.preventDefault();
		e.currentTarget.parentNode.childNodes[2].className = 'placeToLabel';
		if(e.currentTarget.parentNode.className === "email text") {
			this.setState({emailPlacehStyle: {color: "#557a95"}, email_style: {borderColor: "#557a95"}});
		}
	}

	blurEmail(e) {
		e.preventDefault();
		if(!isEmail(e.target.value.toString()) && e.target.value.toString() !== "") {
			this.setState({
				email_style: {borderColor: "red"},
				emailPlacehStyle: {color: "red"},
				emailError: true,
				emailErrormsg: "Enter a valid e-mail address."
			});
		}
		else {
			this.setState({
				email_style: {borderColor: "#557a95"},
				emailPlacehStyle: {color: "#557a95"},
				emailError: false,
				emailErrormsg: ""
			});
		}

		if(document.querySelector(".email").childNodes[1].value.toString() === "") {
			e.currentTarget.parentNode.childNodes[2].className = 'placeh';
			this.setState({emailPlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}

		else {
			// this.setState({emailPlacehStyle: {color: "black"}});
		}
	}

	email(e) {
		e.preventDefault();
		this.focus(e);

		if(e.target.value.toString().length === 40) {
			let remove = e.target.value.toString().slice(0, -1);
			e.target.value = remove;
			this.setState({email: remove, email_style: {}, emailPlacehStyle: {}, emailError: false});
		}
		else {
			this.setState({email: e.target.value, email_style: {}, emailPlacehStyle: {}, emailError: false});
		}
  }

	submitEmail(e){
		e.preventDefault();

		if(this.state.email === "") {
			if(this.state.email === ""){this.setState({email_style: {borderColor: "red", transition: "border-color 1s"}, emailPlacehStyle: {color: "red"}});}
			return;
		}

		if(!isEmail(this.state.email)) {
			this.setState({
				email_style: {borderColor: "red"},
				emailPlacehStyle: {color: "red"},
				emailError: true,
				emailErrormsg: "Enter a valid e-mail address."
			});
			return;
		}

		if(this.state.emailError === true) {
			return;
		}

		this.setState({loading: true});
		fetch(settings.api + "login/?email=" + this.state.email, {
            method: "PATCH",
            credentials: "include"
        })
		.then(response => response.json())
		.then(response => {
			console.log(response);
			this.setState({loading: false});
            if(response.email === true) {
              document.querySelector(".usercreated").style.display = "block";
              document.querySelector(".createuser").style.display = "none";
            }
						else {
							this.setState({
								email_style: {borderColor: "red"},
								emailPlacehStyle: {color: "red"},
								emailError: true,
								emailErrormsg: "The e-mail address doesn't seem to be linked to any account."
							});
						}
		});
	}

	componentDidMount() {
		this.setState({email: document.querySelector(".email").childNodes[1].value.toString()});

		if(document.querySelector(".email").childNodes[1].value.toString() === "") {
			document.querySelector(".email").childNodes[2].className = 'placeh';
			this.setState({emailPlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}
		else {
			this.setState({emailPlacehStyle: {color: "#557a95"}});
		}
	}

	render() {
		let submit = "Send";
		if(this.state.loading){
			submit = <div className="loading"></div>;
		}

		let emailerror = <div className="error-hide"></div>;
		if(this.state.emailError){
			emailerror = <div className="error-show">{this.state.emailErrormsg}</div>;
		}

		let emailAddress = "";
		if(this.state.email !== "") {
			const emailArr = this.state.email.split("@");
			emailAddress = emailArr[0].substring(0, 3) + "***@" + emailArr[1];
		}

		return(
			<div id="newuser">
				<div className="container">
					<div className="logo">
						<img className="highreslogo" src={logo} alt="logo" onLoad={this.imageload}></img>
					</div>

					<div className="box">
						<div className="usercreated">
							<h3>Reset your password</h3>
							<p>Follow the instructions in the e-mail, sent to {emailAddress}, to change your password.</p>
							<div className="buttons" style={{marginTop: "30px"}}>
								<span onClick={this.props.goBack}>&#x2190; Back to login page.</span>
							</div>
						</div>

						<div className="createuser">
							<h3>Reset your password</h3>
							<div className="infoText">
								Enter your e-mail address and we will send you a link to reset your password.
							</div>
							<form onSubmit={this.submit}>
								<div className="email text">
									<label htmlFor="email">Email</label>
									<input style={this.state.email_style} id="email" type="text" onChange={this.email} onFocus={this.focus} onBlur={this.blurEmail}></input>
									<p className="placeToLabel" style={this.state.emailPlacehStyle} onClick={this.clickFieldText}>E-mail address</p>
								</div>
								{emailerror}
								<div className="buttons">
									<span onClick={this.props.goBack}>&#x2190; Back to login page.</span>
									<div className="submit" onClick={this.submitEmail}>
										{submit}
										<input type="submit"></input>
									</div>
								</div>
							</form>
						</div>
					</div>

				</div>
			</div>
		);
	}
}

class NewPassword extends Component {
	constructor(props){
		super(props);
		this.state = {
			password1: "",
			password2: "",
			password1_style: {},
			password2_style: {},
			loading: false,
			loadPage: true,
			pass1PlacehStyle: {},
			pass2PlacehStyle: {},
			passError: null,
			passErrormsg: "",
			accountFound: false,
			username: ""
		};

    this.password1 = this.password1.bind(this);
    this.password2 = this.password2.bind(this);
		this.submitPassword = this.submitPassword.bind(this);
		this.focus = this.focus.bind(this);
		this.blurPass1 = this.blurPass1.bind(this);
		this.blurPass2 = this.blurPass2.bind(this);
		this.clickFieldText = this.clickFieldText.bind(this);
		this.fetchData = this.fetchData.bind(this);
		this.checkGoBack = this.checkGoBack.bind(this);

		document.title = "Change password - eyeLeague";
		this.fetchData();
	}

	fetchData() {
		fetch(settings.api + "login/?hash=" + this.props.hash, {
            method: "PATCH",
            credentials: "include"
        })
		.then(response => response.json())
		.then(response => {
			console.log(response);
			this.setState({loadPage: false});
			if(response.password === true) {
				this.setState({
					accountFound: true,
					username: response.username
				});
			}
		});
	}

	async checkGoBack() {
		await this.fetchData();
		if(this.state.accountFound === false) {
			this.props.goBack();
		}
	}

	clickFieldText(e) {
		e.currentTarget.parentNode.childNodes[1].focus();
	}

	focus(e) {
		e.preventDefault();
		e.currentTarget.parentNode.childNodes[2].className = 'placeToLabel';
		if(e.currentTarget.parentNode.className === "pass1 text") {
			this.setState({pass1PlacehStyle: {color: "#557a95"}, password1_style: {borderColor: "#557a95"}});
		}
		else if(e.currentTarget.parentNode.className === "pass2 text") {
			this.setState({pass2PlacehStyle: {color: "#557a95"}, password2_style: {borderColor: "#557a95"}});
		}
	}

	blurPass1(e) {
		e.preventDefault();
		if(e.target.value.toString() !== document.querySelector(".pass2").childNodes[1].value.toString()) {
			this.setState({
				password2_style: {borderColor: "red"},
				pass2PlacehStyle: {color: "red"},
				password1_style: {borderColor: "red"},
				pass1PlacehStyle: {color: "red"},
				passError: true,
				passErrormsg: "Fälten måste matcha varandra."
			});
		}

		else {
			this.setState({
				password1_style: {borderColor: "#557a95"},
				pass1PlacehStyle: {color: "#557a95"},
				passError: false
			});
		}

		if(document.querySelector(".pass1").childNodes[1].value.toString() === "") {
			e.currentTarget.parentNode.childNodes[2].className = 'placeh';
			this.setState({pass1PlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}

		else {
			// if(this.state.passError) {this.setState({pass1PlacehStyle: {color: "red"}});}
			// else {this.setState({pass1PlacehStyle: {color: "black"}});}
		}
	}

	blurPass2(e) {
		e.preventDefault();
		if(e.target.value.toString() !== document.querySelector(".pass1").childNodes[1].value.toString()) {
			this.setState({
				password2_style: {borderColor: "red"},
				pass2PlacehStyle: {color: "red"},
				password1_style: {borderColor: "red"},
				pass1PlacehStyle: {color: "red"},
				passError: true,
				passErrormsg: "Fälten måste matcha varandra."
			});
		}

		else {
			this.setState({
				password2_style: {borderColor: "#557a95"},
				pass2PlacehStyle: {color: "#557a95"},
				passError: false
			});
		}

		if(document.querySelector(".pass2").childNodes[1].value.toString() === "") {
			e.currentTarget.parentNode.childNodes[2].className = 'placeh';
			this.setState({pass2PlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});
		}

		else {
			// if(this.state.passError) {this.setState({pass2PlacehStyle: {color: "red"}});}
			// else {this.setState({pass2PlacehStyle: {color: "black"}});}
		}
	}

  password1(e) {
		e.preventDefault();
		this.focus(e);

		if(e.target.value.toString().length === 40) {
			let remove = e.target.value.toString().slice(0, -1);
			e.target.value = remove;
			this.setState({password1: remove, password1_style: {}, pass1PlacehStyle: {}, passError: false});
		}
		else {
			this.setState({password1: e.target.value, password1_style: {}, pass1PlacehStyle: {}, passError: false});
		}

		if(e.target.value.toString() === document.querySelector(".pass2").childNodes[1].value.toString()) {
			this.setState({
				password2_style: {},
				pass2PlacehStyle: {},
				password1_style: {},
				pass1PlacehStyle: {},
				passError: false
			});
			if(document.querySelector(".pass2").childNodes[1].value.toString() !== "") {this.setState({pass2PlacehStyle: {color: "#557a95"}});}
			else {this.setState({pass2PlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});}
		}
  }

  password2(e){
		e.preventDefault();
		this.focus(e);

		if(e.target.value.toString().length === 40) {
			let remove = e.target.value.toString().slice(0, -1);
			e.target.value = remove;
			this.setState({password2: remove, password2_style: {}, pass2PlacehStyle: {}, error: false});
		}
		else {
			this.setState({password2: e.target.value, password2_style: {}, pass2PlacehStyle: {}, error: false});
		}

		if(e.target.value.toString() === document.querySelector(".pass1").childNodes[1].value.toString()) {
			this.setState({
				password2_style: {},
				pass2PlacehStyle: {},
				password1_style: {},
				passError: false
			});
			if(document.querySelector(".pass1").childNodes[1].value.toString() !== "") {this.setState({pass1PlacehStyle: {color: "#557a95"}});}
			else {this.setState({pass1PlacehStyle: {color: "rgba(85, 122, 149, 0.4)"}});}
		}
  }

	submitPassword(e){
		e.preventDefault();

		if(this.state.password1 === "" || this.state.password2 === "") {
			if(this.state.password1 === ""){this.setState({password1_style: {borderColor: "red", transition: "border-color 1s"}, pass1PlacehStyle: {color: "red"}});}
			if(this.state.password2 === ""){this.setState({password2_style: {borderColor: "red", transition: "border-color 1s"}, pass2PlacehStyle: {color: "red"}});}
			return;
		}

		if(this.state.password1 !== this.state.password2) {
			this.setState({passErrormsg: "Fälten måste matcha varandra.", passError: true});
			this.setState({password2_style: {borderColor: "red", transition: "border-color 1s"}});
			return;
		}

		if(this.state.passError === true) {
			return;
		}

		this.setState({loading: true});
		fetch(settings.api + "login/?username=" + this.state.username + "&nPass=" + this.state.password1 + "&oPassHash=" + this.props.hash, {
            method: "PATCH",
            credentials: "include"
        })
		.then(response => response.json())
		.then(response => {
			console.log(response);
			this.setState({loading: false});
      document.querySelector(".usercreated").style.display = "block";
      document.querySelector(".createuser").style.display = "none";
		});
	}

	render() {
		let content;
		let submit = "Change password";
		if(this.state.loading){
			submit = <div className="loading"></div>;
		}

		let passerror = <div className="error-hide"></div>;
		if(this.state.passError){
			passerror = <div className="error-show">{this.state.passErrormsg}</div>;
		}

		if(this.state.loadPage) {
			return (
				<div id="newuser">
					<div className="container">
						<div className="logo">
							<img className="highreslogo" src={logo} alt="logo" onLoad={this.imageload}></img>
						</div>

						<div className="box">
							<div className="content">
								<div className="loading"></div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		console.log(this.state.accountFound);
		if(this.state.accountFound) {
			content = (
				<div>
					<h3>Hi {this.state.username}!</h3>
					<div className="infoText">Enter your new password below.</div>
					<form onSubmit={this.submit}>
						<div className="pass1 text">
							<label htmlFor="password">Password</label>
							<input style={this.state.password1_style} id="password1" type="password" onChange={this.password1} onFocus={this.focus} onBlur={this.blurPass1}></input>
							<p className="placeToLabel" style={this.state.pass1PlacehStyle} onClick={this.clickFieldText}>New Password</p>
						</div>
						<div className="pass2 text">
							<label htmlFor="password">Confirm password</label>
							<input style={this.state.password2_style} id="password2" type="password" onChange={this.password2} onFocus={this.focus} onBlur={this.blurPass2}></input>
							<p className="placeToLabel" style={this.state.pass2PlacehStyle} onClick={this.clickFieldText}>Confirm password</p>
						</div>
						{passerror}
						<div className="buttons">
							<span onClick={this.props.goBack}>&#x2190; Back to login page.</span>
							<div className="submit" onClick={this.submitPassword}>
								{submit}
								<input type="submit"></input>
							</div>
						</div>
					</form>
				</div>
			)
		}
		else {
			this.checkGoBack();
		}

		return(
			<div id="newuser">
				<div className="container">
					<div className="logo">
						<img className="highreslogo" src={logo} alt="logo" onLoad={this.imageload}></img>
					</div>

					<div className="box">
						<div className="usercreated">
							<h3>Ditt lösenord har nu ändrats.</h3>
							<div className="buttons" style={{marginTop: "30px"}}>
								<span onClick={this.props.goBack}>&#x2190; Tillbaka till inloggning.</span>
							</div>
						</div>

						<div className="createuser">
							{content}
						</div>
					</div>

				</div>
			</div>
		);
	}
}

export default Login;
