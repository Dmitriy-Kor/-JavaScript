const player = {
    x: 0,
    y: 0,
    // получает объект
    move(nextPoint) {
        this.x = nextPoint.x;
        this.y = nextPoint.y;
    },
}