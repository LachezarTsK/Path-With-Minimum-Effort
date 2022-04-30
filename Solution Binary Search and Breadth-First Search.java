
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    private static record Point(int row, int column) {}
    private static final int[][] moves = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    private static final int maxHeight = (int) Math.pow(10, 6);
    private int rows;
    private int columns;

    public int minimumEffortPath(int[][] heights) {
        rows = heights.length;
        columns = heights[0].length;
        return binarySearchForMinCostLevel(heights);
    }

    private int binarySearchForMinCostLevel(int[][] heights) {
        int left = 0;
        int right = maxHeight;
        int minCost = maxHeight;

        while (left <= right) {
            int costCeiling = left + (right - left) / 2;

            if (goalReachedAtCurrentCostCeiling(heights, costCeiling)) {
                minCost = Math.min(minCost, costCeiling);
                right = costCeiling - 1;
            } else {
                left = costCeiling + 1;
            }
        }
        return minCost;
    }

    private boolean goalReachedAtCurrentCostCeiling(int[][] heights, int costCeiling) {
        Queue<Point> queue = new LinkedList<>();
        queue.add(new Point(0, 0));
        boolean[][] visited = new boolean[rows][columns];
        visited[0][0] = true;

        while (!queue.isEmpty()) {
            Point point = queue.poll();
            if (point.row == rows - 1 && point.column == columns - 1) {
                return true;
            }

            for (int i = 0; i < moves.length; ++i) {
                int nextRow = point.row + moves[i][0];
                int nextColumn = point.column + moves[i][1];

                if (isInGrid(nextRow, nextColumn) && !visited[nextRow][nextColumn]) {
                    int cost = Math.abs(heights[point.row][point.column] - heights[nextRow][nextColumn]);
                    if (cost <= costCeiling) {
                        queue.add(new Point(nextRow, nextColumn));
                        visited[nextRow][nextColumn] = true;
                    }
                }
            }
        }
        return false;
    }

    private boolean isInGrid(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
}
