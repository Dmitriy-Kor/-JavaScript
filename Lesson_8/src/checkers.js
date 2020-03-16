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