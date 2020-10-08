import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [{
        data: [10, 20, 30],
        backgroundColor: [
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#fd6b19',
            '#eb4034',
            '#34e2eb',
            '#5c2ad1',
            '#d12ab2',
            '#2a86d1',
            '#c0d12a'
        ],
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Eat out',
        'Rent',
        'Groceries'
    ]
}

  constructor(private http: HttpClient) {
    console.log('a');
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      console.log(res);
      for(var i = 0; i < res.myBudget.length; i++) {
        // console.log(this.dataSource.datasets[0].data[i]);
        // console.log(res.myBudget[i]);
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        // console.log(this.dataSource.labels[i]);
        // console.log(res.myBudget[i].title);
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
      this.createChart();
    });
  }

  createChart() {
    var ctx = document.getElementById("myChart");
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
  }

}
