import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

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

  constructor(public data: DataService) {

  }

  ngAfterViewInit(): void {
    // left console logs in for debugging
    // console.log(this.data);
    var myData = this.data.data;
    // console.log(myData);
    // console.log(this.dataSource);
    for(var i = 0; i < myData.myBudget.length; i++) {
      // console.log(this.dataSource.datasets[0].data[i]);
      // console.log(res.myBudget[i]);
      this.dataSource.datasets[0].data[i] = myData.myBudget[i].budget;
      // console.log(this.dataSource.labels[i]);
      // console.log(res.myBudget[i].title);
      this.dataSource.labels[i] = myData.myBudget[i].title;
    }
    // create chart.js chart
    this.createChart();

    // create d3.js chart
    this.createD3Chart();
  }

  // chart for chartjs
  createChart() {
    // console.log(this.dataSource);
    var ctx = document.getElementById("myChart");
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
  }

  // chart for d3js
  createD3Chart() {
    // console.log(this.dataSource);
    var data = this.data.data.myBudget;
    // console.log(data);
    var text = "";

    var width = 200;
    var height = 200;
    var thickness = 20;
    var duration = 750;

    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3.select("#chart")
    .append('svg')
    .attr('class', 'pie')
    .attr('width', width)
    .attr('height', height);

    var g = svg.append('g')
    .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

    var arc = d3.arc()
    .innerRadius(radius - thickness)
    .outerRadius(radius);

    var pie = d3.pie()
    .value(function(d) { return d.budget; })
    .sort(null);

    var path = g.selectAll('path')
    .data(pie(data))
    .enter()
    .append("g")
    .on("mouseover", function(d) {
        console.log(d);
        let g = d3.select(this)
            .style("cursor", "pointer")
            .style("fill", "black")
            .append("g")
            .attr("class", "text-group");
      console.log(d);
        g.append("text")
            .attr("class", "title-text")
            .text(`${d.data.title}`)
            .attr('text-anchor', 'middle')
            .attr('dy', '-1.2em');

        g.append("text")
            .attr("class", "budget-text")
            .text(`${d.data.budget}`)
            .attr('text-anchor', 'middle')
            .attr('dy', '.6em');
        })
    .on("mouseout", function(d) {
        d3.select(this)
            .style("cursor", "none")
            .style("fill", color(this._current))
            .select(".text-group").remove();
        })
    .append('path')
    .attr('d', arc)
    .attr('fill', (d,i) => color(i))
    .on("mouseover", function(d) {
        d3.select(this)
            .style("cursor", "pointer")
            .style("fill", "black");
        })
    .on("mouseout", function(d) {
        d3.select(this)
            .style("cursor", "none")
            .style("fill", color(this._current));
        })
    .each(function(d, i) { this._current = i; });


    g.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em')
    .text(text);
  }

}
