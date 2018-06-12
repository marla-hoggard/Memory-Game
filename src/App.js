import React from 'react';
import Board from './Board';
import Banner from './Banner';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			boardLayout: null,
			boardStatus: null,
			cardsUp: 0,
			firstTurned: null,
			secondTurned: null,
			turnsLeft: 20,
			playStatus: 'game',
		}
		this.handleFlip = this.handleFlip.bind(this);
		this.randomizeBoard = this.randomizeBoard.bind(this);
		this.newGame = this.newGame.bind(this);
	}

	//Randomize board on page load
	componentWillMount() {
		if (this.state.boardLayout === null) {
			this.randomizeBoard(9);
		}
	}
	
	//Checks for an unmatched pair to flip back over
	componentDidUpdate() {
		//Two unmatched cards up, need to be flipped back over
		if (this.state.cardsUp === 2) {
			let {boardStatus, firstTurned, secondTurned, playStatus} = this.state;
			boardStatus[firstTurned] = 0;
			boardStatus[secondTurned] = 0;

			//Flips cards back over - waits a second to see the unmatched pair
			setTimeout(() => {
				this.setState({
					boardStatus: boardStatus,
					cardsUp: 0,
					firstTurned: null,
					secondTurned: null,
				});
			}, 1000);
		}


	}
	
	//Flips card i, goes through logic of matching
	handleFlip(i) {
		console.log("clicked: ",i);
		let {boardLayout, boardStatus, cardsUp, firstTurned, secondTurned, turnsLeft, playStatus} = this.state;

		//Only works if during game and card was face down
		if (playStatus == 'game' && boardStatus[i] === 0) {
			boardStatus[i] = 1; //Show card
			
			//First card chosen
			if (cardsUp === 0) {
				firstTurned = i; //For matching on second turn
				cardsUp = 1; //Tell state one card's up now
			}
			//Already a card up
			else if (cardsUp === 1) { 
				//We have a match!
				if (boardLayout[i] === boardLayout[firstTurned]) { 
					console.log("We have a match!");
					cardsUp = 0;
					firstTurned = null;
					turnsLeft--;

					//All cards up = you win
					if (boardStatus.every(elem => elem === 1)) {
						console.log("You won!");
						playStatus = 'winner';
					}
				}
				//Not a match -> cards will flip back on componentDidUpdate
				else {
					console.log("Not a match");
					cardsUp = 2;
					secondTurned = i;
					turnsLeft--;

					//Out of turns - game over
					if (turnsLeft <= 0) {
						console.log("Game Over");
						playStatus = 'loser';
					}
				}
			}		
		}

		this.setState({
			boardStatus: boardStatus,
			cardsUp: cardsUp,
			firstTurned: firstTurned,
			secondTurned: secondTurned,
			turnsLeft: turnsLeft,
			playStatus: playStatus,
		});
	}


	//Sets state with a randomized array of size numImages*2 with values 0...numImages each appearing twice
	randomizeBoard(numImages) {
		var board = [];
		var showNone = Array(numImages*2).fill(0); //For board status, all cards face down

		//An array of 0...numImages, twice, to randomly place in board
		var toPlace = Array(numImages*2).fill('x'); 
		toPlace = toPlace.map((elem, index) => {
			return Math.floor(index/2);
		});

		//Fill in board
		for (var i = numImages*2 - 1; i >= 0; i--) {
			var nextImage = randomVal(0,i); //Randomly choose an index in toPlace
			board.push(toPlace[nextImage]); //Place the value at that index in board
			toPlace.splice(nextImage,1); //Remove that value from toPlace to it can't be reused
		}

		this.setState ({
			boardLayout: board,
			boardStatus: showNone,
		});

	}

	//Flips cards over and initializes state, then reassigns cards
	newGame(numImages) {
		var showNone = Array(numImages*2).fill(0)
		this.setState ({
			boardStatus: showNone,
			cardsUp: 0,
			firstTurned: null,
			secondTurned: null,
			turnsLeft: 20,
			playStatus: 'game',
		});

		//Waits for any visible cards to be flipped before changing images
		setTimeout(() => {this.randomizeBoard(numImages)},1000);
	}

	render() {
		return (
			<div>
				<div className="title">Play Memory</div>
				<Board boardLayout={this.state.boardLayout}
					boardStatus={this.state.boardStatus}
					handleFlip={i => this.handleFlip(i)} />
				<div className="belowGame">	
					<div className="turnsCounter">
						Turns Remaining:&nbsp;&nbsp;{this.state.turnsLeft}
					</div>
					<div className="reset">
						<button id="reset-button" onClick={() => this.newGame(9)}>New Game</button>
					</div>
				</div>
				<Banner status={this.state.playStatus}/>
			</div>
		);
	}
}

function randomVal(min,max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

 