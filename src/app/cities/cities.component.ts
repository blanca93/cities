import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { INITIAL_PAGE_NUMBER, ITEMS_BY_PAGE } from '../shared/constants/pagination.constants';
import { City } from '../shared/models/city.model';
import { CitiesService } from '../shared/services/cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit, OnDestroy {

  /**
   * Object to cancel subscriptions to observables returned by services
   */
  ngUnsubscribeHttp: Subject<boolean> = new Subject<boolean>();

  /**
   * List of cities to show on page
   */
  cities: Array<City>;

  /**
   * Page to load (starting from 0)
   */
  pageNumber: number;

  displayedColumns: string[] = ['id', 'name'];

  /**
   * @description number of cities by page
   * @type {number}
   * @memberof CitiesComponent
   */
  itemsByPage: number;

  /**
   * Total number of cities
   */
  totalElements: number;

  constructor(private citiesService: CitiesService) {
    this.pageNumber = INITIAL_PAGE_NUMBER;
    this.itemsByPage = ITEMS_BY_PAGE;
    this.cities = new Array<City>();
  }

  ngOnInit() {
    // Get the list of cities to load
    this.getListOfCities(this.pageNumber, this.itemsByPage);
  }

  /**
   * Unsubscribe when finished
   */
  ngOnDestroy() {
    this.cancelSubscriptions();
  }

  cancelSubscriptions() {
    this.ngUnsubscribeHttp.next(true);
    this.ngUnsubscribeHttp.complete();
  }

  /**
   * When the user interacts with the paginator
   * we call again the webservice to update the data
   */
  onPageChange(pageEvent: PageEvent): void {
    this.pageNumber = pageEvent.pageIndex || INITIAL_PAGE_NUMBER;
    this.itemsByPage = pageEvent.pageSize || ITEMS_BY_PAGE;
    this.getListOfCities(this.pageNumber, this.itemsByPage);
  }

  /**
   * Method to obtain the list of cities
   * @param pageNumber
   * @param itemsByPage
   */
  getListOfCities(pageNumber: number, itemsByPage: number): void {
    this.citiesService.getList(pageNumber, itemsByPage)
      .pipe(takeUntil(this.ngUnsubscribeHttp))
      .subscribe(data => {
        this.cities = data.content;
        this.totalElements = data.totalElements;
      });
  }

}
