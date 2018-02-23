import React from 'react';
import Card from './Card';

/* PROPS
boardLayout - array describing what cards are where
boardStatus - array of 0s and 1s - back or flipped
handleFlip - a function for flipping the card
*/

export default class Board extends React.Component {
	renderCard(i) {
		let classnames = this.props.boardStatus[i] === 0 ? 'card' : 'card flipped';
		let imageKey = this.props.boardLayout[i];

		return (
			<Card key={i}
				classes={classnames}
				imageKey={imageKey}
				handleFlip={() => this.props.handleFlip(i)}
			/>
		);
	}
	render() {
		return(
			<div className="cards">
				{this.props.boardLayout.map((card,index) => {
					return this.renderCard(index);
				})}
			</div>
		);
	}
}