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
}

export const getInitialCards = () => {
    return fetch(`${authorizationSettings.url}/cards`, {
        headers: authorizationSettings.headers
    })
}

export const addNewCard = (dataCard) => {
    return fetch(`${authorizationSettings.url}/cards`, {
        method: 'POST',
        headers: authorizationSettings.headers,
        body: JSON.stringify(dataCard)
    })
}

export const setUserInfo = (dataUser) => {
    return fetch(`${authorizationSettings.url}/users/me`, {
        method: 'PATCH',
        headers: authorizationSettings.headers,
        body: JSON.stringify(dataUser)
    })
}

export const deleteCard = (cardId) => {
    return fetch(`${authorizationSettings.url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: authorizationSettings.headers
    })
}

export const setLikeCard = (cardId) => {
    return fetch(`${authorizationSettings.url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: authorizationSettings.headers
    })
}

export const deleteLikeCard = (cardId) => {
    return fetch(`${authorizationSettings.url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: authorizationSettings.headers
    })
}

export const changeAvatar = (datalink) => {
    return fetch(`${authorizationSettings.url}/users/me/avatar`, {
        method: 'PATCH',
        headers: authorizationSettings.headers,
        body: JSON.stringify(datalink)
    })
}