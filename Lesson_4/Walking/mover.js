let mover = {
    getDirection() {

        const avaibleDirection = ["w", "a", "s", "d","e","q","z","c",];
        while (true) {
            let direction = prompt('введите  (w, a, s, d) для перемещения по горизонтали и вертикале или (q, e, z, c) для движения по диагонали,  для выхода введите "exit"');
            if (direction == "exit"){
                return null;
            }
            if (!avaibleDirection.includes(direction)){
                alert('для перемещения введите  w,a,s,d или q,e,z,c для выхода "exit"');
                continue;
            }
            return direction;
        }
    },
    getNextPosition (direction){
        const nextPosition = {
            x: player.x,
            y: player.y,
        };
        switch (direction) {
            case "d":
                nextPosition.y++;
                break;
            case "w":
                nextPosition.x--;
                break;
            case "s":
                nextPosition.x++;
                break;
            case "a":
                nextPosition.y--;
                break;
            case "e":
                nextPosition.y++;
                nextPosition.x--;
                break;
            case "q":
                nextPosition.y--;
                nextPosition.x--;
                break;
            case "z":
                nextPosition.x++;
                nextPosition.y--;
                break;
            case "c":
                nextPosition.x++;
                nextPosition.y++;
                break;
        }
        return nextPosition;
    },
    canPlayerMove(nextPoint){
        return nextPoint.x >= 0 && nextPoint.x < config.colsCount &&
               nextPoint.y >= 0 && nextPoint.y < config.rowCount;
    }
}