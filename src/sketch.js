let game;
let playStopBtn;

function setup() {
    const w = window.innerWidth,
        h = window.innerHeight,
        newWidth = 2 * h / 3;
    createCanvas(w > newWidth ? newWidth + 20 : w, h);

    game = new ChaosGame(3, 3000, 20000, width/2 - 20);
    game.rotate(radians(30));

    playStopBtn = createButton('Play/Stop')
        .mousePressed(playStopFunc)
        .style('background-color', 'limegreen');

    const btnSize = min(height/20, width / 15);
    createDiv()
        .position(0, btnSize)
        .child(createDiv('Vertices: ')
            .child(createButton('-')
                .mousePressed(minusVertFunc)
                .size(btnSize, btnSize))
            .child(createButton('+')
                .mousePressed(plusVertFunc)
                .size(btnSize, btnSize)));
    createDiv()
        .position(width/14, height - btnSize * 2)
        .child(playStopBtn
            .size(AUTO, btnSize))
        .child(createButton('Reset')
            .mousePressed(resetFunc)
            .size(AUTO, btnSize))
        .child(createButton('Save as image')
            .mousePressed(saveImageFunc)
            .size(AUTO, btnSize));

    noLoop();
}

let isPlay = false;

function draw() {
    background(10);

    if (isPlay)
        game.play();

    game.show();

    /* Info */
    fill(210);
    text('N: ' + game.getNumOfPoints(), 0, 10);
    text('Vertices: ' + game.getNumOfVertices(), 0, 25);
}

function playStopFunc() {
    isPlay = !isPlay;
    isPlay ? loop() : noLoop();
    isPlay ? playStopBtn.style('background-color', 'firebrick') : playStopBtn.style('background-color', 'limegreen');
}

function ifNotPlayRedraw() {
    if (!isPlay)
        redraw();
}

function resetFunc() {
    game.reset();
    ifNotPlayRedraw();
}

function minusVertFunc() {
    game.removeVertex();
    ifNotPlayRedraw();
}

function plusVertFunc() {
    game.addVertex();
    ifNotPlayRedraw();
}

function placePointFunc() {
    game.playN(nPointsInp.value());
    ifNotPlayRedraw();
}

function setMaxPointsFunc() {
    game.setMaxNumOfPoints(maxNInp.value());
    ifNotPlayRedraw();
}

function perDrawSetFunc() {
    game.setPointsPerDraw(perDrawInp.value());
    ifNotPlayRedraw();
}

function saveImageFunc() {
    saveCanvas('ChaosGame', 'png');
}
