export class Card {

    constructor(dataCard, handleCardClick, api, userId, templateSelector) {
        this.templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this.name = dataCard.name;
        this.link = dataCard.link;
        this.userId = userId;
        this._id = dataCard._id;
        this.ownerid = dataCard.owner._id;
        this.likes = dataCard.likes;
        this.api = api;
    }

    _generateCardElement() {

        const cardsListTemplate = document.querySelector(this.templateSelector).content;
        // копируем узел для заполнения
        return cardsListTemplate.querySelector('.element').cloneNode(true);
    }

    createCard() {

        this.cardElement = this._generateCardElement();

        this.buttonDelete = this.cardElement.querySelector('.element__trash-button');

        // заполняем нужные поля-свойства
        this.cardElement.querySelector('.element__title').textContent = this.name;
        this.likeCount = this.cardElement.querySelector('.element__likes-count');
        this.likeButton = this.cardElement.querySelector('.element__like-button');

        this.elementImage = this.cardElement.querySelector('.element__image');
        this.elementImage.setAttribute('src', this.link);
        this.elementImage.setAttribute('alt', this.name);

        // т.к.мы считываем и чужие лайки, то нам надо понимать, если среди них есть наш, то подкрашиваем темным цветом лайк
        this._updateLikes();
        this.cardElement.dataset.id = this._id;

        if (this.userId != this.ownerid) {
            this.buttonDelete.remove();
        }

        // Добавим обработчик-слушатель для установки лайков
        this.likeButton.addEventListener('click', this.updateLikeContainer);

        // Добавим обработчик-слушатель для удаления карточек
        this.buttonDelete.addEventListener('click', this._deletePlaceHandler);

        // Добавим обработчик-слушатель для открытия фото в модальном окне
        this.cardElement.querySelector('.element__image').addEventListener('click', this._handleCardClick);

        return this.cardElement;
    }

    _deletePlaceHandler = () => {

        this.api.deleteCard(this.cardElement.dataset.id)
            .then((res) => {
                this.cardElement.remove();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    _updateLikes() {

        this.likeCount.textContent = this.likes.length;

        if (this.likes.length == 0) {
            this.likeButton.classList.remove('element__like-button_active');
        } else {
            this.likes.forEach((elem) => {
                if (this.userId == elem._id) {
                    this.likeButton.classList.add('element__like-button_active');
                } else this.likeButton.classList.remove('element__like-button_active');
            })
        }
    }

    updateLikeContainer = () => {

        if (this.likeButton.classList.contains('element__like-button_active')) {

            this.api.deleteLikeCard(this.cardElement.dataset.id)
                .then((res) => {
                    this.likes = res.likes;
                    this._updateLikes();
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            this.api.setLikeCard(this.cardElement.dataset.id)
                .then((res) => {
                    this.likes = res.likes;
                    this._updateLikes();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
}