import Player from "../entities/player.js";
//weapons
import Rifle from "../entities/gun_rifle.js";
import Sniper from "../entities/gun_sniper.js";
import Mortar from "../entities/gun_mortar.js";
//hostiles
import Soldier from "../entities/enemy_soldier.js";
import Tank from "../entities/enemy_tank.js";
import Hover from "../entities/enemy_hover.js";
import Turret from "../entities/enemy_turret.js";
//destructible
import Practice from "../entities/enemy_practice.js";
import Door from "../entities/enemy_door.js";

class LevelTemplate extends Phaser.Scene {
  constructor(name) {
    super({
      key: name,
      physics: {
        arcade: {
          debug: false
        }
      },
      render: {
        pipeline: 'Light2D'
      }
    });

  }
  init(data) {
    this.nextSceneName = ""
    this.mapName = data.mapName;
    this.data_holder = data.data_holder;
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
    this.crosshair = null

  }


  loadMap(levelMap) {
    this.loadBackground()
    const tileset = levelMap.addTilesetImage("Tileset_testroom", "tileset_image");
    // const calc_terrain = levelMap.createLayer("Background", tileset);
    const calc_walls = levelMap.createLayer("Walls", tileset)
    const checkPoints = levelMap.getObjectLayer("Player_Spawn");
    const platforms = levelMap.getObjectLayer("Platforms");
    const enemy_SpawnPoints = levelMap.getObjectLayer("Enemies_Spawn");
    const enemy_SpawnPoints1 = levelMap.getObjectLayer("Enemies_Spawn_1");
    const enemy_SpawnPoints2 = levelMap.getObjectLayer("Enemies_Spawn_2");
    const enemy_SpawnPoints3 = levelMap.getObjectLayer("Enemies_Spawn_3");
    calc_walls.setCollisionByProperty({ isSolid: true });
    return { checkPoints, calc_walls, /*calc_terrain,*/ tileset, enemy_SpawnPoints, platforms, enemy_SpawnPoints1, enemy_SpawnPoints2, enemy_SpawnPoints3 }
  }

  loadBackground() {
    this.skyparallax = this.add.tileSprite(0, 0, 0, 0, "backgroundSpace")
      .setScale(2.5)
      .setOrigin(0.5)
      .setScrollFactor(0.1)
    //.setTint(0x555555);
    this.skyparallax2 = this.add.tileSprite(0, 0, 0, 0, "asteroidBackground2")
      .setScale(3.5)
      .setOrigin(0.5)
      .setScrollFactor(0.2)
    this.skyparallax3 = this.add.tileSprite(0, 0, 0, 0, "asteroidBackground3")
      .setScale(3.5)
      .setOrigin(0.5)
      .setScrollFactor(0.3)
  }

