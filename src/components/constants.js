
export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error'
};

export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__avatar');

export const editProfileButton = document.querySelector('.profile__edit-button');
export const addPlaceButton = document.querySelector('.profile__add-button');
export const editAvatarButton = document.querySelector('.profile__avatar-edit');
export const modals = document.querySelectorAll('.popup');

export const imageModal = document.querySelector('.popup_type_image');
export const popupImage = imageModal.querySelector('.popup__image');
export const popupCaption = imageModal.querySelector('.popup__image-caption');

export const addPlaceModal = document.querySelector('.popup_type_addPlace');
export const editProfileModal = document.querySelector('.popup_type_editProfile');
export const editAvatarModal = document.querySelector('.popup_type_editAvatar');

export const addPlaceModalPlaceInput = addPlaceModal.querySelector('.popup__input_content_place');
export const addPlaceModalLinkInput = addPlaceModal.querySelector('.popup__input_content_link');
export const editProfileModalNameInput = editProfileModal.querySelector('.popup__input_content_name');
export const editProfileModalJobInput = editProfileModal.querySelector('.popup__input_content_description');
export const editAvatarLinkInput = editAvatarModal.querySelector('.popup__input_avatar_link');

export const formEditProfile = editProfileModal.querySelector('.popup__form-editProfile');
export const formAddPlace = addPlaceModal.querySelector('.popup__form-addPlace');
export const formEditAvatar = editAvatarModal.querySelector('.popup__form-editAvatar');

export const cardsList = document.querySelector('.elements__list');
export const cardsListTemplateHtml = document.querySelector('#cardsListTemplate');