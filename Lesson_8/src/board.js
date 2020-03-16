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