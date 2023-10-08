class Api {
    constructor(options) {
        this._options = options
        this._profileAvatarEndpoint = options.profileAvatarEndpoint
        this._baseUrl = options.baseUrl
        this._cardsEndpoint = options.cardsEndpoint
        this._profileInfoEndpoint = options.profileInfoEndpoint

    }

    getInitialCards() {
        return fetch(`${this._baseUrl}${this._cardsEndpoint}`, {
            headers: this._options.headers
        })
            .then(res => {
                return this._getResponseData(res)
            });
    }

    getInfoProfile() {
        return fetch(`${this._baseUrl}${this._profileInfoEndpoint}`, {
            headers: this._options.headers
        })
            .then(res => {
                return this._getResponseData(res)
            });
    }

    changeLikeCardStatus(id, isLiked) {
        if(isLiked) {
            return fetch(`${this._baseUrl}${this._cardsEndpoint}/${id}/likes`, {
                method: 'PUT',
                headers: this._options.headers
            })
                .then(res => {
                    return this._getResponseData(res)
                });
        }else{
            return fetch(`${this._baseUrl}${this._cardsEndpoint}/${id}/likes`, {
                method: 'DELETE',
                headers: this._options.headers
            })
                .then(res => {
                    return this._getResponseData(res)
                });
        }

    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}${this._cardsEndpoint}/${id}`, {
            method: 'DELETE',
            headers: this._options.headers
        })
            .then(res => {
                return this._getResponseData(res)
            });
    }

    postCard(data) {

        return fetch(`${this._baseUrl}${this._cardsEndpoint}`, {
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => {
                return this._getResponseData(res)
            });
    }

    setInfoProfile(data) {

        return fetch(`${this._baseUrl}${this._profileInfoEndpoint}`, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.status
            })
        })
            .then(res => {
                return this._getResponseData(res)
            });
    }

    setInfoAvatar(data) {

        return fetch(`${this._baseUrl}${this._profileAvatarEndpoint}`, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                avatar: data.link
            })
        })
            .then(res => {
                return this._getResponseData(res)
            });
    }

  /*



    postCard(data) {

        return fetch(this._cardsUrl, {
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => {
                return this._getResponseData(res)
            });
    }

    }*/

    _getResponseData(res) {
        if (res.ok) {
            return res.json()
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-73',
    cardsEndpoint: '/cards',
    profileInfoEndpoint: '/users/me',
    profileAvatarEndpoint: '/users/me/avatar',
    headers: {
        authorization: '94ec7d81-a68f-476c-85b4-29b28770f78f',
        'Content-Type': 'application/json'
    }
});