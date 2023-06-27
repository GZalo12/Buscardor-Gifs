import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuscarRespuesta, Gifs } from '../interfaces/gifs.interface';



@Injectable({
  providedIn: 'root'
})
export class GifsService {

  // lista de almacenamiento de la data de nuestros gifs
  public gifList: Gifs[] = [];

  // guardado de historial de busqueda
  private _tagHistory: string[] = [];

  private apiKey:      string = 'RGeKYTyun4bjWXRztZRE8ylFRvubMqh8';
  private url:         string = 'http://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient) {
    // mandamos a llamar nuestros datos en dado caso que existan en nuestro local storage del navegador
    this.loadLocalStorage();

    // inicializamos la busqueda del primer elemento que este en nuestro historial
    // this.searchTag(this._tagHistory[0]);

  }

  // creamos una copia exacta de nuestro array y lo mandamos a mostrar
  get tagsHistory(){
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string){
    // vamos a trabajar en minusculas
    tag = tag.toLowerCase();

    // if para el filtrado de informacion y que no se repita
    if(this._tagHistory.includes(tag)){

      // mediante el metodo filter procesamos la informacion, este metodo solo devuelve valores que son verdadedor, se indica que solo retorne valores diferentes al tag recibido, en cuanto se detecte un valor igual lo excluye
      // sio existe coincidecnia las excluye
      this._tagHistory = this._tagHistory.filter((oldTag)=> oldTag !== tag)
    }

    // los tags enviados seran agregados al inicio
    this._tagHistory.unshift(tag)

    // limitamos nuestro array para que tenga un rango de 0 a 10 registros
    this._tagHistory = this._tagHistory.splice(0,10)

    this.saveLocalStorage();
  }

  // metodo privado para realizar el guadado de informacion mediante el localStorage
  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify( this._tagHistory ))
  }

  // proceso para leer los datos que se encuentren guardados en el localStorage, este sercvicio sera llamado la primera vez que sea utiulizado el servicio
  private loadLocalStorage():void {
    // preguntamos si no tenemos data que no haga nada
    if( !localStorage.getItem('history') ) return;

    // reconstruimos la cadena de string a un objeto de nuesvo para poderle dar uso mediante .parse() ponemos el simbolo ! para indicarle a typescript que siempre contaremos con data
    this._tagHistory = JSON.parse(localStorage.getItem('history')! );

    if(this._tagHistory.length === 0 )return;

    // inicializamos la busqueda del primer elemento que este en nuestro historial
    this.searchTag(this._tagHistory[0])

  }

  searchTag( tag: string): void{
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag)

      // ponemos nuestra interaz para poder tener un mejor control para el flujo de la informacion
    this.http.get<BuscarRespuesta>(`${this.url}/search`, {params})
      .subscribe(resp =>{

        this.gifList = resp.data;
        // console.log(this.gifList);

      })


  }

}
