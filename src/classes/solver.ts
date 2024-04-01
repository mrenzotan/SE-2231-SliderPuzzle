import Board from './board';
import MinHeap from './minHeap';

class Solver {
  constructor(initial: Board) {
    if (initial === null) {
      throw new Error('Initial board cannot be null');
    }

    this.initialBoard = initial;
    this.priorityQueue = new MinHeap<SearchNode>(
      (a, b) => a.priority - b.priority
    );
    this.visitedBoards = new Set<string>();
    this.solvePuzzle();
  }

  isSolvable(): boolean {
    return this.initialSearchNode !== null;
  }

  moves(): number {
    return this.initialSearchNode ? this.initialSearchNode.moves : -1;
  }

  solution(): Board[] | null {
    if (!this.isSolvable()) {
      console.log('Board is unsolvable');
      return null;
    }

    let solution: Board[] = [];
    let currentNode: SearchNode | null = this.initialSearchNode!;
    while (currentNode !== null) {
      solution.unshift(currentNode.board);
      currentNode = currentNode.previous;
    }
    return solution;
  }

  private initialBoard: Board;
  private priorityQueue: MinHeap<SearchNode>;
  private initialSearchNode: SearchNode | null = null; // Initialize as null
  private visitedBoards: Set<string>;

  private solvePuzzle(): void {
    // Inside the solvePuzzle method, before initializing initialSearchNode
    console.log('Is initial board solvable?', this.initialBoard.isSolvable());

    // If the initial board is not solvable, mark puzzle as unsolvable and return
    if (!this.initialBoard.isSolvable()) {
      console.log('Board is unsolvable');
      this.initialSearchNode = null;
      return;
    }

    this.initialSearchNode = new SearchNode(
      this.initialBoard,
      0,
      null,
      this.initialBoard.manhattan()
    );
    this.priorityQueue.insert(this.initialSearchNode);
    this.visitedBoards.add(this.initialBoard.toString());

    while (!this.priorityQueue.isEmpty()) {
      let currentNode = this.priorityQueue.extractMinimum();
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
            this.priorityQueue.insert(neighborNode);
          }
        }
      }
    }

    // If the loop exits without finding a solution, mark puzzle as unsolvable
    console.log('Board is unsolvable');
    this.initialSearchNode = null;
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
