import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {UserDto} from "../models/UserDto";
import {BehaviorSubject, Observable} from "rxjs";
import {TableHeaders} from "../models/TableHeaders";
import {SortDirection} from "../models/SortDirection";
import {ColumnSort} from "../models/ColumnSort";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private genderFilter: string = '';
  private departmentFilter: string = '';
  private cityFilter: string = '';
  private sortParams = new ColumnSort('', '');
  private _data: UserDto[] = [];
  private _data$ = new BehaviorSubject<UserDto[]>([]);
  data$: Observable<UserDto[]> = this._data$.asObservable();

  constructor(private http: HttpService) {
    this.initData();
  }

  private initData(): void {
    this.http.getData().subscribe((data) => {
      this._data = data;
      this._data$.next(data);
    });
  }

  sortData(column: string, direction: string): void {
    this.sortParams.column = column;
    this.sortParams.direction = direction;
    this._data$.next(this.handleData(this._data));
  }

  filterData(genderFilter: string, departmentFilter: string, cityFilter: string) {
    this.genderFilter = genderFilter;
    this.departmentFilter = departmentFilter;
    this.cityFilter = cityFilter;
    this._data$.next(this.handleData(this._data));
  }

  private handleData(data: UserDto[]): UserDto[] {
    data = [...data];
    if (this.genderFilter) data = data.filter(elem => elem.gender === this.genderFilter);
    if (this.departmentFilter) data = data.filter(elem => elem.department === this.departmentFilter);
    if (this.cityFilter) data = data.filter(elem => elem.address.city === this.cityFilter);
    if (this.sortParams.column === TableHeaders.address) {
      if (this.sortParams.direction === SortDirection.ASC) {
        data.sort((a, b) => {
          const fullAddressA = a.address.city.concat(a.address.street);
          const fullAddressB = b.address.city.concat(b.address.street);
          return fullAddressA > fullAddressB ? 1 : -1
        })
      } else {
        data.sort((a, b) => {
          const fullAddressA = a.address.city.concat(a.address.street);
          const fullAddressB = b.address.city.concat(b.address.street);
          return fullAddressA > fullAddressB ? -1 : 1
        });
      }
    } else {
      if (this.sortParams.direction === SortDirection.ASC) {
        // @ts-ignore
        data.sort((a, b) => a[this.sortParams.column] > b[this.sortParams.column] ? 1 : -1);
      } else {
        // @ts-ignore
        data.sort((a, b) => a[this.sortParams.column] > b[this.sortParams.column] ? -1 : 1);
      }
    }
    return data;
  }
}
