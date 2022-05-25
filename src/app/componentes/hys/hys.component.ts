import { Component, OnInit } from '@angular/core';
import { Habilidades } from './habilidades';
import { HabilidadesService } from './habilidades.service';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css']
})
export class HysComponent implements OnInit {
  public habilidadess: Habilidades []=[];
  constructor( private habilidadesService: HabilidadesService) { }

  ngOnInit(){
    this.getHabilidades();

  }

  public getHabilidades():void {
    this.habilidadesService.getHabilidades().subscribe(
      (response: Habilidades[])=>{
        this.habilidadess = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }


}
