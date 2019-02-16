export class SearchResult<T> {
  constructor(public total = 0, public next = '', public data: Array<T> = []) { }
}
