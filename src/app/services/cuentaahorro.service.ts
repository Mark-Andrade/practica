import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, delay } from 'rxjs/operators';
import { CuentasAhorroModel } from '../models/cuentasahorro';

@Injectable({
    providedIn: 'root',
})
export class CuentaAhorroService {
    private url = 'https://mibanco-333616-default-rtdb.firebaseio.com/cuentaAhorro/OcBMnUGvAqVlUOskPph6ZIDpDqj2.json';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('token')
        })
    };
    constructor(private http: HttpClient) { }

    Obtencuentasahorros() {
        return this.http.get(`${this.url}?auth=${sessionStorage.getItem('token')}`, this.httpOptions).pipe(
            map(this.crearArreglo),
            delay(1500)
        );
    }
    Guardarcuentaahorro(cuenta:CuentasAhorroModel) {
        return this.http.post(`${this.url}?auth=${sessionStorage.getItem('token')}`,cuenta, this.httpOptions);
    }
    private crearArreglo(cuentasObj: object) {
        const cuentas:CuentasAhorroModel[] = [];
        if (cuentasObj === null) { return []; }

        Object.keys(cuentasObj).forEach(key => {
            const cuenta = cuentasObj[key];
            cuenta.id = key;
            cuentas.push(cuenta);
        })
        return cuentas;
    }
}
