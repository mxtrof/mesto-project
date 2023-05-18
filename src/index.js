import './pages/index.css';
import {
    formEditProfile,
    formAddPlace,
    profileName,
    profileDescription,
    validationSettings,
    editProfileButton,
    addPlaceButton,
    addPlaceModalPlaceInput,
    addPlaceModalLinkInput,
    editProfileModalNameInput,
    editProfileModalJobInput,
    imageModal,
    addPlaceModal,
    editProfileModal
} from './components/constants.js';

import {
    openAddPlaceModal,
    openProfileModal,
    closeModalClickHandler
} from './components/modal.js';

import { enableValidation, toggleButtonState, getFormElements} from './components/validate.js';
import { addCard, createCard, createCards } from './components/card.js';
import { closeModal } from './components/utils.js';

const addPlaceFormSubmitHandler = (evt) => {
    
    evt.preventDefault();

    const placeInput = addPlaceModalPlaceInput.value;
    const linkInput = addPlaceModalLinkInput.value;

    const dataCard = { name: placeInput, link: linkInput };
    // создадим карточку
    const cardElem = createCard(dataCard);
    addCard(cardElem);

    // закрыть модальное окно
    closeModal(addPlaceModal);

    // очистим поля формы
    formAddPlace.reset();
}

const editProfileFormSubmitHandler = (evt) => {
    evt.preventDefault();

    const nameInput = editProfileModalNameInput.value;
    const jobInput = editProfileModalJobInput.value;

    profileName.textContent = nameInput;
    profileDescription.textContent = jobInput;

    closeModal(editProfileModal);
}

createCards();

// обработчики открытия модальных форм
editProfileButton.addEventListener('click', openProfileModal);
addPlaceButton.addEventListener('click', openAddPlaceModal);

// обработчики закрытия формы по клику мыши
editProfileModal.addEventListener('click', closeModalClickHandler);
addPlaceModal.addEventListener('click', closeModalClickHandler);
imageModal.addEventListener('click', closeModalClickHandler);

// обработчики сабмит модальных форм
formAddPlace.addEventListener('submit', addPlaceFormSubmitHandler);
formEditProfile.addEventListener('submit', editProfileFormSubmitHandler);

// вызов валидации для модальных форм
enableValidation(validationSettings, formAddPlace);
enableValidation(validationSettings, formEditProfile);