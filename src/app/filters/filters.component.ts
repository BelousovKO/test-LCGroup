import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges {

  // @ts-ignore
  @Input() data: Array<any>;

  @Output() filterUser: EventEmitter<any> = new EventEmitter();

  public genders = {};
  public gendersKye = [];
  public paramGenders = 'all-genders';
  public departments = {};
  public departmentsKye = [];
  public paramDepartments = 'all-departments';
  public cities = {};
  public citiesKye = [];
  public paramCities = 'all-cities';

  constructor() {
  }

  ngOnChanges(): void {
    if (this.data.length) {
      this.createFilterGenders();
      this.createFilterDepartment();
      this.createFilterCities();
    }
  }

  ngOnInit(): void {
  }

  createFilterCities(): void {
    this.cities = {};
    if (Object.keys(this.data).length) {
      this.cities = this.data.reduce((acc, elem) => {
        if (acc[elem.address.city]) {
          acc[elem.address.city] += 1;
        } else {
          acc[elem.address.city] = 1;
        }
        return acc;
      }, {});
      // @ts-ignore
      this.citiesKye = Object.keys(this.cities).sort();
      // @ts-ignore
      this.citiesKye.push('all-cities');
    }
  }

  createFilterDepartment(): void {
    this.departments = {};
    this.departmentsKye = [];
    if (Object.keys(this.data).length) {
      this.departments = this.data.reduce((acc, elem) => {
        if (acc[elem.department]) {
          acc[elem.department] += 1;
        } else {
          acc[elem.department] = 1;
        }
        return acc;
      }, {});
      // @ts-ignore
      this.departmentsKye = Object.keys(this.departments).sort();
      // @ts-ignore
      this.departmentsKye.push('all-departments');
    }
  }

  createFilterGenders(): void {
    this.genders = {};
    this.gendersKye = [];
    if (Object.keys(this.data).length) {
      this.genders = this.data.reduce((acc, elem) => {
        if (acc[elem.gender]) {
          acc[elem.gender] += 1;
        } else {
          acc[elem.gender] = 1;
        }
        return acc;
      }, {});
      // @ts-ignore
      this.gendersKye = Object.keys(this.genders).sort();
      // @ts-ignore
      this.gendersKye.push('all-genders')
    }
  }

  filteredUser(): void {
    const params = [this.paramCities, this.paramDepartments, this.paramGenders]
    this.filterUser.emit(params);
  }
}
