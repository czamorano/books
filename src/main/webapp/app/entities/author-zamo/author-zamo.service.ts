import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAuthorZamo } from 'app/shared/model/author-zamo.model';

type EntityResponseType = HttpResponse<IAuthorZamo>;
type EntityArrayResponseType = HttpResponse<IAuthorZamo[]>;

@Injectable({ providedIn: 'root' })
export class AuthorZamoService {
    private resourceUrl = SERVER_API_URL + 'api/authors';

    constructor(private http: HttpClient) {}

    create(author: IAuthorZamo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(author);
        return this.http
            .post<IAuthorZamo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(author: IAuthorZamo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(author);
        return this.http
            .put<IAuthorZamo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAuthorZamo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAuthorZamo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(author: IAuthorZamo): IAuthorZamo {
        const copy: IAuthorZamo = Object.assign({}, author, {
            birthDate: author.birthDate != null && author.birthDate.isValid() ? author.birthDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.birthDate = res.body.birthDate != null ? moment(res.body.birthDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((author: IAuthorZamo) => {
            author.birthDate = author.birthDate != null ? moment(author.birthDate) : null;
        });
        return res;
    }
}
