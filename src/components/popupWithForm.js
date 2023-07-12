import { Popup } from './Popup.js';

// export class PopupWithForm extends Popup {
//   constructor({ popupSelector, handleFormSubmit }) {
//     super(popupSelector);
//     this._form = this._popup.querySelector('.popup__form');
//     this._inputsList = this._popup.querySelectorAll('.popup__input');
//     this._handleFormSubmit = handleFormSubmit
//     // this._popupButton = this._form.querySelector('.popup__button');
//     // this._originalText = this._popupButton.textContent;
//     // this._submitHandler = this._submitHandler.bind(this);
//   }

// //   toggleButtonText(isLoading, buttonLoadingText = 'Cохранение...') {
// //     if (isLoading) {
// //       this._popupButton.textContent = buttonLoadingText;
// //     } else {
// //       this._popupButton.textContent = this._originalText;
// //     }
// //   }

//   _getInputValues() {
//     this._formValues = {};
//     this._inputList.forEach(input => this._formValues[input.name] = input.value);
//     return this._formValues;
//   }

// //   _submitHandler(evt) {
// //     evt.preventDefault();
// //     this._submit(this._getInputValues());
// //   }

//   closeModalClickHandler() {
//     // this._form.addEventListener('submit', this._submitHandler);
//     super.closeModalClickHandler();
//         this._form.addEventListener('submit', (evt) => {
//           evt.preventDefault();
//           this._handleFormSubmit(this._getInputValues());
//           this._form.reset();
//           this.closeModal();
//         });
//       }
  

// //   _removeEventListeners() {
// //     this._form.removeEventListener('submit', this._submitHandler);
// //     // super._removeEventListeners();
// //   }

//   closeModal() {
//     this._form.reset();
//     // this._removeEventListeners();
//     super.closeModal();
//   }
// }
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
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.closeModal();
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = 'Сохранение...';
    } else {
      this._saveButton.textContent = 'Сохранить';
    }
  }

  closeModal() {
    super.closeModal();
    this._form.reset();
  }
}