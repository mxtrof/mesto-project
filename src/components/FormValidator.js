export class FormValidator{
    constructor(config, formElement){
        this._config = config 
        this._formSelector = config.formSelector,
        this._inputSelector = config.inputSelector,
        this._submitButtonSelector = config.submitButtonSelector,
        this._inactiveButtonClass = config.inactiveButtonClass
        this._inputErrorClass = config.inputErrorClass
        this._errorClass = config.errorClass
        this._formElement = formElement,

        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    }
    
    _showInputError (inputElement, errorMessage) {
     const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    };

    _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    };

    cleanInputErrorValidation = () => {
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
        })
        this._toggleButtonState();
      };

  _hasInvalidInput  () {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };
    
   _checkInputValidity (inputElement) {
        if (inputElement.validity.patternMismatch) {
            // встроенный метод setCustomValidity принимает на вход строку
            // и заменяет ею стандартное сообщение об ошибке
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            // если передать пустую строку, то будут доступны
            // стандартные браузерные сообщения
            inputElement.setCustomValidity("");
        }
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };
    
_toggleButtonState  () {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }
      
  setEventListeners () {
        
        this._toggleButtonState();
            this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                    // проверяем на ошибки и выводим ошибку
                this._checkInputValidity(inputElement);
                    // проверка состояния кнопки при каждом запуске
                this._toggleButtonState();
                // console.log(inputElement)
            });
        });
        
    };
   enableValidation () {
         this.setEventListeners();
    };
}


 