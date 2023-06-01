import LevelTemplate from "../scenes_templates/level_template.js";
class Mission01_scene03 extends LevelTemplate {
  constructor() {
    super("Mission01_scene03");
  }

  init(data) {
    this.sceneName = "Mission01_scene03"
    this.nextSceneName = "Mission01_scene04"
    this.data_holder = {
      gunAngle: 0,
      cameraPosX: 0,
      cameraPosY: 0
    };
    this.musicVolume = data.musicVolume;
    this.fxVolume = data.fxVolume;
    this.chosenGun = 1;
    this.canSwap = true;
    this.maxWeapons = 2;
    this.targetZoom = 0.55;
    this.physics.world.gravity.y = 1000;
    this.baseGravity = this.physics.world.gravity.y
    this.offset = 36
    this.spawnX = 0;
    this.spawnY = 0;
    this.wincondition = false;
    this.killcount = 0;
    this.sceneEnemies = 0;
    this.timer = 0;
    this.objective = "Use your sniper to defend the base";
    this.popUp = "Use A/E to switch weapons";
    this.progress = 0
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
    this.loadGun(this.player.x, this.player.y, offset, this.maxWeapons);
    this.physics.add.collider(this.player, this.layers.calc_walls);
    this.enemies = this.loadEnemies(this.layers.enemy_SpawnPoints, this.layers.calc_walls);
    this.physics.add.collider(this.enemies, this.layers.calc_walls);
    this.physics.add.collider(this.player, this.enemies);
    this.mouseActions(this.layers, this.enemies);
    this.createCamera();
    //this.playAmbientMusic("moon");
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
    if (this.progress < 100) {
      this.timer += 1;
      this.progress = (this.timer / 3000) * 100
      if (this.progress >= 100) {
        this.progress = 100
      }
    } else {
      this.objective = "There are too many of them! Run to the underground!"
      this.popUp = ""
    }
    //level tools for player
    this.swapGun(this.eKey, this.qKey, this.maxWeapons);
    if (this.maxWeapons == 1 && this.timer > 1500) {
      this.maxWeapons = 2
      this.objective = "We have provided you a mortar to help"
      this.popUp = "The mortar is good to deal with groups of enemies and tanks"
    }
    //this.gravityTool();
    if (this.enemies) {
      this.enemies.getChildren().forEach((enemy) => {
        enemy.checkLineOfSight(this.player)
        this.shootEnemyBullet(enemy, this.layers)
      });
    };
    if (!this.wincondition) {
      if (this.timer == 3000) {
        this.wincondition = true;
      }
    }

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
export default Mission01_scene03