class Board {
    constructor() {
        // получаем ссылку на таблицу
        this.boardEl = document.getElementById("game");
    }

    /**
     * метод получает другие игровые объекты, которые нужны для работы.
     * @param {Settings} settings объект настроек.
     * @param {Snake} snake объект змейки.
     */
    init(settings, snake) {
        this.settings = settings;
        this.snake = snake;
    }

    /**
     * метод отрисовывает игровое поле.
     */
    renderBoard() {
        this.boardEl.innerHTML = ""; // очищаем все таблицу
        for (let row = 0; row < this.settings.rowsCount; row++) {
            let tr = document.createElement("tr");// создаем тег <tr>
            this.boardEl.appendChild(tr); //добавляем <tr> в таблицу

            for (let col = 0; col < this.settings.colsCount; col++) {
                let td = document.createElement("td"); // создаем тег <td>
                tr.appendChild(td); // добавляем тег <td> в <tr>
            }
        }
    }

    /**
     * Метод очищает игровое поле
     */
    clearBoard(){
        const tdElems = document.querySelectorAll("td");
        tdElems.forEach(function (td) {
            td.className = "";

        })
    }

    /**
     * Метод отрисовывает змейку на доске.
     */
    renderSnake() {
        // получаем элементы змейки (координаты из массива snake.body)
        const snakeBodyElems = this.getSnakeBodyElems(this.snake.body);

        if (snakeBodyElems){ //если есть
            snakeBodyElems.forEach(function (tdEl) { //перебираем через forEach
                tdEl.classList.add("snakeBody"); // добавляем класс (окрашивает тело змейки)
            })
        }
    }

    /**
     * Получаем набор тегов td, представляющих тело змейки.
     * @param {array} bodyCoords массив объектов с координатами
     * @returns {HTMLTableCellElement[]|null} возвращается набор тегов td если были
     * переданы координаты, иначе null.
     */
    getSnakeBodyElems(bodyCoords) {
        // если массив не пустой перебираем циклом for of иначе возвращаем null
        if (bodyCoords.length > 0) {
            let bodyElems = [];
            for (let value of bodyCoords) {
                let elem = this.getCellEl(value.x, value.y); // метод возвращает td
                bodyElems.push(elem); // добавляем в массив
            }
            return bodyElems;
        }
        return null;
    }

    /**
     * Получаем ячейку таблицы.
     * @param {number} x координата по оси х.
     * @param {number} y координата по оси y.
     * @returns {HTMLTableCellElement} тег td
     */
    getCellEl(x, y) {
        return this.boardEl.querySelector((`tr:nth-child(${y}) td:nth-child(${x})`))
    }


    renderFood(coords) {
        const foofCell = this.getCellEl(coords.x, coords.y);
        foofCell.classList.add("food");
    }
    isHeadOnFood(){
        return this.boardEl.querySelector(".food").classList.contains("snakeBody");
    }

}