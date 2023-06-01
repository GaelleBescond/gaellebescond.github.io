import Enemy from "./enemy.js";
class Tank extends Enemy {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
    }

    init() {
        this.hp = 30;
        this.canMove = true;
        this.canShoot = true;
        this.cooldown = 2000;
        this.body.maxVelocity.x = 800;
        this.body.maxVelocity.y = 1000;
        this.lineOfSight = 3000;
        this.speed = 300;
        this.body.velocity.x = this.speed;
        this.bulletVelocity = 4500;
        this.bulletAngle = 0;
        this.bulletDamage = 15;
        this.name = "tank"
        this.isOnCooldown = false;
        this.targetInRange= false;
    }

    update() {
        if (this.body) {
            this.turnBack();
        }
    }

}

export default Tank;