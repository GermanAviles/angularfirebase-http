import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Http, Headers } from '@angular/http';
// import { map } from 'rxjs/operators';
import { Heroe } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HereoesService {

  heroesURL = 'https://angular-crud-firebase-fbfe9.firebaseio.com/heroes.json';
  heroeURL = 'https://angular-crud-firebase-fbfe9.firebaseio.com/heroes';
  // private httpClient: Http
  constructor( private httpClient: HttpClient ) {

  }

  nuevoHeroe( heroe: Heroe ): Observable<any> {

    const body = JSON.stringify( heroe );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post(this.heroesURL, body, {headers: headers});
    /* Funcionando
    let headers = new Headers({
      'Content-Type': 'application/json'
    });*/

    /**
     * Funcionando

    return this.httpClient.post( this.heroesURL, body, { headers } ).
     pipe( map( ( res: any )=>{
          console.log( res.json() );
          res.json();
         }));
    */
  }
  actualizarHeroe( heroe: Heroe, $key: string ): Observable<any> {

    const body = JSON.stringify( heroe );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let url: string = (`${ this.heroeURL }/${ $key }.json`);

    return this.httpClient.put( url, body, {headers: headers}).pipe( map( (data) =>  data));
  }

  getHeroe( $key: string ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let url = `${this.heroeURL}/${$key}.json`;

    return this.httpClient.get( url , {headers: headers} )
          .pipe( map( (res) => res));
  }

  getHeroes() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.get( this.heroesURL, {headers: headers})
            .pipe(map ((heroes) => heroes));
  }

  deletHero( $key: string ) {
    const url = `${this.heroeURL}/${$key}.json`;
    return this.httpClient.delete( url ).pipe(map((res) => res));
  }

}
