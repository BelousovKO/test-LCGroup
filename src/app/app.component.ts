import {Component, OnInit} from '@angular/core';
import {GetDataService} from "./services/get-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test-LCGroup: Константин Белоусов';
  data: Array<any> = [];
  users: Array<any> = [];

  constructor(private getData: GetDataService) {
  }

  ngOnInit(): void {
    this.getData.getData().subscribe((data: Array<any>) => {
      this.data = data;
      this.users = data;
    });
  }

  sortData(params: Array<any>): void {
    if (params[0] === 'address') {
      if (params[1]) {
        this.users.sort((a, b) => {
          const fullAddressA = a.address.city.concat(a.address.street);
          const fullAddressB = b.address.city.concat(b.address.street);
          return fullAddressA > fullAddressB ? -1 : 1
        })
      } else {
        this.users.sort((a, b) => {
          const fullAddressA = a.address.city.concat(a.address.street);
          const fullAddressB = b.address.city.concat(b.address.street);
          return fullAddressA > fullAddressB ? 1 : -1
        });
      }
    } else {
      if (params[1]) {
        this.users.sort((a, b) => a[params[0]] > b[params[0]] ? -1 : 1);
      } else {
        this.users.sort((a, b) => a[params[0]] > b[params[0]] ? 1 : -1);
      }
    }
  }

  filterData(params: Array<any>) {
    this.users = JSON.parse(JSON.stringify(this.data));
    if (params[0] !== 'all-cities') {
      this.users = this.users.filter(elem => elem.address.city === params[0]);
    }
    if (params[1] !== 'all-departments') {
      this.users = this.users.filter(elem => elem.department === params[1]);
    }
    if (params[2] !== 'all-genders') {
      this.users = this.users.filter(elem => elem.gender=== params[2]);
    }
  }
}
