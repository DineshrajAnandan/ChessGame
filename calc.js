function calcKingMove(posX, posY) {
    let possibleMovesArr = [];

    // possibility 1
    let [newPosX, newPosY] = [posX - 1, posY];
    if (validatePosition(newPosX, newPosY))
        possibleMovesArr.push(`${newPosX}-${newPosY}`);
    // possibility 2
    [newPosX, newPosY] = [posX + 1, posY];
    if (validatePosition(newPosX, newPosY))
        possibleMovesArr.push(`${newPosX}-${newPosY}`);
    // possibility 3
    [newPosX, newPosY] = [posX, posY - 1];
    if (validatePosition(newPosX, newPosY))
        possibleMovesArr.push(`${newPosX}-${newPosY}`);
    // possibility 4
    [newPosX, newPosY] = [posX, posY + 1];
    if (validatePosition(newPosX, newPosY))
        possibleMovesArr.push(`${newPosX}-${newPosY}`);
    // possibility 5
    [newPosX, newPosY] = [posX - 1, posY - 1];
    if (validatePosition(newPosX, newPosY))
        possibleMovesArr.push(`${newPosX}-${newPosY}`);
    // possibility 6
    [newPosX, newPosY] = [posX + 1, posY + 1];
    if (validatePosition(newPosX, newPosY))
        possibleMovesArr.push(`${newPosX}-${newPosY}`);
    // possibility 7
    [newPosX, newPosY] = [posX - 1, posY + 1];
    if (validatePosition(newPosX, newPosY))
        possibleMovesArr.push(`${newPosX}-${newPosY}`);
    // possibility 8
    [newPosX, newPosY] = [posX + 1, posY - 1];
    if (validatePosition(newPosX, newPosY))
        possibleMovesArr.push(`${newPosX}-${newPosY}`);

    plotPossibleCell(possibleMovesArr);
}

function calcQueenMove(posX, posY) {
    let possibleMovesArr = [];
    possibleMovesArr = calcRowColMovePossibilities(posX, posY);
    possibleMovesArr = possibleMovesArr.concat(
        calcDiagonalMovePossibilities(posX, posY)
    );

    plotPossibleCell(possibleMovesArr);
}

function calcRookMove(posX, posY) {
    plotPossibleCell(calcRowColMovePossibilities(posX, posY));
}

function calcBishopMove(posX, posY) {
    plotPossibleCell(calcDiagonalMovePossibilities(posX, posY));
}

function calcKnightMove(posX, posY) {
    let possibleMovesArr = [];

    // possibility 1
    let [newPosX, newPosY] = [posX - 2, posY - 1];
    if (validatePosition(newPosX, newPosY))
        possibleMovesArr.push(`${newPosX}-${newPosY}`);
    // possibility 2
    [newPosX, newPosY] = [posX - 2, posY + 1];
    if (validatePosition(newPosX, newPosY))
        possibleMovesArr.push(`${newPosX}-${newPosY}`);
    // possibility 3
    [newPosX, newPosY] = [posX + 2, posY - 1];
    if (validatePosition(newPosX, newPosY))
        possibleMovesArr.push(`${newPosX}-${newPosY}`);
    // possibility 4
    [newPosX, newPosY] = [posX + 2, posY + 1];
    if (validatePosition(newPosX, newPosY))
        possibleMovesArr.push(`${newPosX}-${newPosY}`);
    // possibility 5
    [newPosX, newPosY] = [posX - 1, posY - 2];
    if (validatePosition(newPosX, newPosY))
        possibleMovesArr.push(`${newPosX}-${newPosY}`);
    // possibility 6
    [newPosX, newPosY] = [posX + 1, posY - 2];
    if (validatePosition(newPosX, newPosY))
        possibleMovesArr.push(`${newPosX}-${newPosY}`);
    // possibility 7
    [newPosX, newPosY] = [posX - 1, posY + 2];
    if (validatePosition(newPosX, newPosY))
        possibleMovesArr.push(`${newPosX}-${newPosY}`);
    // possibility 8
    [newPosX, newPosY] = [posX + 1, posY + 2];
    if (validatePosition(newPosX, newPosY))
        possibleMovesArr.push(`${newPosX}-${newPosY}`);

    plotPossibleCell(possibleMovesArr);
}

