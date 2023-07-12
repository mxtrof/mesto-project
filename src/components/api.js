
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

    getUserInfo() {
        return fetch(`${this.url}/users/me`, {
            headers: this.headers
        })
        .then(this._checkResult);
    }
    
    getInitialCards() {
        return fetch(`${this.url}/cards`, {
            headers: this.headers
        })
        .then(this._checkResult);
    }
    
    addNewCard(dataCard) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(dataCard)
        })
        .then(this._checkResult);
    }
    
    setUserInfo(dataUser) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(dataUser)
        })
        .then(this._checkResult);
    }
    
    deleteCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(this._checkResult);
    }
    
    setLikeCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers
        })
        .then(this._checkResult);
    }
    
    deleteLikeCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(this._checkResult);
    }
    
    changeAvatar(datalink) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(datalink)
        })
        .then(this._checkResult);
    }
}