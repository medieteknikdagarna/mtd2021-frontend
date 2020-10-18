import React, { Component } from "react";

import info from "../components/content/info.json";

import "../css/info.scss";

// --------------------------------------------
// ------------ make inside module ------------
// --------------------------------------------

// --------------------------------------------
// --------------------------------------------
// --------------------------------------------

class CompanyInfo extends Component {
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
          <h1>{info[this.state.lang].title}</h1>
        </div>
        <div id="landingContent">
          <p></p>
        </div>
      </div>
    );
  }
}

export default CompanyInfo;
