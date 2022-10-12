import React, { useState, useEffect } from "react";
import "./modal.css";

import {IoCloseCircle} from "react-icons/io5";
function Modal(props) {
  const { modalContents, openModal, optionType, prompt, modalCallback } = props;
  const [tab, setTab] = useState(0);
  const [tabOptions, setTabOptions] = useState(modalContents[tab]);
  const [optionGroup, setOptionGroup] = useState({});
  // const [identifier, setIdentifier] = useState({});

  const clickedTab = (index) => {
    setTab(index);
  };

  

  //   useEffect(() =>{
  //     console.log(options);
  //     console.log(`options type: ${typeof options}`);
  // console.log(`options[0] ${ options[tab]}`);

  useEffect(() =>{
    
      console.log(tabOptions);
   
  },[]);

  useEffect(() => {
    
    // if(tab === null){
    //   setTabOptions(modalContents[0]);
    // }
    setTabOptions(modalContents[tab]);
  }, [tab]);

  useEffect(() => {
    console.log(modalContents);
    const groups = {};
    modalContents.forEach((option) => {
    
       return groups[option.name] = option.options[0]
     
    });
    
    setOptionGroup(groups);
    // setIdentifier(Object.keys(optionGroup[Object.keys(optionGroup)[0]])[0]);
    // console.log(optionGroup);
    
  }, []);

  // useEffect(() => {
   

  // },[]);

  // const identifier = Object.keys(optionGroup[Object.keys(optionGroup)[0]])[0];

  return (
 
    <div className="modalOverlay">
      {console.log("in modal!")}
      <div className="modalContainer">
        {/* {console.log(modalContents)}
        
        {console.log(typeof(modalContents),modalContents, Object.keys(modalContents),Object.keys(modalContents).length)}
        {console.log(optionGroup.forEach((option) => console.log(option)))} */}
            {console.log(`option group: ${optionGroup}`)}

        <button className="buttonTop" onClick={() => openModal(!openModal)}><IoCloseCircle size={"2.5em"}/></button>
        <div className="modalSection modalTabs">
          {Object.keys(modalContents).length === 1 ? (
            <>
              <div className="modalTab">{modalContents[0].name}</div>
            </>
          ) : (
            <>
              {modalContents.map((option, index) => (
                <div className="modalTab" key={index}>
                  <h3
                    onClick={() => {
                      console.log(tab);
                      clickedTab(index);
                    }}
                    key={index}
                  >
                    {option.name}
                  </h3>
                </div>
              ))}
            </>
          )}
        </div>
        
        {prompt !== undefined &&  tabOptions && (
          <h4 >
            {`${prompt} ${tabOptions.name}`}
          </h4>
          )
        }
        
        <div className="modalSection modalOptions">
          {optionGroup && tabOptions && optionType === "radio" && (

            <>

            {console.log(optionGroup)}
            {/* {console.log(Object.keys(optionGroup[tabOptions.name])[0])} */}
            {/* {console.log(`Identifier: ${Object.keys(identifier)} ${Object.values}`)} */}

              {Object.values(tabOptions.options).map((item) => (
                  <label className = "modalOption" htmlFor={item.country}>
                    {/* {console.log(item)} */}
                    {/* {console.log(optionGroup[tabOptions.name])}
                    {console.log(typeof optionGroup[tabOptions.name])} */}
                    {/* {console.log(Object.keys(optionGroup[tabOptions.name]))} */}
                    {/* {console.log(optionGroup[tabOptions.name])} */}
                  <input
                    type="radio"
                    id={item.country}
                    name={tabOptions.name}
                    value={Object.values(item).join("-")}
                    checked={item.current === true ? "checked" : null}
                    // defaultChecked={(() => console.log(optionGroup))}
                      
                      
                      // item.country === Object.values(optionGroup[tabOptions.name])[0]  ? "checked" : null}
                                      
                    onChange = {() => {
                      // console.log(tab, item.country, optionGroup[tabOptions.name].country)
                      
                      
                      setOptionGroup((prevVal) => {
                        console.log('changing option group!')
                        item.current = true;
                        prevVal[tabOptions.name].current = false;
                         return {...optionGroup, [tabOptions.name] :item}
                      })
                      // setOptionGroup({...optionGroup, [tabOptions.
                     
                    }
                    }
                  />
                  
                    <div className="modalOption-item">
                      {Object.entries(item).map(([k, v]) => (
                        <div className={k}>{v}</div>
                      ))}
                    </div>
                  </label>

              ))}
              
              
            </>
          )}
          {tabOptions && optionType === "text" && (
            <>
              <div>form</div>
            </>
          )}
        </div>
        <button className="buttonBottom" onClick={() => {
          openModal(!openModal);
          modalCallback(optionGroup);}
          }>Save</button>
      </div>
      
    </div>
  );
}

function ModalTab(props) {
  const { items } = props;
  console.log("in modal!");
  return (
    <>
      {Object.values(items.options).map((item) => (
        <div className="modalOption">
          {console.log(item)}
          <input
            type="radio"
            name={items.name}
            value={Object.values(item).join("-")}
            defaultChecked={item.current === true ? "checked" : ""}
          />
          {Object.entries(item).map(([k, v]) => (
            <span className={k}>{v}</span>
          ))}
        </div>
      ))}
    </>
  );
}

export default Modal;
