import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PreguntasService } from 'src/app/Services/preguntas.service';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';

@Component({
  selector: 'app-lista-preguntas',
  templateUrl: './lista-preguntas.component.html',
  styleUrls: ['./lista-preguntas.component.css']
})
export class ListaPreguntasComponent implements OnInit {
  @Input() inIdUsuarioSeleccionado?: string = '';
  @Output() onRegionVisible = new EventEmitter<string>();
  @Output() onIdPreguntaSeleccionada = new EventEmitter<string>();
  listaPreguntasUsuario: any[] = [];
  regionVisible: string = '';

  formularioNuevaPregunta = new FormGroup({
    pregunta: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    hashtags: new FormControl('', Validators.required),
  });
  
  constructor(private modalService: NgbModal, 
    private preguntasServices: PreguntasService, 
    private usuariosServices: UsuariosService,
    private comunicacion: ComunicacionService
  ) {}

  ngOnInit(): void {
    this.obtenerPreguntasPreguntas();
    this.comunicacion.actualizar$.subscribe(() => this.obtenerPreguntasPreguntas());
  }

  verDetallePregunta(idpregunta: any) {
    this.regionVisible = 'detallePregunta';
    this.onRegionVisible.emit(this.regionVisible);
    this.onIdPreguntaSeleccionada.emit(idpregunta);
    //console.log(idpregunta);
  }

  //Funciona
  guardarPregunta() {
    const dataPregunta = {
      titulo: this.formularioNuevaPregunta.value.pregunta,
      descripcion: this.formularioNuevaPregunta.value.descripcion,
      hashtags: this.formularioNuevaPregunta?.value?.hashtags?.split(','),
      idUsuario: this.inIdUsuarioSeleccionado
    }
    console.log(dataPregunta);
    this.preguntasServices.crearNuevaPregunta(dataPregunta).subscribe(
      (data: any) => {
        console.log(data);
        this.formularioNuevaPregunta.reset();
        this.usuariosServices.actualizarPreguntasUsuario(data.idUsuario, data).subscribe(
          (data: any) => {
            console.log(data);
            this.obtenerPreguntasPreguntas();
            this.modalService.dismissAll();
          },
          (error: any) => {
            console.log(error);
          }
        );
      }, 
      (error: any) => {
        console.log(error);
      }
    );
  }

  //Funciona
  obtenerPreguntasPreguntas() {
    this.preguntasServices.obtenerPreguntasUsuario().subscribe(
      (data: any) => {
        console.log('Preguntas ', data);
        this.listaPreguntasUsuario = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  get pregunta() {
    return this.formularioNuevaPregunta.get('pregunta');
  }
  get descripcion() {
    return this.formularioNuevaPregunta.get('descripcion');
  }
  get hashtags() {
    return this.formularioNuevaPregunta.get('hashtags');
  }
  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
	}
}
