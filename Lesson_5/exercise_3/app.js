let app = {
    config: {
        rows: [8, 7, 6, 5, 4, 3, 2, 1],
        cols: ["a", "b", "c", "d", "e", "f", "g", "h"]
    },

    run() {
        // генерируем шахматную доску
        let board = this.generateBoard();
        // добавляем доску в body
        document.body.innerHTML = board;

        // добавляем все фигуры кроме пешек
        this.insertFiguresOnDesk();
        // добавляем пешки
        this.insertPawns()


        //добавляем колонку с номерами строк
        this.insertRowsNumber();
        //добавляем строку с нозванием колонок
        this.insertColsChars();

    },

    /**
     * метод генерирует игровое поле 8 х 8
     * @returns {string} html разметку в виде строки
     */
    generateBoard() {
        let board = "";
        let rowStartWithColor = 'white';
        for (let i = 0; i < this.config.rows.length; i++) {
            let row = "";
            if (rowStartWithColor == 'white') {
                row = this.generateRow(rowStartWithColor, this.config.rows[i]);
                rowStartWithColor = 'black';
            } else {
                row = this.generateRow(rowStartWithColor, this.config.rows[i]);
                rowStartWithColor = 'white';
            }
            board += row;
        }
        return `<table>${board}</table>`;
    },

    /**
     * метод генерирует тег <tr> с закрашенными ячейками <td>
     * @param {string} startWithColor цвет начала строки "white" или "black"
     * @param {number} rowNum номер строки от 8 до 1
     * @return {string} оформленная html разметка
     */
    generateRow(startWithColor, rowNum) {
        let currentColorClass = startWithColor;
        let row = "";
        for (let i = 0; i < this.config.cols.length; i++) {
            let field = "";
            if (currentColorClass === "white") {
                field = this.generateField("white", rowNum, this.config.cols[i]);
                currentColorClass = "blackField";
            } else {
                field = this.generateField("black", rowNum, this.config.cols[i]);
                currentColorClass = "white";
            }
            row += field;
        }
        return `<tr>${row}</tr>`;
    },

    /**
     * метод генерирует ячейку <td> с атрибутами координат и нужным классом цвета
     * @param {string} color цвет ячейки "white" или "black".
     * @param {number} rowNum цифровая координата ячейки
     * @param {string} colChar буквенная координата ячейки
     * @return {string} html с атрибутами координат и классом цвета
     */
    generateField(color, rowNum, colChar) {
        return `<td data-rownum="${rowNum}" data-colchar="${colChar}" class="${color}"></td>`;
    },

    /**
     * метод добавлет колонку слева, с указанием номера строки
     */
    insertRowsNumber() {
        let trs = document.querySelectorAll("tr");
        for (let i = 0; i < trs.length; i++) {
            let td = document.createElement("td");
            td.innerText = this.config.rows[i];
            trs[i].insertAdjacentElement("afterbegin", td);
        }
    },

    /**
     * Метод создает строку (tr)  с названием колонок и создает пустую ячейку под цифрами
     */
    insertColsChars() {
        let tr = document.createElement("tr");
        tr.innerHTML += "<td></td>";
        for (let i = 0; i < this.config.cols.length; i++) {
            tr.innerHTML += `<td>${this.config.cols[i]}</td>`;
        }
        let tbody = document.querySelector("tbody");
        tbody.insertAdjacentElement("beforeend", tr);
    },

    /**
     * метод вставляет все фигуры на доску, кроме пешек
     */
    insertFiguresOnDesk() {
        for (let i = 0; i < positions.length; i++) {
            let cell = document.querySelector(`[data-rownum="${positions[i].coordRow}"][data-colchar="${positions[i].coordCol}"]`);
            let figure = this.getFigure(positions[i].figure, positions[i].color+"Figure");
            cell.innerHTML = figure;
        }
    },



    /**
     * метод генерирует тег <i> с определенным именем фигуры и классом цвета
     * @param {string} name название шахматной фигуры
     * @param {string} colorClass цвет фигуры
     * @return {string} тег <i> в виде строки
     */
    getFigure(name, colorClass) {
        return `<i class="fas fa-chess-${name} ${colorClass}"></i>`;
    },

    /**
     * Метод вставляет пешки на доску.
     */
    insertPawns() {
        let whitePawnsRow = document.querySelectorAll("tr:nth-child(7) td");
        for (let i = 0; i < whitePawnsRow.length; i++) {
            whitePawnsRow[i].innerHTML = this.getFigure("pawn", "whiteFigure");
        }

        let blackPawnsRow = document.querySelectorAll("tr:nth-child(2) td");
        for (let i = 0; i < blackPawnsRow.length; i++) {
            blackPawnsRow[i].innerHTML = this.getFigure("pawn", "blackFigure");
        }
    },
 };

app.run();