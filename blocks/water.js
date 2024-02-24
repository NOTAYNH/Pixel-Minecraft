let config = require('../config');
class Block  {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    async tick() {
        if (dataHistory[this.x + ':' + (this.y - 16)] != undefined) {
            let bottomName = utils.util.justName(dataHistory[this.x + ':' + (this.y - 16)].color);
            if (bottomName == 'water-full' || bottomName == 'water') {
                
                let data =  dataHistory[this.x + ':' + this.y];
                data.color = config.directory.block_variants + '/water-full.png';
                delete dataHistory[this.x + ':' + this.y];
                delete tick[this.x + ':' + this.y];
                dataHistory[this.x + ':' + this.y] = data;


                utils.game.removeanddraw(utils.util.remdraw(this.x, this.y, this.x, this.y, config.directory.block_variants + '/water-full.png'));
                delete this;
            
            }
        }
    }

}

module.exports = Block;