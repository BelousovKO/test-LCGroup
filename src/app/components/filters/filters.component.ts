import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UserDto} from "../../shared/models/UserDto";
import {DataService} from "../../shared/services/data.service";
import {Subscription} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnDestroy, OnInit {

  public genders: any = {};
  public genderKeys: string[] = [];
  public paramGenders = '';
  public departments: any = {};
  public departmentKeys: string[] = [];
  public paramDepartments = '';
  public cities: any = {};
  public cityKeys: string[] = [];
  public paramCities = '';
  private subscription: Subscription | undefined;

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscription = this.dataService.data$.pipe(
      tap((data: UserDto[]) => {
        this.generateFilterValues(data);
        this.cdr.detectChanges();
      })
    ).subscribe();
  }

  genderChange(gender: string, event: Event): void {
    if ((event.target as HTMLInputElement).checked) {
      this.paramGenders = gender;
    } else {
      this.paramGenders = '';
    }
    this.dataService.filterData(this.paramGenders, this.paramDepartments, this.paramCities);
  }

  cityChange(city: string, event: Event): void {
    if ((event.target as HTMLInputElement).checked) {
      this.paramCities = city;
    } else {
      this.paramCities = '';
    }
    this.dataService.filterData(this.paramGenders, this.paramDepartments, this.paramCities);
  }

  departmentChange(department: string, event: Event): void {
    if ((event.target as HTMLInputElement).checked) {
      this.paramDepartments = department;
    } else {
      this.paramDepartments = '';
    }
    this.dataService.filterData(this.paramGenders, this.paramDepartments, this.paramCities);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
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
