
const showInputError = (enableValidationSettings, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(enableValidationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (enableValidationSettings, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(enableValidationSettings.inputErrorClass);
    errorElement.textContent = '';
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const checkInputValidity = (enableValidationSettings, formElement, inputElement) => {

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
        showInputError(enableValidationSettings, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(enableValidationSettings, formElement, inputElement);
    }
};

function toggleButtonState(enableValidationSettings, inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(enableValidationSettings.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(enableValidationSettings.inactiveButtonClass);
    }
}

const setEventListeners = (enableValidationSettings, formElement) => {

    const inputList = Array.from(formElement.querySelectorAll(enableValidationSettings.inputSelector));
    const buttonElement = formElement.querySelector(enableValidationSettings.submitButtonSelector);

    // проверка состояния кнопки при первом запуске
    toggleButtonState(enableValidationSettings, inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {

            // проверяем на ошибки и выводим ошибку
            checkInputValidity(enableValidationSettings, formElement, inputElement);

            // проверка состояния кнопки при каждом запуске
            toggleButtonState(enableValidationSettings, inputList, buttonElement);
        });
    });
};

export const enableValidation = (enableValidationSettings, formElement) => {

    formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });

    setEventListeners(enableValidationSettings, formElement);
};
