document.onreadystatechange = () => {
	if (document.readyState == 'complete') {
		renderChessBoard();
	}
};

let blackPieceCharCodes = [9818, 9819, 9820, 9821, 9822, 9823];
let whitePieceCharCodes = [9812, 9813, 9814, 9815, 9816, 9817];
let charCodeDict = {
	kingWhite: 9812,
	queenWhite: 9813,
	rookWhite: 9814,
	bishopWhite: 9815,
	knightWhite: 9816,
	pawnWhite: 9817,
	kingBlack: 9818,
	queenBlack: 9819,
	rookBlack: 9820,
	bishopBlack: 9821,
	knightBlack: 9822,
	pawnBlack: 9823,
	circleBlack: 11044,
};
let colorDict = {
	white: 'white',
	black: 'black'
}
let selectedPieceCharCode = '';
let selectedPieceCellId = '';
let selectedPieceColor = '';
let blackExchangePosY = 0;
let whiteExchangePosY = 0;
let currPlayerWhite = true;
let dangerPiecesPositionIdArr = [];

function renderChessBoard() {
	document.querySelector('div#chess-board-container').innerHTML = '';
	let table = document.createElement('table');
	for (let i = 0; i < 8; i++) {
		let tr = document.createElement('tr');
		for (let j = 0; j < 8; j++) {
			let td = document.createElement('td');
			td.id = `${i}-${j}`;
			td.className = 'chess-cell';
			td.style.background = (i + j) % 2 == 0 ? '#8a7979' : '#ece7e7'; //black: white
			// '#645656':'#ece7e7';
			tr.appendChild(td);
			addCellClickEvent(td, i, j);
		}
		table.appendChild(tr);
	}
	document.querySelector('div#chess-board-container').appendChild(table);
	rearrangePieces();
}

function rearrangePieces() {
	clearBoard();

	//arrange black pieces
	document.getElementById('0-0').innerHTML = `&#${charCodeDict.rookBlack};`;
	document.getElementById('0-1').innerHTML = `&#${charCodeDict.knightBlack};`;
	document.getElementById('0-2').innerHTML = `&#${charCodeDict.bishopBlack};`;
	document.getElementById('0-3').innerHTML = `&#${charCodeDict.queenBlack};`;
	document.getElementById('0-4').innerHTML = `&#${charCodeDict.kingBlack};`;
	document.getElementById('0-5').innerHTML = `&#${charCodeDict.bishopBlack};`;
	document.getElementById('0-6').innerHTML = `&#${charCodeDict.knightBlack};`;
	document.getElementById('0-7').innerHTML = `&#${charCodeDict.rookBlack};`;

	// arrange black pawns
	for (let j = 0; j < 8; j++) {
		let elem = document.getElementById(`1-${j}`);
		elem.innerHTML = `&#${charCodeDict.pawnBlack};`;
	}

	//arrange white pieces
	document.getElementById('7-0').innerHTML = `&#${charCodeDict.rookWhite};`;
	document.getElementById('7-1').innerHTML = `&#${charCodeDict.knightWhite};`;
	document.getElementById('7-2').innerHTML = `&#${charCodeDict.bishopWhite};`;
	document.getElementById('7-3').innerHTML = `&#${charCodeDict.queenWhite};`;
	document.getElementById('7-4').innerHTML = `&#${charCodeDict.kingWhite};`;
	document.getElementById('7-5').innerHTML = `&#${charCodeDict.bishopWhite};`;
	document.getElementById('7-6').innerHTML = `&#${charCodeDict.knightWhite};`;
	document.getElementById('7-7').innerHTML = `&#${charCodeDict.rookWhite};`;

	// arrange white pawns
	for (let j = 0; j < 8; j++) {
		let elem = document.getElementById(`6-${j}`);
		elem.innerHTML = `&#${charCodeDict.pawnWhite};`;
	}
}

function clearBoard() {
	document.querySelectorAll('.chess-cell').forEach((elem) => {
		elem.innerHTML = '';
	});
}

function plotPossibleCell(possibleMovesArr) {
	possibleMovesArr.forEach((id) => {
		let elem = document.getElementById(id);
		elem.innerHTML = `&#${charCodeDict.circleBlack};`;
		elem.classList.add('possible-cell');
	});
}

