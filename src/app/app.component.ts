import {Component, NgZone, OnInit} from '@angular/core';
import { Series } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  series: Series[];
  show;

  constructor(private dataService: DataService, private http: HttpClient, private zone: NgZone) {
    this.show = {
      id: '',
      show: '',
      seasons: '',
      type: ''
    };
  }

  ngOnInit() {
    this.dataService.getAllSeries().subscribe((series: Series[]) => {
      this.series = series;
      /* Log the result of the getAllSeries() */
      console.log(series);
    });
  }

  addShow() {
    this.http.post('/api/post', this.show)
        .subscribe((res => {
          /* Code goes here */
        }));
  }
}
