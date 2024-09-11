global.clients = {};
global.dataHistory = {};
global.blocks = [];
global.tick = {};


global.events = {
    draw: {}
};



global.conditionList = require('./blocks/conditions/conditionList');

const fs = require('fs');
const path = require('path');
const afterplace = require('./blocks/afterplace/list');
const replacement = require('./replacement');

const color = require('color');

console.log(color.rgb([5,6,88]) + 'l');

global.config = require('./config');
global.utils = require('./utils');


console.log('Map loading ...');

if (fs.existsSync(path.join(__dirname, '/saves/save.json'))) {
    fs.readFile(path.join(__dirname, '/saves/save.json'), {encoding:'utf-8'}, (err, data) => {
        if (err) throw err;
        delete dataHistory;
        dataHistory = JSON.parse(data);
        
        Object.keys(dataHistory).forEach(key => {
            let data = dataHistory[key];
            
            if (fs.existsSync('./blocks/' + utils.util.justName(data.color) + '.js')) {
                let job = require('./blocks/'+ utils.util.justName(data.color) + '.js');
                let newJob = new job(data.x, data.y);
                
                if (newJob['tick'] != undefined) {
                    tick[data.x + ':' + data.y] = async() => {
                        newJob['tick']();
                    }
                }

            }
        });
    });
}



console.log('map successfully loaded!.');


setInterval(() => {
    fs.writeFile(path.join(__dirname, '/saves/save.json'), JSON.stringify(dataHistory), () => {
    });
}, 14250);


// Tick 120 fps
setInterval(() => {
    
    // blok yaşam döngüleri fonksiyonları çalıştırma
    Object.keys(tick).forEach(async (index) => {
        tick[index]();
    });

    // YAPILACAK: Paketleri gönderme

}, 1000 / 120);

async function main() {

    
    const express = require('express');
    const sckio = require('socket.io');
    const http = require('http');
    
    const app = express();
    const httpServer = http.createServer(app);


    let size = config.map.size;
    let bulkperPixel = ((size * size) / 16) / (size / 4);
    app.use('/', express.static(path.join(__dirname, '/public')));
    
    const io = new sckio.Server(httpServer);

    await new Promise((resolve, reject) => {
        console.log('Loading Blocks ...')
        fs.readdir(path.join(__dirname, '/public/src/blocks'), (err, file) => {
            blocks = file;
            blocks.forEach((v, i) => {
                blocks[i] = '/src/blocks/'+v;
            })
            resolve();
        });
    });
    
    console.log('Başarıyla ' + blocks.length + ' Adet Blok yüklendi.');
    
    
    io.on('connection', (client) => {
        
        clients[client.id] = {
            'emit': async(key, value) => {
                client.emit(key, value);
            }
        }
        
        // data sending.
        async function send() {
            
            await client.emit('loadcount', blocks.length);

            // Load Blocks To Client.
            await blocks.forEach((block) => {
                
                client.emit('load-block', block);
            });
            
            // Load map to client.
            let bulkData = {};
            let counter = 0;
            await Object.keys(dataHistory).forEach(pixelIndex => {
                counter += 1;
                let length =  Object.keys(bulkData).length;
                bulkData[length + 1] = dataHistory[pixelIndex];
                length =  Object.keys(bulkData).length;
                if (Object.keys(dataHistory).length == counter || length >= bulkperPixel) {
                    client.emit('bulk-draw', bulkData);
                    delete bulkData;
                    bulkData = {};
                }

            });

            console.log(counter + '/' + Object.keys(dataHistory).length);

            bulkData = undefined;
            client.emit('done', true);
            
        }
        send();
        
        
        
        client.on('draw', (data) => {

            if (replacement[utils.util.justName(data.color)] != undefined) {
                data.color = replacement[utils.util.justName(data.color)];
            }

            if (utils.game.draw(data) == true) {

                if (afterplace[utils.util.justName(data.color)]) {
                    afterplace[utils.util.justName(data.color)](data.x, data.y);
                }

                Object.keys(clients).forEach(clientId => {
                    clients[clientId].emit('draw', data);
                });
            }
            
        });

        client.on('remove-draw', (data) => {
            if (dataHistory[data.x + ':' + data.y] != undefined) {
                utils.game.removedraw(data.x, data.y);
            }
        });
        
        client.on('message', (data) => {
            Object.keys(clients).forEach(clientId => {
                clients[clientId].emit('new-message', data);
            });
        });

    });
    
    httpServer.listen(80, '0.0.0.0', () => {
        console.log('Listening at 80 port.');
    });
    
}

main();
module.exports.utils = utils;
module.exports.config = config;
