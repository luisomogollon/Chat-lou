import React, { Component } from "react";
import Placeholder from "../../assets/img/placeholder-avatar.png"

export default class Avatar extends Component {
  render() {
    return (
      <div className="avatar">
        <div className="avatar-img">
          <img src={Placeholder} alt="#" />
        </div>
        <span className={`isOnline ${this.props.isOnline}`}></span>
      </div>
    );
  }
}
