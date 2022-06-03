const game = (() => {
    const gameBoard = document.querySelector('section');
    const cells = gameBoard.querySelectorAll('div');
    let positions = [];

    for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 4; j++)
            positions.push(`${i}.${j}`);
    }

    const begin = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => select(e.target));
        });
    }


    const select = (cell) => {
        if (!positions.includes(cell.id)) return;
        play(player1, cell.id);
        play(computer, positions[Math.floor(positions.length * Math.random())]);
    }

    const play = (player, id) => {
        for (let i of positions) {
            if (id == i) {
                const cell = document.getElementById(id);
                cell.textContent = player.mark;
                player.fill(id);
                if(player.evaluate()) {
                    positions = [];
                    announceWinner(player.mark);
                }
                positions.splice(positions.findIndex(elem => elem == id), 1);
            }
        }
    }

    const announceWinner = (char) => {
        gameBoard.remove();
        const winDiv = document.createElement('h1');
        const btn = document.createElement('button');
        
        winDiv.textContent = "Winner is " + char;
        btn.textContent = 'Replay';
        btn.onclick = () => location.reload();
        
        document.body.appendChild(winDiv);
        document.body.appendChild(btn);
    }
    return { begin };
})();



const Player = (charachter) => {
    const mark = charachter;
    let marked = [];
    const fill = (position) => {
        marked.push(position);
    }

    const evaluate = () => {
        // horizontals
        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
                if (!marked.includes(i + '.' + j)){
                    break;
                }
                if (j === 3) return true;
            }
        }

        // verticals
        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
                if (!marked.includes(j + '.' + i)){
                    break;
                }
                if (j === 3) return true;
            }
        }

        // diag
        for (let i = 1; i <= 3; i++) {
            if (!marked.includes(i + '.' + i)){
                break;
            }
            if (i === 3) return true;
        }
        for (let i = 0; i < 3; i++) {
            if (!marked.includes(`${1+i}.${3-i}`)){
                break;
            }
            if (i === 2) return true;
        }

        return false;
    }

    return { mark, fill, evaluate };
}

const player1 = Player("X");

const computer = Player("O");

game.begin();