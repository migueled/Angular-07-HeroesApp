import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class HeroesService {

    private url : string = 'https://agregar-54914.firebaseio.com';

    constructor( private http:HttpClient ) {}

    crearHeroe( heroe: HeroeModel ) {
        return this.http.post(`${ this.url }/heroes.json`, heroe)
            .pipe(
                map( ( respuesta : any ) => {
                    heroe.id = respuesta.name;
                    return heroe;
                } )
            );
    }
}
