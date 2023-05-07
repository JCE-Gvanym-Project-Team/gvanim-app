import React, { Component } from "react";
import NavBarDe from "./NavBarDe";

class NavBar extends Component {
  state = {
    activePage: "recruiterMainPage",
  };

  handleClick = (page) => {
    this.setState({ activePage: page });
  };

  render() {
    const { activePage } = this.state;

    return (
      <React.Fragment>
        <NavBarDe activePage={activePage} handleClick={this.handleClick} />
      </React.Fragment>
    );
  }
}

export default NavBar;
