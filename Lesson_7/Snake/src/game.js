// объект который всем управляет
class Game {
    constructor() {
        this.tickIndetifier = null; // интервал (скорость отрисовки)
        this.messegeEl = document.getElementById("message"); // доступ к элементу для сообщений
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
    // бывший run
    initEventListener() {
        // показываем соклько очков нужно до победы
        this.score.setToWin(this.settings.winLength);
        //назначаем обработчики на события клика на кнопки Старт и Пауза
        this.menu.addButtonsClickListeners(this.start.bind(this), this.pause.bind(this));
        //назначаем обработчик на событие нажатие кнопки на клавиатуре
        document.addEventListener('keydown', this.pressKeyHandler.bind(this));
    }

    /**
     * Метод запускает игру.
     */
    start() {
        if (this.status.isPaused()) { //если игра на паузе
            this.status.setPlaying() // ставим статус играем
            this.tickIdentifier = setInterval(this.doTick.bind(this), 1000 / this.settings.speed);// устанавливаем интервал
        }
    }

    /**
     * Метод ставит игру на паузу.
     */
    pause() {
        if (this.status.isPlaying()) { //если играем
            this.status.setPaused(); // ставим статус пауза
            clearInterval(this.tickIdentifier); // очищаем интервал
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
        if (this.isSnakeSteppedOntoItself()) { // нпроверяем не зашла змейка на себя
            return;
        }

        if (this.isGameWon()) { //проверка на победу
            return;
        }
        if (this.board.isHeadOnFood()) { // проверка если змейка ест
            this.snake.increaseBody(); // увиличиваем длинну змейки
            this.food.setNewFood(); // ставим новую еду
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
        switch (event.key) { //читаем куда нажали
            case "ArrowUp":
                this.snake.changeDirection('up'); //меням направление
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
        if (this.snake.body.length == this.settings.winLength) { //проверяем длинну змейки
            clearInterval(this.tickIdentifier); // останавливам (очищаем интервал)
            this.setMessage("Вы выиграли"); //выводим сообщение
            return true;
        }
        return false;
    }

    /**
     * Метод выводит сообщение на странице.
     * @param {string} text
     */
    setMessage(text) {
        this.messegeEl.innerText = text; // в div вставляем текст
    }

    /**
     * метод проверяет ест ли змейка сама себя
     */
    isSnakeSteppedOntoItself() {
        let cellArr = this.snake.body.map(function (cellCoords) { //создаем новый массив с координатами тела змйки
            return cellCoords.x.toString() + cellCoords.y.toString(); //переводим координаты в строку
        });
        let head = cellArr.shift(); // получаем голову и удаляем ее из массива (первый элемент)
        if (cellArr.includes(head)) { // проверяем содержит массив(тело змейки) удаленную голову
            clearInterval(this.tickIdentifier);
            this.setMessage("Вы проиграли");
            return true;
        }
        return false;
    };


}