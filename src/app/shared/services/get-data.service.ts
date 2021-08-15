import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDto} from "../models/UserDto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private readonly _url = "https://gist.githubusercontent.com/bunopus/f48fbb06578003fb521c7c1a54fd906a/raw/e5767c1e7f172c6375f064a9441f2edd57a79f15/test_users.json";

  constructor(private _http: HttpClient) {
  }

  getData(): Observable<UserDto[]> {
    return this._http.get<UserDto[]>(this._url);
  }
}
