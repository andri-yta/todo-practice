import { html } from "lit";
import { BaseView } from "./base-view";

import { connect } from "pwa-helpers";
import { store } from "../redux/store";

class StatsView extends connect(store)(BaseView) {
  static get properties() {
    return {
      config: { type: Object },
    };
  }

  stateChange(state) {
    this.config = state.statsReducer.config;
  }

  render() {
    return html` <h1>Stats</h1> `;
  }
}

customElements.define("stats-view", StatsView);
