import Board from './board';
import MinHeap from './minHeap';

class Solver {
  // find a solution to the initial board (using the A* algorithm)
  constructor(initial: Board) {
    if (initial === null) {
      throw new Error('Initial board cannot be null');
    }

    this.initialBoard = initial;
    this.priorityQueue = new MinHeap<SearchNode>(
      (a, b) => a.priority - b.priority
    );
    this.initialSearchNode = new SearchNode(
      initial,
      0,
      null,
      initial.manhattan()
    );
    this.priorityQueue.insert(this.initialSearchNode); // Use insert method
    this.visitedBoards = new Set<string>();
    this.visitedBoards.add(this.initialBoard.toString());
    this.solvePuzzle();
  }

  // is the initial board solvable? (see below)
  isSolvable(): boolean {
    return this.initialSearchNode.priority !== -1;
  }

  // min number of moves to solve initial board; -1 if unsolvable
  moves(): number {
    return this.initialSearchNode.priority === -1
      ? -1
      : this.initialSearchNode.moves;
  }

  // sequence of boards in a shortest solution; null if unsolvable
  solution(): Board[] | null {
    if (!this.isSolvable()) {
      console.log('Board is unsolvable');
      return null;
    }

    let solution: Board[] = [];
    let currentNode: SearchNode | null = this.initialSearchNode;
    while (currentNode !== null) {
      solution.unshift(currentNode.board);
      currentNode = currentNode.previous;
    }
    return solution;
  }

  private initialBoard: Board;
  private priorityQueue: MinHeap<SearchNode>;
  private initialSearchNode: SearchNode;
  private visitedBoards: Set<string>;

  private solvePuzzle(): void {
    while (!this.priorityQueue.isEmpty()) {
      let currentNode = this.priorityQueue.extractMinimum(); // Use extractMinimum method
      if (currentNode?.board.isGoal()) {
        this.initialSearchNode = currentNode;
        return;
      }

      if (currentNode) {
        for (let neighbor of currentNode.board.neighbors()) {
          let neighborString = neighbor.toString();
          if (!this.visitedBoards.has(neighborString)) {
            this.visitedBoards.add(neighborString);
            let neighborNode = new SearchNode(
              neighbor,
              currentNode.moves + 1,
              currentNode,
              neighbor.manhattan() + currentNode.moves + 1
            );
            this.priorityQueue.insert(neighborNode); // Use insert method
          }
        }
      } else {
        console.log('Current node is null, board is unsolvable');
        this.initialSearchNode = new SearchNode(
          this.initialBoard,
          -1,
          null,
          -1
        );
        return;
      }
    }

    console.log('Priority queue is empty, board is unsolvable');
    this.initialSearchNode = new SearchNode(this.initialBoard, -1, null, -1);
  }
}

class SearchNode {
  constructor(
    public board: Board,
    public moves: number,
    public previous: SearchNode | null,
    public priority: number
  ) {}
}

export default Solver;
