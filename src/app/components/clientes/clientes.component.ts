import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesModel } from 'src/app/models/clientes';
import { ClientesService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  datosclientes:ClientesModel[]=[];
  formcliente: FormGroup;
  isSubmitted = false;
  datoscliente: ClientesModel = new ClientesModel();
  constructor(private clientesserv:ClientesService,private fb: FormBuilder) {
    this.obtenerclientes();
    this.crearFormulario();
  }
  ngOnInit(): void {
  }
  crearFormulario() {
    this.formcliente = this.fb.group({
      idcliente: ['',[Validators.required]],
      nombrecompleto: ['',Validators.required],
      direccion: ['', [Validators.required]],
      edad:['', [Validators.required]],
      genero:['', [Validators.required]],
    });
  }
  obtenerclientes(){
    this.datosclientes=this.clientesserv.Obtenclientes();
  }
  guardarcliente() {
    if (this.formcliente.valid) {
      this.datoscliente = this.formcliente.value;
      this.clientesserv.Guardarclientes(this.datoscliente);
      alert('El cliente se guardo correctamente');
      setTimeout('document.location.reload()',1500);
    } else {
      this.isSubmitted = true;
    }
  }
  get errorControl() {
    return this.formcliente.controls;
  }

}
