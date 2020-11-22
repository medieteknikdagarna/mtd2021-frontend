import emailjs from "emailjs-com";
import React, { Component, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink as Link } from "react-router-dom";

import home from "../components/content/home.json";
import general from "../components/content/general.json";
import companyInformation from "../components/content/companyInformation.json";
import settings from "../settings.json";

import group from "../components/content/group.json";

import "../css/home.scss";

// --------------------------------------------
// ------------ make inside module ------------
// --------------------------------------------
var silverCompanies = [];
var goldCompanies = [];

for (let i = companyInformation.companies.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [companyInformation.companies[i], companyInformation.companies[j]] = [
    companyInformation.companies[j],
    companyInformation.companies[i],
  ];
}

companyInformation.companies.forEach((item, index) => {
  if (item.level === "gold" && item.show === true) {
    let pic = require(`../bilder/placeholder.jpg`);

    try {
      pic = require(`../bilder/companies/${item.level}/${item.img}`);
    } catch (ex) {
      console.log(ex);
    }

    // goldCompanies.push({
    //   name: item.name,
    //   img: pic,
    //   description: {
    //     sv: item.description.sv,
    //     en: item.description.en,
    //   },
    //   inURL: item.inURL,
    // });
  } else if (item.level === "silver" && item.show === true) {
    let pic = require(`../bilder/placeholder.jpg`);

    try {
      pic = require(`../bilder/companies/${item.level}/${item.img}`);
    } catch (ex) {
      console.log("loading placeholder image for " + item.name);
    }

    // silverCompanies.push({
    //   name: item.name,
    //   img: pic,
    //   inURL: item.inURL,
    // });
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
      email: "",
      success: "0",
      opacity: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.checkEmail = this.showSuccess.bind(this);
  }

  handleScroll(e = null) {
    // const scrollValue = window.scrollY;
    let beamerSharebar = document.getElementById("beamerSharebar");
    let homeChevron_down = document.getElementById("homeChevron_down");

    // if(scrollValue < 1300) {
    // 	let beamerAnimation_move = this.state.beamerAnimation_move;
    // 	let beamerAnimation_opacity = this.state.beamerAnimation_opacity;
    // 	let beamerAnimation_info_move = this.state.beamerAnimation_info_move;

    // 	beamerAnimation_move = 100 - scrollValue/16;
    // 	beamerAnimation_opacity = (100 - scrollValue/35) / 100;
    // 	beamerAnimation_info_move = -scrollValue * 0.4;

    // 	this.setState({ beamerAnimation_move, beamerAnimation_opacity, beamerAnimation_info_move });
    // }

    // if(scrollValue > 1300) {
    // 	let beamerAnimation_opacity = this.state.beamerAnimation_opacity;

    // 	beamerAnimation_opacity = (100 - scrollValue/35) / 100;
    // 	beamerAnimation_opacity = beamerAnimation_opacity < 0 ? 0 : beamerAnimation_opacity;

    // 	this.setState({ beamerAnimation_opacity });
    // }

    if (window.scrollY > 0) {
      beamerSharebar.classList.add("after");
      homeChevron_down.classList.add("after");
    } else {
      beamerSharebar.classList.remove("after");
      homeChevron_down.classList.remove("after");
    }
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

  showSuccess = () => {
    this.setState({
      success: "100px",
      opacity: 1,
    });
    setTimeout(() => {
      this.setState({
        success: "0",
        opacity: 0,
      });
    }, 3000);
  };

  sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "gmail",
        "template_y0onmh7",
        e.target,
        "user_7SAv3fMO0PxYm9jAg5tyJ"
      )
      .then(
        (result) => {
          console.log(result.text);
          this.showSuccess();
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  checkEmail(event) {
    this.setState({ email: event.target.value });
    console.log(this.state.email);
    // don't remember from where i copied this code, but this works.
    //let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // if (re.test(email)) {
    //   console.log("giltig");
    //   // this is a valid email address
    //   // call setState({email: email}) to update the email
    //   // or update the data in redux store.
    // } else {
    //   console.log("inte giltig");
    //   // invalid email, maybe show an error to the user.
    // }
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

    // EMAIL
    let email = `mailto: ${group.business.email}`;

    return (
      <div id="homeWrap">
        <div id="success">
          <div id="successInnerDiv" style={{ height: this.state.success }}>
            <p style={{ opacity: this.state.opacity }}>
              {home[this.state.lang].successMessage}
            </p>
          </div>
        </div>
        <div
          id="beamerImage"
          style={
            {
              // backgroundPosition: `50% ${this.state.beamerAnimation_move}%`,
              // opacity: this.state.beamerAnimation_opacity
            }
          }
        />
        <div id="beamerWrap">
          <div
            id="beamerInfo"
            style={
              {
                // transform: `translate(0, ${this.state.beamerAnimation_info_move}px)`,
                // opacity: this.state.beamerAnimation_opacity
              }
            }
          >
            <h3>{general[this.state.lang].name + " " + general.year}</h3>
            <h2>{general[this.state.lang].date}</h2>
            <h3>{general.time}</h3>
            <h3>{general.city}</h3>
          </div>
          <footer id="beamerSharebar">
            <div className="footCont">
              <p>{general[this.state.lang].follow}:</p>
              <a
                href="https://facebook.com/medieteknikdagarna"
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
                href="https://www.instagram.com/medieteknikdagarna/"
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

          <div id="generalInfo">
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
                //value={this.state.email}
                //onChange={this.checkEmail()}
                required
              />
              <input type="submit" value="Kontakta mig!" />
            </form>
          </div>

          <div className="deadspace" />

          {/* <h1 className="stickyHeading">
            {home[this.state.lang].partnerTitle}
          </h1>
          <div id="partners">{goldComp}</div> */}

          {/* <div id="silverPartners">
            <h2>{home[this.state.lang].silverPartnersTitle}</h2>
            <div className="silverPartners">{silverComp}</div>
          </div> */}
        </div>

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
