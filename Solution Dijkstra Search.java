
import java.util.Arrays;
import java.util.PriorityQueue;

public class Solution {

    private static record Point(int row, int column, int cost){}
    private static final int[][] moves = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    private int rows;
    private int columns;

    public int minimumEffortPath(int[][] heights) {
        rows = heights.length;
        columns = heights[0].length;
        return dijkstraSearch(heights);
    }

    private int dijkstraSearch(int[][] heights) {
        PriorityQueue<Point> minHeap = new PriorityQueue<>((first, second) -> first.cost - second.cost);
        minHeap.add(new Point(0, 0, 0));

        boolean[][] visited = new boolean[rows][columns];
        visited[0][0] = true;

        int[][] minCost = new int[rows][columns];
        for (int row = 0; row < rows; ++row) {
            Arrays.fill(minCost[row], Integer.MAX_VALUE);
        }
        minCost[0][0] = 0;

        while (!minHeap.isEmpty()) {
            Point point = minHeap.poll();
            visited[point.row][point.column] = true;

            if (point.row == rows - 1 && point.column == columns - 1) {
                break;
            }

            for (int i = 0; i < moves.length; ++i) {
                int nextRow = point.row + moves[i][0];
                int nextColumn = point.column + moves[i][1];

                if (isInGrid(nextRow, nextColumn) && !visited[nextRow][nextColumn]) {
                    int nextPointCost = Math.abs(heights[point.row][point.column] - heights[nextRow][nextColumn]);

                    if (minCost[nextRow][nextColumn] > nextPointCost) {
                        minCost[nextRow][nextColumn] = (point.cost <= nextPointCost) ? nextPointCost : point.cost;
                        minHeap.add(new Point(nextRow, nextColumn, minCost[nextRow][nextColumn]));
                    }
                }
            }
        }
        return minCost[rows - 1][columns - 1];
    }

    private boolean isInGrid(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
}
