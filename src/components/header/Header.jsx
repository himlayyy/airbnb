import React, { useState } from "react";
import "./header.css";

import AccountToggle from "../accounttoggle/AccountToggle";
import SearchBar from "../searchbar/SearchBar";
import SiteLogo from "../sitelogo/SiteLogo";
import ExpandedSearch from "../expandedSearch/ExpandedSearch";

function Header() {
  const [active, setActive] = useState(null);

  const activeCallback = (optionName) => {
    setActive(optionName);
  };

  return (
    <div className="header page-padding">
      <SiteLogo />
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
