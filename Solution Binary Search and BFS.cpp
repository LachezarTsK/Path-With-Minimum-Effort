
#include <queue>
#include <array>
#include <vector>
using namespace std;

class Solution {

    struct Point {
        int row{};
        int column{};
        Point(int row, int column) : row{row}, column{column}{}
        Point() = default;
        ~Point() = default;
    };

    inline static const array<array<int, 2>, 4> moves{array<int, 2>{-1, 0},{1, 0},{0, -1},{0, 1}};
    inline static const int maxHeight = pow(10, 6);
    size_t rows;
    size_t columns;

public:
    int minimumEffortPath(const vector<vector<int>>&heights) {
        rows = heights.size();
        columns = heights[0].size();
        return binarySearchForMinCostLevel(heights);
    }

private:
    int binarySearchForMinCostLevel(const vector<vector<int>>&heights) {
        int left = 0;
        int right = maxHeight;
        int minCost = maxHeight;

        while (left <= right) {
            int costCeiling = left + (right - left) / 2;

            if (goalReachedAtCurrentCostCeiling(heights, costCeiling)) {
                minCost = min(minCost, costCeiling);
                right = costCeiling - 1;
            } else {
                left = costCeiling + 1;
            }
        }
        return minCost;
    }

    bool goalReachedAtCurrentCostCeiling(const vector<vector<int>>&heights, int costCeiling) {
        queue<Point> queue;
        queue.push(Point(0, 0));
        vector < vector<bool>> visited(rows, vector<bool>(columns));
        visited[0][0] = true;

        while (!queue.empty()) {

            Point& point = queue.front();
            if (point.row == rows - 1 && point.column == columns - 1) {
                return true;
            }

            for (int i = 0; i < moves.size(); ++i) {
                int nextRow = point.row + moves[i][0];
                int nextColumn = point.column + moves[i][1];

                if (isInGrid(nextRow, nextColumn) && !visited[nextRow][nextColumn]) {
                    int cost = abs(heights[point.row][point.column] - heights[nextRow][nextColumn]);
                    if (cost <= costCeiling) {
                        queue.push(Point(nextRow, nextColumn));
                        visited[nextRow][nextColumn] = true;
                    }
                }
            }
            queue.pop();
        }
        return false;
    }

    bool isInGrid(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
};
