
#include <queue>
#include <array>
#include <vector>
using namespace std;

class Solution {

    struct Point {
        int row{};
        int column{};
        int cost{};
        Point(int row, int column, int cost) : row{row}, column{column}, cost{cost}{}
        Point() = default;
        ~Point() = default;
    };

    struct Comparator {
        bool operator()(const Point& first, const Point& second) {
            return first.cost > second.cost;
        };
    };
    
    inline static const array<array<int, 2>, 4> moves{array<int, 2>{-1, 0},{1, 0},{0, -1},{0, 1}};
    size_t rows;
    size_t columns;

public:
    int minimumEffortPath(const vector<vector<int>>&heights) {
        rows = heights.size();
        columns = heights[0].size();
        return dijkstraSearch(heights);
    }

private:
    int dijkstraSearch(const vector<vector<int>>&heights) {
        priority_queue < Point, vector<Point>, Comparator> minHeap;
        minHeap.push(Point(0, 0, 0));

        vector < vector<bool>> visited(rows, vector<bool>(columns));
        visited[0][0] = true;

        vector<vector<int>> minCost(rows, vector<int>(columns, INT_MAX));
        minCost[0][0] = 0;

        while (!minHeap.empty()) {

            Point point = minHeap.top();
            minHeap.pop();
            visited[point.row][point.column] = true;

            if (point.row == rows - 1 && point.column == columns - 1) {
                break;
            }

            for (int i = 0; i < moves.size(); ++i) {
                int nextRow = point.row + moves[i][0];
                int nextColumn = point.column + moves[i][1];

                if (isInGrid(nextRow, nextColumn) && !visited[nextRow][nextColumn]) {
                    int nextPointCost = abs(heights[point.row][point.column] - heights[nextRow][nextColumn]);

                    if (minCost[nextRow][nextColumn] > nextPointCost) {
                        minCost[nextRow][nextColumn] = (point.cost <= nextPointCost) ? nextPointCost : point.cost;
                        minHeap.push(Point(nextRow, nextColumn, minCost[nextRow][nextColumn]));
                    }
                }
            }
        }
        return minCost[rows - 1][columns - 1];
    }

    bool isInGrid(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
};
