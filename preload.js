class Preload extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {
        //Images
        this.load.image('enemy_soldier', 'assets/enemy_soldier.png');
        this.load.image('enemy_tank', 'assets/enemy_tank.png');
        this.load.image('enemy_turret', 'assets/enemy_turret.png');
        this.load.image('crosshair', 'assets/crosshair.png');
        this.load.image('checkpoint', 'assets/checkpoint.png');
        this.load.image('particle_rifle', 'assets/particle_rifle.png');
        this.load.image('particle_sniper', 'assets/particle_sniper.png');
        this.load.image('particle_mortar', 'assets/particle_mortar.png');

        this.load.image('practice_target', 'assets/practice_target.png');
        this.load.image('door', 'assets/door.png');
        this.load.image('bullet_rifle', 'assets/bullet_rifle.png');
        this.load.image('bullet_sniper', 'assets/bullet_sniper.png');
        this.load.image('bullet_mortar', 'assets/bullet_mortar.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('asteroidBackground', 'assets/bg.jpg');
        this.load.image('backgroundSpace', 'assets/backgroundSpace.png');
        this.load.image('asteroidBackground2', 'assets/asteroidsFar.png');
        this.load.image('asteroidBackground3', 'assets/asteroidsNear.png');
        //SpriteSheets
        this.load.spritesheet("player", "assets/PlayerSheet.png",
            { frameWidth: 512, frameHeight: 512 });
        this.load.spritesheet("enemy_hovercraft", "assets/hovercraft_spritesheet.png",
            { frameWidth: 512, frameHeight: 256 });
        this.load.spritesheet("gun", "assets/gun.png",
            { frameWidth: 1024, frameHeight: 256 });
        this.load.spritesheet("sniper", "assets/sniper.png",
            { frameWidth: 1024, frameHeight: 256 });
        this.load.spritesheet("mortar", "assets/mortar.png",
            { frameWidth: 1024, frameHeight: 256 });
        this.load.spritesheet('mortar_orb', 'assets/mortar_bullet.png',
            { frameWidth: 256, frameHeight: 256 });

        //Audio
        this.load.audio('fleet', 'assets/sound/SS_Fleet.mp3');
        this.load.audio('city', 'assets/sound/SS_City.mp3');
        this.load.audio('main', 'assets/sound/SS_Main.mp3');
        this.load.audio('lost', 'assets/sound/SS_Lost.mp3');
        this.load.audio('moon', 'assets/sound/SS_Moon.mp3');
        this.load.audio('zone', 'assets/sound/SS_Zone.mp3');
        this.load.audio('menu', 'assets/sound/Menu.mp3');;
        
        this.load.audio('shoot', 'assets/sound/LaserShoot.mp3');
        this.load.audio('sound_rifle', 'assets/sound/sound_rifle.mp3');
        this.load.audio('sound_sniper', 'assets/sound/sound_sniper.mp3');
        this.load.audio('sound_mortar', 'assets/sound/sound_mortar.mp3');
        this.load.audio('sound_explosion', 'assets/sound/sound_explosion.mp3');
        this.load.audio('empty_gun', 'assets/sound/GunEmpty.mp3')


        //Maps & levels
        this.load.image("tileset_image", "assets/Tileset_game.png");
        this.load.tilemapTiledJSON("Beta_test", "levels/Beta_test.json");
        this.load.tilemapTiledJSON("Mission01_scene01", "levels/Mission01_scene01.json");
        this.load.tilemapTiledJSON("Mission01_scene02", "levels/Mission01_scene02.json");
        this.load.tilemapTiledJSON("Mission01_scene03", "levels/Mission01_scene03.json");
        this.load.tilemapTiledJSON("Mission01_scene04", "levels/Mission01_scene04.json");
        this.load.tilemapTiledJSON("Mission01_scene05", "levels/Mission01_scene05.json");

    }

    create() {
        const frames = 30
        const musicVolume = 0.35
        const fxVolume = 0.35
        this.sound.play("zone", { volume: musicVolume, loop: true });
        this.anims.create({
            key: "player_idle_right",
            frames: this.anims.generateFrameNumbers("player", { start: frames * 0, end: frames * 1 - 1 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "player_run_right",
            frames: this.anims.generateFrameNumbers("player", { start: frames * 1, end: frames * 2 - 1 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "player_jump_right",
            frames: this.anims.generateFrameNumbers("player", { start: frames * 2, end: frames * 3 - 1 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "player_fall_right",
            frames: this.anims.generateFrameNumbers("player", { start: frames * 3, end: frames * 4 - 1 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "player_backwards_right",
            frames: this.anims.generateFrameNumbers("player", { start: frames * 5, end: frames * 6 - 1 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "rifle_effects",
            frames: this.anims.generateFrameNumbers("gun", { start: 0, end: 36 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "sniper_effects",
            frames: this.anims.generateFrameNumbers("sniper", { start: 0, end: 36 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "mortar_effects",
            frames: this.anims.generateFrameNumbers("mortar", { start: 0, end: 36 }),
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "mortar_orb_effects",
            frames: this.anims.generateFrameNumbers("mortar_orb", { start: 0, end: 36 }),
            frameRate: 36,
        });

        this.scene.start("MainMenu", {
            musicVolume: musicVolume,
            fxVolume: fxVolume
        });
    }
}
export default Preload