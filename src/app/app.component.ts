import { identifierName } from '@angular/compiler';
import { Component } from '@angular/core';
import { CommonService } from './service/common-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto-final-angular';
}
