
const {PriorityQueue} = require('@datastructures-js/priority-queue');

/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {
    this.moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    this.rows = heights.length;
    this.columns = heights[0].length;
    return dijkstraSearch(heights);
};

/**
 * @param {number[][]} heights
 * @return {number}
 */
function dijkstraSearch(heights) {
    const minHeap = new MinPriorityQueue({compare: (first, second) => first.cost - second.cost});
    minHeap.enqueue(new Point(0, 0, 0));

    const visited = Array.from(new Array(this.rows), () => new Array(this.columns).fill(false));
    visited[0][0] = true;

    const minCost = Array.from(new Array(this.rows), () => new Array(this.columns).fill(Number.MAX_SAFE_INTEGER));
    minCost[0][0] = 0;

    while (!minHeap.isEmpty()) {
        const point = minHeap.dequeue();
        visited[point.row][point.column] = true;

        if (point.row === this.rows - 1 && point.column === this.columns - 1) {
            break;
        }

        for (let i = 0; i < this.moves.length; ++i) {
            let nextRow = point.row + moves[i][0];
            let nextColumn = point.column + moves[i][1];

            if (isInGrid(nextRow, nextColumn) && !visited[nextRow][nextColumn]) {
                let nextPointCost = Math.abs(heights[point.row][point.column] - heights[nextRow][nextColumn]);

                if (minCost[nextRow][nextColumn] > nextPointCost) {
                    minCost[nextRow][nextColumn] = (point.cost <= nextPointCost) ? nextPointCost : point.cost;
                    minHeap.enqueue(new Point(nextRow, nextColumn, minCost[nextRow][nextColumn]));
                }
            }
        }
    }
    return minCost[this.rows - 1][this.columns - 1];
}

/**
 * @param {number} row
 * @param {number} column 
 * @param {cost} cost
 */
function Point(row, column, cost) {
    this.row = row;
    this.column = column;
    this.cost = cost;
}

/**
 * @param {number} row
 * @param {number} column 
 * @return {boolean}
 */
function isInGrid(row, column) {
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
}
