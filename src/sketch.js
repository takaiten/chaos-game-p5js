var isPlaying = true;
var flushScreen = false;
let game;
let gui;

/**
 * P5.js setup function  
 */
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    game = new ChaosGame({
        dimensions: createVector(width, height),
        radius: min(width, height) / 2 - 25,
        lerpPercent: 0.5,
        initialVerticesCount: 4,
        samplesPerDraw: 3000,
    });
    game.rotation = PI / 3;

    createGUI();

    background(20);
}


/**
 * P5.js draw function 
 */
function draw() {
    if (flushScreen) background(20);
    game.play();
    game.rotate();
    game.showVertices();
}

/**
 * Helper functions 
 */
const updateVertices = (value) => {
    game.updateVertices(value);
    if (!isPlaying) redraw();
};

function resetGame() {
    game.reset();
    if (!isPlaying) redraw();
};

function saveCanvasPng() {
    saveCanvas('ChaosGame', 'png');
};

function createGUI() {
    gui = new dat.GUI();

    const paramsFolder = gui.addFolder('Params');
    paramsFolder.open();
    paramsFolder.add(game, 'lerpPercent', 0, 1).name('lerp');
    paramsFolder.add(game, 'samples', 0, 10000, 1);
    paramsFolder
        .add(game.vertices, 'length', 2, 9, 1)
        .name('vertices')
        .onFinishChange(updateVertices);
    paramsFolder.add(game, 'rotation', {
            'none': 0,
            'PI/3': PI/3, 
            'PI/2': PI/2, 
            'PI/4': PI/4, 
            'PI/6': PI/6, 
            'PI/8': PI/8, 
            'PI/12': PI/12, 
    }).onFinishChange(() => game.reset());

    const controlFolder = gui.addFolder('Control');
    controlFolder.open();
    controlFolder
        .add(window, 'isPlaying')
        .name('running?')
        .onFinishChange(value => value ? loop() : noLoop());
    controlFolder
        .add(window, 'flushScreen')
        .name('flush?');
    controlFolder.add(window, 'resetGame').name('reset');
    controlFolder.add(window, 'saveCanvasPng').name('save');
}
