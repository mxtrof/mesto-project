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
    addPlaceModal,
    editProfileModal,
    editAvatarModal
} from './components/constants.js';

import { closeModalClickHandler, closeModal, openModal } from './components/modal.js';

import { enableValidation, toggleButtonState, getFormElements } from './components/validate.js';
import { addCard, createCard, createCards } from './components/card.js';
import { getUserInfo, getInitialCards, addNewCard, setUserInfo, changeAvatar } from './components/api';

export let userId = "";

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
    addNewCard(dataCard)
        .then((res) => {
            // создадим карточку
            const cardElem = createCard(res);
            addCard(cardElem);

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

    setUserInfo(dataUser)
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

    changeAvatar(datLink)
        .then((res) => {
            updateAvatar(res);
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
    openModal(addPlaceModal);

    // определение состояния кнопки на форме после открытия
    const formElements = getFormElements(validationSettings, formAddPlace);
    toggleButtonState(validationSettings, formElements.inputList, formElements.buttonElement);
}

const openProfileModal = () => {

    editProfileModalNameInput.value = profileName.textContent;
    editProfileModalJobInput.value = profileDescription.textContent;
    openModal(editProfileModal);

    // определение состояния кнопки на форме после открытия
    const formElements = getFormElements(validationSettings, formEditProfile);
    toggleButtonState(validationSettings, formElements.inputList, formElements.buttonElement);
}

const openEditAvatarModal = () => {
    openModal(editAvatarModal);

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
editProfileModal.addEventListener('click', closeModalClickHandler);
addPlaceModal.addEventListener('click', closeModalClickHandler);
imageModal.addEventListener('click', closeModalClickHandler);
editAvatarModal.addEventListener('click', closeModalClickHandler);

// обработчики сабмит модальных форм
formAddPlace.addEventListener('submit', addPlaceFormSubmitHandler);
formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);
formEditAvatar.addEventListener('submit', editAvatarFormSubmitHandler);

// вызов валидации для модальных форм
enableValidation(validationSettings, formAddPlace);
enableValidation(validationSettings, formEditProfile);
enableValidation(validationSettings, formEditAvatar);

Promise.all([getUserInfo(), getInitialCards()])
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
    });