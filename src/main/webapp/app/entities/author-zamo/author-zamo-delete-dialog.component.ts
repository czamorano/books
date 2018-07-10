import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAuthorZamo } from 'app/shared/model/author-zamo.model';
import { AuthorZamoService } from './author-zamo.service';

@Component({
    selector: 'jhi-author-zamo-delete-dialog',
    templateUrl: './author-zamo-delete-dialog.component.html'
})
export class AuthorZamoDeleteDialogComponent {
    author: IAuthorZamo;

    constructor(private authorService: AuthorZamoService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.authorService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'authorListModification',
                content: 'Deleted an author'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-author-zamo-delete-popup',
    template: ''
})
export class AuthorZamoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ author }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AuthorZamoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.author = author;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
