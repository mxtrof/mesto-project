import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
    this._saveButton = this._popup.querySelector('.popup__save-button');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
  // openModal(){
  //   super
  // }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = 'Сохранение...';
    } else {
      this._saveButton.textContent = 'Сохранить';
    }
  }
  hendleSubmit(request, popupInstance){
    popupInstance.renderLoading(true);
    request()
      .then(() => {
        popupInstance.closeModal()
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupInstance.renderLoading(false);
      });   
    
  }

  closeModal() {
    super.closeModal();
    this._form.reset();
  }
}