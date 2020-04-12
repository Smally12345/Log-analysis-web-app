import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import {Link} from 'react-router-dom';

const Example = (props) => {

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Log Analysis</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/contentFlow"><NavLink>Endpoint-Content Analysis</NavLink></Link>
            </NavItem>
            <NavItem>
              <Link to="/responseCodes"><NavLink>Response Codes Analysis</NavLink></Link>
            </NavItem>
	    <NavItem>
	      <Link to="/traffic"><NavLink>Traffic Analysis</NavLink></Link>
	    </NavItem>
	  </Nav>
      </Navbar>
    </div>
  );
}

export default Example;
