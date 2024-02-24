class Block {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.last = Date.now();
    }

    

    async tick() {
        if(dataHistory[this.x + ':' + (this.y + 16)] == undefined) {

            if (this.y + 16 > (config.map.size) - 1) {
                return;
            }

            if ((Date.now() - this.last) > 125) {
                
                this.last = Date.now();
                let color = dataHistory[this.x + ':' + this.y].color;
                delete dataHistory[this.x + ':' + this.y];
                delete tick[this.x + ':' + this.y];
        
                this.y = this.y + 16;
                
                dataHistory[this.x + ':' + this.y] = {
                    x: this.x,
                    y: this.y,
                    color: color
                };
    
                tick[this.x + ':' + this.y] = async() => {
                    this.tick();
                };
    
                let self = dataHistory[this.x + ':' + this.y];

                utils.game.removeanddraw(utils.util.remdraw(this.x, (this.y - 16), self.x, self.y, self.color));
                
            }


        }
    }

}

module.exports = Block;