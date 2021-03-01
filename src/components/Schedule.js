import emailjs from "emailjs-com";
import React, { Component, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink as Link } from "react-router-dom";

import home from "../components/content/home.json";
import general from "../components/content/general.json";
import eventInformation from "../components/content/companyInformation.json";
import settings from "../settings.json";

import group from "../components/content/group.json";

//import "../css/home.scss";
import "../css/schedule.scss";

// --------------------------------------------
// ------------ make inside module ------------
// --------------------------------------------

var silverCompanies = [];
var goldCompanies = [];

for (let i = eventInformation.companies.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [eventInformation.companies[i], eventInformation.companies[j]] = [
    eventInformation.companies[j],
    eventInformation.companies[i],
  ];
}

eventInformation.companies.forEach((item, index) => {
  if (item.level === "gold" && item.show === true) {
    let pic = require(`../bilder/placeholder.jpg`);

    try {
      pic = require(`../bilder/companies/${item.level}/${item.img}`);
    } catch (ex) {
      console.log(ex);
    }

    goldCompanies.push({
      name: item.name,
      img: pic,
      description: {
        sv: item.description.sv,
        en: item.description.en,
      },
      inURL: item.inURL,
    });
  } else if (item.level === "silver" && item.show === true) {
    let pic = require(`../bilder/placeholder.jpg`);

    try {
      pic = require(`../bilder/companies/${item.level}/${item.img}`);
    } catch (ex) {
      console.log("loading placeholder image for " + item.name);
    }

    silverCompanies.push({
      name: item.name,
      img: pic,
      inURL: item.inURL,
    });
  }
});

// --------------------------------------------
// --------------------------------------------
// --------------------------------------------

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: props.lang,
      beamerAnimation_move: 100,
      beamerAnimation_opacity: 1,
      beamerAnimation_info_move: 0,
      formButton: false,
      opacity: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(e = null) {
    // const scrollValue = window.scrollY;
  }

  async componentDidMount() {
    await window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.setState({
        lang: this.props.lang,
      });
    }
  }

  render() {
    let silverComp = silverCompanies.map((item, index) => {
      return (
        <div className="partnerWrap" key={index}>
          <Link
            to={settings.url + "companies/" + item.inURL}
            className="partner"
          >
            <img className="partnerLogo" src={item.img} alt={item.name} />
          </Link>
        </div>
      );
    });

    let goldComp = goldCompanies.map((item, index) => {
      let description = item.description[this.state.lang];

      if (description.length > 300) {
        description = description.substring(0, 286) + "...";
      }

      description = description
        .split("\n")
        .map((item, i) => <p key={i}>{item}</p>);
      description.push(
        <p
          className="readMore"
          style={{ color: "#ccc" }}
          key={description.length}
        >
          {home[this.state.lang].press}
        </p>
      );

      return (
        <div className="partnerWrap" key={index}>
          <Link
            to={settings.url + "companies/" + item.inURL}
            className="partner"
          >
            <img className="partnerLogo" src={item.img} alt={item.name} />
            <div className="partnerInfo">
              {/*}<h1>{arr[index]}</h1>{*/}
              {description}
            </div>
          </Link>
        </div>
      );
    });

    return (
      <div id="homeWrap">
        <div
          id="background"
          style={
            {
              // backgroundPosition: `50% ${this.state.beamerAnimation_move}%`,
              // opacity: this.state.beamerAnimation_opacity
            }
          }
        />
        <div id="beamerWrap">
          <h2>Schema</h2>
          <div
            id="beamerInfo"
            style={
              {
                // transform: `translate(0, ${this.state.beamerAnimation_info_move}px)`,
                // opacity: this.state.beamerAnimation_opacity
              }
            }
          >
            <h2>{general[this.state.lang].name + " " + general.year}</h2>
            <h3>{general[this.state.lang].date}</h3>
            {/* <h3>{general.time}</h3> */}
            {/* <h3>{general.city}</h3> */}
          </div>

          <footer id="beamerSharebar">
            <div className="footCont">
              <p>{general[this.state.lang].follow}:</p>
              <a
                href="https://www.facebook.com/medieteknikdagen"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={["fab", "facebook-square"]}
                  className="fa"
                ></FontAwesomeIcon>
                <p>facebook</p>
              </a>
              <a
                href="https://youtube.com/mtdagarna"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={["fab", "youtube-square"]}
                  className="fa"
                ></FontAwesomeIcon>
                <p>youtube</p>
              </a>
              <a
                href="https://www.instagram.com/medieteknikdagen/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={["fab", "instagram"]}
                  className="fa"
                ></FontAwesomeIcon>
                <p>instagram</p>
              </a>
              <a
                href="https://www.linkedin.com/company/medieteknikdagarna-2014/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={["fab", "linkedin"]}
                  className="fa"
                ></FontAwesomeIcon>
                <p>linkedin</p>
              </a>
            </div>
          </footer>
          <div id="homeChevron_down" className="chevron">
            <FontAwesomeIcon
              icon="chevron-down"
              className="fa"
            ></FontAwesomeIcon>
          </div>
        </div>

        <div id="landingContent">
          <div
            id="generalInfo"
            style={
              {
                // top: `${this.state.generalInfo_move}px`
                // transform: `translate(0, ${this.state.beamerAnimation_info_move}px)`
              }
            }
          >
            <h1>
              <span id="welcomeTextTitle">{home[this.state.lang].welcome}</span>
            </h1>
            <p>
              <span>
                {home[this.state.lang].welcomeText}
                <Link to={settings.url + "about/"}>
                  {home[this.state.lang].welcomeReadMore}
                </Link>
              </span>
            </p>
          </div>

          {/* MAIL FORM */}
          {/* <div id="generalInfo">
              <h1>
                <span id="textTitle">{home[this.state.lang].companyTitle}</span>
              </h1>
              <p>
                <span>
                  {home[this.state.lang].companyText1}
                  <a className="mailTo" href={email}>
                    {group.business.email}
                  </a>
                </span>
              </p>
              <br></br>
              <p>
                <span>{home[this.state.lang].companyText2}</span>
              </p>
              <form onSubmit={this.sendEmail}>
                <input
                  placeholder={home[this.state.lang].inputField}
                  type="email"
                  id="email_input"
                  name="email_input"
                  required
                />
                <input type="submit" value={home[this.state.lang].buttonText} />
              </form>
            </div> */}

          <div className="deadspace" />

          <h1 className="stickyHeading">
            {home[this.state.lang].partnerTitle}
          </h1>
          <div id="partners">{goldComp}</div>

          <div id="silverPartners">
            <h2>{home[this.state.lang].silverPartnersTitle}</h2>
          </div>
          <div className="silverPartners">{silverComp}</div>
        </div>
        <div className="deadspace"></div>

        {/*}
          <div id="newsContainer">
            <div id="newsPreview">
              <h1>{home[this.state.lang].newsTitle}</h1>
            </div>
          </div>
          {*/}
      </div>
    );
  }
}

export default Home;
