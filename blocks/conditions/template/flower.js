


module.exports.condition = (x, y) => {
    return dataHistory[x + ':' + y] == undefined && dataHistory[x + ':' + (y + 16)] != undefined;  
}