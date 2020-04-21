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

// description
// keywords
// license
// repository
// autoupdate
// author
// assets

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  queryField = new FormControl();
  descriptionField = new FormControl();
  licenseField = new FormControl();
  versionField = new FormControl();

  fields = {
    description: this.descriptionField,
    license: this.licenseField,
    version: this.versionField,
  };

  currentQuery = '';
  currentSelectedFields = [];
  suggestions$: Observable<any>;
  results$: Observable<any>;
  total: number;

  constructor(private service: SearchService) { }

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

    // testing valueChanges and registerOnChange
    // this.licenseField.valueChanges.pipe(
    //   tap(console.log)
    // ).subscribe();
    // this.licenseField.registerOnChange(() => {
    //   console.log(this.licenseField.value);
    // });

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
    //   switchMap(value => value.length > 1 ? this.search(value) : of([]))
    //   // switchMap(value => iif(() => value.length > 1, this.search(value), this.emptySearch()))
    // )
  }

  get fieldNames() {
    return Object.entries(this.fields).map(([key, _]) => key);
  }

  get selectedFields() {
    return Object.entries(this.fields)
    .filter(([_, field]) => field.value || false)
    .map(([key, _]) => key);
  }

  toggleFields() {
    console.log('toggle fields...');
    for (let [k, f] of Object.entries(this.fields)) {
      console.log(`${k} = ${f.value || false}`);
    }
  }

  equalArrays(a: Array<any>, b: Array<any>) {
    if (a.length != b.length) return false;
    let setA = new Set(a);
    return b.every(v => setA.has(v));
  }

  onSearch() {
    let query = this.queryField.value;
    let fields = this.selectedFields;

    let changedFields = !this.equalArrays(fields, this.currentSelectedFields);
    if (query && query !== "" && (this.currentQuery != query || changedFields)) {
      this.currentQuery = query;
      this.currentSelectedFields = fields;
      this.results$ = this.search(query, fields);
    }
  }

  search(query: string, fields?: string[]) {
    console.log("searching libraries...");
    console.log(`query  = ${query}`);
    console.log(`fields = ${fields}`);
    return this.service.search(query, fields).pipe(
      tap((res: any) => (this.total = res.total)),
      map((res: any) => res.results)
    );
  }
}
