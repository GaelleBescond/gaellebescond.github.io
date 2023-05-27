import Weapon from "./gun.js";
class Rifle extends Weapon {

    constructor(scene, x, y) {
        super(scene, x, y,);
    }

    init() {
        this.bulletVelocity = 2500;
        this.damage = 2;
        this.consumption = 10
        this.weaponCooldown = 100;
        this.weaponCanShoot = true;
        this.projectilesPerShoot = 3;
        this.camZoom = 0.55;
        this.name = "Rifle";
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
    }
    animate(bool) {
        if (bool) {
            this.play('rifle_effects', true).setFlipX(bool);
            this.play('rifle_effects', true).setFlipY(bool);
        }
        else {
            this.play('rifle_effects', true).setFlipX(!bool);
            this.play('rifle_effects', true).setFlipY(bool);
        }
    }

}

export default Rifle;