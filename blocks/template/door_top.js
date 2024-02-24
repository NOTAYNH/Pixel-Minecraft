class Block {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.doorName = utils.util.justName(dataHistory[this.x + ':' + this.y].color);
    }

    

    async tick() {
        

        if(dataHistory[this.x + ':' + (this.y + 16)] != undefined) {

            if (this.y + 16 < 1) {
                utils.game.removedraw(this.x, this.y);
                return;
            }
            
            let bottomNameSplit = utils.util.justName(this.doorName).split('_');
            let bottomNameModified = bottomNameSplit[0] + '_' + bottomNameSplit[1] + '_bottom';

            if (utils.util.justName(dataHistory[this.x + ':' + (this.y + 16)].color) != bottomNameModified) {
                utils.game.removedraw(this.x, this.y);
            }

        } else {
            utils.game.removedraw(this.x, this.y);
        }
    }

}

module.exports = Block;