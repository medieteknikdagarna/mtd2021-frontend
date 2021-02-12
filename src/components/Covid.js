import React, { Component } from "react";

import covid from "../components/content/covid.json";
import general from "../components/content/general.json";

import "../css/info.scss";

// --------------------------------------------
// ------------ make inside module ------------
// --------------------------------------------

// --------------------------------------------
// --------------------------------------------
// --------------------------------------------

class Covid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: props.lang,
    };
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
    return (
      <div id="infoGeneralContentContainer">
        <div class="contentTitle">
          <h1>{covid[this.state.lang].covidTitle}</h1>
        </div>
        <div id="landingContent">
          <p class="contentText">{covid[this.state.lang].contentText1}</p>

          <div class="deadspace"></div>

          <div class="contentTitle">
            <h1>{covid[this.state.lang].platform}</h1>
          </div>

          <p class="contentText">{covid[this.state.lang].contentText2}</p>
          <div style={{ height: 30 }}></div>
          <a
            id="link"
            href="https://fair.medieteknikdagen.se/sv/events"
            target="_blank"
            rel="noreferrer"
            rel="noopener"
          >
            {general[this.state.lang].url.link}
          </a>
          <div class="deadspace"></div>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/AYt-2L9gOpo"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="deadspace"></div>
      </div>
    );
  }
}

export default Covid;
