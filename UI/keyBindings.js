
class Key_Bindings extends Phaser.Scene {

    constructor(config) {
        super("Key_Bindings");
    }

    Init(data) {
        this.data_holder = {
            gunAngle: 0,
            cameraPosX: 0,
            cameraPosY: 0,
            ammo: 0,
            enemiesNumber: 0,
            progress: 0,
            musicVolume: 0,
            fxVolume: 0,
        }
    }

    create() {
        this.increment = 16
        this.colorMain = '#DD0000'
        this.colorOver = '#f39c12'
        this.font = 'Mecha'
        this.createButtons()
        this.createBack()
        this.buttonBack.on('pointerdown', () => this.startScene.call(this, 'Settings'));
    }


    update() { }


    createButtons() {
        //Left
        this.moveLeft = this.add.text(this.increment * 22, this.increment * 4, 'Move Left', { fontFamily: this.font, fontSize: '32px', fill: this.colorMain })
            .setOrigin(1, 0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.moveLeft.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.moveLeft.setStyle({ fill: this.colorMain }))
        this.textLeft = this.add.text(this.increment * 26, this.increment * 4, 'Q', { fontFamily: this.font, fontSize: '32px', fill: '#FF0000' })
            .setOrigin(0, 0.5)
            .setPadding(10);

        //Right
        this.moveRight = this.add.text(this.increment * 22, this.increment * 8, 'Move Right', { fontFamily: this.font, fontSize: '32px', fill: this.colorMain })
            .setOrigin(1, 0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.moveRight.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.moveRight.setStyle({ fill: this.colorMain }))
        this.textRight = this.add.text(this.increment * 26, this.increment * 8, 'D', { fontFamily: this.font, fontSize: '32px', fill: '#FF0000' })
            .setOrigin(0, 0.5)
            .setPadding(10);

        //Jump
        this.moveJump = this.add.text(this.increment * 22, this.increment * 12, 'Jump/Hover', { fontFamily: this.font, fontSize: '32px', fill: this.colorMain })
            .setOrigin(1, 0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.moveJump.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.moveJump.setStyle({ fill: this.colorMain }))
        this.textJump = this.add.text(this.increment * 26, this.increment * 12, 'Z', { fontFamily: this.font, fontSize: '32px', fill: '#FF0000' })
            .setOrigin(0, 0.5)
            .setPadding(10);

        //Gravity tool
        this.toolGravity = this.add.text(this.increment * 22, this.increment * 16, 'Gravity Tool', { fontFamily: this.font, fontSize: '32px', fill: this.colorMain })
            .setOrigin(1, 0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.toolGravity.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.toolGravity.setStyle({ fill: this.colorMain }))
        this.textGrav = this.add.text(this.increment * 26, this.increment * 16, 'G', { fontFamily: this.font, fontSize: '32px', fill: '#FF0000' })
            .setOrigin(0, 0.5)
            .setPadding(10);

    }


    createBack() {
        this.buttonBack = this.add.text(this.increment * 8, this.increment * 40, 'Back', { fontFamily: this.font, fontSize: '32px', fill: this.colorMain })
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#555' })
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.buttonBack.setStyle({ fill: this.colorOver }))
            .on('pointerout', () => this.buttonBack.setStyle({ fill: this.colorMain }))
    }

    startScene(sceneName) {
        this.scene.switch(sceneName, {
            data_holder: this.data_holder
        });
    }

    setKey() {

    }
    playAmbientMusic() {
        this.music = this.sound.play("menu", { volume: 0.35 });
    }
}

export default Key_Bindings;