import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, delay } from 'rxjs/operators';
import { TransaccionesModel } from '../models/transacciones';

@Injectable({
    providedIn: 'root',
})
export class TransaccionesService {
    private url = '	https://mibanco-333616-default-rtdb.firebaseio.com/transacciones/OcBMnUGvAqVlUOskPph6ZIDpDqj2.json';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('token')
        })
    };
    constructor(private http: HttpClient) { }

    Obtentransacciones() {
        return this.http.get(`${this.url}?auth=${sessionStorage.getItem('token')}`, this.httpOptions).pipe(
            map(this.crearArreglo),
            delay(1500)
        );
    }
    Guardadeposito(datosdep: TransaccionesModel) {
        return this.http.post(`${this.url}?auth=${sessionStorage.getItem('token')}`, datosdep, this.httpOptions);
    }
    Guardaretiro(datosretiro: TransaccionesModel) {
        return this.http.post(`${this.url}?auth=${sessionStorage.getItem('token')}`, datosretiro, this.httpOptions);
    }
    private crearArreglo(cuentasObj: object) {
        const cuentas: TransaccionesModel[] = [];
        if (cuentasObj === null) { return []; }

        Object.keys(cuentasObj).forEach(key => {
            const cuenta = cuentasObj[key];
            cuenta.id = key;
            cuentas.push(cuenta);
        })
        return cuentas;
    }
}