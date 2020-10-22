import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cookies from "universal-cookie";
import WebFont from "webfontloader";
import { NavLink as Link } from "react-router-dom";

import settings from "./settings.json";
import error from "./components/content/error.json";
import general from "./components/content/general.json";

import Login from "./components/Login";
import Logout from "./components/Logout";

import Header from "./components/Header";
import Footer from "./components/Footer";
// import News from "./components/News";
// import News from "./components/NewsToTheLeft";

import Home from "./components/Home";
import PrivacyPolicy from "./components/PrivacyPolicy";
import About from "./components/About";
import Contact from "./components/Contact";
import Companies from "./components/Companies";
import CompanyInfo from "./components/CompanyInfo";
import Studentexpo from "./components/Studentexpo";
import Lectures from "./components/Lectures";
import CompanyMap from "./components/CompanyMap";
import Covid from "./components/Covid";
// import Pictures from "./components/Pictures";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faComments,
  faConciergeBell,
  faCouch,
  faMedal,
  faExternalLinkAlt,
  faDownload,
  faChevronCircleLeft,
  faPaperPlane,
  faPhoneAlt,
  faTimes,
  faUserCircle,
  faSortDown,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFrown,
  faLightbulb,
  faImage,
  faImages,
} from "@fortawesome/free-regular-svg-icons";

library.add(
  fab,
  faCheckSquare,
  faFrown,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faLightbulb,
  faComments,
  faConciergeBell,
  faCouch,
  faMedal,
  faExternalLinkAlt,
  faImage,
  faDownload,
  faChevronCircleLeft,
  faPaperPlane,
  faPhoneAlt,
  faImages,
  faTimes,
  faUserCircle,
  faSortDown,
  faBars
);

const cookies = new Cookies();
const sites = [
  { url: "login", comp: Login, active: false },
  { url: "logout", comp: Logout, active: false },
];
const staticSites = [
  { url: "", comp: Home, active: true },
  { url: "about", comp: About, active: true },
  { url: "contact", comp: Contact, active: true },
  { url: "studentexpo", comp: Studentexpo, active: true },
  { url: "companies", comp: Companies, active: false },
  { url: "lectures", comp: Lectures, active: false },
  { url: "map", comp: CompanyMap, active: true },
  { url: "info", comp: CompanyInfo, active: false },
  { url: "covid", comp: Covid, active: true },
  // {url: "pictures", comp: Pictures, active: false}
];

class App extends Component {
  render() {
    const route = sites.map((item, i) => {
      if (item.active) {
        return (
          <Route
            exact
            path={settings.url + item.url}
            component={item.comp}
            key={i}
          />
        );
      }
      return null;
    });

    return (
      <BrowserRouter>
        <Switch>
          {route}
          <Route component={Static} />
        </Switch>
      </BrowserRouter>
    );
  }
}

// <Route exact path={settings.url + "t/"} component={Tournament}/>
// <Route exact path={settings.url + "t/:id"} component={Tournament}/>
// <Route exact path={settings.url + "create"} component={Admin}/>
// <Route exact path={settings.url + "manage"} component={Admin}/>
// <Route exact path={settings.url + "manage/:id"} component={Admin}/>
// <Route exact path={settings.url + "verify/:string"} component={Verify}/>
// <Route exact path={settings.url + "login/:hash"} component={Login}/>

