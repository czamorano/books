import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookZamo } from 'app/shared/model/book-zamo.model';
import { BookZamoService } from './book-zamo.service';
import { BookZamoComponent } from './book-zamo.component';
import { BookZamoDetailComponent } from './book-zamo-detail.component';
import { BookZamoUpdateComponent } from './book-zamo-update.component';
import { BookZamoDeletePopupComponent } from './book-zamo-delete-dialog.component';
import { IBookZamo } from 'app/shared/model/book-zamo.model';

@Injectable({ providedIn: 'root' })
export class BookZamoResolve implements Resolve<IBookZamo> {
    constructor(private service: BookZamoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((book: HttpResponse<BookZamo>) => book.body));
        }
        return of(new BookZamo());
    }
}

export const bookRoute: Routes = [
    {
        path: 'book-zamo',
        component: BookZamoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'booksApp.book.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'book-zamo/:id/view',
        component: BookZamoDetailComponent,
        resolve: {
            book: BookZamoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'booksApp.book.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'book-zamo/new',
        component: BookZamoUpdateComponent,
        resolve: {
            book: BookZamoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'booksApp.book.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'book-zamo/:id/edit',
        component: BookZamoUpdateComponent,
        resolve: {
            book: BookZamoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'booksApp.book.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bookPopupRoute: Routes = [
    {
        path: 'book-zamo/:id/delete',
        component: BookZamoDeletePopupComponent,
        resolve: {
            book: BookZamoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'booksApp.book.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
