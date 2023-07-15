export class Section {

    constructor({renderer}, 
        selector) {
        this._renderer = renderer;
        this._container = selector;
    }
    
    renderItems(items) {
        this._items = items;
        this._items.forEach(this._renderer);
    }
    
    addItem(item) {
        this._container.prepend(item);
    }
}
