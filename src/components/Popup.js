
export class Popup { 
    constructor(popupSelector){
      this._popup = document.querySelector(popupSelector)
    }
  
   openModal () {
      this._popup .classList.add('popup_opened');
      document.addEventListener('keydown', this._closeByEsc)
      this.setEventListeners()
  }
  
   closeModal() {
    this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._closeByEsc )
    
  }
  _closeByEsc = (evt) => {
    if (evt.key === "Escape") {
        this.closeModal();
    }
}
  
setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
        // проверим, что элемент, на который кликнули содердит класс модал-клоус 
        if (evt.target.classList.contains('modal-close') || evt.target === evt.currentTarget) {
            this.closeModal();
        }
    })
      
     
  }
  }
