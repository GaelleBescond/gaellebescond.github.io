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
    this.maxWeapons = 1;
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
    this.timer++;
    //gameplay methods
    this.generalPositioning();
    this.updateCamera();
    //level tools for player
    this.swapGun(this.eKey, this.qKey, this.maxWeapons);
    //progression in level
    if (this.progress < 100) {
      this.progress = (this.timer / 7000) * 100
      if (this.progress >= 100) {
        this.progress = 100
      }
    }
    //timed events
    if (this.timer == 1) {
      this.objective = "Your gun is now configured in sniper mode. Use it to defend the base";
      this.popUp = "Use A/E to switch modes";
    }
    if (this.timer == 500) {
      this.objective = "Our external comms are jammed. I'm trying to fix this! Don't let them in!";
    }
    if (this.timer == 1500) {
      this.newWave(this.layers.enemy_SpawnPoints)    
      this.objective = "A new wave is coming, watch out!"
      this.popUp = ""
    }
    if (this.timer == 2500) {
      this.newWave(this.layers.enemy_SpawnPoints1)
      this.newWave(this.layers.enemy_SpawnPoints)
      this.objective = "Incoming from above!";
    }
    if (this.timer == 3000) {
      this.newWave(this.layers.enemy_SpawnPoints)
      this.newWave(this.layers.enemy_SpawnPoints1)
      this.newWave(this.layers.enemy_SpawnPoints)
      this.maxWeapons = 2
      this.objective = "I have overridden your weapon authorizations. You now have the mortar mode to help against their packs of soldiers"
      this.popUp = "The mortar consumes a lot of energy, use it wisely"
    }
    if (this.timer == 4000) {
      this.newWave(this.layers.enemy_SpawnPoints)
      this.newWave(this.layers.enemy_SpawnPoints1)
      this.newWave(this.layers.enemy_SpawnPoints2)
      this.objective = "Wait they are bringing tanks! Use the mortar against them!"
    }
    if (this.timer == 5000) {
      this.newWave(this.layers.enemy_SpawnPoints3)
      this.newWave(this.layers.enemy_SpawnPoints)
      this.objective = "Hovercrafts?! Keep looking up, they are deadly!"
    }
    if (this.timer == 6000) {      
      this.newWave(this.layers.enemy_SpawnPoints)
      this.newWave(this.layers.enemy_SpawnPoints1)
      this.newWave(this.layers.enemy_SpawnPoints2)
      this.newWave(this.layers.enemy_SpawnPoints3)      
      this.objective = "They are too many! And they have broken through the blastdoors!"
    }

    if (this.timer == 7000) {
      this.objective = "An SOS has been sent, now run to the underground!"
      this.wincondition = true;
    }

    if (this.enemies) {
      this.enemies.getChildren().forEach((enemy) => {
        enemy.checkLineOfSight(this.player)
        this.shootEnemyBullet(enemy, this.layers)
      });
    };


    if (this.player.hp <= 0) {
      this.player.hp = this.player.maxhp
      this.player.energy = this.player.maxEnergy
      this.player.setPosition(this.spawnX, this.spawnY)
    }
    this.updateUI.emit('newMessage', this.objective, this.popUp);
    this.updateUI.emit('dataUI', this.player.energy, this.gun.name, this.player.hp, this.progress);
    this.localUI();
  }


  newWave(spawn){
    this.enemies = this.loadEnemies(spawn, this.layers.calc_walls);
    this.physics.add.collider(this.enemies, this.layers.calc_walls);
    this.physics.add.collider(this.player, this.enemies);
    this.mouseActions(this.layers, this.enemies);


  }
}
export default Mission01_scene03