import React from "react";

function NotFound({result}){
	return(
		<div className="notfound-container">
			<div className="notfound-content">
				No results found for {result}
			</div>
		</div>
	);
};

export default NotFound;