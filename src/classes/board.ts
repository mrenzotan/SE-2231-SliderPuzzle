class Board {
  // create a board from an n-by-n array of tiles,
  // where tiles[row][col] = tile at (row, col)
  constructor(tiles: number[][]) {
    this.tiles = tiles;
    this.n = tiles.length;
  }

  // string representation of this board
  toString(): string {
    let result = `${this.n}\n`;
    for (let i = 0; i < this.n; i++) {
      result += this.tiles[i].join(' ') + '\n';
    }
    return result;
  }

  // board dimension n
  dimension(): number {
    return this.n;
  }

  // number of tiles out of place
  hamming(): number {
    let count = 0;
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (this.tiles[i][j] !== i * this.n + j + 1 && this.tiles[i][j] !== 0) {
          count++;
        }
      }
    }
    return count;
  }

  // sum of Manhattan distances between tiles and goal
  manhattan(): number {
    let distance = 0;
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (this.tiles[i][j] !== 0) {
          let value = this.tiles[i][j];
          let goalRow = Math.floor((value - 1) / this.n);
          let goalCol = (value - 1) % this.n;
          distance += Math.abs(i - goalRow) + Math.abs(j - goalCol);
        }
      }
    }
    return distance;
  }

  // is this board the goal board?
  isGoal(): boolean {
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (this.tiles[i][j] !== i * this.n + j + 1 && this.tiles[i][j] !== 0) {
          return false;
        }
      }
    }
    return true;
  }

  // does this board equal y?
  equals(y: Board): boolean {
    if (this.n !== y.n) {
      return false;
    }
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (this.tiles[i][j] !== y.tiles[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  // all neighboring boards
  neighbors(): Board[] {
    let neighbors: Board[] = [];
    let blankRow = -1;
    let blankCol = -1;

    // Find the position of the blank tile
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (this.tiles[i][j] === 0) {
          blankRow = i;
          blankCol = j;
          break;
        }
      }
    }

    // Generate all possible neighboring boards
    if (blankRow > 0) {
      let neighbor = this.swap(blankRow, blankCol, blankRow - 1, blankCol);
      neighbors.push(neighbor);
    }
    if (blankRow < this.n - 1) {
      let neighbor = this.swap(blankRow, blankCol, blankRow + 1, blankCol);
      neighbors.push(neighbor);
    }
    if (blankCol > 0) {
      let neighbor = this.swap(blankRow, blankCol, blankRow, blankCol - 1);
      neighbors.push(neighbor);
    }
    if (blankCol < this.n - 1) {
      let neighbor = this.swap(blankRow, blankCol, blankRow, blankCol + 1);
      neighbors.push(neighbor);
    }

    return neighbors;
  }

  // a board that is obtained by exchanging any pair of tiles
  twin(): Board {
    let twin = new Board(this.tiles.map((row) => [...row]));
    let row1 = Math.floor(Math.random() * this.n);
    let col1 = Math.floor(Math.random() * this.n);
    let row2 = Math.floor(Math.random() * this.n);
    let col2 = Math.floor(Math.random() * this.n);
    while (twin.tiles[row1][col1] === 0 || twin.tiles[row2][col2] === 0) {
      row1 = Math.floor(Math.random() * this.n);
      col1 = Math.floor(Math.random() * this.n);
      row2 = Math.floor(Math.random() * this.n);
      col2 = Math.floor(Math.random() * this.n);
    }
    twin.swap(row1, col1, row2, col2);
    return twin;
  }

  private swap(row1: number, col1: number, row2: number, col2: number): Board {
    let tiles = this.tiles.map((row) => [...row]);
    [tiles[row1][col1], tiles[row2][col2]] = [
      tiles[row2][col2],
      tiles[row1][col1],
    ];
    return new Board(tiles);
  }

  private tiles: number[][];
  private n: number;
}

export default Board;
