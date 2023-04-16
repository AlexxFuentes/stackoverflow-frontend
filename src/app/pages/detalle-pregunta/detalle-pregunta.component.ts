import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { PreguntasService } from 'src/app/Services/preguntas.service';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-detalle-pregunta',
  templateUrl: './detalle-pregunta.component.html',
  styleUrls: ['./detalle-pregunta.component.css']
})
export class DetallePreguntaComponent implements OnChanges {
  @Output() onRegionVisible = new EventEmitter<string>();
  @Input() inIdPreguntaSeleccionada?: any = '';
  @Input() inIdUsuario?: string = '';
  regionVisible: string = '';
  detallePregunta: any = {};
  usuarioSeleccionado: any = {};
  cantidadVotos: number = 0;
  formularioRespuesta = new FormGroup({
    respuesta: new FormControl('', Validators.required),
  });

  constructor(private preguntasServices: PreguntasService, 
    private usuariosServices: UsuariosService,
    private comunicacion: ComunicacionService
  ) { }

  ngOnChanges(): void {
    if (this.inIdPreguntaSeleccionada !== '') {
      this.actualizarRespuestas();
    }
  }

  votarRespuesta(voto: number, idRespuesta: string) {
    this.preguntasServices.actualizarVotosRespuesta(idRespuesta, voto).subscribe(
      (data) => {
        //console.log(data);
        this.actualizarRespuestas();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  votar(voto: number, idRespuesta: string) {
    this.preguntasServices.actualizarVotosPregunta(idRespuesta, voto).subscribe(
      (data) => {
        //console.log(data);
        this.actualizarRespuestas();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  actualizarRespuestas() {
    this.preguntasServices.obtenerPreguntaPorId(this?.inIdPreguntaSeleccionada).subscribe(
      (data) => {
        //console.log(data[0]);
        this.detallePregunta = data[0];
        this.obtenerUsuarioSeleccionado(data[0].idUsuario);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerUsuarioSeleccionado(idUsuario: string) {
    this.usuariosServices.obtenerUsuarioPorId(idUsuario).subscribe(
      (data) => {
        //console.log(data[0]);
        this.usuarioSeleccionado = data[0];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  publicarRespuesta() {
    const respuesta = {
      descripcion: this.formularioRespuesta.value.respuesta,
      idUsuario: this.inIdUsuario,
    }
    this.preguntasServices.agregarRespuestaPregunta(this.inIdPreguntaSeleccionada, respuesta).subscribe(
      (data) => {
        console.log(data);
        this.actualizarRespuestas();
        this.formularioRespuesta.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  verPreguntas() {
    this.regionVisible = 'listaPreguntas';
    this.onRegionVisible.emit(this.regionVisible);
    setTimeout(() =>{this.comunicacion.actualizar();}, 1000);
  }

  get respuesta() {
    return this.formularioRespuesta.get('respuesta');
  }
}
