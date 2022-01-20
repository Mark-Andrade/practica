import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransaccionesModel } from 'src/app/models/transacciones';
import { TransaccionesService } from 'src/app/services/transacciones.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent implements OnInit {
  datostransacciones: TransaccionesModel[] = [];
  formdeposito: FormGroup;
  isSubmitted = false;
  datosdeposito: TransaccionesModel = new TransaccionesModel();

  formretiro: FormGroup;
  isSubmittedretiro = false;
  datosretiro: TransaccionesModel = new TransaccionesModel();
  fecha: string;
  constructor(private transaccionesserv: TransaccionesService, private fb: FormBuilder) {
    let f = new Date();
    this.fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate() + " " +f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds();
    this.obtenertransacciones();
    this.crearFormulario();
    this.crearFormularioretiro();
  }
  ngOnInit(): void {
  }
  obtenertransacciones() {
    this.transaccionesserv.Obtentransacciones().toPromise().then((data: any) => {
      this.datostransacciones = data;
    }).catch(err => {
      if (err.statusText == "Unauthorized") {
        sessionStorage.clear();
        alert("El token ha expirado, vuelve a iniciar sesión");
      } else {
        console.log(err)
      }
    });
  }
  crearFormulario() {
    this.formdeposito = this.fb.group({
      fechaUltimaAct: [this.fecha],
      monto: ['', [Validators.required]],
      numeroCuenta: ['', [Validators.required]],
      terminal: ['', [Validators.required]],
      tipo: ['Deposito',],
      usuario: ['', [Validators.required]],
    });
  }
  crearFormularioretiro() {
    this.formretiro = this.fb.group({
      fechaUltimaAct: [this.fecha],
      monto: ['', [Validators.required]],
      numeroCuenta: ['', [Validators.required]],
      terminal: ['', [Validators.required]],
      tipo: ['Retiro',],
      usuario: ['', [Validators.required]],
    });
  }
  guardardeposito() {
    if (this.formdeposito.valid) {
      this.datosdeposito = this.formdeposito.value;
      this.transaccionesserv.Guardadeposito(this.datosdeposito).toPromise()
        .then((resp: any) => {
          if (resp.name) {
            alert(`Se depósito el monto ${this.datosdeposito.monto} correctamente`);
            setTimeout('document.location.reload()',1500);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.isSubmitted = true;
    }
  }
  guardarretiro() {
    if (this.formretiro.valid) {
      this.datosretiro = this.formretiro.value;
      this.transaccionesserv.Guardaretiro(this.datosretiro).toPromise()
        .then((resp: any) => {
          if (resp.name) {
            alert(`Se retiro el monto ${this.datosretiro.monto} correctamente`);
            setTimeout('document.location.reload()',1500);
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.isSubmittedretiro = true;
    }
  }
  get errorControl() {
    return this.formdeposito.controls;
  }
  get errorControlretiro() {
    return this.formretiro.controls;
  }
}
