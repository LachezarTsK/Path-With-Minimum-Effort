
/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {
    this.moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    this.rows = heights.length;
    this.columns = heights[0].length;
    this.maxHeight = Math.pow(10, 6);
    return binarySearchForMinCostLevel(heights);
};

/**
 * @param {number[][]} heights
 * @return {number}
 */
function  binarySearchForMinCostLevel(heights) {
    let left = 0;
    let right = this.maxHeight;
    let minCost = this.maxHeight;

    while (left <= right) {
        let costCeiling = left + Math.floor((right - left) / 2);

        if (goalReachedAtCurrentCostCeiling(heights, costCeiling)) {
            minCost = Math.min(minCost, costCeiling);
            right = costCeiling - 1;
        } else {
            left = costCeiling + 1;
        }
    }
    return minCost;
}

/**
 * @param {number[][]} heights
 * @param {number} costCeiling 
 * @return {boolean}
 */
function  goalReachedAtCurrentCostCeiling(heights, costCeiling) {
    const queue = new Queue();
    queue.enqueue(new Point(0, 0));
    const visited = Array.from(new Array(rows), () => new Array(columns).fill(false));
    visited[0][0] = true;

    while (!queue.isEmpty()) {
        const point = queue.dequeue();
        if (point.row === this.rows - 1 && point.column === this.columns - 1) {
            return true;
        }

        for (let i = 0; i < this.moves.length; ++i) {
            let nextRow = point.row + this.moves[i][0];
            let nextColumn = point.column + this.moves[i][1];

            if (isInGrid(nextRow, nextColumn) && !visited[nextRow][nextColumn]) {
                let cost = Math.abs(heights[point.row][point.column] - heights[nextRow][nextColumn]);
                if (cost <= costCeiling) {
                    queue.enqueue(new Point(nextRow, nextColumn));
                    visited[nextRow][nextColumn] = true;
                }
            }
        }
    }
    return false;
}

/**
 * @param {number} row
 * @param {number} column 
 */
function Point(row, column) {
    this.row = row;
    this.column = column;
}

/**
 * @param {number} row
 * @param {number} column 
 * @return {boolean}
 */
function isInGrid(row, column) {
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
}
