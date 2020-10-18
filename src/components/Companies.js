import React, { Component } from "react";

import { NavLink as Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

import "../css/companies.scss";

// import general from "../components/content/general.json";
import content from "../components/content/companies.json";
import companyInformation from "../components/content/companyInformation.json";
import settings from "../settings.json";

class Companies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: props.lang,
      company: null,
      companyID: null,
      goldCompanies: [],
      silverCompanies: [],
      bronzeCompanies: [],
      regularCompanies: [],
      startupCompanies: [],
      filter: {
        exjobb: false,
        praktik: false,
        trainee: false,
        sommarjobb: false,
        anstallning: false,
      },
      modalOpen: false,
      modalBackgroundStyle: {
        width: "0",
        height: "0",
      },
      modalStyle: { display: "none" },
    };

    this.scrollToActive = this.scrollToActive.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.loadCompanies = this.loadCompanies.bind(this);
    this.rerouteToCompany = this.rerouteToCompany.bind(this);
  }

  scrollToActive() {
    // if(this.state.company) {
    // 	const elementRect = document.getElementById(this.state.company.name.split(' ').join('-').toLowerCase()).getBoundingClientRect();
    // 	const absoluteElementTop = elementRect.top + window.pageYOffset;
    // 	const middle = absoluteElementTop - (window.innerHeight / 2);
    // 	window.scrollTo(0, middle);
    // }
    // else {
    // 	window.scrollTo(0, 0);
    // }
  }

  openModal() {
    if (!this.state.modalOpen) {
      let modalBackgroundStyle = JSON.parse(
        JSON.stringify(this.state.modalBackgroundStyle)
      );

      modalBackgroundStyle.width = "100vw";
      modalBackgroundStyle.height = "100vh";

      this.setState({ modalBackgroundStyle });

      disableBodyScroll(document.getElementById("companyModalWrap"), {
        reserveScrollBarGap: true,
      });

      if (window.getSelection) {
        if (window.getSelection().empty) {
          // Chrome
          window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {
          // Firefox
          window.getSelection().removeAllRanges();
        }
      } else if (document.selection) {
        // IE?
        document.selection.empty();
      }
    }

    this.setState({ modalOpen: true, modalStyle: { display: "block" } });
  }

  closeModal() {
    if (this.state.modalOpen) {
      let modalBackgroundStyle = JSON.parse(
        JSON.stringify(this.state.modalBackgroundStyle)
      );

      modalBackgroundStyle.width = "0";
      modalBackgroundStyle.height = "0";

      this.setState({ modalBackgroundStyle });

      enableBodyScroll(document.getElementById("companyModalWrap"));

      this.props.history.push("/companies/");
    }

    this.setState({ modalOpen: false, modalStyle: { display: "none" } });
  }

  async loadCompanies() {
    let goldCompanies = [],
      silverCompanies = [],
      bronzeCompanies = [],
      regularCompanies = [],
      startupCompanies = [];
    const filter = this.state.filter;

    for (let i = companyInformation.companies.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [companyInformation.companies[i], companyInformation.companies[j]] = [
        companyInformation.companies[j],
        companyInformation.companies[i],
      ];
    }

    await companyInformation.companies.forEach((item, index) => {
      switch (item.level) {
        case "gold":
          if (
            !filter.exjobb &&
            !filter.praktik &&
            !filter.trainee &&
            !filter.sommarjobb &&
            !filter.anstallning
          ) {
            goldCompanies.push(item);
          } else if (filter.exjobb === item.offers.exjobb) {
            goldCompanies.push(item);
          } else if (filter.praktik === item.offers.praktik) {
            goldCompanies.push(item);
          } else if (filter.trainee === item.offers.trainee) {
            goldCompanies.push(item);
          } else if (filter.sommarjobb === item.offers.sommarjobb) {
            goldCompanies.push(item);
          } else if (filter.anstallning === item.offers.anstallning) {
            goldCompanies.push(item);
          }
          break;
        case "silver":
          if (
            !filter.exjobb &&
            !filter.praktik &&
            !filter.trainee &&
            !filter.sommarjobb &&
            !filter.anstallning
          ) {
            silverCompanies.push(item);
          } else if (filter.exjobb === item.offers.exjobb) {
            silverCompanies.push(item);
          } else if (filter.praktik === item.offers.praktik) {
            silverCompanies.push(item);
          } else if (filter.trainee === item.offers.trainee) {
            silverCompanies.push(item);
          } else if (filter.sommarjobb === item.offers.sommarjobb) {
            silverCompanies.push(item);
          } else if (filter.anstallning === item.offers.anstallning) {
            silverCompanies.push(item);
          }
          break;
        case "bronze":
          if (
            !filter.exjobb &&
            !filter.praktik &&
            !filter.trainee &&
            !filter.sommarjobb &&
            !filter.anstallning
          ) {
            bronzeCompanies.push(item);
          } else if (filter.exjobb === item.offers.exjobb) {
            bronzeCompanies.push(item);
          } else if (filter.praktik === item.offers.praktik) {
            bronzeCompanies.push(item);
          } else if (filter.trainee === item.offers.trainee) {
            bronzeCompanies.push(item);
          } else if (filter.sommarjobb === item.offers.sommarjobb) {
            bronzeCompanies.push(item);
          } else if (filter.anstallning === item.offers.anstallning) {
            bronzeCompanies.push(item);
          }
          break;
        case "regular":
          if (
            !filter.exjobb &&
            !filter.praktik &&
            !filter.trainee &&
            !filter.sommarjobb &&
            !filter.anstallning
          ) {
            regularCompanies.push(item);
          } else if (filter.exjobb === item.offers.exjobb) {
            regularCompanies.push(item);
          } else if (filter.praktik === item.offers.praktik) {
            regularCompanies.push(item);
          } else if (filter.trainee === item.offers.trainee) {
            regularCompanies.push(item);
          } else if (filter.sommarjobb === item.offers.sommarjobb) {
            regularCompanies.push(item);
          } else if (filter.anstallning === item.offers.anstallning) {
            regularCompanies.push(item);
          }
          break;
        case "startup":
          if (
            !filter.exjobb &&
            !filter.praktik &&
            !filter.trainee &&
            !filter.sommarjobb &&
            !filter.anstallning
          ) {
            startupCompanies.push(item);
          } else if (filter.exjobb === item.offers.exjobb) {
            startupCompanies.push(item);
          } else if (filter.praktik === item.offers.praktik) {
            startupCompanies.push(item);
          } else if (filter.trainee === item.offers.trainee) {
            startupCompanies.push(item);
          } else if (filter.sommarjobb === item.offers.sommarjobb) {
            startupCompanies.push(item);
          } else if (filter.anstallning === item.offers.anstallning) {
            startupCompanies.push(item);
          }
          break;
        default:
          break;
      }
    });

    this.setState({
      goldCompanies,
      silverCompanies,
      bronzeCompanies,
      regularCompanies,
      startupCompanies,
    });
  }

  async rerouteToCompany() {
    let companyInfo = null;

    if (this.state.companyID !== undefined) {
      companyInformation.companies.forEach((item, index) => {
        if (this.state.companyID === item.inURL) {
          companyInfo = item;
        }
      });

      if (companyInfo !== null) {
        await this.setState({ company: companyInfo });
        this.openModal();
      } else {
        this.props.history.push("/companies/");
        await this.closeModal();
        await this.scrollToActive();
        this.setState({ company: companyInfo });
      }
    } else {
      await this.closeModal();
      this.setState({ company: companyInfo });
    }
  }

  async componentDidMount() {
    await this.setState({ companyID: this.props.match.params.companyID });
    await this.scrollToActive();
    await this.loadCompanies();
    this.rerouteToCompany();
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.setState({ lang: this.props.lang });
    }
    if (
      prevProps.match.params.companyID !== this.props.match.params.companyID
    ) {
      await this.setState({ companyID: this.props.match.params.companyID });
      this.rerouteToCompany();
    }
  }

  render() {
    let goldCompanies = null,
      silverCompanies = null,
      bronzeCompanies = null,
      regularCompanies = null,
      startupCompanies = null;

    if (this.state.goldCompanies.length) {
      const companies = this.state.goldCompanies.map((item, index) => {
        let image = null;
        try {
          image = require(`../bilder/companies/${item.level}/${item.img}`);
        } catch (e) {
          image = require("../bilder/placeholder.svg");
        }
        const alt = `Gold company ${index}`;
        return (
          <div key={index} className="companyWrap">
            <Link
              to={settings.url + "companies/" + item.inURL}
              id={item.name.split(" ").join("-").toLowerCase()}
              className="company"
            >
              <img src={image} alt={alt} />
              <h3 lang="de">{item.name}</h3>
              <p lang="de" className="readMore">
                {content[this.state.lang].press}
              </p>
            </Link>
          </div>
        );
      });

      goldCompanies = (
        <div id="goldCompaniesWrap">
          <h2>{content[this.state.lang].goldTitle}</h2>
          <div id="goldCompaniesContainer" className="companiesRow">
            {companies}
          </div>
        </div>
      );
    }

    if (this.state.silverCompanies.length) {
      const companies = this.state.silverCompanies.map((item, index) => {
        let image = null;
        try {
          image = require(`../bilder/companies/${item.level}/${item.img}`);
        } catch (e) {
          image = require("../bilder/placeholder.svg");
        }
        const alt = `Silver company ${index}`;
        return (
          <div key={index} className="companyWrap">
            <Link
              to={settings.url + "companies/" + item.inURL}
              id={item.name.split(" ").join("-").toLowerCase()}
              className="company"
            >
              <img src={image} alt={alt} />
              <h3 lang="de">{item.name}</h3>
              <p lang="de" className="readMore">
                {content[this.state.lang].press}
              </p>
            </Link>
          </div>
        );
      });

      silverCompanies = (
        <div id="silverCompaniesWrap">
          <h2>{content[this.state.lang].silverTitle}</h2>
          <div id="silverCompaniesContainer" className="companiesRow">
            {companies}
          </div>
        </div>
      );
    }

    if (this.state.bronzeCompanies.length) {
      const companies = this.state.bronzeCompanies.map((item, index) => {
        let image = null;
        try {
          image = require(`../bilder/companies/${item.level}/${item.img}`);
        } catch (e) {
          image = require("../bilder/placeholder.svg");
        }
        const alt = `Bronze company ${index}`;
        return (
          <div key={index} className="companyWrap">
            <Link
              to={settings.url + "companies/" + item.inURL}
              id={item.name.split(" ").join("-").toLowerCase()}
              className="company"
            >
              <img src={image} alt={alt} />
              <h3 lang="de">{item.name}</h3>
              <p lang="de" className="readMore">
                {content[this.state.lang].press}
              </p>
            </Link>
          </div>
        );
      });

      bronzeCompanies = (
        <div id="bronzeCompaniesWrap">
          <h2>{content[this.state.lang].bronzeTitle}</h2>
          <div id="bronzeCompaniesContainer" className="companiesRow">
            {companies}
          </div>
        </div>
      );
    }

    if (this.state.regularCompanies.length) {
      const companies = this.state.regularCompanies.map((item, index) => {
        let image = null;
        try {
          image = require(`../bilder/companies/${item.level}/${item.img}`);
        } catch (e) {
          image = require("../bilder/placeholder.svg");
        }
        const alt = `Regular company ${index}`;
        return (
          <div key={index} className="companyWrap">
            <Link
              to={settings.url + "companies/" + item.inURL}
              id={item.name.split(" ").join("-").toLowerCase()}
              className="company"
            >
              <img src={image} alt={alt} />
              <h3 lang="de">{item.name}</h3>
              <p lang="de" className="readMore">
                {content[this.state.lang].press}
              </p>
            </Link>
          </div>
        );
      });

      regularCompanies = (
        <div id="regularCompaniesWrap">
          <h2>{content[this.state.lang].regularTitle}</h2>
          <div id="regularCompaniesContainer" className="companiesRow">
            {companies}
          </div>
        </div>
      );
    }

    if (this.state.startupCompanies.length) {
      const companies = this.state.startupCompanies.map((item, index) => {
        let image = null;
        try {
          image = require(`../bilder/companies/${item.level}/${item.img}`);
        } catch (e) {
          image = require("../bilder/placeholder.svg");
        }
        const alt = `Start up company ${index}`;
        return (
          <div key={index} className="companyWrap">
            <Link
              to={settings.url + "companies/" + item.inURL}
              id={item.name.split(" ").join("-").toLowerCase()}
              className="company"
            >
              <img src={image} alt={alt} />
              <h3 lang="de">{item.name}</h3>
              <p className="readMore">{content[this.state.lang].press}</p>
            </Link>
          </div>
        );
      });

      startupCompanies = (
        <div id="startupCompaniesWrap">
          <h2>{content[this.state.lang].startupTitle}</h2>
          <div id="startupCompaniesContainer" className="companiesRow">
            {companies}
          </div>
        </div>
      );
    }

    let renderCompany;

    if (this.state.company) {
      renderCompany = (
        <Company lang={this.state.lang} companyInfo={this.state.company} />
      );
    }

    return (
      <div id="companiesWrap">
        <div
          id="modalBackground"
          style={this.state.modalBackgroundStyle}
          onMouseDown={this.closeModal}
        >
          <div
            id="modal"
            style={this.state.modalStyle}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            <div id="modalCloseButton">
              <FontAwesomeIcon
                icon={["fas", "times"]}
                className="fa"
                onMouseDown={this.closeModal}
              />
            </div>
            {renderCompany}
          </div>
        </div>
        {/*}<h1>{content[this.state.lang].title}</h1>{*/}
        <div id="companiesContainer">
          {/* <h2>{content[this.state.lang].title}</h2> */}
          {goldCompanies}
          {silverCompanies}
          {bronzeCompanies}
          {regularCompanies}
          {startupCompanies}
        </div>
      </div>
    );
  }
}

