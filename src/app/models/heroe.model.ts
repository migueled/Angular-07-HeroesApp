export class HeroeModel{

    id    :    string;
    nombre:    string;
    poder :    string;
    vivo  :    boolean;

    constructor(){
        this.nombre   = '';
        this.poder    = '';
        this.vivo     = true;
    }
}