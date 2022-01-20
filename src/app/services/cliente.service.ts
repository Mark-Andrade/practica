import { Injectable } from '@angular/core';
import { ClientesModel } from '../models/clientes';

@Injectable({
    providedIn: 'root',
})
export class ClientesService {
    clientes:ClientesModel[]=JSON.parse(localStorage.getItem('clientes'));
    constructor() { }

    Obtenclientes() {
        return JSON.parse(localStorage.getItem('clientes'));
    }
    Guardarclientes(cliente:ClientesModel) {
        this.clientes.push(cliente);
        localStorage.setItem('clientes',JSON.stringify(this.clientes));
    }
}
