import LevelTemplate from "../scenes_templates/level_template.js";
class TestRoom extends LevelTemplate {
  constructor() {
    super("TestRoom")
  }

  init(data) {
    this.data_holder = {
      gunAngle: 0,
      cameraPosX: 0,
      cameraPosY: 0,
      ammo: 99,
      enemiesNumber: 0,
      progress: 0
    };
    this.musicVolume = data.musicVolume;
    this.fxVolume = data.fxVolume;
  };

  create() {
    const levelMap = this.add.tilemap("TestRoom");
    const layers = this.loadMap(levelMap);
    this.loadPlayer(64, 0, 'player');
    this.physics.add.collider(this.player, layers.calc_walls);
    const enemies = this.loadEnemies(layers.enemy_SpawnPoints, layers.calc_walls);
    this.physics.add.collider(enemies, layers.calc_walls);
    this.mouseActions(layers, enemies);
    this.loadGun(this.player.x, this.player.y);
    this.createCamera();
    this.playAmbientMusic();
    this.createLights();
    this.loadInterface();
    this.mouseMovements();
  };

  update() {
    this.gunOrientation();
    this.generalPositioning();
    this.gravityTool();
  };
}
export default TestRoom