import {Component} from '@angular/core';
import {DataService} from "../../shared/services/data.service";
import {TableHeaders} from "../../shared/models/TableHeaders";
import {SortDirection} from "../../shared/models/SortDirection";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  constructor(public data: DataService) {
  }

  TableHeaders = TableHeaders;
  SortDirection = SortDirection;
}
