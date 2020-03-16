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