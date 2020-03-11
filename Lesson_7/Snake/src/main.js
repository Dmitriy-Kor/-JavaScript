// ждем пока загрузится
window.addEventListener("load", () => {

    // создаем объекты
    const settings = new Settings(); // конструируем настройки
    const status = new Status(); // создаем объект статуса
    const snake = new Snake(); // создаем объект змейки
    const board = new Board(); // создаем объект игрового поля
    const food = new Food(); // создаем объект еды
    const menu = new Menu(); // создаем объект меню
    const game = new Game(); // создаем объект игры
    const score = new Score(); // создаем объект счета

    settings.init({speed: 5, winLength: 10}); // передаем настройки в настройки
    snake.init(settings);
    board.init(settings, snake); // вызываем метод для получения объектов настройки и змейки
    food.init(settings, snake, board); // передаем настройки для еды
    game.init(settings, status, board, snake, menu, food, score);
    score.init(settings);

    board.renderBoard(); // отрисовываем поле
    board.renderSnake(); // отрисовываем змейку

    food.setNewFood(); // метод ставит еду на поле
    game.initEventListener();
});