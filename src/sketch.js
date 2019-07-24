let nPointsInp, maxNInp, perDrawInp;
let playStopBtn;
let game;

function setup() {
    let size, state;
    if (window.innerWidth < window.innerHeight) {
        size = window.innerWidth;
        state = 0; // Portrait mode
    } else {
        size = window.innerHeight;
        state = 1; // Landscape mode
    }
    createCanvas(size, size);

    game = new ChaosGame(3, 3000, 20000);
    game.rotate(radians(30));

    nPointsInp = createInput('0');
    maxNInp = createInput(game.getMaxNumOfPoints());
    perDrawInp = createInput(game.getPointsPerDraw());
    playStopBtn = createButton('Play/Stop')
        .mousePressed(playStopFunc)
        .style('background-color', 'limegreen');

    const btnSize = state? height/20 : height/12;
    createDiv()
        .position(state? width : 0, state? 0 : height)
        .child(createDiv('Vertices: ')
            .child(createButton('-')
                .mousePressed(minusVertFunc)
                .size(btnSize, btnSize))
            .child(createButton('+')
                .mousePressed(plusVertFunc)
                .size(btnSize, btnSize)))
        .child(createDiv('Place points: ')
            .child(nPointsInp)
            .child(createButton('Place')
                .mousePressed(placePointFunc)
                .size(AUTO, btnSize)))
        .child(createDiv('Max points: ')
            .child(maxNInp)
            .child(createButton('Set')
                .mousePressed(setMaxPointsFunc)
                .size(AUTO, btnSize)))
        .child(createDiv('Points per draw: ')
            .child(perDrawInp)
            .child(createButton('Save')
                .mousePressed(perDrawSetFunc)
                .size(AUTO, btnSize)))
        .child(playStopBtn
            .size(AUTO, btnSize))
        .child(createButton('Reset')
            .mousePressed(resetFunc)
            .size(AUTO, btnSize));

    let npInpX = nPointsInp.position().x,
        pDInpX = perDrawInp.position().x,
        mxnInpX = maxNInp.position().x;
    let maxX = max(npInpX, pDInpX);
    maxX = max(maxX, mxnInpX);

    nPointsInp.size(size/3 + maxX - npInpX, AUTO);
    maxNInp.size(size/3 + maxX - mxnInpX, AUTO);
    perDrawInp.size(size/3 + maxX - pDInpX, AUTO);

    noLoop();
}

let isPlay = false;

function draw() {
    background(169);

    if (isPlay)
        game.play();

    game.show();

    /* Info */
    fill(0);
    text('N: ' + game.getNumOfPoints(), 0, 10);
    text('Vertices: ' + game.getNumOfVertices(), 0, 25);
}

function resetFunc() {
    game.reset();
    if (!isPlay)
        redraw();
}

function playStopFunc() {
    isPlay = !isPlay;
    isPlay ? loop() : noLoop();
    isPlay ? playStopBtn.style('background-color', 'firebrick') : playStopBtn.style('background-color', 'limegreen');
}

function minusVertFunc() {
    game.removeVertex();
    if (!isPlay)
        redraw();
}

function plusVertFunc() {
    game.addVertex();
    if (!isPlay)
        redraw();
}

function placePointFunc() {
    game.playN(nPointsInp.value());
    if (!isPlay)
        redraw();
}

function setMaxPointsFunc() {
    game.setMaxNumOfPoints(maxNInp.value());
    if (!isPlay)
        redraw();
}

function perDrawSetFunc() {
    game.setPointsPerDraw(perDrawInp.value());
    if (!isPlay)
        redraw();
}
