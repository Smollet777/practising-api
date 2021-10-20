# PractisingApi
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/Smollet777/practising-api/dev.svg?color=important)
![GitHub language count](https://img.shields.io/github/languages/count/smollet777/practising-api.svg)
![GitHub top language](https://img.shields.io/github/languages/top/smollet777/practising-api.svg)
[![CodeFactor](https://www.codefactor.io/repository/github/smollet777/practising-api/badge)](https://www.codefactor.io/repository/github/smollet777/practising-api)
[![codebeat badge](https://codebeat.co/badges/f760fea8-7dba-484f-a5a9-b91bb6ba506b)](https://codebeat.co/projects/github-com-smollet777-practising-api-dev)
[![BCH compliance](https://bettercodehub.com/edge/badge/Smollet777/practising-api?branch=master)](https://bettercodehub.com/)

Angular version 9

## Features and used techniques

#### search for tracks
typescript interfaces and models, async pipe, RxJS startWith, switchMap, debounceTime, distinctUntilChanged, takeUntil, Subject

***

#### infinite scrolling
loading chunks of data with [ngx-infinite-scroll](https://www.npmjs.com/package/ngx-infinite-scroll) as trigger;
RxJS tap, combineLatest

***

#### player
custom pipes, ChangeDetectorRef, HTML5 audio element, `input type="range"` event listeners

***

#### sticky hide/show header 
typescript enums; animation; observable from scroll; zone.runOutsideAngular

***

#### loading indicator module
@input, @output, Set, interceptor

***

#### page not found
`Location` from angular/common

## Development server

Run `ng serve` or `npm run hmr`(hot module replacement feature) for a dev server. Navigate to `http://localhost:4200/`. 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. 

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
