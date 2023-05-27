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
        this.body.maxVelocity.x = 800;
        this.body.maxVelocity.y = 1000;
        this.body.acceleration.x = 0;
        this.canThrust = true;
        this.energy = 300
        this.maxEnergy = this.energy;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.airStatus = true;
        this.goingDown = false;
    }
    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        //made as QWERTY, configured in AZERTY
        const { left, right, up, down, space } = this.cursors;
        const wKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        const aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        const sKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        const dKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        if (space.isDown && sKey.isDown) {
            this.goingDown = true;
        } else {
            this.goingDown = false
        }


        if (this.body.blocked.down) {
            this.groundMovements(left, right, up, down, space, wKey, aKey, sKey, dKey);
            if (this.energy < 300) {
                this.energy += 1;
                if (this.energy < 0) {
                    this.energy = 0
                }
            }
            this.airStatus = false;
        } else {
            this.delayedEvent = this.scene.time.delayedCall(400, () => {
                this.airStatus = true;
            });
        }


        if (this.airStatus) {
            this.airMovements(left, right, up, down, space, wKey, aKey, sKey, dKey);
        }
        //Animations
        this.animate();

    }

    groundMovements(left, right, up, down, space, wKey, aKey, sKey, dKey) {
        if (left.isDown || right.isDown || aKey.isDown || dKey.isDown) {
            if (left.isDown || aKey.isDown) {
                if (this.body.velocity.x > 0) {
                    this.body.acceleration.x = -2400;
                }
                else {
                    this.body.acceleration.x = -800;
                }
            }
            if (right.isDown || dKey.isDown) {
                if (this.body.velocity.x < 0) {
                    this.body.acceleration.x = 2400;
                } else {
                    this.body.acceleration.x = 800;
                }
            }

        } else if (this.body.velocity.x >= 100) {
            this.body.acceleration.x -= 100;
        } else if (this.body.velocity.x <= - 100) {
            this.body.acceleration.x += 100;
        } else if (-20 < this.body.velocity.x < 20) {
            //ground friction
            this.setVelocityX(0);
            this.body.acceleration.x = 0;
        }
        if (this.body.blocked.right || this.body.blocked.left) {
            this.body.acceleration.x = 0
        }

        //jump
        if ((space.isDown || wKey.isDown) && sKey.isUp) {
            this.body.acceleration.y = -700;
            this.setVelocityY(this.body.acceleration.y);
        } else {
            this.body.acceleration.y = 0;
        }
    }

    airMovements(left, right, up, down, space, wKey, aKey, sKey, dKey) {
        this.body.acceleration.y += 20;
        if ((space.isDown || wKey.isDown) && sKey.isUp && this.canThrust && (this.body.velocity.y > 0) && this.energy > 0) {
            this.body.velocity.y = this.body.velocity.y / 2
            this.energy -= 1;
        }
        if ((left.isDown || aKey.isDown) || (right.isDown || dKey.isDown)) {
            if ((left.isDown || aKey.isDown) && this.body.acceleration.x > -400) {
                this.body.acceleration.x -= 60;
            }
            if ((right.isDown || dKey.isDown) && this.body.acceleration.x < 400) {
                this.body.acceleration.x += 60;
            }
        }
        //air friction
        else if (this.body.velocity.x > 5) {
            this.body.acceleration.x -= 5;
        }
        else if (this.body.velocity.x < -5) {
            this.body.acceleration.x += 5;
        } else if (-5 < this.velocityX < 5) {
            //ground friction
            this.body.acceleration.x = 0;
        }
        if (this.body.blocked.right || this.body.blocked.left) {
            this.body.acceleration.x = 0
        }
        this.setVelocityX(this.body.acceleration.x);

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
        console.log(value)
        this.hp -= value;
    }

}
export default Player;