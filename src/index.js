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

import { Popup } from './components/Popup.js';

import  {FormValidator}  from './components/FormValidator.js';
/* import { addCard, createCard, createCards } from './components/card.js'; */
/* import { getUserInfo, getInitialCards, addNewCard, setUserInfo, changeAvatar } from './components/api'; */
import { Api } from './components/api.js';
import { Card } from './components/card.js';
import { Section } from './components/section.js';
import { PopupWithImage } from './components/popupWithImage.js';
import { UserInfo } from './components/UserInfo.js';
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

// // МЕТОДЫ КЛАССА FormValidator

elementsFormValidation.enableValidation();
profileFormValidation.enableValidation();
profileAvatarValidation.enableValidation();
const  userInfo = new UserInfo({name:'.profile__name', about:'.profile__description'})


// вызываем основные методы класса Api для отображения данных на странице при первом входе
// 
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([data, cardsData]) => {
        userId = data._id;
        userInfo.setUserInfo(data)
        userInfo.setUserAvatar(data)
        // updateAvatar(userData.avatar);
        // выведем считанные карточки
        cardsData.reverse();

        createNewSection(cardsData).renderItems();
    })
    .catch((err) => {
        console.log(err);
    });



// // также сразу вызвал методы, относящиеся к Api addNewCard, setUserInfo, changeAvatar (через объект api)

// // далее создадим функцию, которая будет создавать объект класса Card и возвращать созданную карточку по шаблону 
// // по заданию должен быть один метод класса, который возвращает готовую карточку
const createNewCard = (data) => {
    const card = new Card(
        data,
        () => popupImage.openModal(data.link, data.name), // тут вызываем стрелочную функцию, чтобы передать как параметр вызов метода openModal для слушателя
        api,
        userId,
        '#cardsListTemplate');

    return card.createCard();
};

// // по условия задачи "Экземпляр класса Section создается для каждого контейнера, в который требуется отрисовывать элементы"
// // поэтому сразу создадим функцию, которая будет это делать
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

// // объявляем экземпляр класса PopupWithImage, чтобы активировать конструктор и подготовить все элементы дл яотображения
const popupImage = new PopupWithImage(
    '.popup_type_image',
    '.popup__image',
    '.popup__image-caption');
// 

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
            modalClassAddPlace.closeModal();

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


function editAvatarFormSubmitHandler(evt) {
    evt.preventDefault();

    const datLink = { avatar: editAvatarLinkInput.value };

    updateLoadingText(true, formEditAvatar, validationSettings);

    api.changeAvatar(datLink)
        .then((res) => {
            updateAvatar(res.avatar);
            formEditAvatar.reset();
            modalClassEditAvatar.closeModal();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            updateLoadingText(false, formEditAvatar, validationSettings);
        })
}

const openAddPlaceModal = () => {
    modalClassAddPlace.openModal()

    // определение состояния кнопки на форме после открытия
    elementsFormValidation.cleanInputErrorValidation()
}

const openProfileModal = () => {
    editProfileModalNameInput.value = profileName.textContent;
    editProfileModalJobInput.value = profileDescription.textContent;
    modalClassEditProfile.openModal()
    

    // определение состояния кнопки на форме после открытия
    profileFormValidation.cleanInputErrorValidation();
 
}

const openEditAvatarModal = () => {
    modalClassEditAvatar.openModal()

    // определение состояния кнопки на форме после открытия
    profileAvatarValidation.cleanInputErrorValidation()
}

// function updateAvatar(link) {
//     profileAvatar.src = link;
// }

// // обработчики открытия модальных форм
editProfileButton.addEventListener('click', openProfileModal);
addPlaceButton.addEventListener('click', openAddPlaceModal);
editAvatarButton.addEventListener('click', openEditAvatarModal);



// ЭКЗЕМПЛЯРЫ КЛАССА PopupWithForm (Profile)

