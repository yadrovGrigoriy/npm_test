import { roundFloat } from './util';

export default class BottlingBox {
    constructor(barrels = [], params) {
        this.barrels = barrels;
        this.params = params;
        this.curentBarrelIndex = 0;
        this.currentBarrel = this.barrels[this.curentBarrelIndex];
        
    }
    launch(barrel = this.currentBarrel) {
        if (!barrel) return;
        console.log('-------------------------');
        console.log(`Бочка № ${this.curentBarrelIndex + 1} - ${roundFloat(barrel.volume)} литров.`, barrel.useVolume !== 0 ? `Использовано:${roundFloat(barrel.useVolume)} л` : '');
        console.log('-------------------------');

        this.curentBarrelIndex++
        while (!barrel.isEmpty()) {
            const res = barrel.bottling(this.params, ); //не заполненое ведро
            if (res !== undefined) {
                this.nextBarrel();
                let newBarrel = this.currentBarrel;
                if (newBarrel) {
                    newBarrel = barrel.addToBucket(newBarrel, res);
                    this.info(barrel)
                    this.launch(newBarrel);
                    return
                }
            }
        }
        this.nextBarrel();
        this.info(barrel)
        if(this.currentBarrel !== undefined){
            this.launch();
        }
        
    }

    nextBarrel() {
        this.currentBarrel = this.barrels[this.curentBarrelIndex];
    }

    info(barrel) {
        console.log(`Бочка № ${this.curentBarrelIndex } - Налито успешно: ${barrel.bucketCounter}. Провальный налив: ${roundFloat(barrel.lostVolume)} литров. `);
    }
}
