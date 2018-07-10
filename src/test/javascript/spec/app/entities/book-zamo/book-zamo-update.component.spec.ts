/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BooksTestModule } from '../../../test.module';
import { BookZamoUpdateComponent } from 'app/entities/book-zamo/book-zamo-update.component';
import { BookZamoService } from 'app/entities/book-zamo/book-zamo.service';
import { BookZamo } from 'app/shared/model/book-zamo.model';

describe('Component Tests', () => {
    describe('BookZamo Management Update Component', () => {
        let comp: BookZamoUpdateComponent;
        let fixture: ComponentFixture<BookZamoUpdateComponent>;
        let service: BookZamoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BooksTestModule],
                declarations: [BookZamoUpdateComponent]
            })
                .overrideTemplate(BookZamoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BookZamoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookZamoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BookZamo(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.book = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BookZamo();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.book = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
