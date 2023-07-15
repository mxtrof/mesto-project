import { Popup } from "./Popup"

export class PopupWithImage extends Popup {
    constructor(popupSelector, selectorLink, selectorText){
        super(popupSelector);
        // т.к. мы наследуемся от базового класса, то нам доступны его методы и свойства, обратимся к классу css конкретного модального окна
        this._popupImage = this._popup.querySelector(selectorLink);
        this._popupImageCaption = this._popup.querySelector(selectorText);
      }

      // В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
      openModal(link, text) {
        // установим значения открываемой картинки
        this._popupImage.src = link;
        this._popupImage.alt = text;
        this._popupImageCaption.textContent = text;
        super.openModal();
      }

}
