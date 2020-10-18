import React, { Component } from "react";

import covid from "../components/content/covid.json";

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
      <div id="generalContentContainer">
        <div class="contentTitle">
          <h1>{covid[this.state.lang].title}</h1>
        </div>
        <div id="landingContent">
          <p class="contentText">{covid[this.state.lang].contentText1}</p>
          <p class="contentText">{covid[this.state.lang].contentText2}</p>
        </div>
      </div>
    );
  }
}

export default Covid;
