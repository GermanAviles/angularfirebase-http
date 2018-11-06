import { Component, OnInit } from '@angular/core';
import { HereoesService } from '../../services/hereoes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  
  heroes = [];
  loading: boolean = true;  
  
  constructor( private _heroesService: HereoesService,
               private router: Router) {

    this.getHeroes();
  }

  ngOnInit() {
    console.log( "Arreglo de heroes" );
    console.log( this.heroes );
  }

  getHeroes(){
    this._heroesService.getHeroes().subscribe((data: any) => {
      this.heroes = [];
      //estudiar esta solución
      if (data) {
        Object.entries(data).forEach(
          ([key, value]) => {
            value['id'] = key
            this.heroes.push(value);
            this.loading = false;
            //console.log( "Heroe ");
            //console.log( value );
          }
        );
      }
    });
  }

  editHeroe( $key ){
    this.router.navigate(['/heroe',$key]);
  }

  borrarHeroe( $key ){
    this._heroesService.deletHero( $key ).subscribe( (respuesta) => {
      
      if(respuesta===null){
        console.log("Heroe eliminado exitosamente");
        this.getHeroes();  
      }else{
        console.error("Hubo un error"+ respuesta);        
      }
    })
  }
}
