import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() data: Array<any> | undefined;

  @Output() sortUser: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void { }

  sortData(filed: string, direction?: number):void {
    const params = [filed, direction]
    this.sortUser.emit(params);
  }
}
