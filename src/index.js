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

import {Popup} from './components/Popup.js';

import { enableValidation, toggleButtonState, getFormElements } from './components/validate.js';
import { addCard, createCard, createCards } from './components/card.js';
/* import { getUserInfo, getInitialCards, addNewCard, setUserInfo, changeAvatar } from './components/api'; */
import { Api } from './components/api.js';
import { Card } from './components/card.js';

export let userId = "";

// создаем объект класса Api
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/plus-cohort-24',
    headers: {
        authorization: 'd8022b50-8c1c-4a15-ba76-94ce65b1ce67',
        'Content-Type': 'application/json'
    }
})
const modalClassMesto = new Popup('.popup_type_addPlace');
const modalClassProfil = new Popup('.popup_type_editProfile');
const modalClassAvatar = new Popup('.popup_type_editAvatar');

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
        /* createCards(cardsData); */
        // ВРЕМЕННЫЙ КОСТЫЛЬ пока не напишем класс Section
        createCards({
            initialCards: cardsData, 
            api: api,
            userId: userId,
            template: '#cardsListTemplate'})
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

// class UserInfo {
//     contructor({nameSelector, jobSelector}){
//         this._name = nameSelector;
//         this._about = jobSelector
//     }   
//     getUserInfo(){
//         return{ name: this._name, about: this._about };
//     }

// }
// console.log(new UserInfo({name:editProfileModalNameInput.value, about:editProfileModalJobInput.value}).getUserInfo())
// const editProfileFormSubmitHandler = (evt) => {
//     evt.preventDefault();

//     // const nameInput = editProfileModalNameInput.value;
//     // const jobInput = editProfileModalJobInput.value;

//     const dataUser = new UserInfo({name: editProfileModalNameInput.value, about: editProfileModalJobInput.value}).getUserInfo();

//     updateLoadingText(true, formEditProfile, validationSettings);

//     api.setUserInfo(dataUser)
//         .then((res) => {
//             // обновим данные профиля
//             profileName.textContent = res.name;
//             profileDescription.textContent = res.about;

//             closeModal(editProfileModal);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
//         .finally(() => {
//             updateLoadingText(false, formEditProfile, validationSettings);
//         })
// }

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
    modalClassMesto.openModal()

    // определение состояния кнопки на форме после открытия
    const formElements = getFormElements(validationSettings, formAddPlace);
    toggleButtonState(validationSettings, formElements.inputList, formElements.buttonElement);
}

const openProfileModal = () => {

    editProfileModalNameInput.value = profileName.textContent;
    editProfileModalJobInput.value = profileDescription.textContent;
    modalClassProfil.openModal()

    // определение состояния кнопки на форме после открытия
    const formElements = getFormElements(validationSettings, formEditProfile);
    toggleButtonState(validationSettings, formElements.inputList, formElements.buttonElement);
}

const openEditAvatarModal = () => {
    modalClassAvatar.openModal()

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
// formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);
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

    
   