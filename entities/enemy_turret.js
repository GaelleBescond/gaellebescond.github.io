import Enemy from "./enemy.js";
class Turret extends Enemy {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
    }

    init() {
        this.hp = 40;
        this.canMove = true;
        this.canShoot = true;
        this.cooldown = 2000;


        this.lineOfSight = 5000;
        this.speed = 0;
        this.body.velocity.x = this.speed;
        this.bulletVelocity = 2500;
        this.bulletAngle = 0;
        this.bulletDamage = 15;
        this.name = "turret"
        this.body.setAllowGravity(false)
        this.isOnCooldown = false;
        this.targetInRange = false;
        this.isHostile = true

    }

    update() {
        if (this.body) {
           

        }

    }

}

export default Turret;