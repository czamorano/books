/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BooksTestModule } from '../../../test.module';
import { AuthorZamoDetailComponent } from 'app/entities/author-zamo/author-zamo-detail.component';
import { AuthorZamo } from 'app/shared/model/author-zamo.model';

describe('Component Tests', () => {
    describe('AuthorZamo Management Detail Component', () => {
        let comp: AuthorZamoDetailComponent;
        let fixture: ComponentFixture<AuthorZamoDetailComponent>;
        const route = ({ data: of({ author: new AuthorZamo(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BooksTestModule],
                declarations: [AuthorZamoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AuthorZamoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AuthorZamoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.author).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