function addCellClickEvent(elem, posX, posY) {
	elem.addEventListener('click', () => {
		let text = elem.innerText;
		clearCellHighlights();
		clearCircles();

		let charCode = text.charCodeAt(0);

		let elemId = `${posX}-${posY}`;
		if (dangerPiecesPositionIdArr.includes(elemId)) {
			changeCurrentPlayerStatus();
			movePiece(`${posX}-${posY}`);
			dangerPiecesPositionIdArr = [];
			if (selectedPieceCharCode == charCodeDict.pawnWhite && posX == 0) {
				whiteExchangePosY = posY;
				exchangeWhitePawn();
				return;
			}
			if (selectedPieceCharCode == charCodeDict.pawnBlack && posX == 7) {
				blackExchangePosY = posY;
				exchangeBlackPawn();
				return;
			}
			return;
		}

		if (blackPieceCharCodes.includes(charCode)) {
			if (currPlayerWhite) return;
			highlightSelectedPiece(elem);
			selectedPieceCharCode = charCode;
			selectedPieceCellId = `${posX}-${posY}`;
			selectedPieceColor = 'black';
		}
		else if (whitePieceCharCodes.includes(charCode)) {
			if (!currPlayerWhite) return;
			highlightSelectedPiece(elem);
			selectedPieceCharCode = charCode;
			selectedPieceCellId = `${posX}-${posY}`;
			selectedPieceColor = 'white';
		}

		if (charCode == charCodeDict.circleBlack) {
			changeCurrentPlayerStatus();

			if (selectedPieceCharCode == charCodeDict.pawnBlack && posX == 7) {
				blackExchangePosY = posY;
				exchangeBlackPawn();
				return;
			}
			movePiece(`${posX}-${posY}`);
			return;
		}

		switch (charCode) {
			case charCodeDict.kingBlack:
			case charCodeDict.kingWhite:
				calcKingMove(posX, posY);
				break;
			case charCodeDict.queenBlack:
			case charCodeDict.queenWhite:
				calcQueenMove(posX, posY);
				break;
			case charCodeDict.bishopBlack:
			case charCodeDict.bishopWhite:
				calcBishopMove(posX, posY);
				break;
			case charCodeDict.rookBlack:
			case charCodeDict.rookWhite:
				calcRookMove(posX, posY);
				break;
			case charCodeDict.knightBlack:
			case charCodeDict.knightWhite:
				calcKnightMove(posX, posY);
				break;
			case charCodeDict.pawnBlack:
			case charCodeDict.pawnWhite:
				calcPawnMove(posX, posY);
				break;
		}


	});
}

function changeCurrentPlayerStatus() {
	currPlayerWhite = !currPlayerWhite;
	if (currPlayerWhite)
		document.getElementById('currPlayerStat').style.color = "white";
	else
		document.getElementById('currPlayerStat').style.color = "black";
}

function highlightSelectedPiece(elem) {
	elem.classList.add('cell-selected');
}

function exchangeBlackPawn() {
	document.getElementById('exchangeBlackPawn-div').style.visibility = 'visible';
}

function exchangeWhitePawn() {
	document.getElementById('exchangeWhitePawn-div').style.visibility = 'visible';
}

function exchangePiece(piece, pieceColor) {
	hidePawnExchangeDiv();
	switch (`${piece}-${pieceColor}`) {
		case 'queen-black':
			selectedPieceCharCode = charCodeDict.queenBlack;
			movePiece(`7-${blackExchangePosY}`);
			break;
		case 'rook-black':
			selectedPieceCharCode = charCodeDict.rookBlack;
			movePiece(`7-${blackExchangePosY}`);
			break;
		case 'bishop-black':
			selectedPieceCharCode = charCodeDict.bishopBlack;
			movePiece(`7-${blackExchangePosY}`);
			break;
		case 'knight-black':
			selectedPieceCharCode = charCodeDict.knightBlack;
			movePiece(`7-${blackExchangePosY}`);
			break;
		case 'queen-white':
			selectedPieceCharCode = charCodeDict.queenWhite;
			movePiece(`0-${whiteExchangePosY}`);
			break;
		case 'rook-white':
			selectedPieceCharCode = charCodeDict.rookWhite;
			movePiece(`0-${whiteExchangePosY}`);
			break;
		case 'bishop-white':
			selectedPieceCharCode = charCodeDict.bishopWhite;
			movePiece(`0-${whiteExchangePosY}`);
			break;
		case 'knight-white':
			selectedPieceCharCode = charCodeDict.knightWhite;
			movePiece(`0-${whiteExchangePosY}`);
			break;
	}
}

function hidePawnExchangeDiv() {
	document.getElementById('exchangeBlackPawn-div').style.visibility = 'hidden';
	document.getElementById('exchangeWhitePawn-div').style.visibility = 'hidden';
}

function clearCellHighlights() {
	let elems = document.getElementsByClassName('cell-selected');
	for (let i = 0; i < elems.length; i++)
		elems[i].classList.remove('cell-selected');
}

function movePiece(cellId) {
	document.getElementById(cellId).innerHTML = `&#${selectedPieceCharCode};`;
	document.getElementById(selectedPieceCellId).innerText = '';
}

function clearCircles() {
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			let elem = document.getElementById(`${i}-${j}`);
			let innerText = elem.innerText;
			if (!innerText) continue;
			if (innerText.charCodeAt(0) == charCodeDict.circleBlack) {
				elem.innerText = '';
				elem.classList.remove('possible-cell');
			}
		}
	}
}
