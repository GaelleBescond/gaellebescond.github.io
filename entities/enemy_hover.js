//make hover effects on spritesheet creation

import Enemy from "./enemy.js";
class Hover extends Enemy {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
    }

    init() {
        this.hp = 20;
        this.canMove = true;
        this.canShoot = true;
        this.cooldown = 3000;
        this.body.maxVelocity.x = 800;
        this.body.maxVelocity.y = 1000;
        this.body.setAllowGravity(false)
        this.patrolRange = 0;
        this.lineOfSight = 5000;
        this.stableY = this.body.y;
        this.speed = 500;
        this.body.velocity.x = this.speed;
        this.name = "hover"
        this.bulletVelocity = 1500;
        this.bulletAngle = 0;
        this.bulletDamage = 25;
        this.isOnCooldown = false;
        this.targetInRange= false;
    }

    update() {
        if (this.body) {
            this.stabilize();
            this.turnBack();
        }

    }

}

export default Hover;