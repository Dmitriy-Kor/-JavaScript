class Status {
    constructor() {
        this.status = 'playing'; //начинаем со статуса "играем"
        // массив с данными что в ячейке
        this.mapValues = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        this.phase = 'X'; // фаза игры
    }

    /**
     * Проверка что мы "играем", что игра не закончена.
     * @returns {boolean} Вернет true, статус игры "играем", иначе false.
     */
    isStatusPlaying() {
        // проверяем статус игры
        return this.status === 'playing';
    }

    /**
     * Ставит статус игры в "остановлена".
     */
    setStatusStopped() {
        this.status = 'stopped';
    }


    /**
     * Меняет фигуру (крестик или нолик).
     */
    togglePhase() {
        // если фаза игы равна Х тогда меняем на 0 иначе X
        this.phase = this.phase === 'X' ? '0' : 'X';
    }
}