
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class ServerRequest {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    _host: string;
    _protocol: string;
    _uri: string
    _queryParameter: string;
    _body: string;

    constructor(private http: HttpClient) {
        this._host = "/api/";
    }

    download(uri) {
        window.open(this._host + uri);
    }
    consultar(uri) {
        return this.http.get(this._host + uri).toPromise()
            .catch(this.handleError);
    }

    cadastrar(uri, body) {
        return this.http.post(this._host + uri
            , JSON.stringify(body)
            , {
                headers: this.headers,
            }).toPromise()
            .catch(this.handleError);
    }
    atualizar(uri, body) {
        return this.http.put(this._host + uri
            , JSON.stringify(body)
            , {
                headers: this.headers,
            }).toPromise()
            .catch(this.handleError);
    }
    deletar(uri) {
        return this.http.delete(this._host + uri).toPromise()
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('Ocorreu um Erro', error);
        return Promise.reject(error.message || error);
    }
}