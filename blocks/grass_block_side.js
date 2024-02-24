
class Block  {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    async tick() {
        if (dataHistory[this.x + ':' + (this.y - 16)] != undefined) {
            delete tick[this.x + ':' + this.y];
            delete dataHistory[this.x + ':' + this.y];

            dataHistory[this.x + ':' + this.y] = {
                x: this.x,
                y: this.y,
                color: config.directory.blocks + '/dirt.png'
            };

            utils.game.removeanddraw(utils.util.remdraw(this.x, this.y, this.x, this.y, config.directory.blocks + '/dirt.png'));
            delete this;
        }
    }

}

module.exports = Block;