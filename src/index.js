import Barrel from './Barrel';
import BottlingBox from './BottlingBox';
import { randomNum } from './util';

const N = 2; //количество бочек

const params = {
    volume_1: 6, // объем заполнения 1 этапа (л) 
    volume_2: 3, // объем заполнения 2 этапа (л) 
    velocity_1: 2, // скорость заполнения 1 этапа (л/c) 
    velocity_2: 2, // скорость заполнения 2 этапа (л/c) 
    velocity_3: 2 // скорость заполнения 3 этапа (л/c) 
};

const barrels = (function(countBarrels) {
    const barrels = [];
    while (countBarrels !== 0) {
        barrels.push(new Barrel(randomNum(135, 140)));
        countBarrels--;
    }
    return barrels;
})(N);

const bottlingBox = new BottlingBox(barrels, params);
bottlingBox.launch();
