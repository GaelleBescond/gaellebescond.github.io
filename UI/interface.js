/*User interface
Interface should be showing the different resources the players have:
It has to be called in every scene
It should have a cyber visual
It must display:
- Resources
- Objectives
- The weapon selected by the shooter
- The other weapons available for the shooter
- A menu button for external things to the actual gameplay
    The menu option has to include:
    - A pause/quit game vote option
    - A options/parameters to rebind keys locally?
*/
class Interface extends Phaser.Scene {
  constructor() {
    super("Interface");
  }
  init(data) {
    this.sceneName = data.sceneName;
    this.maxEnergy = data.energy;
    this.gunName = data.gunName;
    this.maxHp = data.hp;
    this.progression = data.progression;
    this.goal = data.goal;
    this.width = 1980;
    this.height = 1080;

  }

  create() {
    this.font = 'Mecha'
    this.increment = 16;
    this.scene.bringToTop();
    this.healthBar = this.add.text(this.increment * 4, this.increment, "", { fontFamily: this.font, fontSize: '32px', fill: '#0000FF' });
    this.energyCount = this.add.text(this.increment * 4, this.increment * 3, "", { fontFamily: this.font, fontSize: '32px', fill: '#FF0000' });
    this.weaponDisplay = this.add.text(this.increment * 4, this.increment * 5, "", { fontFamily: this.font, fontSize: '32px', fill: '#00FF00' });
    this.progressBar = this.add.text(this.increment * 4, this.increment * 7, "", { fontFamily: this.font, fontSize: '32px', fill: '#FFFF00' });
    this.message1 = this.add.text(this.width / 2, this.increment * 3, "", { fontFamily: "Arial", fontSize: '32px', fill: '#FFFF00' }).setOrigin(0.5);
    this.message2 = this.add.text(this.width / 2, this.increment * 7, "", { fontFamily: "Arial", fontSize: '32px', fill: '#FF0000' }).setOrigin(0.5);

    const currentScene = this.scene.get(this.sceneName);


    currentScene.updateUI.on('dataUI', (energy, weapon, hp, progress) => {
      this.weaponDisplay.setText(weapon)
      this.healthBar.setText('HP: ' + hp)
      this.energyUpdate(energy);
      this.hpUpdate(hp);
      this.progressUpdate(progress);
    });

    currentScene.updateUI.on('newMessage', (message1, message2) => {
      //add dialogs and narratives
      this.message1.setText(message1)
      this.message2.setText(message2)

    })
  }
  update() { }

  energyUpdate(energy) {
    const energyGauge = this.add.graphics();
    energyGauge.setDepth(0)
    energyGauge.clear()
    energyGauge.fillStyle(0xCCCCCC);
    energyGauge.fillRect(this.increment * 4, this.increment * 3, 100 * 3, 32);
    const fill = (energy / this.maxEnergy) * 100;
    energyGauge.fillStyle(0x444488);
    energyGauge.fillRect(this.increment * 4, this.increment * 3, fill * 3, 32);
    this.energyCount.setText('Energy : ' + energy).setDepth(1)
  }

  hpUpdate(hp) {
    const healthGauge = this.add.graphics();
    healthGauge.setDepth(0)
    healthGauge.clear()
    healthGauge.fillStyle(0xCCCCCC);
    healthGauge.fillRect(this.increment * 4, this.increment, 100 * 3, 32);
    const fill = (hp / this.maxHp) * 100;
    healthGauge.fillStyle(0x884400);
    healthGauge.fillRect(this.increment * 4, this.increment, fill * 3, 32);
    this.healthBar.setText('Armor : ' + hp).setDepth(1)
  }

  progressUpdate(progress) {
    const progressGauge = this.add.graphics();
    progressGauge.setDepth(0)
    progressGauge.clear()
    progressGauge.fillStyle(0xCCCCCC);
    progressGauge.fillRect(this.increment * 4, this.increment * 7, 100 * 3, 32);
    const fill = progress;
    progressGauge.fillStyle(0x444488);
    progressGauge.fillRect(this.increment * 4, this.increment * 7, fill * 3, 32);
    this.progressBar.setText('Progress : ' + Math.ceil(progress)).setDepth(1)
  }
}

export default Interface