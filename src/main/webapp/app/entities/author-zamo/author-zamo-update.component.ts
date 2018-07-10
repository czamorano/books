import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAuthorZamo } from 'app/shared/model/author-zamo.model';
import { AuthorZamoService } from './author-zamo.service';

@Component({
    selector: 'jhi-author-zamo-update',
    templateUrl: './author-zamo-update.component.html'
})
export class AuthorZamoUpdateComponent implements OnInit {
    private _author: IAuthorZamo;
    isSaving: boolean;
    birthDateDp: any;

    constructor(private authorService: AuthorZamoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ author }) => {
            this.author = author;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.author.id !== undefined) {
            this.subscribeToSaveResponse(this.authorService.update(this.author));
        } else {
            this.subscribeToSaveResponse(this.authorService.create(this.author));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAuthorZamo>>) {
        result.subscribe((res: HttpResponse<IAuthorZamo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get author() {
        return this._author;
    }

    set author(author: IAuthorZamo) {
        this._author = author;
    }
}