function calcPawnMove(posX, posY) {
    let possibleMovesArr = [];
    
    if (selectedPieceColor == colorDict.black) {
        if (posX == 7 || 
            !!document.getElementById(`${posX + 1}-${posY}`).innerText) 
            return;
        possibleMovesArr = [`${posX + 1}-${posY}`];
        if(posX == 1 && !document.getElementById(`${posX + 2}-${posY}`).innerText)
            possibleMovesArr.push(`${posX + 2}-${posY}`)
    }
    if (selectedPieceColor == colorDict.white) {
        if (posX == 0 || 
            !!document.getElementById(`${posX - 1}-${posY}`).innerText) 
            return;
        possibleMovesArr = [`${posX - 1}-${posY}`];
        if(posX == 6 && !document.getElementById(`${posX - 2}-${posY}`).innerText)
            possibleMovesArr.push(`${posX - 2}-${posY}`)
    }
    plotPossibleCell(possibleMovesArr);
}

function validatePosition(x, y) {
    if (x > 7 || x < 0 || y < 0 || y > 7) return false;
    if (!!document.getElementById(`${x}-${y}`).innerText) return false;
    return true;
}

function calcRowColMovePossibilities(posX, posY) {
    let possibleMovesArr = [];
    // row move possibility
    for (let i = posX + 1; i < 8; i++) {
        if (!!(document.getElementById(`${i}-${posY}`).innerText)) break;
        possibleMovesArr.push(`${i}-${posY}`);
    }
    for (let i = posX - 1; i >= 0; i--) {
        if (!!(document.getElementById(`${i}-${posY}`).innerText)) break;
        possibleMovesArr.push(`${i}-${posY}`);
    }
    // for (let i = 0; i < 8; i++) {
    //     if (i != posX) possibleMovesArr.push(`${i}-${posY}`);
    // }
    // col move possibility
    for (let i = posY + 1; i < 8; i++) {
        if (!!(document.getElementById(`${posX}-${i}`).innerText)) break;
        possibleMovesArr.push(`${posX}-${i}`);
    }
    for (let i = posY - 1; i >= 0; i--) {
        if (!!(document.getElementById(`${posX}-${i}`).innerText)) break;
        possibleMovesArr.push(`${posX}-${i}`);
    }
    // for (let i = 0; i < 8; i++) {
    //     if (i != posY) possibleMovesArr.push(`${posX}-${i}`);
    // }
    return possibleMovesArr;
}

function calcDiagonalMovePossibilities(posX, posY) {
    let possibleMovesArr = [];
    // back diagonal move possibility
    for (let i = posX + 1, j = posY - 1; i < 8 && j >= 0; i++, j--) {
        if(!!document.getElementById(`${i}-${j}`).innerText) break;
        possibleMovesArr.push(`${i}-${j}`);
    }
    for (let i = posX - 1, j = posY + 1; i >= 0 && j < 8; i--, j++) {
        if(!!document.getElementById(`${i}-${j}`).innerText) break;
        possibleMovesArr.push(`${i}-${j}`);
    }

    // front diagonal move possibility
    for (let i = posX + 1, j = posY + 1; i < 8 && j < 8; i++, j++) {
        if(!!document.getElementById(`${i}-${j}`).innerText) break;
        possibleMovesArr.push(`${i}-${j}`);
    }
    for (let i = posX - 1, j = posY - 1; i >= 0 && j >= 0; i--, j--) {
        if(!!document.getElementById(`${i}-${j}`).innerText) break;
        possibleMovesArr.push(`${i}-${j}`);
    }

    return possibleMovesArr;
}
