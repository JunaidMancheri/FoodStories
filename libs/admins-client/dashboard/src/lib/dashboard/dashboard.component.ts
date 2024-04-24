import { Component, OnInit, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgForOf } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType} from 'chart.js';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'fs-admin-dash',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    AsyncPipe,
    NgForOf,
    BaseChartDirective,
    HttpClientModule
  ]
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    this.http.get<{counts: number[]}>('http://localhost:3000/api/v1/users/chart').subscribe((res) => {
        this.lineChartData = {
          labels: this.generateMonthNames(),
          datasets: [
            {
              data: res.counts,
              label: 'Series A',
              fill: true,
              tension: 0.5,
              borderColor: 'black',
              backgroundColor: 'rgba(255,0,0,0.3)'
            }
          ]
        };
    })

    this.http.get<{counts: number[]}>('http://localhost:3000/api/v1/posts/chart').subscribe((res) => {
      this.postData = {
        labels: this.generateMonthNames(),
        datasets: [
          {
            data: res.counts,
            label: 'Series A',
            fill: true,
            tension: 0.5,
            borderColor: 'black',
            backgroundColor: 'rgba(122,234,34,0.3)'
          }
        ]
      };
  })
  }

  http = inject(HttpClient);


 
  public lineChartData: ChartConfiguration<'line'>['data'] = {} as ChartConfiguration<'line'>['data'];
  public postData: ChartConfiguration<'line'>['data'] = {} as ChartConfiguration<'line'>['data'];

  generateMonthNames(): string[] {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() ;
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    let startMonthIndex = currentMonth - 11;
    if (startMonthIndex < 0) {
      startMonthIndex += 12;
    }
    const generatedMonthNames = [];
     while(startMonthIndex !== currentMonth) {
      if (startMonthIndex == 12) startMonthIndex = 0
      generatedMonthNames.push(monthNames[startMonthIndex]);
      startMonthIndex++
     }
    generatedMonthNames.push(monthNames[currentMonth])
    return generatedMonthNames;
  }
}
