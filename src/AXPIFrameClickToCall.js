import React, { createElement } from "react";
import ReactDOM from "react-dom";
import ReactHTMLElement from "react-html-element";
import { render, unmountComponentAtNode } from "react-dom";
import IframeComponent from "./components/IFrameComponent";

class AXPIFrameClickToCall extends ReactHTMLElement {
  connectedCallback() {
    // const interactionId = this.getAttribute("interactionid");
    // this.api = window.WS?.widgetAPI(interactionId);
    const interactionId = this.getAttribute("interactionid");

    this.api = window.WS?.widgetAPI(interactionId);

    ReactDOM.render(
      <>
        <IframeComponent api={this.api} />
      </>,
      this
    );
  }

  disconnectedCallback() {
    unmountComponentAtNode(IframeComponent);
  }
}

customElements.define("axpiframe-clicktocall", AXPIFrameClickToCall);
