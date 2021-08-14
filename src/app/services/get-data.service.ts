import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  // _url = "assets/data.json";
  _url = "https://gist.githubusercontent.com/bunopus/f48fbb06578003fb521c7c1a54fd906a/raw/e5767c1e7f172c6375f064a9441f2edd57a79f15/test_users.json";

  constructor(private _http: HttpClient) {
  }

  getData(): any {
    return this._http.get<any>(this._url);
  }
}
