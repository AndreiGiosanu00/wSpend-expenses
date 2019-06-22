import { Component, OnInit, Input } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'cdk-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
      let headers =  new HttpHeaders();
      headers.append('Content-Type', 'application/json');

      /*this.http.post('http://localhost:3000/report/system_info',{headers: headers}).subscribe((data: any) => {
          console.log(data);
      });*/

  }

  today: number = Date.now();

}
