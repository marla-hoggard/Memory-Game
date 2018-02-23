import React from 'react';
import Image from './Image';

/* PROPS:
classes = 'card' or 'card flipped'
handleFlip = onClick function for flipping the card
imageKey = the key to pass down the the image component 
*/
export default function Card(props) {
	return (
		<div className={props.classes} onClick={props.handleFlip}>
      		<figure className="front"><Image imageKey={props.imageKey}/></figure>
      		<figure className="back"></figure>
    	</div>
	);
}