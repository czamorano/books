/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BooksTestModule } from '../../../test.module';
import { AuthorZamoUpdateComponent } from 'app/entities/author-zamo/author-zamo-update.component';
import { AuthorZamoService } from 'app/entities/author-zamo/author-zamo.service';
import { AuthorZamo } from 'app/shared/model/author-zamo.model';

describe('Component Tests', () => {
    describe('AuthorZamo Management Update Component', () => {
        let comp: AuthorZamoUpdateComponent;
        let fixture: ComponentFixture<AuthorZamoUpdateComponent>;
        let service: AuthorZamoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BooksTestModule],
                declarations: [AuthorZamoUpdateComponent]
            })
                .overrideTemplate(AuthorZamoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AuthorZamoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AuthorZamoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AuthorZamo(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.author = entity;
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
                    const entity = new AuthorZamo();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.author = entity;
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
