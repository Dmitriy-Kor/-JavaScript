// запускаем игру при полной загрузке
window.addEventListener("load",function () {
    const game = new Game(); // создаем объект
    const board = new Board();
    const  status = new Status();

    board.init(game, status); //объявляем метод чтобы взять нужные данные
    game.init(status, board);

    board.renderMap(); // объявляем метод генерирует поле
    board.initEventHandlers(); // объявляем метод обработки события
});