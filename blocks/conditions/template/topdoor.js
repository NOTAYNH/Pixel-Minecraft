


module.exports.condition = (x, y) => {
    let status = false;
    
    if (dataHistory[x + ':' + (y + 16)] == undefined) {
        status = true;
    }

    return status;  
}