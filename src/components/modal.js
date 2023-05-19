const closeByEsc = (evt) => {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector('.popup_opened');
      closeModal(openedPopup); 
    }
}

export const openModal = (modal) => {
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

export const closeModal = (elem) => {
    elem.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

export const closeModalClickHandler = (evt) => {
    // проверим, что элемент, на который кликнули содердит класс модал-клоус 
    if ((evt.target.classList.contains('modal-close')) || (evt.target === evt.currentTarget)) {
        closeModal(evt.currentTarget);
    }
}
