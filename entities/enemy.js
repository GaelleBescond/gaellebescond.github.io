class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this); //Add object to scene
        scene.physics.add.existing(this); //Gives physics.body 
        this.init();
        this.initEvents();
    }

    init() {
        //Variables for enemy
        this.hp = 10;
        this.canMove = true;
        this.canShoot = false;
        this.cooldown = 0;
        this.body.maxVelocity.x = 800;
        this.body.maxVelocity.y = 1000;
        this.body.acceleration.x = 0;
        this.patrolRange = 0;
        this.lineOfSight = 0;
        this.speed = 0;
        this.body.velocity.x = this.speed;
        this.bulletVelocity = 0;
        this.bulletAngle = 0;
        this.bulletDamage = 0;
        this.name = ""
        this.isOnCooldown = false;
        this.targetInRange = false;


    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {

    }

    loseHP(value) {
        this.hp -= value;
    }

    turnBack() {
        if (this.body.blocked.left || this.body.blocked.right) {
            this.speed = -this.speed
            this.body.setVelocityX(this.speed)
        }
    }

    stabilize() {
        if (this.stableY < this.body.y) {
            this.body.acceleration.y -= 10;
        } else if (this.stableY > this.body.y) {
            this.body.acceleration.y += 10;
        }
        if (Math.abs(this.stableY - this.body.y) < 1) {
            this.body.acceleration.y = 0;
        }
        this.body.setVelocityY(this.body.acceleration.y)
    }

    checkLineOfSight(player) {
        const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
        this.bulletAngle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
        if (distance <= this.lineOfSight / 2) {
            this.targetInRange = true;
        } else {
            this.targetInRange = false;
        }
        if (distance <= this.lineOfSight) {
            this.aggro(player, distance);
        } else if (this.canPatrol) {
            this.patrolMode();
        }
    }


    aggro(player, ) {
        const distance = Phaser.Math.Distance.Between(this.x, 0, player.x, 0);
        this.canPatrol = true
        let way = this.x - player.x;
        if (distance > 1000) {
            if (this.x < player.x) {
                way = 1
            } else {
                way = -1
            }
        } else {
            way = 0
        }
        this.setVelocityX(this.speed * way)

    }
    patrolMode() {
        this.canPatrol = false;
        let way = Phaser.Math.Between(-1, 1);
        if (way > 0) {
            way = 1
        } else {
            way = -1
        }
        this.setVelocityX(this.speed * way)


    }
}



export default Enemy;