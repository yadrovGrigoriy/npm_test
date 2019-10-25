class Bucket {
    constructor() {
        this.volume = 15; // л.
        this.currentVolume = 0;
        this.time = 10; // время за которое необходимо заполнить ведро (с)
    }

    isFull(  ) {
        return this.currentVolume === this.volume;
    }
    
}

export default Bucket