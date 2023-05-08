import React, { Component } from "react";
import NavBarDe from "./NavBarDe";

// The NavBar component is a class
// component that renders the NavBarDe component.
class NavBar extends Component {
	state = {
		activePage: "recruiterMainPage",
	};
	// The handleClick function receives the page name
	// as a parameter and updates the activePage state accordingly.
	handleClick = (page) => {
		this.setState({ activePage: page });
	};
	// The render function renders the NavBarDe component and passes
	// the activePage and handleClick props to it.
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
