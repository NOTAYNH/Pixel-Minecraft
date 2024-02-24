class Block {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.doorName = utils.util.justName(dataHistory[this.x + ':' + this.y].color);
    }

    

    async tick() {
        

        if(dataHistory[this.x + ':' + (this.y - 16)] != undefined) {

            if (this.y - 16 < 1) {
                utils.game.removedraw(this.x, this.y);
                return;
            }
            
            let topNameSplit = utils.util.justName(this.doorName).split('_');
            let topNameModified = topNameSplit[0] + '_' + topNameSplit[1] + '_top';

            if (utils.util.justName(dataHistory[this.x + ':' + (this.y - 16)].color) != topNameModified) {
                utils.game.removedraw(this.x, this.y);
            }

        } else {
            utils.game.removedraw(this.x, this.y);
        }
        
    }

}

module.exports = Block;