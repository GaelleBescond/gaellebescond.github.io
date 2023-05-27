class Weapon extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this); //Add object to scene
        //   this.setPipeline('Light2D');
        this.init();
        this.initEvents();
    }

    init() {
        this.bulletVelocity = 0;
        this.weaponCooldown = 0;
        this.ammoConsumption = 0
        this.weaponCanShoot = true;
        this.projectilesPerShoot = 0;
        this.splashRadius = 0;
        this.splashDamage = 0;
        this.camZoom = 0;
        this.name = "gun";
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

}

export default Weapon;