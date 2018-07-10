import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBookZamo } from 'app/shared/model/book-zamo.model';
import { BookZamoService } from './book-zamo.service';
import { IAuthorZamo } from 'app/shared/model/author-zamo.model';
import { AuthorZamoService } from 'app/entities/author-zamo';

@Component({
    selector: 'jhi-book-zamo-update',
    templateUrl: './book-zamo-update.component.html'
})
export class BookZamoUpdateComponent implements OnInit {
    private _book: IBookZamo;
    isSaving: boolean;

    authors: IAuthorZamo[];
    publicationDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private bookService: BookZamoService,
        private authorService: AuthorZamoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ book }) => {
            this.book = book;
        });
        this.authorService.query().subscribe(
            (res: HttpResponse<IAuthorZamo[]>) => {
                this.authors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.book.id !== undefined) {
            this.subscribeToSaveResponse(this.bookService.update(this.book));
        } else {
            this.subscribeToSaveResponse(this.bookService.create(this.book));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBookZamo>>) {
        result.subscribe((res: HttpResponse<IBookZamo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAuthorById(index: number, item: IAuthorZamo) {
        return item.id;
    }
    get book() {
        return this._book;
    }

    set book(book: IBookZamo) {
        this._book = book;
    }
}
