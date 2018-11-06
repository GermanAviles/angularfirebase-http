import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { HereoesService } from '../../services/hereoes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  casas:Array<string> = ['DC','Marvel', 'Image Comics', 'Dark Horse Comics'];
  
  heroe:Heroe = {
    nombre:"",
    biografia: "",
    casa: "",
  }

  nuevo: boolean = false;
  id:string;

  constructor( private _heroeServices: HereoesService,
               private router: Router,
               private activatedRoute: ActivatedRoute) {
      
      this.activatedRoute.params.subscribe( (params) => {
       
        this.id = params['id']
        
        if( this.id !== 'nuevo' ){
          this._heroeServices.getHeroe( this.id ).subscribe( (heroe:any) => this.heroe = heroe);
        }

      });
      console.log("el valor del parametro del id es: " + this.id);
  }

  ngOnInit() {
    //console.log(this.heroe);
  }

  guardar(){

    console.log(this.heroe);

    if( this.id == 'nuevo' ){
      //insertando datos
      this._heroeServices.nuevoHeroe( this.heroe )
          .subscribe( (data) => {
            console.log(data);
            this.router.navigate(['/heroe', data['name'] ]);
          },
          (error) => { console.log(error)});
          //nos devolvemos a la lista de todos los heroes
          this.router.navigate(['/heroes']);
    }else{
      //actualizando datos
      this._heroeServices.actualizarHeroe( this.heroe, this.id ).subscribe( (data) => {
        console.log( data );
      },
      (error) => { console.log(error)
      });
      
      //nos devolvemos a la lista de todos los heroes
      this.router.navigate(['/heroes']);
    }
    
    
  }

  nuevoHeroe( formulario:NgForm ){

    this.router.navigate(['/heroe','nuevo']);
    
    formulario.reset();
  }



}
