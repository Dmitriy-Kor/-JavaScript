class Board {
    constructor() {
        this.gameTableElement = document.getElementById("game");// получаем таблицу
    }

    init(game, status){
        this.game = game;
        this.status = status;
    }

    renderMap() {
        for (let row = 0; row < 3; row++) {
            const tr = document.createElement('tr'); //создаем тэг строки
            this.gameTableElement.appendChild(tr); // записываем строку в тоблицу
            for (let col = 0; col < 3; col++) {
                let td = document.createElement('td'); // создаем ячейку
                td.dataset.row = row.toString(); // присваиваем дата атрибут, переводим в строку
                td.dataset.col = col.toString(); // для координат
                tr.appendChild(td); // добавляем в строку  tr
            }
        }
    }

    initEventHandlers(){
        //обработчик события, при клике вызывается функция
        this.gameTableElement.addEventListener("click", event => this.game.cellClickHandler(event));// стрелочная функция захватывает this
    }

    /**
     * Проверка что клик был по ячейке.
     * @param {Event} event
     * @param {HTMLElement} event.target
     * @returns {boolean} Вернет true, если клик был по ячейке, иначе false.
     */
    isClickByCell(event) {
        // возвращаем проверку, является элемент ячейкой td
        return event.target.tagName == "TD";
    }

    /**
     * Проверка что в ячейку не ставили значение (крестик или нолик).
     * @param {Event} event
     * @param {HTMLElement} event.target
     * @returns {boolean} Вернет true, если ячейка пуста, иначе false.
     */
    isCellEmpty(event) {
        // Получаем строку и колонку куда кликнули(координаты).
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;
        //возвращаем проверку пустойли элемент массива (пустая ли ячейка)
        return this.status.mapValues[row][col] === "";
    }
    /**
     * Заполняет ячейку в которую кликнул пользователь в событии event.
     * @param {Event} event
     * @param {HTMLElement} event.target
     */
    fillCell(event) {
        // Получаем строку и колонку куда кликнули. перводим в число
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        // Заполняем ячейку и ставим значение в массиве, в свойстве mapValues.
        this.status.mapValues[row][col] = this.status.phase; // записываем в массив крестик или нолик
        event.target.textContent = this.status.phase; // записываем в ячейку таблицы крестик или нолик
    }
}