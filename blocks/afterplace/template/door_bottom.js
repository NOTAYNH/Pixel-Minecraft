module.exports = function(x, y) {

    let doorNameSplit = utils.util.justName(dataHistory[x + ':' + y].color).split('_');
    let doorName = doorNameSplit[0] + '_' + doorNameSplit[1];
    let bottomDoorDirectory = "/src/blockvariants/" + doorName + '_bottom.png';
    if (dataHistory[x + ':' + (y + 16)] != undefined) {
        if (utils.util.justName(dataHistory[x + ':' + (y + 16)].color) != (doorName + '_bottom') ) {
            utils.game.removeanddraw(utils.util.remdraw(x, (y + 16), x, (y + 16), bottomDoorDirectory));
        }
    } else {
        
        let dataPackage = {
            x: x,
            y: (y + 16),
            color: bottomDoorDirectory
        };

        utils.game.draw(dataPackage);

        Object.keys(clients).forEach(key => {
            clients[key].emit('draw', dataPackage);
        });

    }
}