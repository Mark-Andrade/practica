import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorlogin=false;
  mensajeerror:string;
  formlogin: FormGroup;
  isSubmitted = false;
  login: LoginModel = new LoginModel();
  constructor(private fb: FormBuilder,private router: Router,private servusu:LoginService) {
    this.crearFormulario();
   }

  ngOnInit(): void {
  }
  crearFormulario() {
    this.formlogin = this.fb.group({
      email: ['desarrollo@prueba.com', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      returnSecureToken:[true]
    });
  }
  loginvalidate() {
    if (this.formlogin.valid) {
      this.login = this.formlogin.value;
      this.servusu.loguearse(this.login).toPromise()
      .then((resp: any) => {
        sessionStorage.setItem('token', resp.idToken);
        this.router.navigateByUrl('/home');
      })
      .catch(err=> { 
        this.errorlogin=true;
        if(err.error.error.message=="INVALID_PASSWORD"){
          this.mensajeerror="La contraseña es incorrecta";
        }
        else if(err.error.error.message=="EMAIL_NOT_FOUND"){
          this.mensajeerror="El correo es incorrecto";
        }
        else{
          this.mensajeerror="El acceso a esta cuenta se ha deshabilitado temporalmente debido a muchos intentos de inicio de sesión fallidos. Puede restaurarlo inmediatamente restableciendo su contraseña o puede volver a intentarlo más tarde.";
        }
      });
    } else {
      this.isSubmitted = true;
    }
  }
  get errorControl() {
    return this.formlogin.controls;
  }

}
