let rendererMap  = {
    map: "",
    render() {
        for (let row = 0; row < config.rowCount; row++){
            for (let col = 0; col < config.colsCount; col++){
                if (row === player.x && col === player.y){
                    this.map += "o ";
                }else {
                    this.map += "x ";
                }
            }
            this.map += "\n";
        }
        console.log(this.map);
    },
    clear(){
        console.clear();
        this.map = "";
    }
};