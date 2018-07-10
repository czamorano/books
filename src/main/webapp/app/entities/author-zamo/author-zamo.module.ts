import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BooksSharedModule } from 'app/shared';
import {
    AuthorZamoComponent,
    AuthorZamoDetailComponent,
    AuthorZamoUpdateComponent,
    AuthorZamoDeletePopupComponent,
    AuthorZamoDeleteDialogComponent,
    authorRoute,
    authorPopupRoute
} from './';

const ENTITY_STATES = [...authorRoute, ...authorPopupRoute];

@NgModule({
    imports: [BooksSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AuthorZamoComponent,
        AuthorZamoDetailComponent,
        AuthorZamoUpdateComponent,
        AuthorZamoDeleteDialogComponent,
        AuthorZamoDeletePopupComponent
    ],
    entryComponents: [AuthorZamoComponent, AuthorZamoUpdateComponent, AuthorZamoDeleteDialogComponent, AuthorZamoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BooksAuthorZamoModule {}
