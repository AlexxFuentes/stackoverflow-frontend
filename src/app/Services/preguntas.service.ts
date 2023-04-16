import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  apiURL:string = 'http://localhost:8888';

  constructor(private httpClient: HttpClient) { }
  
  actualizarVotosRespuesta(idrespuesta: string, voto: number): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/preguntas/respuestas/votos/${idrespuesta}`, 
    {
      voto: voto
    });
  }

  actualizarVotosPregunta(idpregunta: string, voto: number): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/preguntas/votos/${idpregunta}`, 
    {
      voto: voto
    });
  }

  obtenerPreguntas(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/preguntas`);
  }

  obtenerPreguntasUsuario(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/preguntas/usuarios`);
  }

  obtenerPreguntaPorId(idpregunta: string): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/pregunta/${idpregunta}`);
  }
  
  agregarRespuestaPregunta(idpregunta: string, respuesta: any): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/preguntas/respuestas/${idpregunta}`, 
    {
      descripcion: respuesta.descripcion,
      idusuario: respuesta.idUsuario
    });
  }

  crearNuevaPregunta(pregunta: any): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/preguntas`, 
    {
      titulo: pregunta.titulo,
      descripcion: pregunta.descripcion,
      hashtags: pregunta.hashtags,
      idUsuario: pregunta.idUsuario
    });
  }
}
