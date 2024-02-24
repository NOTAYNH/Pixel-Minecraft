
const index = require('../index');


class Block {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.died = false;
        this.explodeStep = 0;
    }

    checkRedstone() {
        let status = false;
            let top = dataHistory[this.x + ':' + (this.y + 16)];
            let bottom = dataHistory[this.x + ':' + (this.y - 16)];
            let left = dataHistory[(this.x - 16) + ':' + this.y];
            let right = dataHistory[(this.x + 16) + ':' + this.y];

            if (top != undefined) {
                if (utils.redstoneList.includes(top.color)) {
                    status = true;
                }
            }
            if (bottom != undefined) {
                if (utils.redstoneList.includes(bottom.color)) {
                    status = true;
                }
            }
            if (left != undefined) {
                if (utils.redstoneList.includes(left.color)) {
                    status = true;
                }
            }
            if (right != undefined) {
                if (utils.redstoneList.includes(right.color)) {
                    status = true;
                }
            }
        return status;
    }

    tick() {
        if (this.explodeStep != 0 || this.checkRedstone() == true) {
            console.log( this.checkRedstone() );
            switch(this.explodeStep) {
                case 0:
                    this.explodeStep = 1;
                    Object.keys(clients).forEach(key => {
                        clients[key].emit('remove&draw', utils.remdraw(this.x, this.y, this.x, this.y, config.directory.block_variants + '/tnt_flash.png'));
                    });
                    break;
                case 1:
                    this.explodeStep = 2;
                    Object.keys(clients).forEach(key => {
                        clients[key].emit('remove&draw', utils.remdraw(this.x, this.y, this.x, this.y, config.directory.blocks + '/tnt.png'));
                    });
                    break;
                case 2:
                    this.explodeStep = 3;
                    Object.keys(clients).forEach(key => {
                        clients[key].emit('remove&draw', utils.remdraw(this.x, this.y, this.x, this.y, config.directory.block_variants + '/tnt_flash.png'));
                    });
                    break;
                case 3:
                    let removedata = [];


                    function removeandPush(x, y) {
                        if (dataHistory[x + ':' + y] != undefined) {
                            delete dataHistory[x + ':' + y];
                            removedata.push({x, y});
                        }
                    }


                    // tnt'yi silme
                    removeandPush(this.x, this.y);

                    // belirli etrafı silme
                    for (let x = 0; x < (64 + 16); x+=16) {    
                        removedata.push({x: this.x-x, y: this.y});
                        removedata.push({x: this.x+x, y: this.y});
                        for (let y = 0; y < (64 + 16); y+=16) {
                            removeandPush(this.x-x, this.y+y);
                            removeandPush(this.x-x, this.y-y);
                            removeandPush(this.x+x, this.y+y);
                            removeandPush(this.x+x, this.y-y);
                        }
                    
                    
                    }
                

                    
                    Object.keys(index.clients).forEach(key => {
                        index.clients[key].emit('bulk-remove-draw', removedata);
                    });
                    break;

            }
        }
        
    }

    tickComplete() {}

}

module.exports = Block;