export default class SwapiServiсe {
    _apiBase = `https://api.themoviedb.org/3/`;
    _key = `730b339fc98ae35184a11b9f24628740`;

    async getMovies(name, page = 1) {
        if (name === ''){
            throw Error('Поле для ввода пустое');
        }
        try {
            const res = await fetch(`${this._apiBase}search/movie?api_key=${this._key}&query=${name}&page=${page}`);
            if (!res.ok) {
                console.error(`Получен ответ от сервера: ${res.status}`);
                throw Error('Сервис недоступен');
            }
            return await res.json();
        } catch (err) {
            throw Error(err);
        }
    }

    async startGuestSession() {
        try {
            const res = await fetch(`${this._apiBase}authentication/guest_session/new?api_key=${this._key}`);
            if (!res.ok) {
                console.error(`Получен ответ от сервера: ${res.status}`);
                throw Error('Сервис недоступен');
            }
            return await res.json();
        } catch (err) {
            throw Error(err);
        }
    }

    async getListOfGenres() {
        try {
            const res = await fetch(`${this._apiBase}genre/movie/list?api_key=${this._key}&language=en-US`);
            if (!res.ok) {
                console.error(`Получен ответ от сервера: ${res.status}`);
                throw Error('Сервис недоступен');
            }
            return await res.json();
        } catch (err) {
            throw Error(err);
        }
    }

    async rateMovie(sessionId, movieId, value) {
        const res = await fetch(`${this._apiBase}movie/${movieId}/rating?api_key=${this._key}&guest_session_id=${sessionId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({"value": value})
        });
        if (!res.ok) {
            console.error(`Получен ответ от сервера: ${res.status}`);
        }
        return await res.json();
    }

    async getListOfFavorites(guestSessionId) {
        const res = await fetch(`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${this._key}&language=en-US&sort_by=created_at.asc`);
        if (!res.ok) {
            console.error(`Получен ответ от сервера: ${res.status}`);
        }
        return await res.json();
    }
};