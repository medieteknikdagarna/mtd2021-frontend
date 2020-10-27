import React, { Component } from "react";

import { NavLink as Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isMobile } from "react-device-detect";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

import settings from "../settings.json";
import content from "./content/header.json";
import general from "./content/general.json";

import "../css/header.scss";

import logo_regular from "../bilder/logo.svg";
import logo_white from "../bilder/white.svg";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      accountSelected: false,
      loggedin: props.loggedin,
      accountName: "",
      lang: props.lang,
      flag: require(`../bilder/flags/${
        this.props.lang === "sv" ? "en" : "sv"
      }.svg`),
      transparentClass: "transparent",
      borderBottom: { borderBottom: "4px solid transparent" },
      logo: require("../bilder/logo.svg"),
      scrolledClass: "",
      navPosition: null,
      popOutNavClass: "",
      hamburgerOpen: false,
    };

    this.headerRef = React.createRef();
    this.dropdownRef = React.createRef();

    this.showHamburger = this.showHamburger.bind(this);
    this.hideHamburger = this.hideHamburger.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.accountClose = this.accountClose.bind(this);
    this.accountSelect = this.accountSelect.bind(this);
    this.imageload = this.imageload.bind(this);
    this.hoverBrand = this.hoverBrand.bind(this);
    this.notHoverBrand = this.notHoverBrand.bind(this);
  }

  showHamburger() {
    this.setState({ hamburgerOpen: true });
    this.setState({ popOutNavClass: "show" });

    let icon = document.getElementById("openNavButton");
    icon.classList.add("open");

    disableBodyScroll(document.getElementById("navPopOut"), {
      reserveScrollBarGap: true,
    });
  }

  hideHamburger() {
    this.setState({ hamburgerOpen: false });
    this.setState({ popOutNavClass: "" });

    let icon = document.getElementById("openNavButton");
    icon.classList.remove("open");

    enableBodyScroll(document.getElementById("navPopOut"));
  }

  handleResize() {
    let contact = document.getElementById("contact");

    let navPosition = { left: contact.getBoundingClientRect().left };
    this.setState({ navPosition });
  }

  showDropdown() {
    if (
      !isMobile &&
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) >
        850
    ) {
      this.dropdownRef.current.classList.add("dropdownShown");
      document.getElementById("contact").classList.add("hover");
    }
  }

  hideDropdown() {
    if (
      !isMobile &&
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) >
        850
    ) {
      this.dropdownRef.current.classList.remove("dropdownShown");
      document.getElementById("contact").classList.remove("hover");
    }
  }

  handleScroll() {
    const nav = window.location.href.split("/");
    const scrollValue = window.scrollY;
    let scrolledClass = "";
    let logo;

    if (nav[3] === "about") {
      this.headerRef.current.classList.remove("transparent");
      logo = logo_regular;
    }

    if (scrollValue <= 30) {
      scrolledClass = "";
      logo = logo_regular;

      // if (nav[3] === "" || nav[3] === "about" || nav[3] === "companies") {
      //   const isOnSubpageOfAbout = nav[4] === "" && nav[3] === "about";
      //   if (isOnSubpageOfAbout || nav[3] === "" || nav[3] === "companies") {
      //     this.headerRef.current.classList.add("transparent");
      //     logo = logo_white;
      //   }
      // }

      if (nav[3] === "" || nav[3] === "companies") {
        if (nav[3] === "" || nav[3] === "companies") {
          this.headerRef.current.classList.add("transparent");
          logo = logo_white;
        }
      }
    } else {
      this.headerRef.current.classList.remove("transparent");

      scrolledClass = "scrolled";
      logo = logo_regular;
    }

    if (this.state.scrolledClass !== scrolledClass) {
      this.setState({ scrolledClass });
    }

    if (this.state.logo !== logo) {
      this.setState({ logo });
    }

    // this.handleResize();
  }

  hoverBrand() {
    console.log("hover");
    if (this.props.navSelect !== "") {
      if (this.state.transparentClass === "transparent") {
        this.setState({
          borderBottom: { borderBottom: "4px solid rgba(255, 255, 255, 0.1)" },
        });
      } else {
        this.setState({
          borderBottom: { borderBottom: "4px solid rgba(164, 71, 11, 0.3)" },
        });
      }
    }
  }

  notHoverBrand() {
    this.setState({
      borderBottom: null,
    });
  }

  accountClose(e) {
    e.preventDefault();
    this.setState({ accountSelected: false });
  }

  accountSelect(e) {
    e.preventDefault();

    this.setState({ accountSelected: true });
  }

  imageload(e) {
    e.target.style.display = "block";
    e.target.parentNode.childNodes[0].style.display = "none";
  }

  navUpdate(oldNav = "") {
    const nav = this.props.navSelect;

    if (oldNav.toString() !== nav.toString()) {
      // window.scrollTo(0, 0);
      let homeNav = document.getElementById("home");
      let aboutNAV = document.getElementById("about");
      let companiesNAV = document.getElementById("companies");

      let logo = require("../bilder/logo.svg");

      switch (nav[3]) {
        case "":
          homeNav.classList.add("selected");
          homeNav.setAttribute("aria-current", "page");
          logo = require("../bilder/white.svg");

          this.setState({
            transparentClass: "transparent",
            borderBottom: null,
          });
          break;

        // case "about":
        //   homeNav.classList.remove("selected");
        //   homeNav.removeAttribute("aria-current");

        //   this.setState({
        //     borderBottom: { borderBottom: "4px solid transparent" },
        //   });

        //   if (this.props.navSelect[4] === "") {
        //     aboutNAV.classList.add("selected");
        //     this.setState({ transparentClass: "transparent" });
        //     logo = require("../bilder/white.svg");
        //   } else {
        //     aboutNAV.classList.remove("selected");
        //     this.setState({ transparentClass: "" });
        //   }
        //   break;
        case "companies":
          homeNav.classList.remove("selected");
          homeNav.removeAttribute("aria-current");

          this.setState({
            borderBottom: { borderBottom: "4px solid transparent" },
          });

          companiesNAV.classList.add("selected");
          this.setState({ transparentClass: "transparent" });

          if (window.scrollY <= 30) {
            logo = require("../bilder/white.svg");
          }

          break;

        case "error":
          homeNav.classList.remove("selected");
          homeNav.removeAttribute("aria-current");

          this.setState({
            transparentClass: "",
            borderBottom: { borderBottom: "4px solid transparent" },
          });
          break;

        default:
          homeNav.classList.remove("selected");
          homeNav.removeAttribute("aria-current");

          document.getElementById(nav[3]).classList.add("selected");

          this.setState({
            transparentClass: "",
            borderBottom: { borderBottom: "4px solid transparent" },
          });
          break;
      }

      this.setState({ logo });
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.lang !== prevProps.lang) {
      await this.setState({
        lang: this.props.lang,
        flag: require(`../bilder/flags/${
          this.props.lang === "sv" ? "en" : "sv"
        }.svg`),
      });
      this.handleResize();
      // this.setTitle();
    }
    if (this.props.loggedin !== prevProps.loggedin) {
      this.setState({
        loggedin: this.props.loggedin,
      });
    }
    if (this.props.navSelect !== prevProps.navSelect) {
      this.navUpdate(prevProps.navSelect);
    }
  }

  async componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
    [
      "webkitTransitionEnd",
      "transitionend",
      "msTransitionEnd",
      "oTransitionEnd",
    ].forEach((evt) =>
      this.headerRef.current.addEventListener(evt, this.handleResize)
    );

    this.navUpdate();
    this.handleResize();
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    let accountIcon;
    let line;

    if (this.state.loggedin) {
      line = <div className="line" />;

      accountIcon = (
        <Link to={settings.url + "login"} id="accountIcon">
          <FontAwesomeIcon
            icon={["fa", "user-circle"]}
            className="fa fa-user-circle"
          />
          <FontAwesomeIcon
            icon={["fa", "sort-down"]}
            className="fa fa-sort-down"
          />
          {this.state.accountName}
        </Link>
      );
    }

    const nav = this.props.navSelect[3];
    const subnav = this.props.navSelect[4];

    let links = content[this.state.lang].contact.dropdown.map((item, index) => {
      let whichClass = "navButton";

      if (nav === "contact/") {
        if (subnav === undefined || subnav === "") {
          if (nav === item.url) {
            whichClass = "navButton selected";
          }
        } else {
          if (nav + subnav + "/" === item.url) {
            whichClass = "navButton selected";
          }
        }
      }

      return (
        <Link to={settings.url + item.url} className={whichClass} key={index}>
          {item.title}
        </Link>
      );
    });

    if (
      isMobile ||
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <
        850
    ) {
      return (
        <header
          id="headerHamburger"
          className={this.state.transparentClass}
          ref={this.headerRef}
        >
          <div id="navis">
            <div id="banner">
              <Link to={settings.url}>
                <div
                  id="brand"
                  onMouseEnter={this.hoverBrand}
                  onMouseLeave={this.notHoverBrand}
                >
                  <div className="logo">
                    <img
                      id="highreslogo"
                      src={this.state.logo}
                      alt="logo"
                      className={this.state.scrolledClass}
                    ></img>
                  </div>
                  <div id="brandName" className={this.state.scrolledClass}>
                    {general.nameShort}
                    <span>{general.year}</span>
                  </div>
                </div>
              </Link>
              {this.state.hamburgerOpen ? (
                <div
                  className={this.state.scrolledClass}
                  id="openNavButton"
                  onClick={this.hideHamburger}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                <div
                  className={this.state.scrolledClass}
                  id="openNavButton"
                  onClick={this.showHamburger}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
              {/* <FontAwesomeIcon
                icon={["fas", "bars"]}
                className={this.state.scrolledClass}
                id="openNavButton"
                onClick={this.showHamburger}
              /> */}
            </div>

            <div id="navPopOut" className={this.state.popOutNavClass}>
              {/* <div id="closeNavButtonContainer">
                <FontAwesomeIcon
                  icon={["fas", "times"]}
                  className="fa"
                  id="closeNavButton"
                  onClick={this.hideHamburger}
                />
              </div> */}
              <nav id="nav">
                <img
                  id="navLogo"
                  alt="logo"
                  className={this.state.scrolledClass}
                />
                <Link
                  to={settings.url}
                  id="home"
                  onMouseEnter={this.hoverBrand}
                  onMouseLeave={this.notHoverBrand}
                  onClick={this.hideHamburger}
                >
                  {content[this.state.lang].home.title}
                </Link>
                <Link
                  to={settings.url + "about/"}
                  id="about"
                  onClick={this.hideHamburger}
                >
                  {content[this.state.lang].about.title}
                </Link>
                <Link
                  to={settings.url + "contact/"}
                  id="contact"
                  onMouseEnter={this.showDropdown}
                  onMouseLeave={this.hideDropdown}
                  onClick={(e) => {
                    this.hideDropdown(e);
                    e.currentTarget.classList.remove("hover");
                    this.hideHamburger();
                  }}
                >
                  {content[this.state.lang].contact.title}
                </Link>
                {/* <Link
                  to={settings.url + "companies/"}
                  id="companies"
                  onClick={this.hideHamburger}
                >
                  {content[this.state.lang].companies.title}
                </Link> */}
                {/* <Link
                  to={settings.url + "info/"}
                  id="info"
                  onClick={this.hideHamburger}
                >
                  {content[this.state.lang].info.title}
                </Link> */}
                <Link
                  to={settings.url + "covid/"}
                  id="covid"
                  onClick={this.hideHamburger}
                >
                  {content[this.state.lang].covid.title}
                </Link>
                {/* <Link to={settings.url + "studentexpo/"} id="studentexpo" onClick={this.hideHamburger}>
								{content[this.state.lang].studentexpo.title}
							</Link> */}
                {/* <Link
                  to={settings.url + "map/"}
                  id="map"
                  onClick={this.hideHamburger}
                >
                  {content[this.state.lang].map.title}
                </Link> */}

                {/* <Link to={settings.url + "lectures/"} id="lectures" onClick={this.hideHamburger}>
								{content[this.state.lang].lectures.title}
							</Link>
							<Link to={settings.url + "pictures/"} id="pictures" onClick={this.hideHamburger}>
								{content[this.state.lang].pictures.title}
							</Link> */}
              </nav>
              <div id="sharebar">
                <div id="flag">
                  <img
                    onClick={this.props.toggleLanguage}
                    src={this.state.flag}
                    alt="flag"
                  ></img>
                </div>

                <a
                  href="https://facebook.com/medieteknikdagarna"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={["fab", "facebook-square"]}
                    className="fa"
                  />
                </a>
                <a
                  href="https://youtube.com/mtdagarna"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={["fab", "youtube-square"]}
                    className="fa"
                  />
                </a>
                <a
                  href="https://www.instagram.com/medieteknikdagarna/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={["fab", "instagram"]} className="fa" />
                </a>
                <a
                  href="https://www.linkedin.com/company/medieteknikdagarna-2014/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={["fab", "linkedin"]} className="fa" />
                </a>

                {line}
                {accountIcon}
              </div>
            </div>
          </div>
        </header>
      );
    } else {
      return (
        <div
          id="headerWrap"
          className={this.state.transparentClass}
          ref={this.headerRef}
        >
          <header id="header">
            {/* <header id="header" className={this.state.transparentClass} ref={this.headerRef}> */}
            <div
              id="dropdown"
              ref={this.dropdownRef}
              style={this.state.navPosition}
              onMouseEnter={this.showDropdown}
              onMouseLeave={this.hideDropdown}
              onClick={this.hideDropdown}
            >
              <nav id="navigationBox">{links}</nav>
            </div>

            <div id="navis">
              <div id="banner">
                <Link to={settings.url}>
                  <div
                    id="brand"
                    onMouseEnter={this.hoverBrand}
                    onMouseLeave={this.notHoverBrand}
                  >
                    <div className="logo">
                      <img
                        id="highreslogo"
                        src={this.state.logo}
                        alt="logo"
                        className={this.state.scrolledClass}
                      ></img>
                    </div>
                    <div id="brandName" className={this.state.scrolledClass}>
                      {general.nameShort}
                      <span>{general.year}</span>
                    </div>
                  </div>
                </Link>
              </div>

              <div id="navbar">
                <nav id="nav">
                  <img
                    id="navLogo"
                    src={logo_regular}
                    alt="logo"
                    className={this.state.scrolledClass}
                  />
                  <Link
                    to={settings.url}
                    id="home"
                    style={this.state.borderBottom}
                    onMouseEnter={this.hoverBrand}
                    onMouseLeave={this.notHoverBrand}
                  >
                    {content[this.state.lang].home.title}
                  </Link>
                  <Link to={settings.url + "about/"} id="about">
                    {content[this.state.lang].about.title}
                  </Link>
                  <Link
                    to={settings.url + "contact/"}
                    id="contact"
                    onMouseEnter={this.showDropdown}
                    onMouseLeave={this.hideDropdown}
                    onClick={(e) => {
                      this.hideDropdown(e);
                      e.currentTarget.classList.remove("hover");
                    }}
                  >
                    {content[this.state.lang].contact.title}
                    <FontAwesomeIcon
                      icon={["fas", "chevron-down"]}
                      className="fa"
                    />
                  </Link>
                  {/* <Link to={settings.url + "companies/"} id="companies">
                    {content[this.state.lang].companies.title}
                  </Link> */}
                  {/* <Link to={settings.url + "info/"} id="info">
                    {content[this.state.lang].info.title}
                  </Link> */}
                  <Link to={settings.url + "covid/"} id="covid">
                    {content[this.state.lang].covid.title}
                  </Link>
                  {/* <Link to={settings.url + "map/"} id="map">
										{content[this.state.lang].map.title}
									</Link> */}
                  {/* <Link to={settings.url + "studentexpo/"} id="studentexpo">
                    {content[this.state.lang].studentexpo.title}
                  </Link> */}

                  {/*}
									<Link to={settings.url + "lectures/"} id="lectures">
										{content[this.state.lang].lectures.title}
									</Link>
									<Link to={settings.url + "pictures/"} id="pictures">
										{content[this.state.lang].pictures.title}
									</Link>
									{*/}
                </nav>
                <div id="sharebar">
                  <img
                    onClick={this.props.toggleLanguage}
                    id="flag"
                    src={this.state.flag}
                    alt="flag"
                  ></img>

                  <div className="line" />

                  <a
                    href="https://facebook.com/medieteknikdagarna"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "facebook-square"]}
                      className="fa"
                    />
                  </a>
                  <a
                    href="https://youtube.com/mtdagarna"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "youtube-square"]}
                      className="fa"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/medieteknikdagarna/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "instagram"]}
                      className="fa"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/medieteknikdagarna-2014/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "linkedin"]}
                      className="fa"
                    />
                  </a>

                  {line}
                  {accountIcon}
                </div>
              </div>
            </div>
          </header>
        </div>
      );
    }
  }
}

export default Header;