  createSpawns(checkPoints) {
    const spawnblocks = this.physics.add.group({ allowGravity: false });
    checkPoints.objects.forEach(block => {
      let object = null;
      if (block.name == "Spawn") {
        object = spawnblocks.create(block.x + 64, block.y - 64, "checkpoint")
        this.spawnX = object.x
        this.spawnY = object.y
      } else if (block.name == "Checkpoint") {
        object = spawnblocks.create(block.x + 64, block.y - 64, "checkpoint")
        this.physics.add.overlap(object, this.player, this.setSpawn, null, this)
      } else if (block.name == "Win") {
        object = spawnblocks.create(block.x + 64, block.y - 64, "checkpoint")
        this.physics.add.overlap(this.player, object, this.victory, null, this)
      }
    })
    return spawnblocks
  }
  createPlatforms(platformSpawn) {
    const platforms = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });
    platformSpawn.objects.forEach(block => {
      let object = platforms.create(block.x + 64, block.y + 4, "platform")
      object.body.checkCollision.down = false;
      object.body.checkCollision.right = false;
      object.body.checkCollision.left = false;
      this.physics.add.collider(object, this.player, this.getDown, null, this)
    });

    return platforms
  }

  getDown(object) {
    if (this.player.goingDown) {
      object.body.checkCollision.up = false;
    } else {
      object.body.checkCollision.up = true;
    }
  }

  setSpawn(object) {
    this.spawnX = object.x;
    this.spawnY = object.y;
  }

  victory() {
    if (this.wincondition) {
      this.scene.stop();
      this.scene.start(this.nextSceneName, {
        musicVolume: this.musicVolume,
        fxVolume: this.fxVolume,
      });
    }

  }

  playAmbientMusic(music) {
    this.game.sound.stopAll()
    this.sound.play(music, { volume: this.musicVolume, loop: true });
  }

  loadPlayer(x, y, sprite) {
    this.player = new Player(this, x, y, sprite).setScale(0.55).setSize(150, 450, 50, 0).setDepth(1);
  }

  loadGun(x, y, maxWeapons) {
    if (this.chosenGun == 0) {
      this.gun = new Rifle(this, x, y - this.offset, 'gun').setScale(0.3).setDepth(2);
    } else if (this.chosenGun == 1) {
      this.gun = new Sniper(this, x, y - this.offset, 'sniper').setScale(0.3).setDepth(2);
    } else if (this.chosenGun == 2) {
      this.gun = new Mortar(this, x, y - this.offset, 'mortar').setScale(0.3).setDepth(2);
    }
  }


  loadEnemies(spawner, ground) {
    const enemies = this.add.group();
    spawner.objects.forEach(spawn => {
      let enemy = null;

      if (spawn.name == "soldier") {
        enemy = new Soldier(this, spawn.x, spawn.y, "enemy_soldier").setScale(0.55).setDepth(0);
      } else if (spawn.name == "tank") {
        enemy = new Tank(this, spawn.x, spawn.y, "enemy_tank").setScale(1).setDepth(0);
      } else if (spawn.name == "hover") {
        enemy = new Hover(this, spawn.x, spawn.y, "enemy_hovercraft").setScale(1).setDepth(0);
      } else if (spawn.name == "turret") {
        enemy = new Turret(this, spawn.x, spawn.y, "enemy_turret").setScale(1).setDepth(0).setImmovable(true);
      } else if (spawn.name == "practice") {
        enemy = new Practice(this, spawn.x, spawn.y, "practice_target").setScale(0.25).setDepth(0).setImmovable(true);
        enemy.body.setAllowGravity(false)
      } else if (spawn.name == "door") {
        enemy = new Door(this, spawn.x, spawn.y, "door").setScale(0.50).setDepth(0).setImmovable(true);
      }
      enemy.setAngle(spawn.rotation);
      enemy.update(this.player);
      this.physics.add.collider(enemy, ground)
      this.sceneEnemies += 1;
      enemies.add(enemy)
    });
    return enemies;
  }

  enemiesBehaviour() {
    this.enemies.forEach(enemy => {
      enemy.update(this.player);
    })
  }

  createLights() {
    this.lights.enable();
    this.playerLight = this.lights.addLight(this.gun.x, this.gun.y, 512);
    this.playerLight.setColor(0xffffff)
    this.playerLight.setIntensity(2)
  }

  createCamera() {
    //set camera between player and mouse (average coordinates)
    this.cameraFocal = this.physics.add.sprite(this.player.x, this.player.y, "checkpoint")
      .setScale(0.15);
    this.cameraFocal.body.setAllowGravity(false);
    this.cameras.main.startFollow(this.cameraFocal);
    this.cameras.main.setZoom(this.targetZoom * 2);
  }

  updateCamera() {
    if (this.targetZoom < this.gun.camZoom) {
      this.targetZoom += 0.005;
    } else if (this.targetZoom > this.gun.camZoom) {
      this.targetZoom -= 0.005;
    }
    if (Math.abs(this.targetZoom - this.gun.camZoom) < 0.005) {
      this.targetZoom = this.gun.camZoom;
    }
    this.cameras.main.setZoom(this.targetZoom * 1.2);
  }

  loadInterface(sceneName, energy, gunName, hp) {
    this.scene.run('Interface', {
      sceneName,
      energy,
      gunName,
      hp
    });
  }

  mouseMovements() {
    this.input.on('pointermove', (pointer) => {
      this.data_holder.cameraPosX = pointer.x - 1920 / 2;
      this.data_holder.cameraPosY = pointer.y - 1080 / 2;
      this.data_holder.gunAngle = Phaser.Math.Angle.Between(this.gun.x, this.gun.y, this.cameraFocal.x, this.cameraFocal.y);
      if (this.data_holder.cameraPosX >= 0) {
        this.player.facing = false;
      } else {
        this.player.facing = true;
      }
    }, this);
  }

  mouseActions(layers, target) {
    this.input.on('pointerdown', (pointer) => {
      if (this.gun.weaponCanShoot && this.player.energy >= this.gun.consumption * this.gun.projectilesPerShoot) {
        for (let i = 0; i < this.gun.projectilesPerShoot; i++) {
          this.time.delayedCall(100 * i, () => {
            this.shootBullet(this.gun.x, this.gun.y, this.data_holder.gunAngle, layers, target);
          });
        }
      }
      if (this.gun.weaponCanShoot && this.player.energy < this.gun.consumption * this.gun.projectilesPerShoot) {
        this.sound.play("empty_gun", { volume: this.fxVolume })
      }
    });
  }

  shootBullet(originX, originY, angle, layers, target) {
    this.player.energy -= this.gun.consumption;
    this.gun.weaponCanShoot = false;
    let texture = null;
    let sound = null
    let bullet = null
    if (this.chosenGun == 0) {
      bullet = this.physics.add.sprite(originX, originY, 'bullet_rifle').setCircle(10)
      texture = 'particle_rifle'
      sound = 'shoot'
    } else if (this.chosenGun == 1) {
      bullet = this.physics.add.sprite(originX, originY, 'bullet_sniper').setCircle(10)
      texture = 'particle_sniper'
      sound = 'sound_sniper'
    } else if (this.chosenGun == 2) {
      bullet = this.physics.add.sprite(originX, originY, 'bullet_mortar').setCircle(10)
      texture = 'particle_mortar'
      sound = 'sound_mortar'
    } else {
      bullet = this.physics.add.sprite(originX, originY, 'bullet')
    }

    // Emit particles
    const emitter = this.add.particles(texture).setDepth(2).createEmitter({
      follow: bullet,
      lifespan: 150,
      alpha: 0.2,
      quantity: 1,
      blendMode: 'ADD'
    });
    const particle = emitter.emitParticle();
    this.time.delayedCall(1000, () => {
      this.killParticles(emitter)
    });
    bullet.setVelocity(Math.cos(angle) * this.gun.bulletVelocity, Math.sin(angle) * this.gun.bulletVelocity);
    if (bullet.texture.key == 'bullet_mortar') {
      this.physics.add.collider(bullet, layers.calc_walls, this.splashDamage, null, this)
      this.physics.add.collider(bullet, target, (bullet, target) => {
        this.damage(bullet, target, this.gun.damage);
        this.splashDamage(bullet);
      }, null, this);

    } else {
      this.physics.add.collider(bullet, layers.calc_walls, this.destroy, null, this)
      this.physics.add.collider(bullet, target, (bullet, target) => {
        this.damage(bullet, target, this.gun.damage);
        bullet.destroy();
      }, null, this);
    }




    this.sound.play(sound, { volume: this.fxVolume });

    this.time.delayedCall(this.gun.weaponCooldown, () => {
      this.gun.weaponCanShoot = true;
    });
    this.time.delayedCall(20000, () => {
      bullet.destroy();
    });
  }

  shootEnemyBullet(enemy, layers) {
    let enemyBullet = null
    let sound = null
    if (enemy.name != "practice" && enemy.targetInRange) {
      if (enemy.canShoot) {
        enemy.canShoot = false;
        if (enemy.name == "soldier") {
          enemyBullet = this.physics.add.sprite(enemy.x, enemy.y, 'bullet_rifle').setCircle(10)
          sound = 'sound_rifle'
        } else if (enemy.name == "tank") {
          enemyBullet = this.physics.add.sprite(enemy.x, enemy.y, 'bullet_sniper').setCircle(10)
          sound = 'sound_sniper'
        } else if (enemy.name == "hover") {
          enemyBullet = this.physics.add.sprite(enemy.x, enemy.y, 'mortar_orb').setScale(0.25).setCircle(100)
          sound = 'sound_mortar'
        } else if (enemy.name == "turret") {
          enemyBullet = this.physics.add.sprite(enemy.x, enemy.y, 'bullet_rifle').setCircle(10)
          sound = 'shoot'
        } else {
          enemyBullet = this.physics.add.sprite(enemy.x, enemy.y, 'bullet')
        }
        enemyBullet.setVelocity(Math.cos(enemy.bulletAngle) * enemy.bulletVelocity, Math.sin(enemy.bulletAngle) * enemy.bulletVelocity);
        this.physics.add.collider(enemyBullet, layers.calc_walls, this.destroy, null, this)

        this.physics.add.collider(this.player, enemyBullet, (player, bullet) => {
          this.damagePlayer(player, bullet, enemy.bulletDamage);
          bullet.destroy()
        }, null, this);
        this.sound.play(sound, { volume: this.fxVolume });//add distance player/enemy
        this.time.delayedCall(10000, () => {
          enemyBullet.destroy();
        });
      } else if (!enemy.canShoot && !enemy.isOnCooldown) {
        enemy.isOnCooldown = true;
        this.time.delayedCall(enemy.cooldown, () => {
          enemy.canShoot = true
          enemy.isOnCooldown = false;
        });
      }
    }
  }

  killParticles(emitter) {
    emitter.killAll();
    emitter.remove();
  }

  splashDamage(bullet) {
    this.sound.play("sound_explosion", { volume: this.fxVolume });

    let explosion = this.physics.add.sprite(bullet.x, bullet.y)
      .setScale(this.gun.splashRadius / 256)
      .setOrigin(0.5, 0.5)
      .setCircle(128)
      .setDepth(2)
      .play("mortar_orb_effects")

    explosion.body.setAllowGravity(false)
    this.physics.add.overlap(explosion, this.enemies, (explosion, target) => {
      this.damage(explosion, target, this.gun.splashDamage);
    }, null, this);
    this.physics.add.overlap(this.player, explosion, (player, bullet) => {
      this.damagePlayer(player, bullet, this.gun.splashDamage);
    }, null, this);

    bullet.destroy()

    this.time.delayedCall(1000, () => {
      explosion.destroy();
    });
  }

  damagePlayer(target, bullet, value) {
    target.loseHP(value)
  }

  damage(bullet, target, value) {
    target.loseHP(value)
    if (target.hp <= 0) {
      this.events.off(Phaser.Scenes.Events.UPDATE, target.update, target);
      this.killcount += 1;
      target.destroy()
    }
  }

  destroy(object1) {
    object1.destroy()
  }

  generalPositioning() {
    //updates gun location
    if (this.data_holder.cameraPosX > 0) {
      this.gun.x = this.player.x
    }
    else if (this.data_holder.cameraPosX < 0) {
      this.gun.x = this.player.x
    }
    this.gun.y = this.player.y - this.offset
    this.gun.animate(this.player.facing)
    this.gun.setRotation(this.data_holder.gunAngle)
    this.cameraFocal.setPosition(this.player.x + (this.data_holder.cameraPosX) * 0.7, this.player.y + (this.data_holder.cameraPosY) * 0.7)
    // this.playerLight.setPosition(this.gun.x, this.gun.y);
  }

  gravityTool() {
    const gKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
    //Gravity tool
    if (gKey.isDown) {
      this.physics.world.gravity.y = 2600;
      if ((this.player.body.velocity.x && this.player.body.velocity.y) != 0) {
        if (this.player.body.velocity.x > 0) {
          this.player.body.acceleration.x -= 10;
        } else if (this.player.body.velocity.x < 0) {
          this.player.body.acceleration.x += 10;
        }
      }
    }
    else {
      this.physics.world.gravity.y = this.baseGravity;
    };
  }


  swapGun(eKey, qKey, maxWeapons) {
    if ((eKey.isDown || qKey.isDown) && this.canSwap) {
      this.canSwap = false;
      if (eKey.isDown) {
        if (this.chosenGun <= maxWeapons) {
          this.chosenGun += 1;
          if (this.chosenGun > maxWeapons) {
            this.chosenGun = 0;
          }
          this.gun.destroy();
          this.loadGun(this.player.x, this.player.y)
        }
      }
      if (qKey.isDown) {
        if (this.chosenGun >= 0) {
          this.chosenGun -= 1;
          if (this.chosenGun < 0) {
            this.chosenGun = 2;
          }
          this.gun.destroy();
          this.loadGun(this.player.x, this.player.y)
        }
      }
      this.time.delayedCall(200, () => {
        this.swapCooldown();
      });
    };
  }
  swapCooldown() {
    this.canSwap = true;
  }


  localUI() {
    let fill = (this.player.hp / this.player.maxhp) * 100;
    if (fill < 0) {
      fill = 0
    }


    const healthBar = this.add.graphics();
    healthBar.setDepth(0)
    healthBar.fillStyle(0xFF0000);
    healthBar.fillRect(0, 0, 100, 8);
    healthBar.fillStyle(0x00FF00);
    healthBar.fillRect(0, 0, fill, 8);
    healthBar.x = this.player.body.x;
    healthBar.y = this.player.body.y + 300;
    fill = (this.player.energy / this.player.maxEnergy) * 100;
    if (fill < 0) {
      fill = 0
    }
    const energyBar = this.add.graphics();
    energyBar.setDepth(0)
    energyBar.fillStyle(0xFF8800);
    energyBar.fillRect(0, 0, fill, 8);
    energyBar.x = this.player.body.x;
    energyBar.y = this.player.body.y + 308;





    this.time.delayedCall(1, () => {
      healthBar.clear()
      energyBar.clear()

    }, this);





  }
}


export default LevelTemplate