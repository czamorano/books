import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorZamo } from 'app/shared/model/author-zamo.model';
import { AuthorZamoService } from './author-zamo.service';
import { AuthorZamoComponent } from './author-zamo.component';
import { AuthorZamoDetailComponent } from './author-zamo-detail.component';
import { AuthorZamoUpdateComponent } from './author-zamo-update.component';
import { AuthorZamoDeletePopupComponent } from './author-zamo-delete-dialog.component';
import { IAuthorZamo } from 'app/shared/model/author-zamo.model';

@Injectable({ providedIn: 'root' })
export class AuthorZamoResolve implements Resolve<IAuthorZamo> {
    constructor(private service: AuthorZamoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((author: HttpResponse<AuthorZamo>) => author.body));
        }
        return of(new AuthorZamo());
    }
}

export const authorRoute: Routes = [
    {
        path: 'author-zamo',
        component: AuthorZamoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'booksApp.author.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'author-zamo/:id/view',
        component: AuthorZamoDetailComponent,
        resolve: {
            author: AuthorZamoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'booksApp.author.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'author-zamo/new',
        component: AuthorZamoUpdateComponent,
        resolve: {
            author: AuthorZamoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'booksApp.author.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'author-zamo/:id/edit',
        component: AuthorZamoUpdateComponent,
        resolve: {
            author: AuthorZamoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'booksApp.author.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const authorPopupRoute: Routes = [
    {
        path: 'author-zamo/:id/delete',
        component: AuthorZamoDeletePopupComponent,
        resolve: {
            author: AuthorZamoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'booksApp.author.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
