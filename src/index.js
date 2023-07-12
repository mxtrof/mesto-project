import './pages/index.css';
import {
    formEditProfile,
    formAddPlace,
    formEditAvatar,
    profileName,
    profileDescription,
    profileAvatar,
    config,
    editProfileButton,
    editAvatarButton,
    addPlaceButton,
    editProfileModalNameInput,
    editProfileModalJobInput,
    cardsList
} from './components/constants.js';

import { Popup } from './components/Popup.js';

import  {FormValidator}  from './components/FormValidator.js';
import { Api } from './components/api.js';
import { Card } from './components/card.js';
import { Section } from './components/section.js';
import { PopupWithImage } from './components/popupWithImage.js';
import { UserInfo } from './components/userInfo.js';
import { PopupWithForm } from './components/popupWithForm';

export let userId = "";

// создаем объект класса Api
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/plus-cohort-24',
    headers: {
        authorization: 'd8022b50-8c1c-4a15-ba76-94ce65b1ce67',
        'Content-Type': 'application/json'
    }
})
const modalClassEditProfile = new Popup('.popup_type_editProfile')
const modalClassAddPlace = new Popup('.popup_type_addPlace')
const modalClassEditAvatar = new Popup('.popup_type_editAvatar')

//ЭКЗЕМПЛЯРЫ КЛАССА FormValidator

const elementsFormValidation = new FormValidator(config, formAddPlace);
const profileFormValidation = new FormValidator(config, formEditProfile);
const profileAvatarValidation = new FormValidator(config, formEditAvatar);

// МЕТОДЫ КЛАССА FormValidator

elementsFormValidation.enableValidation();
profileFormValidation.enableValidation();
profileAvatarValidation.enableValidation();

//ЭКЗЕМПЛЯР КЛАССА UserInfo

const userInfo = new UserInfo({
    userName: profileName,
    userDescription: profileDescription,
    userAvatar: profileAvatar
  });

// вызываем основные методы класса Api для отображения данных на странице при первом входе
// 
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([dataUser, cardsData]) => {
        userId = dataUser._id;
        userInfo.setUserInfo(dataUser)
        userInfo.setUserAvatar(dataUser)
        
        // выведем считанные карточки
        cardsData.reverse();
        createNewSection(cardsData).renderItems();
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
        () => popupImage.openModal(data.link, data.name), // тут вызываем стрелочную функцию, чтобы передать как параметр вызов метода openModal для слушателя
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

// объявляем экземпляр класса PopupWithImage, чтобы активировать конструктор и подготовить все элементы дл яотображения
const popupImage = new PopupWithImage(
    '.popup_type_image',
    '.popup__image',
    '.popup__image-caption');

const openAddPlaceModal = () => {
    modalClassAddPlace.openModal()
    // определение состояния кнопки на форме после открытия
    elementsFormValidation.cleanInputErrorValidation()
}

const openProfileModal = () => {

    const userInformation = userInfo.getUserInfo();
    editProfileModalNameInput.value = userInformation.userName;
    editProfileModalJobInput.value = userInformation.userDescription;

    modalClassEditProfile.openModal()

    // определение состояния кнопки на форме после открытия
    profileFormValidation.cleanInputErrorValidation();
}

const openEditAvatarModal = () => {
    modalClassEditAvatar.openModal()

    // определение состояния кнопки на форме после открытия
    profileAvatarValidation.cleanInputErrorValidation()
}

// // обработчики открытия модальных форм
editProfileButton.addEventListener('click', openProfileModal);
addPlaceButton.addEventListener('click', openAddPlaceModal);
editAvatarButton.addEventListener('click', openEditAvatarModal);


// ЭКЗЕМПЛЯРЫ КЛАССА PopupWithForm (editProfile)

const popupFormProfile = new PopupWithForm({
  popupSelector: '.popup_type_editProfile',
  handleFormSubmit: (data) => {
    popupFormProfile.renderLoading(false);

    api.setUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res)
      })
      .catch((err) => {
      console.error(err);
      })
      .finally(() => {
       popupFormProfile.renderLoading(true);
    })
  }
})

// МЕТОДЫ КЛАССА PopupWithForm 

popupFormProfile.setEventListeners();

// ЭКЗЕМПЛЯРЫ КЛАССА PopupWithForm (addPlace)

const popupFormAddPlace = new PopupWithForm({
  popupSelector: '.popup_type_addPlace',
  handleFormSubmit: (data) => {
    popupFormAddPlace.renderLoading(false);
    api.addNewCard(data)
      .then((res) => {
        const cardElem = createNewCard(res);
        createNewSection().addItem(cardElem);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        popupFormAddPlace.renderLoading(true);
    })
  }
})

// МЕТОДЫ КЛАССА PopupWithForm 

popupFormAddPlace.setEventListeners();

// ЭКЗЕМПЛЯРЫ КЛАССА PopupWithForm (Avatar)

const popupFormAvatar = new PopupWithForm({
  popupSelector: '.popup_type_editAvatar',
  handleFormSubmit: (data) => {
    popupFormAvatar.renderLoading(false);
    api.changeAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res);
      })
      .catch((err) => {
      console.error(err);
      })
      .finally(() => {
      popupFormAvatar.renderLoading(true);
    })
  }
})

// МЕТОДЫ КЛАССА PopupWithForm (Avatar)

popupFormAvatar.setEventListeners();