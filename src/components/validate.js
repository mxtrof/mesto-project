
const showInputError = (validationSettings, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (validationSettings, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.textContent = '';
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const checkInputValidity = (validationSettings, formElement, inputElement) => {

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
        showInputError(validationSettings, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(validationSettings, formElement, inputElement);
    }
};

export const toggleButtonState = (validationSettings, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationSettings.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    }
}

export const getFormElements = (validationSettings, formElement) => {
    
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

    return {inputList: inputList, buttonElement: buttonElement};
}

const setEventListeners = (validationSettings, formElement) => {

    const formElements = getFormElements(validationSettings, formElement);
    toggleButtonState(validationSettings, formElements.inputList, formElements.buttonElement);

    formElements.inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {

            // проверяем на ошибки и выводим ошибку
            checkInputValidity(validationSettings, formElement, inputElement);

            // проверка состояния кнопки при каждом запуске
            toggleButtonState(validationSettings, formElements.inputList, formElements.buttonElement);
        });
    });
};

export const enableValidation = (validationSettings, formElement) => {
     setEventListeners(validationSettings, formElement);
};
