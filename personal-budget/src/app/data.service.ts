import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
    this.getData();
  }
  d3JSChart = 'D3JS Chart';
  chartJSChart = 'Chart.js Chart';
  data;
  getData() {
    // console.log(this.data);
    if (this.data == null){ // no data has been assigned, so make the service request to the backend
      console.log('make the service request!');

      this.data = this.http.get('http://localhost:3000/budget')
      .subscribe((res: any) => {
        // console.log('log from data service');
        // console.log(res.myBudget);
        this.data = res;
      });
    } else { // do not make a call for data as there is already data retrieved
      console.log('dont make the service request we already have data!');
    }
  }
}
