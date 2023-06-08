class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this); //Add object to scene
        scene.physics.add.existing(this); //Gives physics to body 
        this.init();
        this.initEvents();
    }

    init() {
        //Variables for player
        this.facing = false;
        this.hp = 100;
        this.maxhp = this.hp;
        this.canMove = true;
        this.body.maxVelocity.x = 1200;
        this.body.maxVelocity.y = 1000;
        this.body.acceleration.x = 0;
        this.canThrust = true;
        this.energy = 350
        this.energy = this.energy
        this.maxEnergy = this.energy;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.airStatus = true;
        this.goingDown = false;
        this.iFrame = false;
        this.body.setDamping(true)
        this.body.setDrag(0.005, 1)
    }
    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        //made as QWERTY, configured in AZERTY
        const { left, right, up, down, space } = this.cursors;
        const aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        const sKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        const dKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        if (space.isDown && sKey.isDown) {
            this.goingDown = true;
        } else {
            this.goingDown = false
        }
        if ((this.energy < this.maxEnergy) && ((aKey.isUp && dKey.isUp && sKey.isUp) || this.body.blocked.down) && space.isUp) {
            this.energy += 1;
            if (this.energy < 0) {
                this.energy = 0
            }
        }

        if (this.body.blocked.down) {
            this.groundMovements(left, right, up, down, space, aKey, sKey, dKey);
            this.body.setDrag(0.005, 1)


            this.airStatus = false;
        } else {
            this.delayedEvent = this.scene.time.delayedCall(400, () => {
                this.airStatus = true;
            });
        }


        if (this.airStatus) {
            this.airMovements(left, right, up, down, space, aKey, sKey, dKey);
            this.body.setDrag(0.25, 1.5)
        }
        //Animations
        this.animate();
    }

    groundMovements(left, right, up, down, space, aKey, sKey, dKey) {
        if (aKey.isDown) {
            this.body.acceleration.x = -2400;
        } else if (dKey.isDown) {
            this.body.acceleration.x = 2400;
        } else { this.body.acceleration.x = 0; }

        if ((this.body.blocked.right || this.body.blocked.left)) {
            this.body.acceleration.x = 0
        }

        //jump
        if (space.isDown && sKey.isUp) {
            this.body.acceleration.y = -575;
            this.setVelocityY(this.body.acceleration.y);
        } else {
            this.body.acceleration.y = 0;
        }
    }


    airMovements(left, right, up, down, space, aKey, sKey, dKey) {
        let accel = 120





        if (this.canThrust && this.energy > 0) {
            if (space.isDown && sKey.isUp && this.body.velocity.y > 0) {
                this.energy -= 1;
                this.body.velocity.y = this.body.velocity.y / 2
            }
            if (aKey.isDown) {
                this.energy -= 1;
                this.body.acceleration.x -= accel;
            } else if (dKey.isDown) {
                this.energy -= 1;
                this.body.acceleration.x += accel;
            } else {
                this.body.acceleration.x = 0;
            }
        } else if (aKey.isDown) {
            this.body.acceleration.x -= accel / 4;
        } else if (dKey.isDown) {
            this.body.acceleration.x += accel / 4;
        } else {
            this.body.acceleration.x = 0;
        }

    }

    animate() {
        //create a variable containing previous accel to create slide effects
        //create walk animation
        //fix backwards animation
        if (this.body.blocked.down) {
            if (this.body.velocity.x > 20) {
                if (this.facing) {
                    this.play('player_backwards_right', true).setFlipX(this.facing);
                } else {
                    this.play('player_run_right', true).setFlipX(this.facing);
                }
            } else if (this.body.velocity.x < -20) {
                if (this.facing) {
                    this.play('player_run_right', true).setFlipX(this.facing);
                } else {
                    this.play('player_backwards_right', true).setFlipX(this.facing);
                }
            } else {
                this.play('player_idle_right', true).setFlipX(this.facing);
            }
        } else {
            if (this.body.velocity.y < 0) {
                this.play('player_jump_right', true).setFlipX(this.facing);
            } else {
                this.play('player_fall_right', true).setFlipX(this.facing);
            }
        }
    }

    loseHP(value) {
        if (!this.iFrame) {
            this.hp -= value;
            this.iFrame = true
            this.setTint(0xFF0000)
            this.delayedEvent = this.scene.time.delayedCall(500, () => {
                this.iFrame = false;
                this.setTint()
            });
        }
    }

}
export default Player;