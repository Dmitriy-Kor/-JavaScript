class Food {
    constructor() {
        // координаты еды
        this.x = null;
        this.y = null;
    }

    /**
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings объект настроек
     * @param {Snake} snake объект змейки
     * @param {Board} board объект игрового поля
     */
    init(settings, snake, board) {
        this.settings = settings; // настройки для размера поля
        this.snake = snake; // чтобы не появиться на змейке
        this.board = board; // чтобы отрисовать
    }

    /**
     * Метод устанавливает новое случайное положение еды на игровом
     * поле.
     */
    setNewFood() {
        const food = this.generateRandomCoordinates(); // получаем ячейку со случайными координатами
        this.board.renderFood(food); // отрисовываем еду
    }

    /**
     * Метод генерирует новый объект еды со случайным
     * положением на игровом поле
     * @returns {Food}
     */
    generateRandomCoordinates() {
        while (true) {
            this.x = Math.floor(Math.random() * this.settings.colsCount) + 1; // случайная координата Х
            this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1; // случайная координата У
            let cell = this.board.getCellEl(this.x, this.y); //из координат получаем ячейку

            // проверка попали на змйку или нет
            if (cell.classList.contains("snakeBody")) {
                continue;
            }
            return this;
        }
    }

    setFood(){
       this.board.renderFood(this);
    }

}