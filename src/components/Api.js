
export class Api { 
    constructor(authorizationSettings) {
        this.url = authorizationSettings.url;
        this.headers = authorizationSettings.headers;
    }

    _checkResult(res) {
        if (res.ok) {
        return res.json(); // возвращаем вызов метода json
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    _request(endpoint, options) {
        return fetch(`${this.url}${endpoint}`, options)
        .then(this._checkResult)
      }

    getUserInfo() {
        return this._request(`/users/me`, {
            headers: this.headers
        });
    }

    getInitialCards() {
        return this._request(`/cards`, {
            headers: this.headers
        });
    }
    
    addNewCard(dataCard) {
        return this._request(`/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(dataCard)
        });
    }

    setUserInfo(dataUser) {
        return this._request(`/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(dataUser)
        });
    }

    deleteCard(cardId) {
        return this._request(`/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        });
    }

    setLikeCard(cardId) {
        return this._request(`/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers
        });
    }

    deleteLikeCard(cardId) {
        return this._request(`/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers
        });
    }

    changeAvatar(datalink) {
        return this._request(`/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(datalink)
        });
    }
}
