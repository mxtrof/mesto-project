import {
    profileName,
    profileDescription,
    addPlaceModal,
    editProfileModal} from './constants.js';

export const openModal = (modal) => {
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', escCloseHandler(modal));
}

export const closeModal = (elem) => {
    elem.classList.remove('popup_opened');
    document.removeEventListener('keydown', escCloseHandler(elem));
}

export const openAddPlaceModal = () => {
    openModal(addPlaceModal);
}

export const openProfileModal = () => {
    
    openModal(editProfileModal);
    editProfileModal.querySelector('.popup__input_content_name').value = profileName.textContent;
    editProfileModal.querySelector('.popup__input_content_description').value = profileDescription.textContent;
}

export const closeModalClickHandler = (evt) => {
    // проверим, что элемент, на который кликнули содердит класс модал-клоус 
    if ((evt.target.classList.contains('modal-close')) || (evt.target === evt.currentTarget)) {
        closeModal(evt.target.closest('.popup'));
    }
}

export const editProfileFormSubmitHandler = (evt) => {
    evt.preventDefault();

    const nameInput = editProfileModal.querySelector('.popup__input_content_name').value;
    const jobInput = editProfileModal.querySelector('.popup__input_content_description').value;

    if (nameInput !== '' && jobInput !== '') {
        profileName.textContent = nameInput;
        profileDescription.textContent = jobInput;

        closeModal(editProfileModal);
    }
}

export const escCloseHandler = (evt, popupElem) => {
    if (evt.key === 'Escape') {
        closeModal(popupElem);
    }
}