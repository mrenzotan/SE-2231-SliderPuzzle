class Board {
  tiles: number[][];
  n: number;

  constructor(tiles: number[][]) {
    this.tiles = tiles;
    this.n = tiles.length;
  }

  toString(): string {
    return `${this.n}\n${this.tiles.map((row) => row.join(' ')).join('\n')}\n`;
  }

  dimension(): number {
    return this.n;
  }

  // hamming(): number {
  //   return this.tiles.flat().reduce((count, tile, index) => {
  //     if (tile !== 0 && tile !== index + 1) {
  //       count++;
  //     }
  //     return count;
  //   }, 0);
  // }

  manhattan(): number {
    return this.tiles
      .flatMap((row, i) =>
        row.map((tile, j) => {
          if (tile !== 0) {
            const goalRow = Math.floor((tile - 1) / this.n);
            const goalCol = (tile - 1) % this.n;
            return Math.abs(i - goalRow) + Math.abs(j - goalCol);
          }
          return 0;
        })
      )
      .reduce((sum, distance) => sum + distance, 0);
  }

  isGoal(): boolean {
    return this.tiles
      .flat()
      .every((tile, index) => tile === 0 || tile === index + 1);
  }

  equals(y: Board): boolean {
    return (
      this.n === y.n &&
      this.tiles.flat().every((tile, index) => tile === y.tiles.flat()[index])
    );
  }

  neighbors(): Board[] {
    const { tiles } = this;
    let neighbors: Board[] = [];
    const [blankRow, blankCol] = this.findBlank();

    const swap = (
      row1: number,
      col1: number,
      row2: number,
      col2: number
    ): void => {
      const copy = tiles.map((row) => [...row]);
      [copy[row1][col1], copy[row2][col2]] = [
        copy[row2][col2],
        copy[row1][col1],
      ];
      neighbors.push(new Board(copy));
    };

    if (blankRow > 0) swap(blankRow, blankCol, blankRow - 1, blankCol);
    if (blankRow < this.n - 1) swap(blankRow, blankCol, blankRow + 1, blankCol);
    if (blankCol > 0) swap(blankRow, blankCol, blankRow, blankCol - 1);
    if (blankCol < this.n - 1) swap(blankRow, blankCol, blankRow, blankCol + 1);

    return neighbors;
  }

  // twin(): Board {
  //   const { tiles } = this;
  //   const [row1, col1] = [
  //     Math.floor(Math.random() * this.n),
  //     Math.floor(Math.random() * this.n),
  //   ];
  //   let [row2, col2] = [
  //     Math.floor(Math.random() * this.n),
  //     Math.floor(Math.random() * this.n),
  //   ];

  //   while (
  //     tiles[row1][col1] === 0 ||
  //     tiles[row2][col2] === 0 ||
  //     tiles[row1][col1] === tiles[row2][col2]
  //   ) {
  //     row2 = Math.floor(Math.random() * this.n);
  //     col2 = Math.floor(Math.random() * this.n);
  //   }

  //   const copy = tiles.map((row) => [...row]);
  //   [copy[row1][col1], copy[row2][col2]] = [copy[row2][col2], copy[row1][col1]];
  //   return new Board(copy);
  // }

  isSolvable(): boolean {
    const inversions = this.countInversions();
    const blankRow = this.findBlank()[0];

    // For odd grid sizes (n x n), if the number of inversions is even, the puzzle is solvable
    // For even grid sizes (n x n), if the sum of the number of inversions and the row number of the blank tile is odd, the puzzle is solvable
    return (
      (this.n % 2 === 1 && inversions % 2 === 0) ||
      (this.n % 2 === 0 && (inversions + blankRow) % 2 === 1)
    );
  }

  private countInversions(): number {
    let inversions = 0;
    const flattenTiles = this.tiles.flat();

    for (let i = 0; i < flattenTiles.length; i++) {
      if (flattenTiles[i] !== 0) {
        for (let j = i + 1; j < flattenTiles.length; j++) {
          if (flattenTiles[j] !== 0 && flattenTiles[i] > flattenTiles[j]) {
            inversions++;
          }
        }
      }
    }

    return inversions;
  }

  private findBlank(): [number, number] {
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (this.tiles[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return [-1, -1];
  }
}

export default Board;
