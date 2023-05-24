import { openModal } from './modal.js';
import { userId } from '../index.js';
import { deleteCard, deleteLikeCard, setLikeCard } from './api.js';
import {
    imageModal,
    popupImage,
    popupCaption,
    cardsListTemplateHtml,
    cardsList
} from './constants.js';

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

function deletePlaceHandler(evt, cardElement) {

    deleteCard(cardElement.dataset.id)
        .then((res) => {
            evt.target.closest('.element').remove();
        })
        .catch((err) => {
            console.log(err);
        })    
}

function updateLikes(likeCount, item, likeButton) {
    likeCount.textContent = item.likes.length;
    item.likes.forEach((elem)=>{
        if (userId == elem._id) {
            likeButton.classList.add('element__like-button_active');
        } else likeButton.classList.remove('element__like-button_active');
    })
}

function updateLikeContainer(evt, likeCount, cardElement, likeButton) {

    if (evt.target.classList.contains('element__like-button_active')){

        deleteLikeCard(cardElement.dataset.id)
        .then((res) => {
            updateLikes(likeCount, res, likeButton);
        })
        .catch((err) => {
            console.log(err);
        })
    } else {
        setLikeCard(cardElement.dataset.id)
        .then((res) => {
            updateLikes(likeCount, res, likeButton);
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export const addCard = (cardElem) => {
    cardsList.prepend(cardElem);
}

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

export const createCards = (initialCards) => {

    initialCards.forEach(function (item) {
        const cardElem = createCard(item);
        addCard(cardElem);
    });

}