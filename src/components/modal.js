import {
    profileName,
    formAddPlace,
    formEditProfile,
    profileDescription,
    validationSettings,
    addPlaceModal,
    editProfileModal} from './constants.js';
import {openModal, closeModal} from './utils.js';
import { enableValidation, toggleButtonState, getFormElements} from './validate.js';

export const openAddPlaceModal = () => {
    openModal(addPlaceModal);
    
    // определение состояния кнопки на форме после открытия
    const formElements = getFormElements(validationSettings, formAddPlace);
    toggleButtonState(validationSettings, formElements.inputList, formElements.buttonElement);
}

export const openProfileModal = () => {
    
    editProfileModal.querySelector('.popup__input_content_name').value = profileName.textContent;
    editProfileModal.querySelector('.popup__input_content_description').value = profileDescription.textContent;
    openModal(editProfileModal);

    // определение состояния кнопки на форме после открытия
    const formElements = getFormElements(validationSettings, formEditProfile);
    toggleButtonState(validationSettings, formElements.inputList, formElements.buttonElement);
}

export const closeModalClickHandler = (evt) => {
    // проверим, что элемент, на который кликнули содердит класс модал-клоус 
    if ((evt.target.classList.contains('modal-close')) || (evt.target === evt.currentTarget)) {
        closeModal(evt.currentTarget);
    }
}
