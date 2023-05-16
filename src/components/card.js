import {openModal, closeModal} from './modal.js';
import {initialCards, 
    imageModal,
    popupImage,
    popupCaption,
    addPlaceModal,
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

export const addPlaceFormSubmitHandler = (evt) => {
    evt.preventDefault();

    const placeInput = addPlaceModal.querySelector('.popup__input_content_place').value;
    const linkInput = addPlaceModal.querySelector('.popup__input_content_link').value;

    if (placeInput !== '' && linkInput !== '') {
        const dataCard = { name: placeInput, link: linkInput };
        // создадим карточку
        const cardElem = createCard(dataCard);
        addCard(cardElem);
        // закрыть модальное окно
        closeModal(addPlaceModal);
        // очистим поля формы
        addPlaceModal.querySelector('.popup__form').reset();
    }
}

function deletePlaceHandler(evt) {

     evt.target.closest('.element').remove();
}

function addCard(cardElem) {
    cardsList.prepend(cardElem);
}

function createCard(item) {

    // считываем шаблон
    const cardsListTemplate = document.querySelector('#cardsListTemplate').content;
    // копируем узел для заполнения
    const cardElement = cardsListTemplate.querySelector('.element').cloneNode(true);

    // заполняем нужные поля-свойства
    cardElement.querySelector('.element__title').textContent = item.name;
    let elementImage = cardElement.querySelector('.element__image');
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