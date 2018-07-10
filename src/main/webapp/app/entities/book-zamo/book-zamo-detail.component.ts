import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBookZamo } from 'app/shared/model/book-zamo.model';

@Component({
    selector: 'jhi-book-zamo-detail',
    templateUrl: './book-zamo-detail.component.html'
})
export class BookZamoDetailComponent implements OnInit {
    book: IBookZamo;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ book }) => {
            this.book = book;
        });
    }

    previousState() {
        window.history.back();
    }
}
