import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import settings from "../settings.json";

class Logout extends Component {
    constructor(){
        super();

        this.state = {logout: false};

        fetch(settings.api + "logout/", {
            method: "POST",
            credentials: "include"
        }).then(() => {
            this.setState({logout: true});
        });
    }

    render() {
        if(this.state.logout){
            return <Redirect to={settings.url + "login/"} />;
        }
    	return(<div id="root-loading"><div className="root-spinner"></div></div>);
	}
}

export default Logout;
