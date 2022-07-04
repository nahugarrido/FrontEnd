import { Component, OnInit } from '@angular/core';
import { educacion } from '../model/educacion.model';
import { EducacionService } from '../service/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educaciones: educacion[] = [];
  constructor(public educacionService: EducacionService) { }

  ngOnInit(): void {
    this.educacionService.getEducacion().subscribe(data => {this.educaciones = data})
  }

}
