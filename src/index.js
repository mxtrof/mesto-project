import './pages/index.css';
import {
    formEditProfile,
    formAddPlace,
    formEditAvatar,
    profileName,
    profileDescription,
    profileAvatar,
    validationSettings,
    editProfileButton,
    editAvatarButton,
    addPlaceButton,
    addPlaceModalPlaceInput,
    addPlaceModalLinkInput,
    editProfileModalNameInput,
    editProfileModalJobInput,
    editAvatarLinkInput,
    imageModal,
    cardsList,
    addPlaceModal,
    editProfileModal,
    editAvatarModal
} from './components/constants.js';

import { Popup } from './components/modal.js';

import { enableValidation, toggleButtonState, getFormElements } from './components/validate.js';
/* import { addCard, createCard, createCards } from './components/card.js'; */
/* import { getUserInfo, getInitialCards, addNewCard, setUserInfo, changeAvatar } from './components/api'; */
import { Api } from './components/api.js';
import { Card } from './components/card.js';
import { Section } from './components/section.js';

export let userId = "";

// создаем объект класса Api
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/plus-cohort-24',
    headers: {
        authorization: 'd8022b50-8c1c-4a15-ba76-94ce65b1ce67',
        'Content-Type': 'application/json'
    }
})


// вызываем основные методы класса Api для отображения данных на странице при первом входе
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
        // установим пользовательские данные
        userId = userData._id;
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        updateAvatar(userData.avatar);
        // выведем считанные карточки
        cardsData.reverse();

        createNewSection(cardsData).renderItems();
        /*         createCards({
                    initialCards: cardsData, 
                    api: api,
                    userId: userId,
                    template: '#cardsListTemplate'}) */

    })
    .catch((err) => {
        console.log(err);
    });

// также сразу вызвал методы, относящиеся к Api addNewCard, setUserInfo, changeAvatar (через объект api)

// далее создадим функцию, которая будет создавать объект класса Card и возвращать созданную карточку по шаблону 
// по заданию должен быть один метод класса, который возвращает готовую карточку
const createNewCard = (data) => {
    const card = new Card(
        data,
        api,
        userId,
        '#cardsListTemplate');

    return card.createCard();
};

// по условия задачи "Экземпляр класса Section создается для каждого контейнера, в который требуется отрисовывать элементы"
// поэтому сразу создадим функцию, которая будет это делать
const createNewSection = (data) => {
    const sectionCards = new Section({
        items: data,
        renderer: (item) => {
            sectionCards.addItem(createNewCard(item));
        },
    },
        cardsList
    );
    return sectionCards;
}





const updateLoadingText = (process, formElement, validationSettings) => {

    const formElements = getFormElements(validationSettings, formElement);

    if (process) {
        formElements.buttonElement.textContent = 'Сохранение...';
    } else {
        formElements.buttonElement.textContent = 'Сохранить';
    }
}

const addPlaceFormSubmitHandler = (evt) => {

    evt.preventDefault();

    const placeInput = addPlaceModalPlaceInput.value;
    const linkInput = addPlaceModalLinkInput.value;

    const dataCard = { name: placeInput, link: linkInput };

    updateLoadingText(true, formAddPlace, validationSettings);

    // запишем данные на сервере и полученную инфу отразив с списке
    api.addNewCard(dataCard)
        .then((res) => {
            // создадим карточку
            const cardElem = createNewCard(res);

            /* addCard(cardElem); */
            createNewSection().addItem(cardElem);

            // закрыть модальное окно
            closeModal(addPlaceModal);

            // очистим поля формы
            formAddPlace.reset();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            updateLoadingText(false, formAddPlace, validationSettings);
        })
}

const editProfileFormSubmitHandler = (evt) => {
    evt.preventDefault();

    const nameInput = editProfileModalNameInput.value;
    const jobInput = editProfileModalJobInput.value;

    const dataUser = { name: nameInput, about: jobInput };

    updateLoadingText(true, formEditProfile, validationSettings);

    api.setUserInfo(dataUser)
        .then((res) => {
            // обновим данные профиля
            profileName.textContent = res.name;
            profileDescription.textContent = res.about;

            closeModal(editProfileModal);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            updateLoadingText(false, formEditProfile, validationSettings);
        })
}

function editAvatarFormSubmitHandler(evt) {
    evt.preventDefault();

    const datLink = { avatar: editAvatarLinkInput.value };

    updateLoadingText(true, formEditAvatar, validationSettings);

    api.changeAvatar(datLink)
        .then((res) => {
            updateAvatar(res.avatar);
            formEditAvatar.reset();
            closeModal(editAvatarModal);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            updateLoadingText(false, formEditAvatar, validationSettings);
        })
}

const openAddPlaceModal = () => {
    new Popup('.popup_type_addPlace').openModal()

    // определение состояния кнопки на форме после открытия
    const formElements = getFormElements(validationSettings, formAddPlace);
    toggleButtonState(validationSettings, formElements.inputList, formElements.buttonElement);
}

const openProfileModal = () => {

    editProfileModalNameInput.value = profileName.textContent;
    editProfileModalJobInput.value = profileDescription.textContent;
    new Popup('.popup_type_editProfile').openModal()

    // определение состояния кнопки на форме после открытия
    const formElements = getFormElements(validationSettings, formEditProfile);
    toggleButtonState(validationSettings, formElements.inputList, formElements.buttonElement);
}

const openEditAvatarModal = () => {
    new Popup('.popup_type_editAvatar').openModal()

    // определение состояния кнопки на форме после открытия
    const formElements = getFormElements(validationSettings, editAvatarModal);
    toggleButtonState(validationSettings, formElements.inputList, formElements.buttonElement);
}

function updateAvatar(link) {
    profileAvatar.src = link;
}

// обработчики открытия модальных форм
editProfileButton.addEventListener('click', openProfileModal);
addPlaceButton.addEventListener('click', openAddPlaceModal);
editAvatarButton.addEventListener('click', openEditAvatarModal);

// обработчики закрытия формы по клику мыши
// editProfileModal.addEventListener('click', closeModalClickHandler);   /// мы в классе Popup добавляем слушатель для закрытия 
// addPlaceModal.addEventListener('click', closeModalClickHandler);      /// поэтому эти слушатели не нужны 
// imageModal.addEventListener('click', closeModalClickHandler);
// editAvatarModal.addEventListener('click', closeModalClickHandler);

// обработчики сабмит модальных форм
formAddPlace.addEventListener('submit', addPlaceFormSubmitHandler);
formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);
formEditAvatar.addEventListener('submit', editAvatarFormSubmitHandler);

// вызов валидации для модальных форм
enableValidation(validationSettings, formAddPlace);
enableValidation(validationSettings, formEditProfile);
enableValidation(validationSettings, formEditAvatar);

/* Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cardsData]) => {
        // установим пользовательские данные
        userId = userData._id;
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        updateAvatar(userData.avatar);
        // выведем считанные карточки
        cardsData.reverse();
        createCards(cardsData);
    })
    .catch((err) => {
        console.log(err);
    }); */


