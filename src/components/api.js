
export class Api { 
    constructor(authorizationSettings) {
        this.url = authorizationSettings.url;
        this.headers = authorizationSettings.headers;
    }

    #checkResult(res) {
        if (res.ok) {
        return res.json(); // возвращаем вызов метода json
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this.url}/users/me`, {
            headers: this.headers
        })
        .then(this.#checkResult);
    }
    
    getInitialCards() {
        return fetch(`${this.url}/cards`, {
            headers: this.headers
        })
        .then(this.#checkResult);
    }
    
    addNewCard(dataCard) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(dataCard)
        })
        .then(this.#checkResult);
    }
    
    setUserInfo(dataUser) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(dataUser)
        })
        .then(this.#checkResult);
    }
    
    deleteCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(this.#checkResult);
    }
    
    setLikeCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers
        })
        .then(this.#checkResult);
    }
    
    deleteLikeCard(cardId) {
        return fetch(`${this.url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(this.#checkResult);
    }
    
    changeAvatar(datalink) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(datalink)
        })
        .then(this.#checkResult);
    }
}


/* 
const authorizationSettings = {
    url: 'https://mesto.nomoreparties.co/v1/plus-cohort-24',
    headers: {
        authorization: 'd8022b50-8c1c-4a15-ba76-94ce65b1ce67',
        'Content-Type': 'application/json'
    }
}

const this.#checkResult = (res) => {
    if (res.ok) {
    return res.json(); // возвращаем вызов метода json
    }
    return Promise.reject(`Ошибка ${res.status}`);
} 

getUserInfo = () => {
    return fetch(`${authorizationSettings.url}/users/me`, {
        headers: authorizationSettings.headers
    })
    .then(this.#checkResult);
}

getInitialCards = () => {
    return fetch(`${authorizationSettings.url}/cards`, {
        headers: authorizationSettings.headers
    })
    .then(this.#checkResult);
}

addNewCard = (dataCard) => {
    return fetch(`${authorizationSettings.url}/cards`, {
        method: 'POST',
        headers: authorizationSettings.headers,
        body: JSON.stringify(dataCard)
    })
    .then(this.#checkResult);
}

setUserInfo = (dataUser) => {
    return fetch(`${authorizationSettings.url}/users/me`, {
        method: 'PATCH',
        headers: authorizationSettings.headers,
        body: JSON.stringify(dataUser)
    })
    .then(this.#checkResult);
}

deleteCard = (cardId) => {
    return fetch(`${authorizationSettings.url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: authorizationSettings.headers
    })
    .then(this.#checkResult);
}

setLikeCard = (cardId) => {
    return fetch(`${authorizationSettings.url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: authorizationSettings.headers
    })
    .then(this.#checkResult);
}

deleteLikeCard = (cardId) => {
    return fetch(`${authorizationSettings.url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: authorizationSettings.headers
    })
    .then(this.#checkResult);
}

changeAvatar = (datalink) => {
    return fetch(`${authorizationSettings.url}/users/me/avatar`, {
        method: 'PATCH',
        headers: authorizationSettings.headers,
        body: JSON.stringify(datalink)
    })
    .then(this.#checkResult);
} */