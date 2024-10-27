const gameBoard = (function() {

    let board = ["", "", "", "", "", "", "", "", ""];

    //returns the board
    const getBoard = () => board; 

    //setting a cell/tile for the board
    const setCell = (index, marker) => {
        if (board[index] == "") {
            board[index] = marker;
        }
    };

    //resets and clears board
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return {getBoard, setCell, resetBoard};

})();

const Player = (name, marker) => {
    
    //returns name and marker
    const getName = () => name;
    const getMarker = () => marker;

    return {getName, getMarker};

};

const game = (function() {

    //making players
    const player1 = Player("Player One", "X");
    const player2 = Player("Player Two", "O");

    //making current player and win flag
    let currPlayer = player1;
    let isWin = false;
    let isTie = false;

    //switching turns
    const switchTurn = () => {
        if (currPlayer == player1) {
            currPlayer = player2;
        }
        else {
            currPlayer = player1;
        }
    }

    //getting current player
    const getCurrentPlayer = () => currPlayer;

    //checking for a winner
    const checkBoard = () => {
        const board = gameBoard.getBoard();

        //checking for a win
        if ((board[0] == board[1] && board[0] == board[2] && board[0] != "")
        || (board[3] == board[4] && board[3] == board[5] && board[3] != "")  //rows
        || (board[6] == board[7] && board[6] == board[8] && board[6] != "")
        || (board[0] == board[3] && board[0] == board[6] && board[0] != "")
        || (board[1] == board[4] && board[1] == board[7] && board[1] != "") //columns
        || (board[2] == board[5] && board[2] == board[8] && board[2] != "")
        || (board[0] == board[4] && board[0] == board[8] && board[0] != "") //diagonals
        || (board[2] == board[4] && board[2] == board[6] && board[2] != "")) {
            isWin = true;
        }

        //checking for a tie
        else if (!board.includes("")) {
            isTie = true;
        }
    }


    //planning how game logic works now
    const placeTile = (index) => {
        if (!isWin && !isTie && gameBoard.getBoard()[index] == "") {
            gameBoard.setCell(index, currPlayer.getMarker());
            checkBoard();
            displayBoard();
            if (isWin) {
                alert(`${currPlayer.getName()} wins`);
            }
            else if (isTie) {
                alert("Game ended in a draw");
            }
            else {
                switchTurn();
                const currentInfo = document.querySelector(".player-info");
                currentInfo.textContent = `Current Player: ${getCurrentPlayer().getName()} || Marker: ${currPlayer.getMarker()}`
            }
        }
    };

    const currentInfo = document.querySelector(".player-info");
    currentInfo.textContent = `Current Player: ${getCurrentPlayer().getName()} || Marker: ${currPlayer.getMarker()}`

    const displayBoard = () => {
        const board = gameBoard.getBoard();
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            cell.textContent = board[index]; // Update the cell with the current marker (X or O)
        });
    };

    const resetGame = () => {
        gameBoard.resetBoard();
        isTie = false;
        isWin = false;
        currPlayer = player1;
        displayBoard();
    };

    return {placeTile, getCurrentPlayer, resetGame};

})();

//-------------------------------------------------------------------------

const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        game.placeTile(index);
    });
});

document.getElementById('reset-button').addEventListener('click', () => {
    game.resetGame();
});
