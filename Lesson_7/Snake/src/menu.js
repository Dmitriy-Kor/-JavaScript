class Menu {
    constructor() {
        this.startBtnEl = document.getElementById('startBtn'); // получаем кнопку старт
        this.pauseBtnEl = document.getElementById('pauseBtn'); // получаем кнопку пауза
    }

    /**
     * Метод назначает переданные функции в качестве обработчиков
     * событий клика на кнопки "Старт" и "Пауза".
     * @param {Function} startBtnClickHandler
     * @param {Function} pauseBtnClickHandler
     */
    addButtonsClickListeners(startBtnClickHandler, pauseBtnClickHandler) {
        // при клике на кнопку старт запускаем функцию startBtnClickHandler
        this.startBtnEl.addEventListener('click', startBtnClickHandler);
        // // при клике на кнопку пауза запускаем функцию pauseBtnClickHandler
        this.pauseBtnEl.addEventListener('click', pauseBtnClickHandler);
    }

}