/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BooksTestModule } from '../../../test.module';
import { AuthorZamoDeleteDialogComponent } from 'app/entities/author-zamo/author-zamo-delete-dialog.component';
import { AuthorZamoService } from 'app/entities/author-zamo/author-zamo.service';

describe('Component Tests', () => {
    describe('AuthorZamo Management Delete Component', () => {
        let comp: AuthorZamoDeleteDialogComponent;
        let fixture: ComponentFixture<AuthorZamoDeleteDialogComponent>;
        let service: AuthorZamoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BooksTestModule],
                declarations: [AuthorZamoDeleteDialogComponent]
            })
                .overrideTemplate(AuthorZamoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AuthorZamoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AuthorZamoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
