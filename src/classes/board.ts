class Board {
    // create a board from an n-by-n array of tiles,
    // where tiles[row][col] = tile at (row, col)
    constructor(tiles: number[][]) {
        // YOUR CODE HERE
    }

    // string representation of this board
    toString(): string {
        // PLS MODIFY
        return "";
    }

    // board dimension n
    dimension(): number {
        // PLS MODIFY
        return 0;
    }

    // number of tiles out of place
    hamming(): number {
        // PLS MODIFY
        return 0;
    }

    // sum of Manhattan distances between tiles and goal
    manhattan(): number {
        // PLS MODIFY
        return 0;
    }

    // is this board the goal board?
    isGoal(): boolean {
        // PLS MODIFY
        return true;
    }

    // does this board equal y?
    equals(y: Board): boolean {
        // PLS MODIFY
        return true;
    }

    // all neighboring boards
    neighbors(): Board[] {
        // PLS MODIFY
        return [];
    }

    // a board that is obtained by exchanging any pair of tiles
    twin(): Board {
        // PLS MODIFY
        return new Board([[]]);
    }
}

export default Board;
