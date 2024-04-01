class MinHeap<T> {
  private heap: T[] = [];

  constructor(private compare: (a: T, b: T) => number) {}

  insert(item: T): void {
    this.heap.push(item);
    this.bubbleUp();
  }

  extractMinimum(): T | undefined {
    if (this.heap.length === 0) return undefined;

    const min = this.heap[0];
    const last = this.heap.pop() as T;

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown();
    }

    return min;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private bubbleUp(): void {
    let current = this.heap.length - 1;
    while (current > 0) {
      const parent = Math.floor((current - 1) / 2);
      if (this.compare(this.heap[current], this.heap[parent]) >= 0) break;
      this.swap(current, parent);
      current = parent;
    }
  }

  private bubbleDown(): void {
    let current = 0;
    while (true) {
      const left = 2 * current + 1;
      const right = 2 * current + 2;
      let smallest = current;

      if (
        left < this.heap.length &&
        this.compare(this.heap[left], this.heap[smallest]) < 0
      ) {
        smallest = left;
      }

      if (
        right < this.heap.length &&
        this.compare(this.heap[right], this.heap[smallest]) < 0
      ) {
        smallest = right;
      }

      if (smallest === current) break;

      this.swap(current, smallest);
      current = smallest;
    }
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

export default MinHeap;