//https://stackoverflow.com/questions/44188969/how-to-pass-the-match-when-using-render-in-route-component-from-react-router-v4
class Static extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      loggedin: false,
      loading: true,
      lang: "sv",
      nav: ["", "", "", ""],
      acceptedPolicy: false,
    };

    this.checkOldURL = this.checkOldURL.bind(this);
    this.loadFonts = this.loadFonts.bind(this);
    this.update = this.update.bind(this);
    this.acceptPolicy = this.acceptPolicy.bind(this);
    this.toggleLanguage = this.toggleLanguage.bind(this);
    this.updateNav = this.updateNav.bind(this);
    this.setTitle = this.setTitle.bind(this);

    this.loadFonts();
  }

  async checkOldURL(nav) {
    if (nav[3] === "sv" || nav[3] === "en") {
      try {
        await cookies.set("lang", nav[3], { path: "/" });
        await this.setState({ lang: cookies.get("lang") });
      } catch (e) {
        this.setState({ lang: "sv" });
        console.log(e, "Consider allowing cookies");
      }

      switch (nav[4]) {
        case undefined:
        case "":
          this.props.history.push("/");
          break;
        case "om":
        case "about":
          switch (nav[5]) {
            case undefined:
            case "":
              this.props.history.push("/about/");
              break;
            case "kontakt":
            case "contact":
              this.props.history.push("/contact/");
              break;
            case "tidigare-ar":
            case "previous-years":
              this.props.history.push("/about/");
              break;
            default:
          }
          break;
        case "foretag":
        case "companies":
          this.props.history.push("/companies/");
          break;
        case "info":
          this.props.history.push("/info/");
          break;
        case "covid":
          this.props.history.push("/covid/");
          break;
        case "forelasningar":
        case "lectures":
          this.props.history.push("/lectures/");
          break;
        case "bilder":
        case "photos":
          this.props.history.push("/pictures/");
          break;
        default:
      }
    }
  }

  loadFonts() {
    WebFont.load({
      google: {
        families: ["Barlow:400,600,600i,700,700i", "Lato:400,400i,700,900"],
      },
      active: async () => {
        await this.setState({ loading: false });
        const nav = window.location.href.split("/");
        this.updateNav(nav);
      },
    });
  }

  update() {
    // fetch(settings.api + "user/", {
    // 	method: "GET",
    // 	credentials: "include"
    // })
    // .then(response => {
    // 	if(!response.ok){throw response.statusText;};
    // 	return response.json();
    // })
    // .then(response => {
    // 	this.setState({username: response.username, loading: false, loggedin: true});
    // })
    // .catch(err => {
    // 	this.setState({loading: false});
    // });
  }

  acceptPolicy() {
    if (!this.state.acceptedPolicy) {
      this.setState({ acceptedPolicy: true });
      cookies.set("cookie_accept", true, { path: "/" });

      if (cookies.get("lang") === undefined) {
        let lang = this.state.lang;
        cookies.set("lang", lang, { path: "/" });
      } else {
        this.setState({
          lang: cookies.get("lang"),
        });
      }
    }
  }

  toggleLanguage(e) {
    let newLang = this.state.lang === "sv" ? "en" : "sv";

    if (this.state.acceptedPolicy) {
      cookies.set("lang", newLang, { path: "/" });
    }
    document.documentElement.lang = newLang;
    this.setState({
      lang: newLang,
    });
  }

  async updateNav(nav) {
    if (!this.state.loading) {
      this.setState({ nav });
      this.checkOldURL(nav);
    }
  }

  setTitle(nav) {
    try {
      const navText = general[this.state.lang].url[nav[3]]
        ? general[this.state.lang].url[nav[3]] + " - "
        : "";

      document.title =
        navText +
        general[this.state.lang].name +
        " " +
        general.year +
        " - " +
        general[this.state.lang].date +
        ", " +
        general.city;
    } catch (e) {}
  }

  async componentDidMount() {
    await this.update();
    this.setTitle(window.location.href.split("/"));

    if (cookies.get("cookie_accept") === undefined) {
      cookies.set("cookie_accept", false, { path: "/" });
    } else {
      if (cookies.get("cookie_accept") === "true") {
        await this.setState({ acceptedPolicy: true });
        if (cookies.get("lang") === undefined) {
          let lang = this.state.lang;
          cookies.set("lang", lang, { path: "/" });
        } else {
          this.setState({
            lang: cookies.get("lang"),
          });
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.state.loading) {
      const nav = window.location.href.split("/");

      if (prevProps !== this.props) {
        this.updateNav(nav);
      }

      this.setTitle(nav);
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div id="root-loading">
          <div className="root-image">
            <div className="logo_orange" id="logo_orange1" />
            <div className="logo_orange" id="logo_orange2" />
            <div className="logo_orange" id="logo_orange3" />
            <div className="logo_gray" id="logo_gray1" />
            <div className="logo_gray" id="logo_gray2" />
            <div className="logo_gray" id="logo_gray3" />
          </div>
        </div>
      );
    }

    let header;

    if (
      staticSites.find((item) => item.url === this.state.nav[3] && item.active)
    ) {
      header = (
        <Header
          loggedin={this.state.loggedin}
          lang={this.state.lang}
          toggleLanguage={this.toggleLanguage}
          navSelect={this.state.nav}
        />
      );
    } else {
      header = (
        <Header
          loggedin={this.state.loggedin}
          lang={this.state.lang}
          toggleLanguage={this.toggleLanguage}
          navSelect={["", "", "", "error"]}
        />
      );
    }

    let acceptPolicy = null;
    if (!this.state.acceptedPolicy) {
      acceptPolicy = (
        <div id="acceptPolicy">
          <div id="acceptPolicyText">
            {general[this.state.lang].acceptPolicy}{" "}
            <Link
              to={
                settings.url +
                general[this.state.lang].acceptPolicyLink.url +
                "/"
              }
            >
              {general[this.state.lang].acceptPolicyLink.text}
            </Link>
          </div>
          <div id="acceptPolicyButton" onClick={this.acceptPolicy}>
            {general[this.state.lang].acceptPolicyButton}
          </div>
        </div>
      );
    }

    return (
      <div id="static">
        {acceptPolicy}
        {header}

        <main id="wrapper">
          <Switch>
            <Route
              exact
              path={settings.url + ""}
              render={(props) => <Home {...props} lang={this.state.lang} />}
            />
            <Route
              exact
              path={settings.url + "about/"}
              render={(props) => <About {...props} lang={this.state.lang} />}
            />
            <Route
              exact
              path={settings.url + "about/privacy-policy/"}
              render={(props) => (
                <PrivacyPolicy {...props} lang={this.state.lang} />
              )}
            />
            <Route
              exact
              path={settings.url + "about/:subpage/"}
              render={(props) => <About {...props} lang={this.state.lang} />}
            />
            <Route
              exact
              path={settings.url + "contact/"}
              render={(props) => <Contact {...props} lang={this.state.lang} />}
            />
            <Route
              exact
              path={settings.url + "contact/:subpage/"}
              render={(props) => <Contact {...props} lang={this.state.lang} />}
            />
            {/* <Route
              exact
              path={settings.url + "companies/"}
              render={(props) => (
                <Companies {...props} lang={this.state.lang} />
              )}
            />
            <Route
              exact
              path={settings.url + "companies/:companyID/"}
              render={(props) => (
                <Companies {...props} lang={this.state.lang} />
              )}
            /> */}
            {/* <Route
              exact
              path={settings.url + "info/"}
              render={(props) => (
                <CompanyInfo {...props} lang={this.state.lang} />
              )}
            /> */}
            <Route
              exact
              path={settings.url + "covid/"}
              render={(props) => <Covid {...props} lang={this.state.lang} />}
            />
            <Route
              exact
              path={settings.url + "studentexpo/"}
              // render={(props) => (
              //   <Studentexpo {...props} lang={this.state.lang} />
              // )}
              render={(props) => <Error404 {...props} lang={this.state.lang} />}
              status={404}
            />
            <Route
              exact
              path={settings.url + "map/"}
              // render={(props) => (
              //   <CompanyMap {...props} lang={this.state.lang} />
              // )}
              render={(props) => <Error404 {...props} lang={this.state.lang} />}
              status={404}
            />
            {/*}
						<Route exact path={settings.url + "lectures"} render={(props) => <Lectures {...props} lang={this.state.lang} />}/>
						<Route exact path={settings.url + "pictures"} render={(props) => <Pictures {...props} lang={this.state.lang} />}/>
						*/}

            <Route
              render={(props) => <Error404 {...props} lang={this.state.lang} />}
              status={404}
            />
          </Switch>
        </main>

        <Footer
          lang={this.state.lang}
          toggleLanguage={this.toggleLanguage}
          navSelect={this.state.nav}
          loggedin={this.state.loggedin}
        />
        {/*}<News
					lang={this.state.lang}
				/>{*/}
      </div>
    );
  }
}

