import React, { Component } from "react";


export default class UserProfile extends Component {
  toggleInfo = (e) => {
    e.target.parentNode.classList.toggle("open");
  };
  render() {
    return (
      <div className="profile__image">
      </div>
    );
  }
}
