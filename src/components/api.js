const authorizationSettings = {
    url: 'https://mesto.nomoreparties.co/v1/plus-cohort-24',
    headers: {
        authorization: 'd8022b50-8c1c-4a15-ba76-94ce65b1ce67',
        'Content-Type': 'application/json'
    }
}

export const getUserInfo = () => {
    return fetch(`${authorizationSettings.url}/users/me`, {
        headers: authorizationSettings.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json(); // возвращаем вызов метода json
        }
        // иначе отклоняем промис, чтобы перейти в catch
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const getInitialCards = () => {
    return fetch(`${authorizationSettings.url}/cards`, {
        headers: authorizationSettings.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json(); // возвращаем вызов метода json
        }
        // иначе отклоняем промис, чтобы перейти в catch
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const addNewCard = (dataCard) => {
    return fetch(`${authorizationSettings.url}/cards`, {
        method: 'POST',
        headers: authorizationSettings.headers,
        body: JSON.stringify(dataCard)
    })
    .then((res) => {
        if (res.ok) {
            return res.json(); // возвращаем вызов метода json
        }
        // иначе отклоняем промис, чтобы перейти в catch
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const setUserInfo = (dataUser) => {
    return fetch(`${authorizationSettings.url}/users/me`, {
        method: 'PATCH',
        headers: authorizationSettings.headers,
        body: JSON.stringify(dataUser)
    })
    .then((res) => {
        if (res.ok) {
            return res.json(); // возвращаем вызов метода json
        }
        // иначе отклоняем промис, чтобы перейти в catch
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const deleteCard = (cardId) => {
    return fetch(`${authorizationSettings.url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: authorizationSettings.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json(); // возвращаем вызов метода json
        }
        // иначе отклоняем промис, чтобы перейти в catch
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const setLikeCard = (cardId) => {
    return fetch(`${authorizationSettings.url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: authorizationSettings.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json(); // возвращаем вызов метода json
        }
        // иначе отклоняем промис, чтобы перейти в catch
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const deleteLikeCard = (cardId) => {
    return fetch(`${authorizationSettings.url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: authorizationSettings.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json(); // возвращаем вызов метода json
        }
        // иначе отклоняем промис, чтобы перейти в catch
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const changeAvatar = (datalink) => {
    return fetch(`${authorizationSettings.url}/users/me/avatar`, {
        method: 'PATCH',
        headers: authorizationSettings.headers,
        body: JSON.stringify(datalink)
    })
    .then((res) => {
        if (res.ok) {
            return res.json(); // возвращаем вызов метода json
        }
        // иначе отклоняем промис, чтобы перейти в catch
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}