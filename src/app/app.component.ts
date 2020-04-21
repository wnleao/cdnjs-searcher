import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from './search.service';
import {
  tap,
  map,
  distinctUntilChanged,
  debounceTime,
  switchMap,
} from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  queryField = new FormControl();
  currentQuery = '';
  isSearching = false;
  suggestions$: Observable<any>;
  results$: Observable<any>;
  total: number;

  constructor(private service: SearchService) {}

  ngOnInit(): void {
    this.suggestions$ = new Observable((observer: Observer<string>) => {
      observer.next(this.queryField.value);
    }).pipe(
      map((query) => query.trim()),
      debounceTime(200),
      distinctUntilChanged(),
      tap(console.log),
      switchMap((query: string) => this.search(query))
      // using typeaheadMinLength, it's not necessary to check query.length
      // switchMap((query: string) => query.length > 1 ? this.search(query) : of([]))
    );

    // search while typing
    // this.results$ = this.queryField.valueChanges.pipe(
    //   map(value => value.trim()),
    //   debounceTime(200),
    //   distinctUntilChanged(),
    //   tap(console.log),
    //   switchMap(value => {
    //     if (value.length > 1) {
    //       return this.search(value);
    //     } else {
    //       return this.emptySearch();
    //     }
    //   })
    // )

    // https://www.learnrxjs.io/learn-rxjs/operators/conditional/iif
    // this.results$ = this.queryField.valueChanges.pipe(
    //   map(value => value.trim()),
    //   debounceTime(200),
    //   distinctUntilChanged(),
    //   tap(console.log),
    //   tap(value => this.isSearching = value.length > 1),
    //   tap(value => console.log(this.isSearching)),
    //   switchMap(value => value.length > 1 ? this.search(value) : of([]))
    //   // switchMap(value => iif(() => value.length > 1, this.search(value), this.emptySearch()))
    // )
  }

  onSearch() {
    let query = this.queryField.value;
    this.isSearching = query && query !== '' && this.currentQuery != query;
    if (this.isSearching) {
      this.results$ = this.search(query);
      this.currentQuery = query;
    }
  }

  search(query: string) {
    return this.service.get(query).pipe(
      tap((res: any) => (this.total = res.total)),
      map((res: any) => res.results)
    );
  }
}
