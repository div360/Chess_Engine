const boardToFen = (board) => {
    const fenRows = [];
    for (let row of board) {
        let fenRow = "";
        let emptySquares = 0;
        for (let piece of row) {
            if (piece) {
                if (emptySquares) {
                    fenRow += emptySquares;
                    emptySquares = 0;
                }
                fenRow += piece;
            } else {
                emptySquares++;
            }
        }
        if (emptySquares) fenRow += emptySquares;
        fenRows.push(fenRow);
    }
    return fenRows.join("/");
}

const fenToBoard = (fen) => {
    const rows = fen.split("/");
    const board = [];
    for (let row of rows) {
        const boardRow = [];
        for (let piece of row) {
            if (isNaN(piece)) {
                boardRow.push(piece);
            } else {
                for (let i = 0; i < parseInt(piece); i++) {
                    boardRow.push("");
                }
            }
        }
        board.push(boardRow);
    }
    return board;
}

export { boardToFen, fenToBoard };