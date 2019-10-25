import Bucket from './Bucket';
import { roundFloat } from './util';

export default class Barrel {
    constructor(volume) {
        this.fullVolume = 150; // л.
        this.volume = volume; // л.
        this.useVolume = 0
        this.lostVolume = 0; // л.
        this.bucketCounter = 0;
        this.maxBucketCounter = 9;
        this.bottlingCounter = 0;
        this.error = {
            coefficient: 1
        };
    }

    bottling(params) {
        for (let i = 1; this.bucketCounter < 9; i++) {
            this.bottlingCounter++;
            try {
                let bucket = new Bucket();
                const steps = this.paramsHandler(params, bucket);

                //выполнение этапов налива
                let leftTime = bucket.time;
                for (let j = 0; j < steps.length; j++) {
                    //--------------------
                    this.errorEmulation(i, j);
                    //--------------------
                    if (this.volume < steps[j].volume) {
                        bucket.currentVolume += this.volume;
                        this.volume -= this.volume;
                        break;
                    }
                    const timeStep = this.coutingTime(steps[j]);
                    if (timeStep < leftTime) {
                        bucket.currentVolume += steps[j].volume;
                        this.volume -= steps[j].volume;
                        leftTime -= timeStep;
                    } else {
                        bucket.currentVolume += (steps[j].velocity / this.error.coefficient) * leftTime;
                        this.volume -= (steps[j].velocity / this.error.coefficient) * leftTime;
                    }
                }

                //----------------------------------------

                if (bucket.isFull()) {
                    this.bucketCounter++;
                    console.log(`Налив № ${this.bottlingCounter} - успешно`);
                } else {
                    if (this.isEmpty()) {
                        return bucket;
                    }
                    if (this.error.coefficient !== 1) {
                        this.lostVolume += bucket.currentVolume;
                        this.clearErrors();
                        throw `Налив № ${this.bottlingCounter} - таймаут. Налито ${roundFloat(bucket.currentVolume)} литров`;
                    }
                }
            } catch (err) {
                console.log(err);
            }
          
        }
       
    }

    addToBucket(barrel, bucket) {
        barrel.useVolume += bucket.volume - bucket.currentVolume;
        barrel.volume -= bucket.volume - bucket.currentVolume;
        bucket.currentVolume += bucket.volume - bucket.currentVolume;
        if (bucket.isFull()) {
            this.bucketCounter++;
            console.log(`Налив № ${this.bottlingCounter} - успешно`);
            return barrel;
        } 
        return 
    }

    isEmpty() {
        return this.volume === 0 || this.bucketCounter === this.maxBucketCounter;
    }

    coutingTime(step) {
        return step.volume / (step.velocity / this.error.coefficient);
    }
    paramsHandler(props, bucket) {
        return [
            {
                volume: props.volume_1,
                velocity: props.velocity_1
            },
            {
                volume: props.volume_2,
                velocity: props.velocity_2
            },
            {
                volume: bucket.volume - (props.volume_1 + props.volume_2),
                velocity: props.velocity_3
            }
        ];
    }
    errorEmulation(i, j) {
        if (i === Math.floor(Math.random() * Math.floor(10)) && j === Math.floor(Math.random() * Math.floor(3))) {
            console.log('Засор в узле налива');
            this.error.coefficient = 3;
        }
    }

    clearErrors() {
        this.error.coefficient = 1;
    }
}
