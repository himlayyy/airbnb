import React, { useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import "./header.css";

import AccountToggle from "../accounttoggle/AccountToggle";
import SearchBar from "../searchbar/SearchBar";
import SiteLogo from "../sitelogo/SiteLogo";
import ExpandedSearch from "../expandedSearch/ExpandedSearch";

import Home from "../../pages/home/Home";

function Header() {
  const [active, setActive] = useState(null);

  const navigate = useNavigate();

  const activeCallback = (optionName) => {
    setActive(optionName);
  };

  return (
    <div className="header page-padding">
      <Link to="/">
      <SiteLogo />
      </Link>
      <div className="headerCenter">
        {active === null ? (
          <>
            <SearchBar setSearchTab={activeCallback} />
          </>
        ) : (
          <>
            <ExpandedSearch activeBtn={active} />
          </>
        )}
      </div>
        <AccountToggle />
    </div>
  );
}

export default Header;
