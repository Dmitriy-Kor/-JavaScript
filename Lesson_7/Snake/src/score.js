class Score {
    constructor() {
        this.currentEl = document.querySelector(".current"); // получаем элемент <span> c классом "current" (текущий счет)
        this.toWinEl = document.querySelector(".toWin");  // // получаем элемент <span> c классом "toWin" (счет до победы)
    }

    /**
     * @param {Settings} settings настройки игры
     */
    init(settings) {
        this.settings = settings;
    }

    /**
     * Метод устанавливает количество очков, необходимых
     * для выигрыша.
     * @param {string} text
     */
    setToWin(text) {
        this.toWinEl.textContent = text;
    }
    /**
     * Метод устанавливает текущий счет игрока.
     * @param {string} text
     */
    setCurrent(text) {
        this.currentEl.textContent = text;
    }


}