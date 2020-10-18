import React, { Component } from "react";

import { NavLink as Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import settings from "../settings.json";
import content from "./content/footer.json";
import general from "./content/general.json";

import "../css/footer.scss";

import mtLogo from "../bilder/MTlogo_black.png";

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: props.lang,
      navSelect: props.navSelect,
      loggedin: props.loggedin,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.lang !== prevProps.lang) {
      this.setState({
        lang: this.props.lang,
        flag: require(`../bilder/flags/${
          this.props.lang === "sv" ? "en" : "sv"
        }.svg`),
      });
    }

    if (this.props.navSelect !== prevProps.navSelect) {
      this.setState({
        navSelect: this.props.navSelect,
      });
    }

    if (this.props.loggedin !== prevProps.loggedin) {
      this.setState({
        loggedin: this.props.loggedin,
      });
    }
  }

  render() {
    let aboutLink;
    let contactLink;

    if (this.state.navSelect[3] !== "about" && this.state.navSelect[4] === "") {
      aboutLink = (
        <li>
          <Link to={settings.url + "about/"}>
            {content[this.state.lang].about}
          </Link>
        </li>
      );
    }
    if (this.state.navSelect[3] !== "contact") {
      contactLink = (
        <li>
          <Link to={settings.url + "contact/"}>
            {content[this.state.lang].contact}
          </Link>
        </li>
      );
    }

    let account;

    // if(!this.state.loggedin) {
    // 	account= (
    // 		<li>
    // 			<Link to={settings.url + "login"} id="accountIcon">
    // 				<i class="fa fa-user-circle" aria-hidden="true"></i>
    // 				{content[this.state.lang].login}
    // 			</Link>
    // 		</li>
    // 	);
    // }

    return (
      <div id="footer">
        <footer>
          <div className="content">
            <a
              href="https://medieteknik.nu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={mtLogo} alt="MT logo"></img>
            </a>
          </div>

          <div className="content">
            <ul>
              <li>{general[this.state.lang].shortInfo}</li>
              <li>
                <a
                  href="https://github.com/medieteknikdagarna/mtd2020-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content[this.state.lang].openSource}
                </a>
              </li>
              <li>
                <Link
                  to={
                    settings.url +
                    general[this.state.lang].acceptPolicyLink.url +
                    "/"
                  }
                >
                  {content[this.state.lang].privacyPol}
                </Link>
              </li>
            </ul>
          </div>

          <div className="content">
            <ul>
              <li className="fakeLink" onClick={this.props.toggleLanguage}>
                {content[this.state.lang].changeLang}
              </li>
              {aboutLink}
              {contactLink}
              {account}
            </ul>
          </div>

          <div className="content">
            <ul>
              <li>
                {`${general[this.state.lang].name} ${general.year} - ${
                  general[this.state.lang].date
                }`}
              </li>
              <li>
                Linköpings Universitet, Campus Norrköping, Bredgatan 34,
                Norrköping
              </li>
            </ul>
          </div>

          <div className="content">
            <ul>
              <li>{general[this.state.lang].follow}</li>
              <li>
                <a
                  href="https://facebook.com/medieteknikdagarna"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={["fab", "facebook-square"]}
                    className="fa"
                  ></FontAwesomeIcon>
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/mtdagarna"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={["fab", "youtube-square"]}
                    className="fa"
                  ></FontAwesomeIcon>
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/medieteknikdagarna/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={["fab", "instagram"]}
                    className="fa"
                  ></FontAwesomeIcon>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/medieteknikdagarna-2014/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={["fab", "linkedin"]}
                    className="fa"
                  ></FontAwesomeIcon>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
