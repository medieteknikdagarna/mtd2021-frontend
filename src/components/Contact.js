import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink as Link } from "react-router-dom";

import GlobalMaps from "./GlobalMaps";

import "../css/contact.scss";

// import general from "../components/content/general.json";
import content from "../components/content/contact.json";
import group from "../components/content/group.json";
import settings from "../settings.json";

import webLogos from "../sharedMedia/MTD_logotyp_webb.zip";
import printLogos from "../sharedMedia/MTD_logotyp_tryck.zip";

const groupMembers = [
  "manager",
  "economy",
  "business",
  "fair",
  "assistant",
  "lecture",
  "banquet",
  "tech",
  "pr",
  "coordinator",
  "web",
  "app",
  "print",
];

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: props.lang,
      nav: 0,
      containerWidth: [100, 0, 0],
      containerHeight: 0,
      wrapWidth: 0,
    };

    this.handleResize = this.handleResize.bind(this);
    this.determineNav = this.determineNav.bind(this);
  }

  handleResize(e) {
    const wrapWidth = document.getElementById("wrapper").clientWidth;
    this.setState({ wrapWidth });
    this.determineNav();
  }

  determineNav() {
    let error = false;
    let nav = 0;

    switch (this.props.match.params.subpage) {
      case undefined:
      case "":
        break;
      case "group":
        nav = 1;
        break;
      case "press":
        nav = 2;
        break;
      default:
        error = true;
        this.props.history.push("/error");
        return;
    }

    if (!error) {
      let containerWidth = this.state.containerWidth;
      let containerHeight = this.state.containerHeight;
      switch (nav) {
        case 0:
          containerWidth = [100, 0, 0];
          containerHeight = document.getElementById("generalContentContainer")
            .scrollHeight;
          break;
        case 1:
          containerHeight = document.getElementById("groupContentContainer")
            .scrollHeight;
          containerWidth = [0, 100, 0];
          break;
        case 2:
          containerHeight = document.getElementById("pressContentContainer")
            .scrollHeight;
          containerWidth = [0, 0, 100];
          break;
        default:
          containerWidth = [100, 0, 0];
          containerHeight = document.getElementById("generalContentContainer")
            .scrollHeight;
          break;
      }

      this.setState({ nav, containerWidth, containerHeight });
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);

    this.determineNav();
    const wrapWidth = document.getElementById("wrapper").clientWidth;
    this.setState({ wrapWidth });

    document.body.style.overflowX = "auto";
    document.body.style.overflowY = "scroll";
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.setState({ lang: this.props.lang });
    }
    if (prevProps.match.params.subpage !== this.props.match.params.subpage) {
      this.setState({ subpage: this.props.match.params.subpage });
      this.determineNav();
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <div id="contactWrap">
        <div id="contactContent">
          <GeneralContent
            lang={this.state.lang}
            containerWidth={this.state.containerWidth[0]}
            containerHeight={this.state.containerHeight}
            wrapWidth={this.state.wrapWidth}
            determineNav={this.determineNav}
          />

          <GroupContent
            lang={this.state.lang}
            containerWidth={this.state.containerWidth[1]}
            containerHeight={this.state.containerHeight}
            wrapWidth={this.state.wrapWidth}
            determineNav={this.determineNav}
          />

          <PressContent
            lang={this.state.lang}
            containerWidth={this.state.containerWidth[2]}
            containerHeight={this.state.containerHeight}
            wrapWidth={this.state.wrapWidth}
            determineNav={this.determineNav}
          />
        </div>
      </div>
    );
  }
}

class GeneralContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: props.lang,
      containerWidth: props.containerWidth,
      containerHeight: props.containerHeight,
      wrapWidth: props.wrapWidth,
      navPosistion: null,
    };
  }

  async componentDidMount() {
    await window.scrollTo(0, 0);
    this.props.determineNav();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.setState({
        lang: this.props.lang,
      });
    }
    if (prevProps.containerWidth !== this.props.containerWidth) {
      this.setState({
        containerWidth: this.props.containerWidth,
      });
    }
    if (prevProps.wrapWidth !== this.props.wrapWidth) {
      this.setState({
        wrapWidth: this.props.wrapWidth,
      });
    }
    if (prevProps.containerHeight !== this.props.containerHeight) {
      this.setState({
        containerHeight: this.props.containerHeight,
      });
    }
  }

  render() {
    let questions = content[this.state.lang]["0"].questions.map(
      (item, index) => {
        let mail = `mailto: ${group[item.pos].email}`;
        return (
          <div className="question" key={index}>
            <h2>{item.title}</h2>
            <p>
              {item.body1 + group[item.pos].name.split(" ")[0] + item.body2}
            </p>
            <a className="mailTo" href={mail}>
              <FontAwesomeIcon icon={["fas", "paper-plane"]} className="fa" />
              {group[item.pos].email}
            </a>
          </div>
        );
      }
    );

    const fairManagerTel = `tel:${group.fair.tel}`;

    return (
      <div
        id="generalContentWrap"
        style={{
          width: `${this.state.containerWidth}%`,
          height: this.state.containerHeight,
        }}
      >
        <div
          id="generalContentContainer"
          style={{ width: this.state.wrapWidth }}
        >
          <div className="contentTitle">
            <h1>{content[this.state.lang]["0"].title}</h1>
          </div>

          <div id="questions">
            {questions}
            <Link to={settings.url + "contact/press/"} className="linkItem">
              <h2>{content[this.state.lang]["0"].linkToPress.title}</h2>
              <p>{content[this.state.lang]["0"].linkToPress.body}</p>
            </Link>
            <Link to={settings.url + "contact/group/"} className="linkItem">
              <h2>{content[this.state.lang]["0"].linkToGroup.title}</h2>
              <p>{content[this.state.lang]["0"].linkToGroup.body}</p>
            </Link>
          </div>

          <h1>{content[this.state.lang]["0"].addresses.title}</h1>
          <div id="maps">
            <div className="mapContainer">
              <GlobalMaps
                lang={this.state.lang}
                link={
                  "https://www.google.com/maps/place/Bredgatan+34,+602+21+Norrk%C3%B6ping,+Sverige/@58.5902,16.176455,17z/data=!4m5!3m4!1s0x46593bcaca24468f:0xb46627b69deb7113!8m2!3d58.5902002!4d16.1764545?hl=sv-SE"
                }
                zoom={16}
                center={[58.5902, 16.176455]}
                width={0.3}
                height={250}
              />
              <div className="address">
                <h2>
                  {content[this.state.lang]["0"].addresses.visiting.title}
                </h2>
                <p>{content[this.state.lang]["0"].addresses.visiting.info}</p>
                <p>
                  {content[this.state.lang]["0"].addresses.visiting.line1}
                  <br />
                  {content[this.state.lang]["0"].addresses.visiting.line2}
                  <br />
                  {content[this.state.lang]["0"].addresses.visiting.line3}
                </p>
              </div>
            </div>
            <div className="mapContainer">
              <GlobalMaps
                lang={this.state.lang}
                // link={"https://www.google.com/maps/place/K%C3%A5rhuset+Trappan/@58.589629,16.180517,15z/data=!4m5!3m4!1s0x0:0xb5407c6e2bcc6df9!8m2!3d58.589629!4d16.180517?hl=sv-SE"}
                link={
                  "https://www.google.com/maps/place/K%C3%A5rhuset+Trappan/@58.5900213,16.1776435,18.97z/data=!4m13!1m7!3m6!1s0x0:0x0!2zNTjCsDM1JzIzLjkiTiAxNsKwMTAnMzguMyJF!3b1!8m2!3d58.5899624!4d16.1773009!3m4!1s0x46593bb54bb2bab5:0xb5407c6e2bcc6df"
                }
                zoom={16}
                center={[58.5900213, 16.1776435]}
                width={0.3}
                height={250}
              />
              <div className="address">
                <h2>{content[this.state.lang]["0"].addresses.post.title}</h2>
                <p>
                  {content[this.state.lang]["0"].addresses.post.line1}
                  <br />
                  {content[this.state.lang]["0"].addresses.post.line2}
                  <br />
                  {content[this.state.lang]["0"].addresses.post.line3}
                  <br />
                  {content[this.state.lang]["0"].addresses.post.line4}
                  <br />
                  {content[this.state.lang]["0"].addresses.post.line5}
                </p>
              </div>
            </div>
            <div className="mapContainer">
              <GlobalMaps
                lang={this.state.lang}
                link={
                  "https://www.google.com/maps/place/Sandgatan+31,+602+47+Norrk%C3%B6ping,+Sverige/@58.590478,16.176271,15z/data=!4m5!3m4!1s0x46593bcaccb998cf:0xfd2f032a0b3e12c9!8m2!3d58.5904776!4d16.1762712?hl=sv-SE"
                }
                zoom={16}
                center={[58.590478, 16.176271]}
                width={0.3}
                height={250}
              />
              <div className="address">
                <h2>
                  {content[this.state.lang]["0"].addresses.delivery.title}
                </h2>
                <p>{content[this.state.lang]["0"].addresses.delivery.info}</p>
                <p>
                  {content[this.state.lang]["0"].addresses.delivery.line1}
                  <br />
                  {content[this.state.lang]["0"].addresses.delivery.line2_1}
                  {group.fair.name}
                  {content[this.state.lang]["0"].addresses.delivery.line2_2}
                  <a href={fairManagerTel}>{group.fair.tel}</a>
                  <br />
                  {content[this.state.lang]["0"].addresses.delivery.line3}
                  <br />
                  {content[this.state.lang]["0"].addresses.delivery.line4}
                  <br />
                  {content[this.state.lang]["0"].addresses.delivery.line5}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class GroupContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: props.lang,
      containerWidth: props.containerWidth,
      containerHeight: props.containerHeight,
      wrapWidth: props.wrapWidth,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.setState({ lang: this.props.lang });
    }
    if (prevProps.containerWidth !== this.props.containerWidth) {
      this.setState({ containerWidth: this.props.containerWidth });
    }
    if (prevProps.wrapWidth !== this.props.wrapWidth) {
      this.setState({ wrapWidth: this.props.wrapWidth });
    }
    if (prevProps.containerHeight !== this.props.containerHeight) {
      this.setState({ containerHeight: this.props.containerHeight });
    }
  }

  async componentDidMount() {
    await window.scrollTo(0, 0);

    try {
      const width = document.querySelector(".imageContainer").style.width;
      await this.setState({ imageHeight: width });
      this.props.determineNav();
    } catch (e) {}
  }

  render() {
    const groupContent = groupMembers.map((item, index) => {
      const email = `mailto:${group[item].email}`;
      const tel = `tel:${group[item].tel}`;

      return (
        <div className="personContainer" key={index}>
          <div className="person">
            <div className="imageContainer">
              <div
                className="image"
                style={{ backgroundImage: `url(${group[item].pic})` }}
                alt={group[item].pos[this.state.lang]}
              />
            </div>
            <div className="info">
              <h2>{group[item].name}</h2>
              <h3>{group[item].pos[this.state.lang]}</h3>
              <a href={email} target="_top">
                <FontAwesomeIcon icon={["fas", "paper-plane"]} className="fa" />
                {group[item].email}
              </a>
              <br />
              <a href={tel} target="_top">
                <FontAwesomeIcon icon={["fas", "phone-alt"]} className="fa" />
                {group[item].tel}
              </a>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div
        id="groupContentWrap"
        style={{
          width: `${this.state.containerWidth}%`,
          height: this.state.containerHeight,
        }}
      >
        <div id="groupContentContainer" style={{ width: this.state.wrapWidth }}>
          <Link to={settings.url + "contact/"} className="goBack">
            <FontAwesomeIcon
              icon={["fas", "chevron-circle-left"]}
              className="fa"
            />
          </Link>
          <div className="contentTitle">
            <h1>{content[this.state.lang]["1"].title}</h1>
            <p>{content[this.state.lang]["1"].info}</p>
          </div>

          <div id="groupInfo">
            <h1>{content[this.state.lang].theGroup}</h1>
            <div id="members">{groupContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

class PressContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: props.lang,
      containerWidth: props.containerWidth,
      containerHeight: props.containerHeight,
      wrapWidth: props.wrapWidth,
    };
  }

  async componentDidMount() {
    await window.scrollTo(0, 0);
    this.props.determineNav();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.setState({
        lang: this.props.lang,
      });
    }
    if (prevProps.containerWidth !== this.props.containerWidth) {
      this.setState({
        containerWidth: this.props.containerWidth,
      });
    }
    if (prevProps.wrapWidth !== this.props.wrapWidth) {
      this.setState({
        wrapWidth: this.props.wrapWidth,
      });
    }
    if (prevProps.containerHeight !== this.props.containerHeight) {
      this.setState({
        containerHeight: this.props.containerHeight,
      });
    }
  }

  render() {
    let body = content[this.state.lang]["2"].pressinfo.body
      .split("\n")
      .map((item, index) => {
        return <p key={index}>{item}</p>;
      });

    const prTel = `tel:${group.pr.tel}`;
    const prMail = `mailto: ${group.pr.email}`;

    return (
      <div
        id="pressContentWrap"
        style={{
          width: `${this.state.containerWidth}%`,
          height: this.state.containerHeight,
        }}
      >
        <div id="pressContentContainer" style={{ width: this.state.wrapWidth }}>
          <Link to={settings.url + "contact/"} className="goBack">
            <FontAwesomeIcon
              icon={["fas", "chevron-circle-left"]}
              className="fa"
            />
          </Link>
          <div className="contentTitle">
            <h1>{content[this.state.lang]["2"].title}</h1>
            <p>{content[this.state.lang]["2"].info}</p>
          </div>
          <div id="pressinfo">
            <div id="left">
              <h2>{content[this.state.lang]["2"].pressinfo.title}</h2>
              {body}
            </div>

            <div id="right">
              <h3>{content[this.state.lang]["2"].pressinfo.contact}</h3>
              <p>
                {group.pr.name}, {group.pr.pos[this.state.lang]}
              </p>
              <a href={prMail}>
                <FontAwesomeIcon icon={["fas", "paper-plane"]} className="fa" />
                {group.pr.email}
              </a>
              <br />
              <a href={prTel}>
                <FontAwesomeIcon icon={["fas", "phone-alt"]} className="fa" />
                {group.pr.tel}
              </a>
            </div>
          </div>
          <div id="below">
            <a className="download" href={webLogos} download>
              <FontAwesomeIcon icon={["fas", "download"]} className="fa" />
              {content[this.state.lang]["2"].logoWebTitle}
            </a>
            <a className="download" href={printLogos} download>
              <FontAwesomeIcon icon={["fas", "download"]} className="fa" />
              {content[this.state.lang]["2"].logoPrintTitle}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
