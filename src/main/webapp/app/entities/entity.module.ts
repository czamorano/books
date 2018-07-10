import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BooksAuthorZamoModule } from './author-zamo/author-zamo.module';
import { BooksBookZamoModule } from './book-zamo/book-zamo.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        BooksAuthorZamoModule,
        BooksBookZamoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BooksEntityModule {}
