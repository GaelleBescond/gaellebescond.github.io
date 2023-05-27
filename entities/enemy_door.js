

import Enemy from "./enemy.js";
class Door extends Enemy {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
    }

    init() {
        this.hp = 17;
        this.name = "door"
    }
    update() {
        if (this.body) {
        
        }
    }
}

export default Door;