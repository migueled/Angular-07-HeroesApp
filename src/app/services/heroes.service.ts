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

    actualizarHeroe( heroe:HeroeModel ) {
        const heroeTemp = {
            ...heroe
        };

        delete heroeTemp.id;

        return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);
    }

    getHeroes(){
        return this.http.get(`${ this.url }/heroes.json`).pipe(
            //map( respuesta =>  this.crearArreglo( respuesta ) ) forma larga
            map( this.crearArreglo )//forma corta
        )
    }

    private crearArreglo( heroesObject: object ){
        const heroes : HeroeModel[] = [];

        if( heroesObject == null ){ return []; }

        Object.keys( heroesObject ).forEach (
            key => {
                const heroe : HeroeModel = heroesObject[ key ];
                heroe.id = key;

                heroes.push( heroe );
            }
        );

        return heroes;
    }

    getHero( id: string ) {
        return this.http.get(`${ this.url }/heroes/${ id }.json`);
    }

    deleteHeroe( id: string ) {
        return this.http.delete(`${ this.url }/heroes/${ id }.json`);
    }
}
