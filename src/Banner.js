import React from 'react';

/* PROPS:
status - 'winner' or 'loser'
*/
export default function Banner(props) {
	if (props.status === 'winner' || props.status === 'loser') {
		let message = props.status === 'winner' ? "You Win!" : "Game Over";
		console.log("Banner called");
		return (
			<div className={"banner " + props.status}>
				{message}
			</div>
		);
	}
	else {
		return (
			<div className='banner hiddenBanner'></div>
		);
	}

}