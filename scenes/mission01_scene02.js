import LevelTemplate from "../scenes_templates/level_template.js";
class Mission01_scene02 extends LevelTemplate {
  constructor() {
    super("Mission01_scene02");
  }

  init(data) {
    this.sceneName = "Mission01_scene02"
    this.nextSceneName = "Mission01_scene03"
    this.data_holder = {
      gunAngle: 0,
      cameraPosX: 0,
      cameraPosY: 0
    };
    this.musicVolume = data.musicVolume;
    this.fxVolume = data.fxVolume;
    this.chosenGun = 0;
    this.canSwap = true;
    this.targetZoom = 0.55;
    this.physics.world.gravity.y = 1000;
    this.baseGravity = this.physics.world.gravity.y
    this.offset = 36
    this.spawnX = 0;
    this.spawnY = 0;
    this.wincondition = true;
    this.killcount = 0;
    this.sceneEnemies = 0;
    this.objective = "Get back to the base!";
    this.popUp = "";

  };

  create() {
    this.input.setDefaultCursor('none');

    const offset = 36
    const levelMap = this.add.tilemap(this.sceneName);
    this.layers = this.loadMap(levelMap);
    this.loadPlayer(this.spawnX, this.spawnY, 'player');
    this.checkPoints = this.createSpawns(this.layers.checkPoints);
    this.player.setPosition(this.spawnX, this.spawnY,)
    this.platforms = this.createPlatforms(this.layers.platforms)
    this.loadGun(this.player.x, this.player.y, offset);
    this.physics.add.collider(this.player, this.layers.calc_walls);
    this.enemies = this.loadEnemies(this.layers.enemy_SpawnPoints, this.layers.calc_walls);
    this.physics.add.collider(this.enemies, this.layers.calc_walls);
    this.physics.add.collider(this.player, this.enemies);
    this.mouseActions(this.layers, this.enemies);
    this.createCamera();
    this.playAmbientMusic("moon");
    this.loadInterface(this.sceneName, this.player.energy, this.gun.name, this.player.hp);
    this.mouseMovements();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.qKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.updateUI = new Phaser.Events.EventEmitter();
  };

  update() {
    //gameplay methods
    this.generalPositioning();
    this.updateCamera();
    //level tools for player
    //this.swapGun(this.eKey, this.qKey);
    //this.gravityTool();
    if (this.enemies) {
      this.enemies.getChildren().forEach((enemy) => {
        enemy.checkLineOfSight(this.player)
        this.shootEnemyBullet(enemy, this.layers)
      });
    };
    this.progress = Phaser.Math.Distance.Between(this.spawnX, this.spawnY, -384, -328) / Phaser.Math.Distance.Between(this.player.x, this.player.y, -384, -328);
    this.progress = 100 - (1 / this.progress) * 100
    if (this.player.hp <= 0) {
      this.player.hp = this.player.maxhp
      this.player.energy = this.player.maxEnergy
      this.player.setPosition(this.spawnX, this.spawnY)
    }
    this.updateUI.emit('newMessage', this.objective, this.popUp);
    this.updateUI.emit('dataUI', this.player.energy, this.gun.name, this.player.hp, this.progress);
    this.localUI();
  }
}
export default Mission01_scene02