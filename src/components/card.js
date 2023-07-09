// import { openModal } from './modal.js';
/* import { userId } from '../index.js'; */
/* import { deleteCard, deleteLikeCard, setLikeCard } from './api.js'; */
import {
    imageModal,
    popupImage,
    popupCaption,
    cardsListTemplateHtml,
    cardsList
} from './constants.js';


export class Card {

    constructor(dataCard, api, userId, templateSelector) {
        this.templateSelector = templateSelector;
        this.name = dataCard.name;
        this.link = dataCard.link;
        this.userId = userId;
        this._id = dataCard._id;
        this.ownerid = dataCard.owner._id;
        this.likes = dataCard.likes;
        this.api = api;
    }

    _generateCardElement() {

        const cardsListTemplate = document.querySelector(this.templateSelector).content;
        // копируем узел для заполнения
        return cardsListTemplate.querySelector('.element').cloneNode(true);
    }

    createCard() {

        this.cardElement = this._generateCardElement();

        this.buttonDelete = this.cardElement.querySelector('.element__trash-button');

        // заполняем нужные поля-свойства
        this.cardElement.querySelector('.element__title').textContent = this.name;
        this.likeCount = this.cardElement.querySelector('.element__likes-count');
        this.likeButton = this.cardElement.querySelector('.element__like-button');

        this.elementImage = this.cardElement.querySelector('.element__image');
        this.elementImage.setAttribute('src', this.link);
        this.elementImage.setAttribute('alt', this.name);

        // т.к.мы считываем и чужие лайки, то нам надо понимать, если среди них есть наш, то подкрашиваем темным цветом лайк
        this._updateLikes();
        this.cardElement.dataset.id = this._id;

        if (this.userId != this.ownerid) {
            this.buttonDelete.remove();
        }

        // Добавим обработчик-слушатель для установки лайков
        this.likeButton.addEventListener('click', this.updateLikeContainer);

        // Добавим обработчик-слушатель для удаления карточек
        this.buttonDelete.addEventListener('click', this._deletePlaceHandler);

        // Добавим обработчик-слушатель для открытия фото в модальном окне
        this.cardElement.querySelector('.element__image').addEventListener('click', function (evt) {
            openImageHandler(evt);
        });

        return this.cardElement;
    }

    _deletePlaceHandler = () => {

        this.api.deleteCard(this.cardElement.dataset.id)
            .then((res) => {
                this.cardElement.remove();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    _updateLikes() {

        this.likeCount.textContent = this.likes.length;

        if (this.likes.length == 0) {
            this.likeButton.classList.remove('element__like-button_active');
        } else {
            this.likes.forEach((elem) => {
                if (this.userId == elem._id) {
                    this.likeButton.classList.add('element__like-button_active');
                } else this.likeButton.classList.remove('element__like-button_active');
            })
        }
    }

    updateLikeContainer = () => {

        if (this.likeButton.classList.contains('element__like-button_active')) {

            this.api.deleteLikeCard(this.cardElement.dataset.id)
                .then((res) => {
                    this.likes = res.likes;
                    this._updateLikes();
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            this.api.setLikeCard(this.cardElement.dataset.id)
                .then((res) => {
                    this.likes = res.likes;
                    this._updateLikes();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
}

/* 
export const createCard = (item) => {

    // считываем шаблон
    const cardsListTemplate = cardsListTemplateHtml.content;

    // копируем узел для заполнения
    const cardElement = cardsListTemplate.querySelector('.element').cloneNode(true);
    const buttonDelete = cardElement.querySelector('.element__trash-button');

    // заполняем нужные поля-свойства
    cardElement.querySelector('.element__title').textContent = item.name;
    const elementImage = cardElement.querySelector('.element__image');
    const likeCount = cardElement.querySelector('.element__likes-count');
    const likeButton = cardElement.querySelector('.element__like-button');
    elementImage.setAttribute('src', item.link);
    elementImage.setAttribute('alt', item.name);
    
    // т.к.мы считываем и чужие лайки, то нам надо понимать, если среди них есть наш, то подкрашиваем темным цветом лайк
    updateLikes(likeCount, item, likeButton);
    cardElement.dataset.id = item._id;

    if (userId != item.owner._id) {
        buttonDelete.remove();
    }

    // Добавим обработчик-слушатель для установки лайков
    likeButton.addEventListener('click', function (evt) {
        updateLikeContainer(evt, likeCount, cardElement, likeButton);
    });


    // Добавим обработчик-слушатель для удаления карточек
    buttonDelete.addEventListener('click', function (evt) {
        deletePlaceHandler(evt, cardElement);
    });

    // Добавим обработчик-слушатель для открытия фото в модальном окне
    cardElement.querySelector('.element__image').addEventListener('click', function (evt) {
        openImageHandler(evt);
    });

    return cardElement;
}
 */

///////////////////////////// Handlers - обработчики событий / слушателей (колбэки)

/* function deletePlaceHandler(evt, cardElement) {

    api.deleteCard(cardElement.dataset.id)
        .then((res) => {
            evt.target.closest('.element').remove();
        })
        .catch((err) => {
            console.log(err);
        })    
}

function updateLikes(likeCount, likes, likeButton) {

    likeCount.textContent = likes.length;
    likes.forEach((elem)=>{
        if (userId == elem._id) {
            likeButton.classList.add('element__like-button_active');
        } else likeButton.classList.remove('element__like-button_active');
    })

}

function updateLikeContainer(evt, likeCount, cardElement, likeButton) {

    if (evt.target.classList.contains('element__like-button_active')){

        api.deleteLikeCard(cardElement.dataset.id)
        .then((res) => {
            updateLikes(likeCount, res.likes, likeButton);
        })
        .catch((err) => {
            console.log(err);
        })
    } else {
        api.setLikeCard(cardElement.dataset.id)
        .then((res) => {
            updateLikes(likeCount, res.likes, likeButton);
        })
        .catch((err) => {
            console.log(err);
        })
    }
}
 */
///////////////////////// Похоже, что не относятся к классу Card, т.к. отвечают за отрисовку, видимо это класс Section
// задание звучит как "Организуйте в классе Card код, который создаёт карточку с текстом и ссылкой на изображение"

/* export const addCard = (cardElem) => {
    cardsList.prepend(cardElem);
} */

/* export const createCards = (initialCards) => {

    initialCards.forEach(function (item) {
        const cardElem = createNewCard(item);
        addCard(cardElem);
    });

} */

/* export const createCards = (dataObj) => {

    dataObj.initialCards.forEach(function (item) {
        const cardElem = createNewCard(item, dataObj.api, dataObj.userId, dataObj.template);
        addCard(cardElem);
    });

}

// ЭТО КОСТЫЛЬ!!!!, пока не сделаем класс Section
const createNewCard = (data, api, userId, template) => {
    const card = new Card(
        data,
        api,
        userId,
        template);

    return card.createCard();
}; */

// ЭТО КОСТЫЛЬ, хэндлер должен передаваться видимо из index.js при инициализации, в данном класса только его использование
// по заданию "Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. При клике на карточку эта функция должна открывать попап с картинкой."
function openImageHandler(evt) {

    // получим параметры картинки
    const elemImage = evt.target.closest('.element__image');
    const link = elemImage.src;
    const place = elemImage.alt;

    // заполним элементы
    popupImage.src = link;
    popupImage.alt = place;
    popupCaption.textContent = place;

    // откроем окно
    openModal(imageModal);
}