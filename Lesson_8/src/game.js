class Game {
    init(board, settings, checkers) {
        this.board = board;
        this.settings = settings;
        this.checkers = checkers;
    }

    // метод для проверки работоспособности идеи..
    // если в яейке есть шашка он ее удаляет, а если ячейка черная и пустая ставит шашку
    // этот метод я хотел разбить на два слушателя(клика) и зациклить
    // такая перестановка шашек кликнул убрал второй клик поставил на место
    cellClickHandler(event) {
        console.log(event)
        if (event.target.classList.contains("fas")) { // если стоит шашка
            let cell = this.getParentElFromClickTarget(event); // получаем родителя
            cell.innerHTML = ""; // и удаляем в нем шашку
            cell.classList.remove("whiteChecker", "blackChecker"); // и удаляем классы шашек
        }
        //проверка является клетка черной и в ней нет белой или черной шашки
        else if (event.target.classList.contains("black")
            && !event.target.classList.contains("whiteChecker")
            && !event.target.classList.contains("blackChecker")){

            let freeCell = event.target;
            freeCell.innerHTML = this.settings.figure;
        }


    }


    /**
     * Метод получает родителя, полученого элемента.
     * @param clickTargetEl
     * @return {HTMLElement}
     */
    getParentElFromClickTarget(clickTargetEl) {
        let cell = clickTargetEl.target.parentElement;
        return cell;
    }

    /**
     * Метод запускает игру по клику на кнопку старт
     */
    choseGameType() {
        this.board.btnStart.addEventListener("click", this.startGame.bind(this));
    }

    /**
     * метод запускает игру с нужными настройками взависимости от выбронного типа игры (русские шашки или международные)
     */
    startGame() {
        // если выбранны русские шашки
        if (this.board.inputRus.checked) {
            this.settings.rowsCount = 8; // настройки поля
            this.settings.colsCount = 8; // настройки поля
            this.board.menuEl.style.display = "none"; // скрывает начальное меню
            this.board.renderBoard(); // отрисовывает доску
            this.checkers.insertCheckers(3); // раставляет шашки
        }
        // если выбраны международные
        if (this.board.inputInt.checked) {
            this.settings.rowsCount = 10;
            this.settings.colsCount = 10;
            this.board.menuEl.style.display = "none";
            this.board.renderBoard();
            this.checkers.insertCheckers(4);
        }
    }
}