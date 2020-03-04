let game = {

    run() {
        while (true) {
            const direction = mover.getDirection();
            if (direction === null) {
                console.log("игра окончена");
                return;
            }
            const nextPoint = mover.getNextPosition(direction);
            if (mover.canPlayerMove(nextPoint)){
                rendererMap.clear();
                player.move(nextPoint);
                rendererMap.render();
            }
        }

    },

    init() {
     console.log("ваше положение на поле в виде о");
     rendererMap.render();
     console.log("Чтобы начать игру напишите game.run() и нажмите Enter.")
    }
};

game.init();