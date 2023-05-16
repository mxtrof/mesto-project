import './pages/index.css';
import {FormEditProfile, 
    FormAddPlace,
    enableValidationSettings,
    editProfileButton,
    addPlaceButton,
    modals,
    imageModal,
    addPlaceModal,
    editProfileModal} from './components/constants.js';
import {openAddPlaceModal,
    openProfileModal,
    closeModalClickHandler,
    editProfileFormSubmitHandler/* ,
    escCloseHandler */
} from './components/modal.js';
import {enableValidation} from './components/validate.js';
import {createCards, addPlaceFormSubmitHandler} from './components/card.js';


createCards();

// обработчики открытия модальных форм
editProfileButton.addEventListener('click', openProfileModal);
addPlaceButton.addEventListener('click', openAddPlaceModal);

// обработчики закрытия формы по клику мыши
editProfileModal.addEventListener('click', closeModalClickHandler);
addPlaceModal.addEventListener('click', closeModalClickHandler);
imageModal.addEventListener('click', closeModalClickHandler);

// обработчики сабмит модальных форм
FormAddPlace.addEventListener('submit', addPlaceFormSubmitHandler);
FormEditProfile.addEventListener('submit', editProfileFormSubmitHandler);

// вызов валидации для модальных форм
enableValidation(enableValidationSettings, FormAddPlace);
enableValidation(enableValidationSettings, FormEditProfile);