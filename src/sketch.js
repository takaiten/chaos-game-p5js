let game;
let playStopBtn;

function setup() {
    const w = window.innerWidth,
        h = window.innerHeight,
        newWidth = 2 * h / 3;
    createCanvas(w > newWidth ? newWidth + 20 : w, h);

    game = new ChaosGame(3, 3000, 20000);
    game.rotate(radians(30));

    playStopBtn = createButton('Play/Stop')
        .mousePressed(playStopFunc)
        .style('background-color', 'limegreen');

    const btnHeight = min(height, width)/20,
        btnWidth = width / 4;
    createDiv()
        .position(0, btnHeight)
        .child(createDiv('Vertices: ')
            .child(createButton('-')
                .mousePressed(minusVertFunc)
                .size(btnHeight, btnHeight))
            .child(createButton('+')
                .mousePressed(plusVertFunc)
                .size(btnHeight, btnHeight)));
    createDiv()
        .position(width/8 - 8, height - btnHeight * 2)
        .child(playStopBtn
            .size(btnWidth, btnHeight))
        .child(createButton('Reset')
            .mousePressed(resetFunc)
            .size(btnWidth, btnHeight))
        .child(createButton('Save as image')
            .mousePressed(saveImageFunc)
            .size(btnWidth, btnHeight));

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
