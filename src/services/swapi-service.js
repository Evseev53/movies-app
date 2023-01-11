export default class SwapiServiсe {
    _apiBase = `https://api.themoviedb.org/3/search/movie`;
    _key = `730b339fc98ae35184a11b9f24628740`;

    async getMovies(name) {
        const res = await fetch(`${this._apiBase}?api_key=${this._key}&query=${name}`);
        return await res.json();
    }
}