import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserDto} from "../../shared/models/UserDto";
import {DataService} from "../../shared/services/data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {

  public genders: any = {};
  public genderKeys: string[] = [];
  public paramGenders = '';
  public departments: any = {};
  public departmentKeys: string[] = [];
  public paramDepartments = '';
  public cities: any = {};
  public cityKeys: string[] = [];
  public paramCities = '';
  private readonly subscription: Subscription;

  constructor(private dataService: DataService) {
    this.subscription = this.dataService.data$.subscribe((data) => {
      this.generateFilterValues(data)
    });
  }

  ngOnInit(): void {
  }

  filteredUser(): void {
    this.dataService.filterData(this.paramGenders, this.paramDepartments, this.paramCities);
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

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  private generateFilterValues(data: UserDto[]): void {
    const genders: any = {};
    const departments: any = {};
    const cities: any = {};
    data.forEach(elem => {
      if (elem.address?.city) {
        cities[elem.address.city] = cities[elem.address.city] ? cities[elem.address.city] += 1 : 1;
      }
      if (elem.department) {
        departments[elem.department] = departments[elem.department] ? departments[elem.department] += 1 : 1;
      }
      if (elem.gender) {
        genders[elem.gender] = genders[elem.gender] ? genders[elem.gender] += 1 : 1;
      }
    });
    this.genderKeys = Object.keys(genders).sort();
    this.cityKeys = Object.keys(cities).sort();
    this.departmentKeys = Object.keys(departments).sort();
    this.genders = genders;
    this.departments = departments;
    this.cities = cities;
  }
}
