

import Enemy from "./enemy.js";
class Practice extends Enemy {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
    }

    init() {
        this.hp = 2;
        this.name = "practice"
        this.stableY = this.body.y;
        this.body.maxVelocity.x = 800;
        this.body.maxVelocity.y = 1000;
    }
    update() {
        if (this.body) {
            this.stabilize();
        }
    }
}

export default Practice;