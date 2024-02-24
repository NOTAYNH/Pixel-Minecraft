
class Block  {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    async tick() {
        if (dataHistory[this.x + ':' + (this.y + 16)] != undefined) {
            let bottomName = utils.util.justName(dataHistory[this.x + ':' + (this.y + 16)].color);
            if (bottomName != 'sand' && bottomName != 'cactus') {
                utils.game.removedraw(this.x, this.y);    
            } else {
                if (dataHistory[(this.x + 16) + ':' + this.y] != undefined || dataHistory[(this.x - 16) + ':' + this.y] != undefined) {
                    utils.game.removedraw(this.x, this.y);
                }
            }
        } else {
            utils.game.removedraw(this.x, this.y);
        }
    }

}

module.exports = Block;