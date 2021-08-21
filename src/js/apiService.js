 const baseUrl = 'https://pixabay.com/api/';
        const API_KEY = '22948262-953a9601ef8ec29dc611c2152';

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchArticles() {
        const requestparams = `?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

        return fetch(baseUrl + requestparams)
            .then(response => response.json())
            .then(({hits}) => {
                this.incrementPage();
                   return hits})
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}