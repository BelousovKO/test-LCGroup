import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {UserDto} from "../../shared/models/UserDto";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges {

  @Input() data: UserDto[] = [];

  @Output() filterUser: EventEmitter<any> = new EventEmitter();

  public genders: any = {};
  public genderKeys: string[] = [];
  public paramGenders = '';
  public departments: any = {};
  public departmentKeys: string[] = [];
  public paramDepartments = '';
  public cities: any = {};
  public cityKeys: string[] = [];
  public paramCities = '';

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
        // @ts-ignore
        if (acc[elem.address.city]) {
          // @ts-ignore
          acc[elem.address.city] += 1;
        } else {
          // @ts-ignore
          acc[elem.address.city] = 1;
        }
        return acc;
      }, {});
      this.cityKeys = Object.keys(this.cities).sort();
    }
  }

  createFilterDepartment(): void {
    this.departments = {};
    this.departmentKeys = [];
    if (Object.keys(this.data).length) {
      this.departments = this.data.reduce((acc, elem) => {
        // @ts-ignore
        if (acc[elem.department]) {
          // @ts-ignore
          acc[elem.department] += 1;
        } else {
          // @ts-ignore
          acc[elem.department] = 1;
        }
        return acc;
      }, {});
      // @ts-ignore
      this.departmentKeys = Object.keys(this.departments).sort();
    }
  }

  createFilterGenders(): void {
    this.genders = {};
    this.genderKeys = [];
    if (Object.keys(this.data).length) {
      this.genders = this.data.reduce((acc, elem) => {
        // @ts-ignore
        if (acc[elem.gender]) {
          // @ts-ignore
          acc[elem.gender] += 1;
        } else {
          // @ts-ignore
          acc[elem.gender] = 1;
        }
        return acc;
      }, {});
      // @ts-ignore
      this.genderKeys = Object.keys(this.genders).sort();
    }
  }

  filteredUser(): void {
    const params = [this.paramCities, this.paramDepartments, this.paramGenders]
    this.filterUser.emit(params);
  }

  genderChange(gender: string, event: Event): void {
    if ((event.target as HTMLInputElement).checked) {
      this.paramGenders = gender;
    } else {
      this.paramGenders = '';
    }
    this.filteredUser();
  }

  cityChange(city: string, event: Event): void {
    if ((event.target as HTMLInputElement).checked) {
      this.paramCities = city;
    } else {
      this.paramCities = '';
    }
    this.filteredUser();
  }

  departmentChange(department: string, event: Event): void {
    if ((event.target as HTMLInputElement).checked) {
      this.paramDepartments = department;
    } else {
      this.paramDepartments = '';
    }
    this.filteredUser();
  }
}
