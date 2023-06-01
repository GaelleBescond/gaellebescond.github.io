import LevelTemplate from "../scenes_templates/level_template.js";
class Beta_test extends LevelTemplate {
  constructor() {
    super("Beta_test");
  }

  init(data) {
    this.sceneName = "Beta_test"
    this.nextSceneName = "Mission01_scene02"
    this.data_holder = {
      gunAngle: 0,
      cameraPosX: 0,
      cameraPosY: 0,
      enemiesNumber: 0,
      progress: 0
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
    this.progress = 0
    this.message1 = "Kill all enemies and reach the top of the building";
    this.message2 = "QD to move, Z/S/Space to jump and hover, A/E to switch weapons";
  };

  create() {
    const offset = 36
    const levelMap = this.add.tilemap(this.sceneName);
    this.layers = this.loadMap(levelMap);
    this.loadPlayer(this.spawnX, this.spawnY, 'player');
    this.checkPoints = this.createSpawns(this.layers.checkPoints);
    this.player.setPosition(this.spawnX, this.spawnY,)
    this.platforms = this.createPlatforms(this.layers.platforms)
    this.loadGun(this.player.x, this.player.y, offset);
    this.physics.add.collider(this.player, this.layers.calc_walls);
    this.enemies = this.loadEnemies(this.layers.enemy_SpawnPoints, this.layers.calc_walls, this.layers.calc_jumpBlocks);
    this.physics.add.collider(this.enemies, this.layers.calc_walls);
    this.physics.add.collider(this.player, this.enemies);
    this.mouseActions(this.layers, this.enemies);
    this.createCamera();
    this.playAmbientMusic("fleet");
    this.loadInterface(this.sceneName, this.player.energy, this.gun.name, this.player.hp);
    this.mouseMovements();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.qKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.updateUI = new Phaser.Events.EventEmitter();
    this.wincondition = true;
  };

  update() {
    this.progress = (this.killcount / this.sceneEnemies) * 100
    this.updateUI.emit('newMessage', this.message1, this.message2);
    //gameplay methods
    this.generalPositioning();
    this.updateCamera();
    //level tools for player
    this.swapGun(this.eKey, this.qKey);
    this.gravityTool();
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
      this.player.setPosition(this.spawnX, this.spawnY);
      this.player.hp = this.player.maxhp
      this.player.energy = this.player.maxEnergy
    }
    this.updateUI.emit('dataUI', this.player.energy, this.gun.name, this.player.hp, this.progress);
  }

  victory() {
    if (this.wincondition) {
      this.scene.pause();
      this.message1 = "Thanks for playing"
      this.message2 = "Check the form to provide feedback"
      this.updateUI.emit('newMessage', this.message1, this.message1);
      this.playAmbientMusic("moon")
    };
  }

}


export default Beta_test