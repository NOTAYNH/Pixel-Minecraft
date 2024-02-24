

let fs = require('fs');
let path = require('path');

class util {
    constructor() {}
    justName(str) {
        let paths = str.split('/');
        let fileName = paths[Object.keys(paths).length - 1];
        // console.log('Koyulan blok adı: ' + fileName.split('.')[0]);
        return fileName.split('.')[0];
    }
    remdraw(x, y, x1, y1, color) {
        return [
            {x: x, y: y},
            {x: x1, y: y1, color: color}
        ];
    }
}

let utils = new util();

class game {
    removedraw(x, y){
        Object.keys(clients).forEach(i => {
            delete dataHistory[x + ':' + y];
            delete tick[x + ':' + y];
            clients[i].emit('remove-draw', {x, y});
            
        });
    }

    removeanddraw(data) {
        Object.keys(clients).forEach(i => {
            clients[i].emit('remove&draw', data);
        });
    }

    draw(data) {
        if (conditionList.list[utils.justName(data.color)]) {
            let x = conditionList.list[utils.justName(data.color)](data.x, data.y);
            if (x == false) {
                return false;
            }
        }

        if (dataHistory[data.x + ':' + data.y] != undefined) {
            if (dataHistory[data.x + ':' + data.y].color == data.color) {
                return;
            }
        }

        dataHistory[data.x + ':' + data.y] = data;

        if (fs.existsSync(path.join(__dirname, '/blocks/' + utils.justName(data.color) + '.js'))) {
            let job = require('./blocks/'+ utils.justName(data.color) + '.js');

            let newJob = new job(data.x, data.y);

            // tick job registering:
            if (newJob['tick'] != undefined) {
                tick[data.x + ':' + data.y] = async() => {
                    newJob['tick']();
                };
            }

            // draw event registering:
            if (newJob['draw'] != undefined) {
                events.draw[data.x + ':' + data.y] = async() => {
                    newJob['draw']();
                };
            }

        }

        return true;
    }
}

module.exports.redstoneList = [
    'redstone_block', 'redstone_torch'
];

module.exports.util = utils;

module.exports.game = new game();