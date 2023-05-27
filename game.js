//global game parameters
import PreloadScene from './preload.js';
import LevelTemplate from './scenes_templates/level_template.js';
import Interface from './UI/interface.js';
import MainMenu from './UI/mainMenu.js';
import Settings from './UI/settings.js';
import Key_Bindings from './UI/keyBindings.js';

import Beta_test from './scenes/Beta_test.js';

const WIDTH = 1920;
const HEIGHT = 1080;
const ZOOM_FACTOR = 2;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: ZOOM_FACTOR,
  leftTopCorner: {
    x: (WIDTH - (WIDTH / ZOOM_FACTOR)) / 2,
    y: (HEIGHT - (HEIGHT / ZOOM_FACTOR)) / 2
  }
}

const Scenes = [PreloadScene, Interface, MainMenu, Settings, Key_Bindings, LevelTemplate,  Beta_test, ];
const createScene = Scene => new Scene(SHARED_CONFIG) //A voir
const initScenes = () => Scenes.map(createScene)

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    arcade: {
      pixelArt: true,
      tileBias: 128
    }, 
    fps: {
      target: 60 
    }
  },
  scene: initScenes()
};

new Phaser.Game(config);