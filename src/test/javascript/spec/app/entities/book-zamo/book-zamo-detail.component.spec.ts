/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BooksTestModule } from '../../../test.module';
import { BookZamoDetailComponent } from 'app/entities/book-zamo/book-zamo-detail.component';
import { BookZamo } from 'app/shared/model/book-zamo.model';

describe('Component Tests', () => {
    describe('BookZamo Management Detail Component', () => {
        let comp: BookZamoDetailComponent;
        let fixture: ComponentFixture<BookZamoDetailComponent>;
        const route = ({ data: of({ book: new BookZamo(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BooksTestModule],
                declarations: [BookZamoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BookZamoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BookZamoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.book).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
