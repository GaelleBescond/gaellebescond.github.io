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
    this.progressMax = 4
    this.timer = 0

    this.objective = "Welcome to the training fields recruit. Today we will teach you how to move with your battle armor.";
    this.popUp = "Use Q and D to move. Space to jump";
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
    this.timer++
    console.log(this.timer)
    //gameplay methods
    this.generalPositioning();
    this.updateCamera();
    //timed events 

    if (this.progress == 0) {
      if (this.timer >= 200) {
        this.progress++
        this.objective = "Jump over that platform over there"
        this.popUp = "You can get down fro ma platform using S + Space"
      }
      this.updateUI.emit('newMessage', this.objective, this.popUp);
    }

    console.log(this.spawnX, this.spawnY)
    if (this.spawnX == (2304 + 64) && this.spawnY == -(896 + 64) && this.progress == 1) {
      this.progress++
      this.objective = "Now jump, and use your jetpack to reach the top of the platform on the eastside"
      this.popUp = "You can slow down your fall by pressing Space while in the air"
      this.updateUI.emit('newMessage', this.objective, this.popUp);
    }

    if (this.spawnX == (4608 + 64) && this.spawnY == -(1664 + 64) && this.progress == 2) {
      this.progress++
      this.objective = "Good. Now there is a practice target over your head. Shoot it then go down the platform"
      this.popUp = "Aim at the target with your mouse, then press left mouse button to shoot."
      this.updateUI.emit('newMessage', this.objective, this.popUp);
    }

    if (this.spawnX == (5760 + 64) && this.spawnY == -(128 + 64) && this.progress == 3) {
      this.progress++
      this.timer = 0
      this.objective = "Perfect. You may have noticed that your armor's energy depletes when you shoot and use your jetpack."
      this.popUp = ""
      this.updateUI.emit('newMessage', this.objective, this.popUp);
    }
    if (this.timer == 200 && this.progress == 4) {
      this.objective = " Now reach the flag on the far east and shoot the targets."
      this.updateUI.emit('newMessage', this.objective, this.popUp);
    }

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
    this.updateUI.emit('dataUI', this.player.energy, this.gun.name, this.player.hp, this.progress / this.progressMax * 100);
    this.localUI();
  }

}
export default Mission01_scene01