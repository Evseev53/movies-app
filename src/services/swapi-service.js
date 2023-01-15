export default class SwapiServiсe {
    _apiBase = `https://api.themoviedb.org/3/search/movie`;
    _key = `730b339fc98ae35184a11b9f24628740`;

    async getMovies(name, page = 1) {
        if (name === ''){
            throw Error('Поле для ввода пустое');
        }
        try {
            const res = await fetch(`${this._apiBase}?api_key=${this._key}&query=${name}&page=${page}`);
            if (!res.ok) {
                console.error(`Получен ответ от сервера: ${res.status}`);
                throw Error('Сервис недоступен');
            }
            return await res.json();
        } catch (err) {
            throw Error(err);
        }
    }
}