import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FacebookPlayer from "react-player/lib/players/Facebook";
import { isBrowser } from "react-device-detect";

import ImageCarousel from "./ImageCarousel";

import general from "../components/content/general.json";
import content from "../components/content/about.json";
import previous from "../components/content/previous.json";

import "../css/about.scss";
import imageCarouselStyles from "../css/wholeWidth_narrowHeight_ImageCarousel.module.scss";

// import mtLogo from '../bilder/MTlogo.png';
import mtdSphere from "../bilder/logo.svg";

// import fairpic1 from '../bilder/fairpictures/fairpic1.jpg';
// import fairpic2 from '../bilder/fairpictures/fairpic2.jpg';
// import fairpic3 from '../bilder/fairpictures/fairpic3.jpg';
// import fairpic4 from '../bilder/fairpictures/fairpic4.jpg';
// import fairpic5 from '../bilder/fairpictures/fairpic5.jpg';
// import fairpic6 from '../bilder/fairpictures/fairpic6.jpg';

// import lecturePic1 from '../bilder/lecturers/1.jpg';
// import lecturePic2 from '../bilder/lecturers/2.jpg';
// import lecturePic3 from '../bilder/lecturers/3.jpg';
// import lecturePic4 from '../bilder/lecturers/4.jpg';

import mtdSphereVideoAnimation from "../bilder/mtdSphereVideo/intro_snabbt_motionblur.mp4";
// import mtdSphereVideoAnimation_still from "../bilder/mtdSphereVideo/MTDSphereVideo_still.jpg";
import mtd21PrelBackground from "../bilder/omslagMobil.jpg";

var supportsWebP = (function () {
  var index = new Promise(function (resolve) {
    var image = new Image();
    image.onerror = function () {
      return resolve(false);
    };
    image.onload = function () {
      return resolve(image.width === 1);
    };
    image.src =
      "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";
  }).catch(function () {
    return false;
  });

  return index;
})();

let fairpics = "";
let lecturePics = "";
let mtLogo = "";
let mtdSphereVideoAnimation_still = "";

