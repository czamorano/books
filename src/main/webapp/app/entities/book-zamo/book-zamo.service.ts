import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBookZamo } from 'app/shared/model/book-zamo.model';

type EntityResponseType = HttpResponse<IBookZamo>;
type EntityArrayResponseType = HttpResponse<IBookZamo[]>;

@Injectable({ providedIn: 'root' })
export class BookZamoService {
    private resourceUrl = SERVER_API_URL + 'api/books';

    constructor(private http: HttpClient) {}

    create(book: IBookZamo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(book);
        return this.http
            .post<IBookZamo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(book: IBookZamo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(book);
        return this.http
            .put<IBookZamo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBookZamo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBookZamo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(book: IBookZamo): IBookZamo {
        const copy: IBookZamo = Object.assign({}, book, {
            publicationDate:
                book.publicationDate != null && book.publicationDate.isValid() ? book.publicationDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.publicationDate = res.body.publicationDate != null ? moment(res.body.publicationDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((book: IBookZamo) => {
            book.publicationDate = book.publicationDate != null ? moment(book.publicationDate) : null;
        });
        return res;
    }
}
