import Weapon from "./gun.js";
class Sniper extends Weapon {

    constructor(scene, x, y) {
        super(scene, x, y,);
    }

    init() {
        this.bulletVelocity = 4500;
        this.damage = 5;
        this.consumption = 50
        this.weaponCooldown = 200;
        this.weaponCanShoot = true;
        this.projectilesPerShoot = 1;
        this.camZoom = 0.25;
        this.name = "Railgun";

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {

    }

    animate(bool) {

        if (bool) {
            this.play('sniper_effects', true).setFlipX(bool);
            this.play('sniper_effects', true).setFlipY(bool);
        }
        else {
            this.play('sniper_effects', true).setFlipX(!bool);
            this.play('sniper_effects', true).setFlipY(bool);
        }
    }
}

export default Sniper;