if (supportsWebP) {
  mtdSphereVideoAnimation_still = require("../bilder/mtdSphereVideo/MTDSphereVideo_still.webp");
  mtLogo = require("../bilder/MTlogo.webp");
  fairpics = [
    require("../bilder/fairpictures/fairpic1.webp"),
    require("../bilder/fairpictures/fairpic2.webp"),
    require("../bilder/fairpictures/fairpic3.webp"),
    require("../bilder/fairpictures/fairpic4.webp"),
    require("../bilder/fairpictures/fairpic5.webp"),
    require("../bilder/fairpictures/fairpic6.webp"),
  ];
  lecturePics = [
    require("../bilder/lecturers/1.webp"),
    require("../bilder/lecturers/2.webp"),
    require("../bilder/lecturers/3.webp"),
    require("../bilder/lecturers/4.webp"),
  ];
} else {
  mtdSphereVideoAnimation_still = require("../bilder/mtdSphereVideo/MTDSphereVideo_still.jpg");
  mtLogo = require("../bilder/MTlogo.png");
  fairpics = [
    require("../bilder/fairpictures/fairpic1.jpg"),
    require("../bilder/fairpictures/fairpic2.jpg"),
    require("../bilder/fairpictures/fairpic3.jpg"),
    require("../bilder/fairpictures/fairpic4.jpg"),
    require("../bilder/fairpictures/fairpic5.jpg"),
    require("../bilder/fairpictures/fairpic6.jpg"),
  ];
  lecturePics = [
    require("../bilder/lecturers/1.jpg"),
    require("../bilder/lecturers/2.jpg"),
    require("../bilder/lecturers/3.jpg"),
    require("../bilder/lecturers/4.jpg"),
  ];
}

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: props.lang,
      MTinfoSHOWN: false,
      width: null,
      scrollUpButtonStyle: { display: "none" },
      scrollInterval: null,
      nav: 0,
    };

    this.scrollUpButtonRef = React.createRef();

    this.determineNav = this.determineNav.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.isAtTopOfElement = this.isAtTopOfElement.bind(this);
    this.isAtMiddleOfElement = this.isAtMiddleOfElement.bind(this);
    this.isAtBottomOfElement = this.isAtBottomOfElement.bind(this);
    this.isAtTopOfPage = this.isAtTopOfPage.bind(this);
    this.isAtTopOfViewport = this.isAtTopOfViewport.bind(this);
  }

  determineNav() {
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
        this.props.history.push("/error");
        break;
    }

    // let containerWidth = this.state.containerWidth;
    // let containerHeight = this.state.containerHeight;
    // switch (nav) {
    // 	case 0:
    // 		containerWidth = [100, 0, 0];
    // 		containerHeight = document.getElementById("generalContentContainer").scrollHeight;
    // 		break;
    // 	case 1:
    // 		containerHeight = document.getElementById("groupContentContainer").scrollHeight;
    // 		containerWidth = [0, 100, 0];
    // 		break;
    // 	case 2:
    // 		console.log("hej");
    // 		containerHeight = document.getElementById("pressContentContainer").scrollHeight;
    // 		containerWidth = [0, 0, 100];
    // 		break;
    // 	default:
    // 		containerWidth = [100, 0, 0];
    // 		containerHeight = document.getElementById("generalContentContainer").scrollHeight;
    // 		break;
    // }

    this.setState({ nav });
  }

  handleResize(e = null) {
    return;
  }

  isAtTopOfElement(element) {
    return element.getBoundingClientRect().top <= window.innerHeight;
  }

  isAtMiddleOfElement(element) {
    return (
      element.getBoundingClientRect().bottom - element.clientHeight / 2 <=
      window.innerHeight
    );
  }

  isAtBottomOfElement(element) {
    return element.getBoundingClientRect().bottom <= window.innerHeight;
  }

  isAtTopOfPage(element) {
    return element.getBoundingClientRect().top <= 60;
  }

  isAtTopOfViewport(element) {
    return element.getBoundingClientRect().bottom <= 0;
  }

  handleScroll() {
    if (window.scrollY > 100) {
      this.scrollUpButtonRef.current.classList.remove("hidden");
    } else {
      this.scrollUpButtonRef.current.classList.add("hidden");
    }

    try {
      let aboutChevron_down = document.getElementById("aboutChevron_down");
      let mtinfo = document.getElementById("MTinfo");
      let reception = document.getElementById("reception");
      let lounge = document.getElementById("lounge");
      let competitions = document.getElementById("competitions");
      let infoBeam = document.getElementById("infoBeam");
      let lecturerTitleBig = document.getElementById("lecturerTitleBig");
      let lecturerTitleSmall = document.getElementById("lecturerTitleSmall");
      let lecturer_2 = document.getElementById("lecturer_2");
      let lecturer_3 = document.getElementById("lecturer_3");
      let lecturer_4 = document.getElementById("lecturer_4");

      if (window.scrollY > 0) {
        aboutChevron_down.classList.add("after");
      } else {
        aboutChevron_down.classList.remove("after");
      }

      if (this.isAtTopOfElement(mtinfo)) {
        mtinfo.classList.remove("before");
      } else {
        mtinfo.classList.add("before");
      }

      if (this.isAtTopOfElement(reception)) {
        reception.classList.remove("before");
      } else {
        reception.classList.add("before");
      }

      if (this.isAtTopOfElement(lounge)) {
        lounge.classList.remove("before");
      } else {
        lounge.classList.add("before");
      }

      if (this.isAtTopOfElement(competitions)) {
        competitions.classList.remove("before");
      } else {
        competitions.classList.add("before");
      }

      if (this.isAtTopOfElement(infoBeam)) {
        infoBeam.classList.remove("before");
      } else {
        infoBeam.classList.add("before");
      }

      if (this.isAtTopOfViewport(lecturerTitleBig)) {
        lecturerTitleSmall.classList.remove("before");
        lecturerTitleSmall.classList.add("after");
      } else {
        lecturerTitleSmall.classList.remove("after");
        lecturerTitleSmall.classList.add("before");
      }

      if (this.isAtTopOfPage(lecturer_2)) {
        lecturer_2.classList.remove("before");
      } else {
        lecturer_2.classList.add("before");
      }

      if (this.isAtTopOfPage(lecturer_3)) {
        lecturer_3.classList.remove("before");
      } else {
        lecturer_3.classList.add("before");
      }

      if (this.isAtTopOfPage(lecturer_4)) {
        lecturer_4.classList.remove("before");
      } else {
        lecturer_4.classList.add("before");
      }
    } catch (e) {}
  }

  async componentDidMount() {
    await window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);

    this.setState({ width: document.getElementById("wrapper").clientWidth });

    this.handleResize();

    // if (!isBrowser) {
    //   document.getElementById(
    //     "mtdSphereVideoContainer"
    //   ).style.backgroundImage = `url(${mtdSphereVideoAnimation_still})`;
    // }

    if (!isBrowser) {
      document.getElementById(
        "mtdSphereVideoContainer"
      ).style.backgroundImage = `url(${mtd21PrelBackground})`;
    }

    this.determineNav();
  }

  async componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);

    let scrollInterval = this.state.scrollInterval;
    clearTimeout(scrollInterval);
    await this.setState({ scrollInterval });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.setState({ lang: this.props.lang });
    }
    if (prevProps.match.params.subpage !== this.props.match.params.subpage) {
      this.setState({ subpage: this.props.match.params.subpage });
      this.determineNav();
    }
  }

  render() {
    let video = null;
    if (isBrowser) {
      video = (
        <video autoPlay muted preload="auto" playsInline id="mtdSphereVideo">
          <source src={mtdSphereVideoAnimation} type="video/mp4" />
        </video>
      );
    }

    return (
      <div id="aboutWrap">
        <div
          id="scrollUpButton"
          className="hidden"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          ref={this.scrollUpButtonRef}
        >
          <FontAwesomeIcon icon={["fas", "chevron-up"]} className="fa" />
        </div>
        {/* logo animation */}
        {/* <div id="mtdSphereVideoContainer">{video}</div> */}

        <div id="mtdSphereVideoContainer">
          <div id="mtdAboutCoverImg"></div>
        </div>

        <div
          id="aboutChevron_down"
          className="chevron"
          onClick={this.handleSectionScroll}
        >
          <FontAwesomeIcon icon="chevron-down" className="fa" />
        </div>

        <div id="MTDandMTinfo">
          <div id="MTDinfo" className="aboutinfo">
            <div className="content">
              <h1>
                {general[this.state.lang].name} {general.year}
              </h1>
              <p className="ingress">
                {content[this.state.lang].MTDinfo.ingress1}{" "}
                {general[this.state.lang].name}{" "}
                {content[this.state.lang].MTDinfo.ingress2}
                {/* {general.nameShort}{" "}
                {general.year}  */}
                {content[this.state.lang].MTDinfo.ingress3}
              </p>
              <p>
                {content[this.state.lang].MTDinfo.body1}
                <br />
                <br />
                {general.nameShort} {content[this.state.lang].MTDinfo.body2}
              </p>
            </div>
            <div className="image">
              <img src={mtdSphere} alt="MTD Sphere"></img>
            </div>
          </div>

          <div id="MTinfo" className="aboutinfo before">
            <div className="image">
              <img src={mtLogo} alt="MT logo"></img>
            </div>
            <div className="content">
              <h1>{content[this.state.lang].MTinfo.title}</h1>
              <p className="ingress">
                {content[this.state.lang].MTinfo.ingress}
              </p>
              <p>
                {content[this.state.lang].MTinfo.body1}
                <br />
                <br />
                {content[this.state.lang].MTinfo.body2}
                <br />
                <br />
                {content[this.state.lang].MTinfo.body3}{" "}
                <a
                  href={general.http + content[this.state.lang].MTinfo.link1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content[this.state.lang].MTinfo.link1}
                </a>
                {" " + content[this.state.lang].MTinfo.and}{" "}
                <a
                  href={general.http + content[this.state.lang].MTinfo.link2}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content[this.state.lang].MTinfo.link2}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="deadspace" />
        <div className="deadspace" />
        <div className="deadspace" />
        <div className="deadspace" />
        <div className="deadspace" />
        <div className="deadspace" />

        <div id="FAIRinfo">
          <div id="imageCarousel" className="imageCarousel before">
            <ImageCarousel
              fairpics={fairpics}
              styles={imageCarouselStyles}
              intervalTime={8000}
            />
          </div>

          <div id="reception" className="FAIRcontent sideBySide before">
            <FontAwesomeIcon icon={["fas", "concierge-bell"]} className="fa" />
            <h1>{content[this.state.lang].fairInfo["1"].title}</h1>
            <p>{content[this.state.lang].fairInfo["1"].body}</p>
          </div>

          <div className="deadspace" />
          <div className="deadspace" />

          <div id="lounge" className="FAIRcontent sideBySide before">
            <FontAwesomeIcon icon={["fas", "couch"]} className="fa" />
            <h1>{content[this.state.lang].fairInfo["2"].title}</h1>
            <p>{content[this.state.lang].fairInfo["2"].body}</p>
          </div>

          <div className="deadspace" />
          <div className="deadspace" />

          <div id="competitions" className="FAIRcontent sideBySide before">
            <FontAwesomeIcon icon={["fas", "medal"]} className="fa" />
            <h1>{content[this.state.lang].fairInfo["3"].title}</h1>
            <p>
              {content[this.state.lang].fairInfo["3"].body1}
              <a
                href={content[this.state.lang].fairInfo["3"].link1.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content[this.state.lang].fairInfo["3"].link1.text}
              </a>
              {content[this.state.lang].fairInfo["3"].body2}
              <a
                href={content[this.state.lang].fairInfo["3"].link2.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content[this.state.lang].fairInfo["3"].link2.text}
              </a>
              {content[this.state.lang].fairInfo["3"].body3}
            </p>
          </div>

          <div className="deadspace" />
          <div className="deadspace" />
          <div className="deadspace" />
          <div className="deadspace" />
          <div className="deadspace" />

          <div id="infoBeam" className="FAIRcontent beam before">
            <div className="aloneContent">
              <FontAwesomeIcon icon={["fas", "comments"]} className="fa" />
              <h1>{content[this.state.lang].fairInfo["4"].title}</h1>
              <p>{content[this.state.lang].fairInfo["4"].body}</p>
            </div>

            <div className="aloneContent">
              <FontAwesomeIcon icon={["far", "lightbulb"]} className="fa" />
              <h1>{content[this.state.lang].fairInfo["5"].title}</h1>
              <p>{content[this.state.lang].fairInfo["5"].body}</p>
            </div>
          </div>

          <div className="deadspace" />
          <div className="deadspace" />
          <div className="deadspace" />
          <div className="deadspace" />
          <div className="deadspace" />
          <div className="deadspace" />

          <div id="previousYears">
            <h1 id="lecturerTitleBig">{previous[this.state.lang].title}</h1>
            <div id="lecturer_1" className="lecturer">
              <h1 id="lecturerTitleSmall" className="before">
                {previous[this.state.lang].title}
              </h1>
              <div
                className="lecturerImage"
                style={{ backgroundImage: `url(${lecturePics[0]})` }}
              >
                <h2>{previous[this.state.lang]["1"].title}</h2>
              </div>
              <div className="lecturerInfo left before">
                <h1>{previous[this.state.lang]["1"].title}</h1>
                <p>{previous[this.state.lang]["1"].body}</p>
                <a
                  href={previous[this.state.lang]["1"].link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {previous[this.state.lang]["1"].link}
                </a>
              </div>

              <div id="lecturer_2" className="lecturer before">
                <div
                  className="lecturerImage"
                  style={{ backgroundImage: `url(${lecturePics[1]})` }}
                >
                  <h2>{previous[this.state.lang]["2"].title}</h2>
                </div>
                <div className="lecturerInfo right before">
                  <h1>{previous[this.state.lang]["2"].title}</h1>
                  <p>{previous[this.state.lang]["2"].body}</p>
                  <a
                    href={previous[this.state.lang]["2"].link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {previous[this.state.lang]["2"].link}
                  </a>
                </div>

                <div id="lecturer_3" className="lecturer before">
                  <div
                    className="lecturerImage"
                    style={{ backgroundImage: `url(${lecturePics[2]})` }}
                  >
                    <h2>{previous[this.state.lang]["3"].title}</h2>
                  </div>
                  <div className="lecturerInfo left before">
                    <h1>{previous[this.state.lang]["3"].title}</h1>
                    <p>{previous[this.state.lang]["3"].body}</p>
                    <a
                      href={previous[this.state.lang]["3"].link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {previous[this.state.lang]["3"].link}
                    </a>
                  </div>

                  <div id="lecturer_4" className="lecturer before">
                    <div
                      className="lecturerImage"
                      style={{ backgroundImage: `url(${lecturePics[3]})` }}
                    >
                      <h2>{previous[this.state.lang]["4"].title}</h2>
                    </div>
                    <div className="lecturerInfo right before">
                      <h1>{previous[this.state.lang]["4"].title}</h1>
                      <p>{previous[this.state.lang]["4"].body}</p>
                      <a
                        href={previous[this.state.lang]["4"].link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {previous[this.state.lang]["4"].link}
                      </a>
                    </div>
                    <div className="deadspace"></div>
                  </div>
                </div>
              </div>
            </div>
            <div id="videoWrap">
              <div id="videoContainer">
                <h1>{content[this.state.lang].fairInfo.videoTitle}</h1>
                {}
                <FacebookPlayer
                  url="https://www.facebook.com/watch/?v=1399763803536580"
                  config={{
                    facebook: {
                      appId: "1149539581911137",
                    },
                  }}
                  controls
                  width={this.state.width}
                  height="auto"
                />
                {}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
