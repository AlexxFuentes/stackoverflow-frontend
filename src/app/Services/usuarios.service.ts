import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  apiURL:string = 'http://localhost:8888';

  constructor(private httpClient: HttpClient) { }

  crearNuevoUsuario(usuario: any): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/usuarios`, 
    {
      nombre: usuario.nombre,
      urlImagen: usuario.urlImagen
    });
  }
  
  obtenerUsuarioPorId(idUsuario: string): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/usuarios/${idUsuario}`);
  }

  obtenerUsuarios(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/usuarios`);
  }

  actualizarPreguntasUsuario(idUsuario: string, pregunta: any): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/usuarios/${idUsuario}`, 
    {
      idPregunta: pregunta._id,
      titulo: pregunta.titulo
    });
  }
}
