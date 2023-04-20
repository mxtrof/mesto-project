
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const modals = document.querySelectorAll('.popup');

const imageModal = document.querySelector('.popup_type_image');
const popupImage = imageModal.querySelector('.popup__image');
const popupCaption = imageModal.querySelector('.popup__image-caption');

const addPlaceModal = document.querySelector('.popup_type_addPlace');
const editProfileModal = document.querySelector('.popup_type_editProfile');
const submitFormEditProfile = editProfileModal.querySelector('.popup__form-editProfile');
const submitFormAddPlace = addPlaceModal.querySelector('.popup__form-addPlace');

const cardsList = document.querySelector('.elements__list');

function openModal(modal) {
    modal.classList.add('popup_opened');
}

function openAddPlaceModal() {
    openModal(addPlaceModal);
}

function openProfileModal() {
    
    openModal(editProfileModal);
    editProfileModal.querySelector('.popup__input_content_name').value = profileName.textContent;
    editProfileModal.querySelector('.popup__input_content_description').value = profileDescription.textContent;
}

function openImageHandler(evt) {

    // получим параметры картинки
    const elemImage = evt.target.closest('.element__image');
    const link = elemImage.getAttribute('src');
    const place = elemImage.getAttribute('alt');;
   
    // заполним элементы
    popupImage.src = link;
    popupImage.alt = place;
    popupCaption.textContent = place;
    
    // откроем окно
    openModal(imageModal);
}

function closeModal(elem) {
    elem.classList.remove('popup_opened');
}

function closeModalClickHandler(evt) {
    // проверим, что элемент, на который кликнули содердит класс модал-клоус 
    if (evt.target.classList.contains('modal-close')) {
        closeModal(evt.target.closest('.popup'));
    }
}

function editProfileFormSubmitHandler(evt) {
    evt.preventDefault();

    const nameInput = editProfileModal.querySelector('.popup__input_content_name').value;
    const jobInput = editProfileModal.querySelector('.popup__input_content_description').value;

    if (nameInput !== '' && jobInput !== '') {
        profileName.textContent = nameInput;
        profileDescription.textContent = jobInput;

        closeModal(editProfileModal);
    }
}

function addPlaceFormSubmitHandler(evt) {
    evt.preventDefault();

    const placeInput = addPlaceModal.querySelector('.popup__input_content_place').value;
    const linkInput = addPlaceModal.querySelector('.popup__input_content_link').value;

    if (placeInput !== '' && linkInput !== '') {
        const dataCard = { name: placeInput, link: linkInput };
        // создадим карточку
        cardElem = createCard(dataCard);
        addCard(cardElem);
        // закрыть модальное окно
        closeModal(addPlaceModal);
        // очистим поля формы
        addPlaceModal.querySelector('.popup__form').reset();
    }
}

function deletePlaceHandler(evt) {

     evt.target.closest('.element').remove();
}

function addCard(cardElem) {
    cardsList.prepend(cardElem);
}

function createCard(item) {

    // считываем шаблон
    const cardsListTemplate = document.querySelector('#cardsListTemplate').content;
    // копируем узел для заполнения
    const cardElement = cardsListTemplate.querySelector('.element').cloneNode(true);

    // заполняем нужные поля-свойства
    cardElement.querySelector('.element__title').textContent = item.name;
    let elementImage = cardElement.querySelector('.element__image');
    elementImage.setAttribute('src', item.link);
    elementImage.setAttribute('alt', item.name);

    // Добавим обработчик-слушатель для установки лайков
    cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
    });

    // Добавим обработчик-слушатель для удаления карточек
    cardElement.querySelector('.element__trash-button').addEventListener('click', function (evt) {
        deletePlaceHandler(evt);
    });

    // Добавим обработчик-слушатель для открытия фото в модальном окне
    cardElement.querySelector('.element__image').addEventListener('click', function (evt) {
        openImageHandler(evt);
    });

    return cardElement;
    /* // отображаем на странице
    cardsList.prepend(cardElement); */
}

function createCards() {

    initialCards.forEach(function (item) {
        cardElem = createCard(item);
        addCard(cardElem);
    });

}

createCards();

editProfileButton.addEventListener('click', openProfileModal);
addPlaceButton.addEventListener('click', openAddPlaceModal);

modals.forEach(function (modal) {
    modal.addEventListener('click', function (evt) {
        closeModalClickHandler(evt);
    })
})

submitFormAddPlace.addEventListener('submit', addPlaceFormSubmitHandler);
submitFormEditProfile.addEventListener('submit', editProfileFormSubmitHandler);
