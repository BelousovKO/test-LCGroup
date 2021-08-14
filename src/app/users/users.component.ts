import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

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
