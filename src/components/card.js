import {openModal, closeModal} from './utils.js';
import {initialCards, 
    imageModal,
    popupImage,
    popupCaption,
    cardsListTemplateHtml,
    cardsList} from './constants.js';

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

function deletePlaceHandler(evt) {

     evt.target.closest('.element').remove();
}

export const addCard = (cardElem) => {
    cardsList.prepend(cardElem);
}

export const createCard = (item) => {

    // считываем шаблон
    const cardsListTemplate = cardsListTemplateHtml.content;
    // копируем узел для заполнения
    const cardElement = cardsListTemplate.querySelector('.element').cloneNode(true);

    // заполняем нужные поля-свойства
    cardElement.querySelector('.element__title').textContent = item.name;
    const elementImage = cardElement.querySelector('.element__image');
    elementImage.setAttribute('src', item.link);
    elementImage.setAttribute('alt', item.name);

    // Добавим обработчик-слушатель для установки лайков
    cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
    });

    // Добавим обработчик-слушатель для удаления карточек
    cardElement.querySelector('.element__trash-button').addEventListener('click', function (evt) {
        deletePlaceHandler(evt);
    });

    // Добавим обработчик-слушатель для открытия фото в модальном окне
    cardElement.querySelector('.element__image').addEventListener('click', function (evt) {
        openImageHandler(evt);
    });

    return cardElement;
}

export const createCards = () => {

    initialCards.forEach(function (item) {
        const cardElem = createCard(item);
        addCard(cardElem);
    });

}