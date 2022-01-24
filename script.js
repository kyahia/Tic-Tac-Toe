const game = (() => {
    const gameBoard = document.querySelector('section');
    const cells = gameBoard.querySelectorAll('div');
    let winner = "";
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
        const winDiv = document.createElement('h1');
        winDiv.textContent = "Winner is : "+char;
        gameBoard.appendChild(winDiv);
    }
    return { begin };
})();



const Player = (charachter) => {
    const mark = charachter;
    let marked = [];
    let isWinner = false;
    const fill = (position) => {
        marked.push(position);
    }

    const evaluate = () => {
        let grid = [...marked];
        let one = "";
        let two = "";
        let three = "";
        // same row
        for (let i = 0; i < grid.length; i++) {
            one = grid[i][0];
            grid.splice(i, 1);
            for (let j = 0; j < grid.length; j++)
                if (grid[j][0] == one) {
                    two = grid[j][0];
                    grid.splice(j, 1);
                    for (let k = 0; k < grid.length; k++)
                        if (grid[k][0] == one) {
                            three = grid[k][0];
                            return true;
                        }
                }
        }

        // same col
        grid = [...marked];
        for (let i = 0; i < grid.length; i++) {
            one = grid[i].slice(-1);
            grid.splice(i, 1);
            for (let j = 0; j < grid.length; j++)
                if (grid[j].slice(-1) == one) {
                    two = grid[j].slice(-1);
                    grid.splice(j, 1);
                    for (let k = 0; k < grid.length; k++)
                        if (grid[k].slice(-1) == one) {
                            three = grid[k].slice(-1);
                            return true;
                        }
                }
        }

        // diag
        grid = [...marked];
        for (let i = 0; i < grid.length; i++) {
            if (grid[i][0] == grid[i][2]) {
                one = grid[i];
                grid.splice(i, 1);
                for (let j = 0; j < grid.length; j++)
                    if (grid[j][0] == grid[j][2]) {
                        two = grid[j];
                        grid.splice(j, 1);
                        for (let k = 0; k < grid.length; k++)
                            if (grid[k][0] == grid[k][2]) {
                                return true;
                            }
                    }

            }
        }
        return false;
    }

    return { mark, fill, evaluate };
}

const player1 = Player("X");

const computer = Player("O");

game.begin();