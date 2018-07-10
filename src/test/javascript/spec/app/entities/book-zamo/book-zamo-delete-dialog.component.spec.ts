/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BooksTestModule } from '../../../test.module';
import { BookZamoDeleteDialogComponent } from 'app/entities/book-zamo/book-zamo-delete-dialog.component';
import { BookZamoService } from 'app/entities/book-zamo/book-zamo.service';

describe('Component Tests', () => {
    describe('BookZamo Management Delete Component', () => {
        let comp: BookZamoDeleteDialogComponent;
        let fixture: ComponentFixture<BookZamoDeleteDialogComponent>;
        let service: BookZamoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BooksTestModule],
                declarations: [BookZamoDeleteDialogComponent]
            })
                .overrideTemplate(BookZamoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BookZamoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookZamoService);
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
