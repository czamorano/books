import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BooksSharedModule } from 'app/shared';
import {
    BookZamoComponent,
    BookZamoDetailComponent,
    BookZamoUpdateComponent,
    BookZamoDeletePopupComponent,
    BookZamoDeleteDialogComponent,
    bookRoute,
    bookPopupRoute
} from './';

const ENTITY_STATES = [...bookRoute, ...bookPopupRoute];

@NgModule({
    imports: [BooksSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BookZamoComponent,
        BookZamoDetailComponent,
        BookZamoUpdateComponent,
        BookZamoDeleteDialogComponent,
        BookZamoDeletePopupComponent
    ],
    entryComponents: [BookZamoComponent, BookZamoUpdateComponent, BookZamoDeleteDialogComponent, BookZamoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BooksBookZamoModule {}
