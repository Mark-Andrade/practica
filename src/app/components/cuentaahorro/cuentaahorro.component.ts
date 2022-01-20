import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentasAhorroModel } from 'src/app/models/cuentasahorro';
import { CuentaAhorroService } from 'src/app/services/cuentaahorro.service';

@Component({
  selector: 'app-cuentaahorro',
  templateUrl: './cuentaahorro.component.html',
  styleUrls: ['./cuentaahorro.component.css']
})
export class CuentaahorroComponent implements OnInit {

  datoscuentas: CuentasAhorroModel[] = [];
  formcuentas: FormGroup;
  isSubmitted = false;
  datoscuentahorro: CuentasAhorroModel = new CuentasAhorroModel();
  listaclientes:any;
  constructor(private cuentasahorroserv: CuentaAhorroService, private fb: FormBuilder) {
    this.crearFormulario();
    this.obtenercuentasahorro();
    this.listaclientes=JSON.parse(localStorage.getItem('clientes'));
  }
  ngOnInit(): void {

  }
  obtenercuentasahorro() {
    this.cuentasahorroserv.Obtencuentasahorros().toPromise().then((data: any) => {
      this.datoscuentas = data;
    }).catch(err => {
      if (err.statusText=="Unauthorized") {
        sessionStorage.clear();
        alert("El token ha expirado, vuelve a iniciar sesión");
      } else {
        console.log(err)
      }
    });
  }
  crearFormulario() {
    var f = new Date();
    let fecha=f.getFullYear() + "/" + (f.getMonth() +1) + "/" + f.getDate();
    this.formcuentas = this.fb.group({
      estado: ['Activa'],
      fechaUltimaAct: [fecha],
      idCliente: ['', [Validators.required]],
      numeroCuenta:['', [Validators.required]],
      saldo:['', [Validators.required]],
    });
  }
  guardarcuentahorro() {
    if (this.formcuentas.valid) {
      this.datoscuentahorro = this.formcuentas.value;
      this.cuentasahorroserv.Guardarcuentaahorro(this.datoscuentahorro).toPromise()
      .then((resp: any) => {
        if (resp.name) {
          alert("El registro se guardo correctamente");
          setTimeout('document.location.reload()',1500);
        }
      })
      .catch(err=> {
        console.log(err);
      });
    } else {
      this.isSubmitted = true;
    }
  }
  get errorControl() {
    return this.formcuentas.controls;
  }
}
