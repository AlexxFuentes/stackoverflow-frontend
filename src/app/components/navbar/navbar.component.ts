import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() onUsuarioSeleccionado = new EventEmitter<string>();
  listaUsuarios: any = [];
  fPerfil: string = '';
  fotoPerfil: string = '';
  nombreUsuario: string = '';

  constructor(
    private modalService: NgbModal, 
    private usuarioServices: UsuariosService,
  ) { }
  

  ngOnInit(): void {
    this.obtenerTodosUsuarios();
  }

  cambiarUsuario(IdUsuario: string, fPerfil: string) {
    this.fPerfil = fPerfil;
    //console.log(IdUsuario);
    this.onUsuarioSeleccionado.emit(IdUsuario);
    this.modalService.dismissAll();
  }

  guardarusuario() {
    const datosUsuario = {
      nombre: this.nombreUsuario,
      urlImagen: this.fotoPerfil
    }
    console.log(datosUsuario);
    this.usuarioServices.crearNuevoUsuario(datosUsuario).subscribe(
      (response) => {
        //console.log(response);
        this.fotoPerfil = '';
        this.nombreUsuario = '';
        this.obtenerTodosUsuarios();
        this.modalService.dismissAll();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerTodosUsuarios() {
    this.usuarioServices.obtenerUsuarios().subscribe(
      (data) => {
        this.listaUsuarios = data;
        console.log('Usuarios ',this.listaUsuarios);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getRange(n: number): number[] {
    return Array.from({length: n}, (_, i) => i + 1);
  }

  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}
}
