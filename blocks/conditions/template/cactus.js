


module.exports.condition = (x, y) => {
    let status = false;
    
    if (dataHistory[x + ':' + (y + 16)] != undefined) {
        let bottomName = utils.util.justName(dataHistory[x + ':' + (y + 16)].color);
        if (bottomName == 'sand' || bottomName == 'cactus') {
            if (dataHistory[(x - 16) + ':' + y] != undefined || dataHistory[(x + 16) + ':' + y] != undefined) {
                status = false;
            } else {
                status = true;
            }
        }
        
    }

    return status;  
}