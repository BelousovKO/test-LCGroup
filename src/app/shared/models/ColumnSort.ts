export class ColumnSort {

  column: string;
  direction: string;

  constructor(column: string, directions: string) {
    this.column = column;
    this.direction = directions;
  }
}
