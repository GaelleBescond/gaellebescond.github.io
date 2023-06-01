import Weapon from "./gun.js";
class Mortar extends Weapon {

    constructor(scene, x, y) {
        super(scene, x, y,);
    }

    init() {
        this.bulletVelocity = 1500;
        this.damage = 25;
        this.consumption = 125
        this.weaponCooldown = 1000;
        this.weaponCanShoot = true;
        this.projectilesPerShoot = 1;
        this.splashRadius = 500;
        this.splashDamage = 10;
        this.camZoom = 0.35;
        this.name = "Mortar";

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {

    }
    animate(bool) {
        if (bool) {
            this.play('mortar_effects', true).setFlipX(bool);
            this.play('mortar_effects', true).setFlipY(bool);
        }
        else {
            this.play('mortar_effects', true).setFlipX(!bool);
            this.play('mortar_effects', true).setFlipY(bool);
        }
    }

}

export default Mortar;