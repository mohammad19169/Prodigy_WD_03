const X_CLASS = 'X';
const O_CLASS = 'O';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
let currentPlayer = X_CLASS;
let gameActive = true;

startGame();

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setMessage(`${currentPlayer}'s Turn`);
    restartButton.addEventListener('click', restartGame);
    gameActive = true;
}

function handleClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-cell-index');

    if (gameActive && !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS)) {
        cell.classList.add(currentPlayer);
        cell.textContent = currentPlayer;
        if (checkWin()) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
            setMessage(`${currentPlayer}'s Turn`);
        }
    }
}

function setMessage(msg) {
    message.innerText = msg;
}

function checkWin() {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentPlayer);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        setMessage('Draw!');
    } else {
        setMessage(`${currentPlayer} Wins!`);
    }
}

function restartGame() {
    currentPlayer = X_CLASS;
    cells.forEach(cell => {
        cell.textContent = ''; 
    });
    startGame();
}

