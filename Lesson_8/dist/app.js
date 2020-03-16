class Board {
    constructor() {
        // получаем таблицу
        this.boardEl = document.getElementById("board");
        // получаем радио инпуты
        this.inputRus = document.getElementById("rus");
        this.inputInt = document.getElementById("int");
        // получаем кнопку
        this.btnStart = document.getElementById("btnStart");
        // получае меню (чтобы потом скрыть)
        this.menuEl = document.querySelector(".menuGame");
    }

    init(settings, game){
        this.settings = settings;
        this.game = game;
    }

    /**
     * метод отрисовывает игровую доску и присваивает клеткам класс ("white" или "black")
     */
    renderBoard() {
        let firstCellColor = "white"; // цвет верхней левой клетки
        for (let row = 1; row <= this.settings.rowsCount; row++) {
            let tr = document.createElement("tr");// создаем тег <tr>
            this.boardEl.appendChild(tr); //добавляем <tr> в таблицу

            for (let col = 1; col <= this.settings.colsCount; col++) {
                let td = document.createElement("td"); // создаем тег <td>
                //td.dataset.row = row.toString();
                //td.dataset.col = col.toString();
                td.classList.add(firstCellColor);
                tr.appendChild(td); // добавляем тег <td> в <tr>

                // чередуем цвета клеток
                if (firstCellColor === "white"){
                    firstCellColor = "black"
                } else {
                    firstCellColor = "white"
                }
            }

            // чердуем цвет первой клетки в ряду
            if (firstCellColor === "white"){
                firstCellColor = "black"
            } else {
                firstCellColor = "white"
            }
        }
    }
    // тут загвоздка - стрелочной функции передаем объект, но в дальнейшем нужно удалить слушатель события.
    // нужно как то объявить функцию cellClickHandler чтобы передовался объект а потом удалить слушатель события
    /**
     * метод назначает слушатель события по щелчку на игровой доске
     */
    initEventHandlers(){
        this.boardEl.addEventListener("click", event => this.game.cellClickHandler(event));
    }

    // initEventHandlers(){
    //     let table = this.boardEl;
    //     let listenerFunction = function (event) {
    //         this.game.cellClickHandler(event);
    //     table.addEventListener("click",listenerFunction,false);
    //     }
    // }


}
class Checkers {

    init(settings,board){
        this.settings = settings;
    }

    /**
     * Метод расставляет на поле шашки
     * @param {number} rows колличество рядов шашек у игроков (русские по 3 ряда, междунородные по 4 ряда шашек)
     */
    insertCheckers(rows){
        this.insertCheckersBlack(rows);
        this.insertCheckersWhite(rows);
    }

    /**
     * Метод расставляет черные шашки в клетки поля и присваивает им класс "blackChecker"
     * @param {number} rows  колличество рядов шашек у игрока
     */
    insertCheckersBlack(rows) {
        // получаем ячейки в нужном ряду (сверху игрового поля)
        for (let i = 0; i <= rows; i++) {
            let сheckers = document.querySelectorAll("tr:nth-child(" + i + ") td");
            console.log(сheckers);

            // проходимся по ячейкам, если есть класс "black" ставим шашку
            сheckers.forEach((cell) => {
                if (cell.classList == "black") {
                    cell.innerHTML = this.settings.figure;
                    cell.classList.add("blackChecker");
                }

            })
        }
    }
    /**
     * Метод расставляет черные шашки в клетки поля и присваивает им класс "whiteChecker"
     * @param {number} rows  колличество рядов шашек у игрока
     */
    insertCheckersWhite(rows){
        // получаем ячейки в нужном ряду (снизу игрового поля)
        for (let i = this.settings.rowsCount; i > this.settings.rowsCount - rows; i--) {
            let сheckers = document.querySelectorAll("tr:nth-child(" + i + ") td");
            console.log(сheckers);

            // проходимся по ячейкам, если есть класс "black" ставим шашку
            сheckers.forEach((cell) => {
                if (cell.classList == "black") {
                    cell.innerHTML = this.settings.figure;
                    cell.classList.add("whiteChecker");
                }

            })
        }
    }
}
class Game {
    init(board, settings, checkers) {
        this.board = board;
        this.settings = settings;
        this.checkers = checkers;
    }


    cellClickHandler(event) {
        console.log(event)
        if (event.target.classList.contains("fas")) {
            let cell = this.getParentElFromClickTarget(event);
            cell.innerHTML = "";
            cell.classList.remove("whiteChecker", "blackChecker");
        }
        else if (event.target.classList.contains("black") && !event.target.classList.contains("whiteChecker") && !event.target.classList.contains("blackChecker")){
            let freeCell = event.target;
            freeCell.innerHTML = this.settings.figure;
        }


    }



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
// всё загрузится
window.addEventListener("load", () =>{

    // создаем объекты игры

    const settings = new Settings() // создаем объект настроек
    const board = new Board(); // создаем объект доску
    const checkers = new Checkers(); // создаем обект шашки
    const game = new Game();

    // передаем доступ к объектам

    board.init(settings, game);
    checkers.init(settings);
    game.init(board, settings, checkers);

    // вызываем основные функции
    game.choseGameType();
    board.initEventHandlers();

});
class Settings {
    constructor() {
        this.rowsCount = 8; // колличество рядов игровой доски
        this.colsCount = 8; // колличество колонок игровой доски
        this.figure = '<i class="fas fa-hockey-puck"></i>'; // иконка шашки
        this.figureQinee = '<i class="fas fa-ring"></i>'; // иконка дамки
    }

}
//# sourceMappingURL=maps/app.js.map