class Company extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: props.lang,
      companyInfo: props.companyInfo,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lang !== this.props.lang) {
      this.setState({ lang: this.props.lang });
    }
    if (prevProps.companyInfo !== this.props.companyInfo) {
      try {
        let logo = require(`../bilder/companies/${this.state.companyInfo.level}/${this.state.companyInfo.img}`);
        this.setState({ logo });
      } catch (e) {
        let logo = require("../bilder/placeholder.svg");
        this.setState({ logo });
      }
      this.setState({ companyInfo: this.props.companyInfo });
      document.getElementById("companyModalWrap").scrollTo(0, 0);
    }
  }

  componentDidMount() {
    try {
      let logo = require(`../bilder/companies/${this.state.companyInfo.level}/${this.state.companyInfo.img}`);
      this.setState({ logo });
    } catch (e) {
      let logo = require("../bilder/placeholder.svg");
      this.setState({ logo });
    }
  }

  render() {
    if (this.state.companyInfo) {
      let offers = content[this.state.lang].company.offersFormat.map(
        (item, index) => {
          if (this.state.companyInfo.offers[item]) {
            return (
              <div className="offer" key={index}>
                {content[this.state.lang].company.offersText[item]}
              </div>
            );
          } else {
            return null;
          }
        }
      );

      return (
        <div id="companyContainer">
          <div id="companyModalName">
            <h1>{this.state.companyInfo.name}</h1>
          </div>
          <div id="companyModalWrap">
            <h2>{content[this.state.lang].company.infoTitle}</h2>
            <div id="companyModalDescAndLogo">
              <p id="companyModalDesc">
                {this.state.companyInfo.description[this.state.lang]}
              </p>
              <img
                id="companyModalLogo"
                src={this.state.logo}
                alt="Company logo"
              />
            </div>
            <h2>{content[this.state.lang].company.offerTitle}</h2>
            <div id="companyModalOffers">{offers}</div>
            <a
              href={this.state.companyInfo.outURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.state.companyInfo.outURL}
            </a>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Companies;