class Error404 extends Component {
  constructor(props) {
    super(props);

    this.state = { lang: props.lang, url: window.location.href };
  }

  componentDidMount() {
    // if(window.location.href.split('/')[3] !== "error") {
    // 	this.props.history.push('/error');
    // }
  }

  componentDidUpdate(prevProps) {
    if (this.props.lang !== prevProps.lang) {
      this.setState({ lang: this.props.lang });
    }
  }

  render() {
    let errmsg = <h2>{error[this.state.lang].errorInfo1}</h2>;
    // if(this.state.url.split('/')[3] !== "error") {
    // 	errmsg = <h2> <input type="text" name="url" value={this.state.url} readOnly size={this.state.url.length-5} onClick={(e) => {e.currentTarget.setSelectionRange(0, e.currentTarget.value.length);}}/> {error[this.state.lang].errorInfo2}</h2>;
    // }

    return (
      <div id="error">
        <FontAwesomeIcon icon={faFrown} className="fa"></FontAwesomeIcon>
        <h1> 404 </h1>
        {errmsg}
        <h3> {error[this.state.lang].msg} </h3>
      </div>
    );
  }
}

export default App;

//<Route exact path={settings.url + "verify/:string"} render={({match}) => <Verify username={this.state.username} match={match}></Verify>} />
