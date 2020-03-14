class Board {
    constructor() {
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

    renderBoard() {
        this.boardEl.innerHTML = "";
        for (let row = 0; row < this.settings.rowsCount; row++) {
            let tr = document.createElement("tr");
            this.boardEl.appendChild(tr);

            for (let col = 0; col < this.settings.colsCount; col++) {
                let td = document.createElement("td");
                tr.appendChild(td);
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
        const snakeBodyElems = this.getSnakeBodyElems(this.snake.body);
        if (snakeBodyElems){
            snakeBodyElems.forEach(function (tdEl) {
                tdEl.classList.add("snakeBody")
            })
        }
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

    /**
     * Получаем набор тегов td, представляющих тело змейки.
     * @param {array} bodyCoords массив объектов с координатами
     * @returns {HTMLTableCellElement[]|null} возвращается набор тегов td если были
     * переданы координаты, иначе null.
     */
    getSnakeBodyElems(bodyCoords) {
        if (bodyCoords.length > 0) {
            let bodyElems = [];
            for (let value of bodyCoords) {
                let elem = this.getCellEl(value.x, value.y);
                bodyElems.push(elem);
            }
            return bodyElems;
        }
        return null;
    }
    renderFood(coords) {
        const foofCell = this.getCellEl(coords.x, coords.y);
        foofCell.classList.add("food");
    }
    isHeadOnFood(){
        return this.boardEl.querySelector(".food").classList.contains("snakeBody");
    }


    isNextStepToWall(nextCellCoords) {
        let nextCell = this.getCellEl(nextCellCoords.x, nextCellCoords.y);
        nextCell === null;
    }
}
class Food {
    constructor() {
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
        this.settings = settings;
        this.snake = snake;
        this.board = board;
    }

    /**
     * Метод устанавливает новое случайное положение еды на игровом
     * поле.
     */
    setNewFood() {
        const food = this.generateRandomCoordinates();
        this.board.renderFood(food);
    }

    /**
     * Метод генерирует новый объект еды со случайным
     * положением на игровом поле
     * @returns {Food}
     */
    generateRandomCoordinates() {
        while (true) {
            this.x = Math.floor(Math.random() * this.settings.colsCount) + 1;
            this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;
            let cell = this.board.getCellEl(this.x, this.y);

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
class Game {
    constructor() {
        this.tickIndetifier = null;
        this.messegeEl = document.getElementById("message");
    }

    /**
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings
     * @param {Status} status
     * @param {Board} board
     * @param {Snake} snake
     * @param {Menu} menu
     * @param {Food} food
     * @param {Score} score
     */
    init(settings, status, board, snake, menu, food, score) {
        this.settings = settings;
        this.status = status;
        this.board = board;
        this.snake = snake;
        this.menu = menu;
        this.food = food;
        this.score = score;
    }

    run() {
        this.score.setToWin(this.settings.winLength);
        this.menu.addButtonsClickListeners(this.start.bind(this), this.pause.bind(this));
        document.addEventListener('keydown', this.pressKeyHandler.bind(this));
    }

    start() {
        if (this.status.isPaused()) {
            this.status.setPlaying();
            this.tickIdentifier = setInterval(this.doTick.bind(this), 1000 / this.settings.speed);
        }
    }

    /**
     * Метод ставит игру на паузу.
     */
    pause() {
        if (this.status.isPlaying()) {
            this.status.setPaused();
            clearInterval(this.tickIdentifier);
        }
    }

    /**
     * Этот метод запускается каждую секунду и осуществляет:
     * 1. перемещение змейки
     * 2. проверяет проиграна/выиграна ли игра
     * 3. увеличивает размер змейки если она ест еду
     * 4. заново отрисовывает положение змейки и еды
     */
    doTick() {
        this.snake.performStep(); //змейка делает шаг
        this.score.setCurrent(this.snake.body.length); //передает длину змейки
        if (this.isSnakeSteppedOntoItself()) {
            return;
        }

        if (this.isGameWon()) { //проверка на победу
            return;
        }
        if (this.board.isHeadOnFood()) {
            this.snake.increaseBody();
            this.food.setNewFood();
        }
        this.board.clearBoard(); //очищает поле
        this.food.setFood(); // ставим еду
        this.board.renderSnake(); // отрисовываем змейку


    }

    /**
     * В зависимости от нажатой кнопки (вверх, вниз, влево, вправо) будет
     * вызываться соответствующий метод.
     * @param {KeyboardEvent} event
     */
    pressKeyHandler(event) {
        switch (event.key) {
            case "ArrowUp":
                this.snake.changeDirection('up');
                break;
            case "ArrowDown":
                this.snake.changeDirection('down');
                break;
            case "ArrowLeft":
                this.snake.changeDirection('left');
                break;
            case "ArrowRight":
                this.snake.changeDirection('right');
                break;
        }
    }

    /**
     * Метод проверяет выиграна ли игра, останавливает игру,
     * выводит сообщение о выигрыше.
     * @returns {boolean} если длина змейки достигла длины нужной
     * для выигрыша, тогда true, иначе false.
     */
    isGameWon() {
        if (this.snake.body.length == this.settings.winLength) {
            clearInterval(this.tickIdentifier);
            this.setMessage("Вы выиграли");
            return true;
        }
        return false;
    }

    /**
     * Метод выводит сообщение на странице.
     * @param {string} text
     */
    setMessage(text) {
        this.messegeEl.innerText = text;
    }

    /**
     * метод проверяет ест ли змейка сама себя
     */
    isSnakeSteppedOntoItself() {
        let cellArr = this.snake.body.map(function (cellCoords) { //создаем новый массив с координатами тела змйки
            return cellCoords.x.toString() + cellCoords.y.toString(); //переводим координаты в строку
        });
        let head = cellArr.shift(); // получаем голову и удаляем ее из массива (первый элемент)
        if (cellArr.includes(head)) { // проверяем содержит массив удаленную голову
            clearInterval(this.tickIdentifier);
            this.setMessage("Вы проиграли");
            return true;
        }
        return false;
    };


}
window.addEventListener("load", () => {
    const settings = new Settings();
    const status = new Status();
    const snake = new Snake();
    const board = new Board();
    const food = new Food();
    const menu = new Menu();
    const game = new Game();
    const score = new Score();

    settings.init({speed: 5, winLength: 10});
    snake.init(settings);
    board.init(settings, snake);
    food.init(settings, snake, board);
    game.init(settings, status, board, snake, menu, food, score);
    score.init(settings);

    board.renderBoard();
    board.renderSnake();

    food.setNewFood();
    game.run();
});
class Menu {
    constructor() {
        this.startBtnEl = document.getElementById('startBtn');
        this.pauseBtnEl = document.getElementById('pauseBtn');
    }

    /**
     * Метод назначает переданные функции в качестве обработчиков
     * событий клика на кнопки "Старт" и "Пауза".
     * @param {Function} startBtnClickHandler
     * @param {Function} pauseBtnClickHandler
     */
    addButtonsClickListeners(startBtnClickHandler, pauseBtnClickHandler) {
        this.startBtnEl.addEventListener('click', startBtnClickHandler);
        this.pauseBtnEl.addEventListener('click', pauseBtnClickHandler);
    }

}
class Score {
    constructor() {
        this.currentEl = document.querySelector(".current");
        this.toWinEl = document.querySelector(".toWin");
    }

    /**
     * @param {Settings} settings настройки игры
     */
    init(settings) {
        this.settings = settings;
    }

    /**
     * Метод устанавливает количество очков, необходимых
     * для выигрыша.
     * @param {string} text
     */
    setToWin(text) {
        this.toWinEl.textContent = text;
    }
    /**
     * Метод устанавливает текущий счет игрока.
     * @param {string} text
     */
    setCurrent(text) {
        this.currentEl.textContent = text;
    }


}
class Settings {
    /**
     * @param {Object} params - Парметры игры.
     * @param {number} params.rowsCount - количество строк игрового поля.
     * @param {number} params.colsCount - количество колонок игрового поля.
     * @param {number} params.speed - скорость перемещения змейки.
     * @param {number} params.winLength - какую длину надо наесть, чтобы выиграть.
     * @throws {Error} если переданы не верные настройки выбрасывается
     * соответствующая ошибка.
     */
    init(params) {
        let defaultParams = {rowsCount: 21, colsCount: 21, speed: 2, winLength: 50};
        Object.assign(defaultParams, params);

        if (defaultParams.rowsCount < 10 || defaultParams.rowsCount > 30) {
            throw new Error('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }
        this.rowsCount = defaultParams.rowsCount;

        if (defaultParams.colsCount < 10 || defaultParams.colsCount > 30) {
            throw new Error('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }
        this.colsCount = defaultParams.colsCount;

        if (defaultParams.speed < 1 || defaultParams.speed > 10) {
            throw new Error('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }
        this.speed = defaultParams.speed;

        if (defaultParams.winLength < 5 || defaultParams.winLength > 50) {
            throw new Error('Неверные настройки, значение winLength должно быть в диапазоне [5, 50].');
        }
        this.winLength = defaultParams.winLength;
    }
}
class Snake {
    constructor() {
        this.possibleDirections = ["down", "up", "left", "right"];

        this.body = [
            {
                x: 1,
                y: 1,
            },
        ];

        this.direction = "down"
    }

    /**
     * передаем настройки settings
     */
    init(settings){
        this.settings = settings;
    }

    /**
     * Метод осуществляет шаг змейки. Добавляет ячейку перед существующим
     * положением головы и удаляет одну ячейку в хвосте.
     */
    performStep() {
        let currentHeadCoords = this.body[0]; //берем текущее положение головы
        let newHeadCoords = { //новые координаты головы
            x: currentHeadCoords.x,
            y: currentHeadCoords.y,
        };
        switch (this.direction) {
            case "down":
                newHeadCoords.y++;
                break;
            case "up":
                newHeadCoords.y--;
                break;
            case "left":
                newHeadCoords.x--;
                break;
            case "right":
                newHeadCoords.x++;
                break;
        }


        //если голова уходит за правый край
        if (newHeadCoords.x > this.settings.colsCount) {
            newHeadCoords.x = 1;
        }
        //если голова уходит за нижний край
        if (newHeadCoords.y > this.settings.rowsCount) {
            newHeadCoords.y = 1;
        }
        //если голова уходит за левый край
        if (newHeadCoords.x == 0) {
            newHeadCoords.x = this.settings.colsCount;
        }
        //если голова уходит за верхний край
        if (newHeadCoords.y == 0) {
            newHeadCoords.y = this.settings.rowsCount;
        }

        this.body.unshift(newHeadCoords); //добавляем голову
        this.body.pop(); // удалем последнюю ячейку змеи
    }

    /**
     * Меняем направление движения.
     * @param {string} newDirection направление может быть down, up, left, right.
     * @throws {Error} при передаче не корректного направления выбрасывается ошибка.
     */
    changeDirection(newDirection) {
        if (!this.possibleDirections.includes(newDirection)) {
            throw new Error('Передано не верное направление. Вы передали: ' + newDirection);
        }
        if (this.isPassedOppositeDirection(newDirection)) {
            return;
        }
        this.direction = newDirection;
    }

    /**
     * Метод проверяет, является ли переданное направление, противоположным
     * тому куда сейчас движется змейка.
     * @param {string} newDirection новое направление, может быть up, down, right, left.
     * @returns {boolean} true если новое направление противоположно текущему,
     * иначе false.
     */
    isPassedOppositeDirection(newDirection) {
        if (this.direction == 'down' && newDirection == 'up') {
            return true;
        }
        if (this.direction == 'up' && newDirection == 'down') {
            return true;
        }
        if (this.direction == 'left' && newDirection == 'right') {
            return true;
        }
        if (this.direction == 'right' && newDirection == 'left') {
            return true;
        }
        return false;
    }

    /**
     * Метод дублирует в массиве объектов представляющих тело змейки
     * последнюю ячейку, т.е. в массиве в конце оказываются два
     * одинаковых объекта. Когда метод performStep в самом конце
     * удаляет последний элемент массива, он удаляет сдублированный
     * объект, таким образом тело змейки растет.
     */
    increaseBody() {
        let bodyLastCell = this.body[this.body.length - 1];
        let newBodyLastCell = {
            x: bodyLastCell.x,
            y: bodyLastCell.y,
        };
        this.body.push(newBodyLastCell);
    }
}
/** Здесь будет хранится статус игры, например играем мы, завершили или остановлено. */
class Status {
    constructor() {
        this.setPaused();
    }

    /** Это значит что мы играем. */
    setPlaying() {
        this.condition = 'playing';
    }

    /** Это значит что игра на паузе. */
    setPaused() {
        this.condition = 'paused';
    }

    /**
     * @returns {boolean} если мы сейчас играем, тогда true, иначе false.
     */
    isPlaying() {
        return this.condition === 'playing';
    }

    /**
     * @returns {boolean} если сейчас игра на паузе, тогда true, иначе false.
     */
    isPaused() {
        return this.condition === 'paused';
    }
}
//# sourceMappingURL=maps/app.js.map
