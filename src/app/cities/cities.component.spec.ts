import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CitiesService } from '../shared/services/cities.service';
import { CitiesComponent } from './cities.component';

describe('Component Tests', () => {
  describe('CitiesComponent', () => {
    let comp: CitiesComponent;
    let fixture: ComponentFixture<CitiesComponent>;
    let mockCitiesService: CitiesService;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
        declarations: [CitiesComponent]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      // mock response
      mockCitiesService = TestBed.inject(CitiesService);
      mockCitiesService.getList = jasmine.createSpy().and.returnValue(of({
        content: [{ id: 233, name: 'Abadan' }], totalPages: 332, totalElements: 332,
        last: false, first: true, numberOfElements: 1, size: 1, number: 0, empty: false
      }));

      // initialize component
      fixture = TestBed.createComponent(CitiesComponent);
      comp = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(comp).toBeTruthy();
    });

    it('calls getList at the beginning', () => {
      comp = fixture.debugElement.componentInstance;

      // call ngOnInit with params
      comp.pageNumber = 0;
      comp.itemsByPage = 1;
      comp.ngOnInit();

      // expect results
      expect(mockCitiesService.getList).toHaveBeenCalledWith(0, 1);
      expect(comp.cities[0].id).toBe(233);
      expect(comp.cities[0].name).toBe('Abadan');
      expect(comp.totalElements).toBe(332);
    });
  });
});
