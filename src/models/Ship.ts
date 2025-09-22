class Ship {
    name: string;
    size: number;
    positions: Array<string>;
    hits: number;

    constructor(name: string, size: number) {
        this.name = name;
        this.size = size;
        this.positions = [];
        this.hits = 0;
    }

    addPosition(position: string) {
        this.positions.push(position);
    }
 
    hit() {
        this.hits++;
    }

    isSunk(): boolean {
        return this.hits >= this.size;
    }
}

export default Ship;