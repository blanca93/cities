import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { City } from '../models/city.model';
import { CitiesService } from './cities.service';

describe('Service Tests', () => {
  describe('Cities Service', () => {
    let service: CitiesService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });

      service = TestBed.get(CitiesService);
      httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    describe('Service methods', () => {
      it('should call correct URL', () => {
        service.getList(1, 20).subscribe();

        const req = httpMock.expectOne({ method: 'GET' });
        const resourceUrl = environment.baseUrl + '/cities/queryByPage?page=1&size=20';
        expect(req.request.url).toEqual(`${resourceUrl}`);
      });
      it('should return an object with a list of cities', () => {
        let expectedTotalElements: number;
        let expectedContent: City[];

        service.getList(0, 1).subscribe(received => {
          expectedTotalElements = received.totalElements;
          expectedContent = received.content;
        });

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush({
          content: [{ id: 233, name: 'Abadan' }], totalPages: 332, totalElements: 332,
          last: false, first: true, numberOfElements: 1, size: 1, number: 0, empty: false
        });
        expect(expectedTotalElements).toEqual(332);
        expect(expectedContent.length).toEqual(1);
        expect(expectedContent[0].id).toEqual(233);
        expect(expectedContent[0].name).toEqual('Abadan');
      });
      it('should propagate not found response', () => {
        let expectedResult = 0;

        service.getList(0, 1).subscribe(null, (error: HttpErrorResponse) => {
          expectedResult = error.status;
        });

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush('Invalid request parameters', {
          status: 404,
          statusText: 'Bad Request'
        });
        expect(expectedResult).toEqual(404);
      });
    });
  });
});
