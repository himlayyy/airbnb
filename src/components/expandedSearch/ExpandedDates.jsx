import React, { useState, useRef } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import useOutsideClick from "../../hooks/useOutsideClick";

function ExpandedDates({ active="", disabledDates=[], callback }) {
  const [openWhen, setOpenWhen] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleDates = (datesArr) => {
    setDates(datesArr);
    callback(datesArr[0]);
  }

  const closeTabPopout = () =>{
    setOpenWhen(!openWhen);
  }

  // const ref = useOutsideClick(closeTabPopout);

  return (
    <>
      <div className="dates searchOption pointer">
        {active === "btn2" ? (
          <>
            <div className={`date ${active === "btn2" ? "activeTab" : null}`}>
              <div className="checkIn">
                <label htmlFor="checkInDate">Dates</label>
                <input
                  type="text"
                  name=""
                  id="checkInDate"
                  placeholder="Add dates"
                  value={format(dates[0].startDate, "MMM d")}
                  onClick={() => setOpenWhen(!openWhen)}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={`date ${active === "btn2" ? "activeTab" : null}`}>
              <div className="checkIn">
                <label htmlFor="checkInDate">Check in</label>
                <input
                  type="text"
                  name="checkInDate"
                  id="checkInDate"
                  placeholder="Add dates"
                  value={format(dates[0].startDate, "MMM d")}
                  onClick={() => setOpenWhen(!openWhen)}
                />
              </div>
            </div>
            <div className="date">
              <div className="checkOut">
                <label htmlFor="checkOutDate">Check out</label>
                <input
                  type="text"
                  name="checkOutDate"
                  id="checkOutDate"
                  placeholder="Add dates"
                  value={format(dates[0].endDate, "MMM d")}
                  onClick={() => !openWhen && setOpenWhen(!openWhen)}
                  // onClick={() => setOpenWhen(!openWhen)}
                />
              </div>
            </div>
          </>
        )}
      </div>
      {openWhen && (
        <>
          <div
            className="tabPopout popOutContent dateSelectorContainer"
            onClick={(e) => {
              e.stopPropagation();
              closeTabPopout();
              // setOpenWhen(!openWhen);
            }}
          >
            <DateRange
              editableDateInputs={true}
              disabledDates={disabledDates}
              onChange={(item) => {
                handleDates([item.selection])
                // setDates([item.selection]);

                // updateSearchContext("dates", {
                //   startDate: dates[0].startDate,
                //   endDate: dates[0].endDate,
                // });
                // updateSearchContext("datesString", {
                //   start: format(dates[0].startDate, "MMM d"),
                //   end: format(dates[0].endDate, "MMM d"),
                // });
              }}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              // ref={ref}
            />
          </div>
        </>
      )}
    </>
  );
}

export default ExpandedDates;
