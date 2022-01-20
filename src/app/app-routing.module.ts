import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CuentaahorroComponent } from './components/cuentaahorro/cuentaahorro.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { AuthGuard } from './guards/guard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
  { path: 'clientes', component: ClientesComponent,canActivate:[AuthGuard] },
  { path: 'cuentaahorro', component: CuentaahorroComponent,canActivate:[AuthGuard] },
  { path: 'transacciones', component: TransaccionesComponent,canActivate:[AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