const popupFormProfile = new PopupWithForm({
  popupSelector: '.popup_type_editProfile',
  handleFormSubmit: (data) => {
    popupFormProfile.renderLoading(false);
    console.log(data)
    api.setUserInfo(data)
      .then((res) => {
        //  profileName.textContent = res.name;
        //     profileDescription.textContent = res.about;
        // console.log(res)
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

// // ЭКЗЕМПЛЯРЫ КЛАССА PopupWithForm (Elements)

// const popupFormElements = new PopupWithForm({
//   popupSelector: '.popup_type_elements',
//   handleFormSubmit: (data) => {
//     popupFormElements.renderLoading(false);
//     api.postCard(data)
//       .then((res) => {
//         cardList.setItem(createCard(res), true);
//       })
//       .catch((err) => {
//         console.error(err);
//       })
//       .finally(() => {
//         popupFormElements.renderLoading(true);
//     })
//   }
// })

// // МЕТОДЫ КЛАССА PopupWithForm 

// popupFormElements.setEventListeners();

// // ЭКЗЕМПЛЯРЫ КЛАССА PopupWithForm (Avatar)

// const popupFormAvatar = new PopupWithForm({
//   popupSelector: '.popup_type_avatar',
//   handleFormSubmit: (data) => {
//     popupFormAvatar.renderLoading(false);
//     api.patchUserAvatar(data)
//       .then((res) => {
//         userInfo.setUserAvatar(res);
//       })
//       .catch((err) => {
//       console.error(err);
//       })
//       .finally(() => {
//       popupFormAvatar.renderLoading(true);
//     })
//   }
// })

// // МЕТОДЫ КЛАССА PopupWithForm (Avatar)

// popupFormAvatar.setEventListeners();

























// Promise.all([api.getUserInfo(), api.getInitialCards()])
//     .then(([userData, cardsData]) => {
//         // установим пользовательские данные
//         userId = userData._id;
//         // profileName.textContent = userData.name;
//         // profileDescription.textContent = userData.about;
//         userInfo.setUserInfo(res)
//         userInfo.setUserAvatar(res)
//         // updateAvatar(userData.avatar);
//         // выведем считанные карточки
//         cardsData.reverse();

//         createNewSection(cardsData).renderItems();
//         /*         createCards({
//                     initialCards: cardsData, 
//                     api: api,
//                     userId: userId,
//                     template: '#cardsListTemplate'}) */

//     })
//     .catch((err) => {
//         console.log(err);
//     });












// /* Promise.all([getUserInfo(), getInitialCards()])
//     .then(([userData, cardsData]) => {
//         // установим пользовательские данные
//         userId = userData._id;
//         profileName.textContent = userData.name;
//         profileDescription.textContent = userData.about;
//         updateAvatar(userData.avatar);
//         // выведем считанные карточки
//         cardsData.reverse();
//         createCards(cardsData);
//     })
//     .catch((err) => {
//         console.log(err);
//     }); */


// const updateLoadingText = (process, formElement, validationSettings) => {

    //     const formElements = getFormElements(validationSettings, formElement);
    
    //     if (process) {
    //         formElements.buttonElement.textContent = 'Сохранение...';
    //     } else {
    //         formElements.buttonElement.textContent = 'Сохранить';
    //     }
    // }


    // const editProfileFormSubmitHandler = (evt) => {
//     evt.preventDefault();
    
//     const nameInput = editProfileModalNameInput.value;
//     const jobInput = editProfileModalJobInput.value;
//     const dataUser = { name: nameInput, about: jobInput };

//     updateLoadingText(true, formEditProfile, validationSettings);

//     api.setUserInfo(dataUser)
//         .then((res) => {
//             // обновим данные профиля
//             // profileName.textContent = res.name;
//             // profileDescription.textContent = res.about;
//             userInfo.setUserInfo(res)

//             modalClassEditProfile.closeModal();
//         })
//         .catch((err) => {
//             console.log(err);
//         })
//         .finally(() => {
//             updateLoadingText(false, formEditProfile, validationSettings);
//         })
// }

// // обработчики закрытия формы по клику мыши
// // editProfileModal.addEventListener('click', closeModalClickHandler);   /// мы в классе Popup добавляем слушатель для закрытия 
// // addPlaceModal.addEventListener('click', closeModalClickHandler);      /// поэтому эти слушатели не нужны 
// // imageModal.addEventListener('click', closeModalClickHandler);
// // editAvatarModal.addEventListener('click', closeModalClickHandler);

// // обработчики сабмит модальных форм
// formAddPlace.addEventListener('submit', addPlaceFormSubmitHandler);
// // formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);
// formEditAvatar.addEventListener('submit', editAvatarFormSubmitHandler);
// // new PopupWithForm('.popup_type_editProfile', editProfileFormSubmitHandler, formEditProfile)
// // new PopupWithForm('.popup_type_editProfile', editProfileFormSubmitHandler, formEditProfile).setEventListeners()