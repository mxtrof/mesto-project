
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

const modalButtons = document.querySelectorAll('.modal-open');
const submitButtons = document.querySelectorAll('.modal-submit');
const modals = document.querySelectorAll('.popup');


function openModal(elem) {
    elem.classList.add('popup_opened');

    if (elem.dataset.modal == 'modal_editProfile') {
        elem.querySelector('.popup__input_content_name').value = profileName.textContent;
        elem.querySelector('.popup__input_content_description').value = profileDescription.textContent;
    }
}

function openImageHandler(evt) {

    // получим параметры картинки
    const elemImage = evt.target.closest('.element__image');
    const link = elemImage.getAttribute('src');
    const place = elemImage.getAttribute('alt');;
   
    // заполним элементы
    const imageModal = document.querySelector('.popup_type_image');

    const popupImage = imageModal.querySelector('.popup__image');
    const popupCaption = imageModal.querySelector('.popup__image-caption');
    popupImage.setAttribute('src', link);
    popupImage.setAttribute('alt', place);
    popupCaption.textContent = place;
    
    // откроем окно
    imageModal.classList.add('popup_opened');
}

function closeModal(evt) {
    // проверим, что элемент, на который кликнули содердит класс модал-клос 
    // или (если это картинка на кнопке), то ближайший родитель содержит данный класс
    if (evt.target.classList.contains('.modal-close') || evt.target.closest('.modal-close')) {
        evt.target.closest('.popup').classList.remove('popup_opened');
    }
}

function editProfileFormSubmitHandler(evt, modal) {
    evt.preventDefault();

    const nameInput = modal.querySelector('.popup__input_content_name').value;
    const jobInput = modal.querySelector('.popup__input_content_description').value;

    if (nameInput !== '' && jobInput !== '') {
        profileName.textContent = nameInput;
        profileDescription.textContent = jobInput;

        modal.classList.remove('popup_opened');
    }

}

function addPlaceFormSubmitHandler(evt, modal) {
    evt.preventDefault();

    const placeInput = modal.querySelector('.popup__input_content_place').value;
    const linkInput = modal.querySelector('.popup__input_content_link').value;

    if (placeInput !== '' && linkInput !== '') {
        const DataCard = { name: placeInput, link: linkInput };
        createCard(DataCard);

        modal.classList.remove('popup_opened');
    }

}

function deletePlaceHandler(evt) {

     evt.target.closest('.element').remove();
}

function createCard(item) {

    const cardsList = document.querySelector('.elements__list');
    // считываем шаблон
    const cardsListTemplate = document.querySelector('#cardsListTemplate').content;
    // копируем узел для заполнения
    const CardElement = cardsListTemplate.querySelector('.element').cloneNode(true);

    // заполняем нужные поля-свойства
    CardElement.querySelector('.element__title').textContent = item.name;
    let elementImage = CardElement.querySelector('.element__image');
    elementImage.setAttribute('src', item.link);
    elementImage.setAttribute('alt', item.name);

    // Добавим обработчик-слушатель для установки лайков
    CardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
    });

    // Добавим обработчик-слушатель для удаления карточек
    CardElement.querySelector('.element__trash-button').addEventListener('click', function (evt) {
        deletePlaceHandler(evt);
    });

    // Добавим обработчик-слушатель для открытия фото вмодальном окне
    CardElement.querySelector('.element__image').addEventListener('click', function (evt) {
        openImageHandler(evt);
    });

    // отображаем на странице
    cardsList.prepend(CardElement);
}

function createCards() {

    const initialCards = [
        {
            name: 'Архыз',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
            name: 'Челябинская область',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
            name: 'Иваново',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
            name: 'Камчатка',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
            name: 'Холмогорский район',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
            name: 'Байкал',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
    ];

    initialCards.forEach(function (item) {
        createCard(item);
    });

}
createCards();

modalButtons.forEach(function (btn) {
    // перебираем все наши кнопки, которые будут открывать модальные окна
    btn.addEventListener('click', function (evt) {
        // обратимся к свойству targer (т.е. к тому элементу, на который мы кликнули)
        // далее обращаемся к data-атрибуту (причем в формате camel-case), там мы храним соответсвие какое модальное окно откроется
        let data = evt.target.dataset.modalOpen;

        // далее перебираем все наши модальные окна
        modals.forEach(function (modal) {
            // если в dataSet в реквизите модал указано тоже значение, что и в вызывающей кнопке, то именно это модальное окно и надо открыть
            if (modal.dataset.modal == data || modal.dataset.modal == evt.target.closest('.modal-open')) {
                openModal(modal);
            }
        })
    })
});

modals.forEach(function (modal) {
    modal.addEventListener('click', function (evt) {
        closeModal(evt);
    })
})

submitButtons.forEach(function (btn) {
    btn.addEventListener('click', function (evt) {

        // считываем data данные кнопки из submit
        let dataSubmit = evt.target.dataset.modalSubmit;
        // далее перебираем все наши модальные окна
        modals.forEach(function (modal) {
            // если в dataSet в реквизите модал указано тоже значение, что и в вызывающей кнопке, то именно это модальное окно мы используем
            if (modal.dataset.submit == dataSubmit) {
                // если это сабмит из модального с типом "Добавить место"
                if (dataSubmit == 'submit_AddPlace') {
                    addPlaceFormSubmitHandler(evt, modal);
                    // иначе сабмит с редактирования профиля
                } else (dataSubmit == 'submit_editProfile')
                editProfileFormSubmitHandler(evt, modal);
            }
        });

    })
})
