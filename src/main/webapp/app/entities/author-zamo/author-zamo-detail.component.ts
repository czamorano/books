import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAuthorZamo } from 'app/shared/model/author-zamo.model';

@Component({
    selector: 'jhi-author-zamo-detail',
    templateUrl: './author-zamo-detail.component.html'
})
export class AuthorZamoDetailComponent implements OnInit {
    author: IAuthorZamo;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ author }) => {
            this.author = author;
        });
    }

    previousState() {
        window.history.back();
    }
}
