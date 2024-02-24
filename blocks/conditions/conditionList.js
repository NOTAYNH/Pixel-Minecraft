let flowerJs = require('./template/flower');
let cactusJS = require('./template/cactus');
let topdoorJS = require('./template/topdoor');

module.exports.list = {
    
    // FlowerJS

        // Saplings
        'acacia_sapling': flowerJs.condition,
        'birch_sapling': flowerJs.condition,
        'cherry_sapling': flowerJs.condition,
        'dark_oak_sapling': flowerJs.condition,
        'jungle_sapling': flowerJs.condition,
        'oak_sapling': flowerJs.condition,
        'spruce_sapling': flowerJs.condition,


        // Other Flowers
        'kelp': flowerJs.condition,
        'dead_bush': flowerJs.condition,
        'sugar_cane': flowerJs.condition,

        // Flowers
        'allium': flowerJs.condition,
        'azure_bluet': flowerJs.condition,
        'blue_orchid': flowerJs.condition,
        'cornflower': flowerJs.condition,
        'dandelion': flowerJs.condition,
        'lily_of_the_valley': flowerJs.condition,
        'orange_tulip': flowerJs.condition,
        'oxeye_daisy': flowerJs.condition,
        'pink_tulip': flowerJs.condition,
        'poppy': flowerJs.condition,
        'torchflower': flowerJs.condition,
        'wither_rose': flowerJs.condition,
        'white_tulip': flowerJs.condition,


        // Bottom Flowers
        'rose_bush_bottom': flowerJs.condition,
        'sunflower_bottom': flowerJs.condition,

        // Top Flowers
        'rose_bush_top': (x, y) => {

            if (flowerJs.condition(x, y) == false) {
                return false;
            }

            if (utils.util.justName(dataHistory[x + ':' + (y + 16)].color) == 'rose_bush_bottom') {
                return true;
            } return false;
        },

        // Mushrooms
        'brown_mushroom': flowerJs.condition,
        'crimson_fungus': flowerJs.condition,
        'red_mushroom': flowerJs.condition,
        'warped_fungus': flowerJs.condition,

        // Torch
        'torch': flowerJs.condition,
        'soul_torch': flowerJs.condition,
        'redstone_torch': flowerJs.condition,
        'redstone_torch_off': flowerJs.condition,

        // Cake
        'cake': flowerJs.condition,
        'cake_inner': flowerJs.condition,

    // FlowerJS


    // CactusJS
        'cactus': cactusJS.condition,


    // DoorJS

        // Top Doors
        'acacia_door_top': topdoorJS.condition
        

    // DoorJS


}