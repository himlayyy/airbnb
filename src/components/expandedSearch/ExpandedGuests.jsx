import React, { useState } from 'react';
import { formatGuests } from '../../helpers/helpers';
import { BiMinus, BiPlus } from "react-icons/bi";

function ExpandedGuests({active=""}) {
    const [openWho, setOpenWho] = useState(false);
    const [guests, setGuests] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
      });
    const guestOptions = [
    { type: "Adults", info: "Ages 13 and above" },
    { type: "Children", info: "Ages 13 below" },
    { type: "Infants", info: "Under 2" },
    { type: "Pets", info: "Support pets" },
    ];

    const handleSetGuests = (opt, op) => {
        setGuests((prev) => {
          return {
            ...prev,
            [opt]: op === "m" ? guests[opt] - 1 : guests[opt] + 1,
          };
        });
        
        // updateSearchContext("guests", Object.fromEntries(filterGuests(guests)));
        // updateSearchContext("guestsString", formatGuests(guests));
      };
  return (
    <>
        <div
              className={`guests searchOption pointer ${
                active === "btn3" ? "activeTab" : ""
              }`}>
              <div
                className="guestPickerContainer"
                onClick={() => setOpenWho(!openWho)}
              >
                <label htmlFor="guestPicker">Who</label>
                <input
                  type="text"
                  name="guestPicker"
                  id="guest"
                  placeholder="Add guests"
                  value={formatGuests(guests)}
                />
              </div>

              {openWho && (
                <>
                  <div
                    className="guestSelectorContainer popOutContent tabPopout"
                    // ref={whoRef}
                  >
                    {guestOptions.map((option, index) => {
                      let opt = option.type.toLowerCase();
                      return (
                        <div className="popOutRow">
                          <div className="guest">
                            <span className="guestType">{option.type}</span>
                            <span className="guestInfo">{option.info}</span>
                          </div>

                          <div className="guestBtns">
                            <button
                              className="minus"
                              disabled={guests[opt] === 0}
                              onClick={() => handleSetGuests(opt, "m")}
                            >
                              <BiMinus size={"1.5em"} />
                            </button>
                            <span>{guests[opt]}</span>
                            <button
                              className="plus"
                              onClick={() => handleSetGuests(opt, "p")}
                            >
                              <BiPlus size={"1.5em"} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
        </div>
    </>
  )
}

export default ExpandedGuests