import LevelTemplate from "../scenes_templates/level_template.js";
class Mission01_scene01 extends LevelTemplate {
  constructor() {
    super("Mission01_scene01");
  }

  init(data) {
    this.sceneName = "Mission01_scene01"
    this.nextSceneName = "Mission01_scene02"
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
    this.wincondition = false;
    this.killcount = 0;
    this.sceneEnemies = 0;
    this.progress = 0.0

    this.objective = "Let's get started, destroy all targets and reach the flag in the east";
    this.popUp = "Use Q,D and Z/Space to move, left click to shoot";
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
    this.playAmbientMusic("main");
    this.loadInterface(this.sceneName, this.player.energy, this.gun.name, this.player.hp);
    this.mouseMovements();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.qKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.updateUI = new Phaser.Events.EventEmitter();
  };

  update() {
    this.progress = this.killcount / this.sceneEnemies * 100;
    this.updateUI.emit('newMessage', this.objective, this.popUp);
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

    if (!this.wincondition) {
      if (this.killcount >= this.sceneEnemies) {
        this.wincondition = true;
      }
    }

    if (this.player.hp <= 0) {
      this.playerDeath()
    }
    this.updateUI.emit('dataUI', this.player.energy, this.gun.name, this.player.hp, this.progress);
    this.localUI();
  }

}
export default Mission01_scene01