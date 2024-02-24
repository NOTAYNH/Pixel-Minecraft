class Block  {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    async tick() {
        if(dataHistory[this.x + ':' + (this.y + 16)] == undefined) {
            
            if (this.y + 16 > (config.map.size) - 1) {
                return;
            }
            
            utils.game.removedraw(this.x, this.y);
        }
    }

}

module.exports = Block;