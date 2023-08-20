const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const resolution = 10;
canvas.width = 800;
canvas.height = 600;

const rows = canvas.height / resolution;
const cols = canvas.width / resolution;

function buildGrid() {
    return new Array(cols).fill(null).map(() => new Array(rows).fill(false));
}

function drawGrid() {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";

    for (let i = 0; i < cols; i++) {
        ctx.moveTo(i * resolution, 0);
        ctx.lineTo(i * resolution, canvas.height);
    }

    for (let j = 0; j < rows; j++) {
        ctx.moveTo(0, j * resolution);
        ctx.lineTo(canvas.width, j * resolution);
    }

    ctx.stroke();
}

function drawCells(grid) {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j]) {
                ctx.fillStyle = "black";
                ctx.fillRect(i * resolution, j * resolution, resolution, resolution);
            }
        }
    }
}

function updateGrid(grid) {
    const newGrid = buildGrid();

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const cell = grid[i][j];
            const neighbors = countNeighbors(grid, i, j);

            if (cell) {
                newGrid[i][j] = neighbors === 2 || neighbors === 3;
            } else {
                newGrid[i][j] = neighbors === 3;
            }
        }
    }

    return newGrid;
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            const col = (x + i + cols) % cols;
            const row = (y + j + rows) % rows;
            sum += grid[col][row] ? 1 : 0;
        }
    }
    sum -= grid[x][y] ? 1 : 0;
    return sum;
}

let grid = buildGrid();

canvas.addEventListener("click", (event) => {
    const x = Math.floor(event.offsetX / resolution);
    const y = Math.floor(event.offsetY / resolution);
    grid[x][y] = !grid[x][y];
    drawCells(grid);
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid = updateGrid(grid);
    drawGrid();
    drawCells(grid);
    requestAnimationFrame(animate);
}

animate();
