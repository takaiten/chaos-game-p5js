let nPointsInp, maxNInp, perDrawInp;
let game;

function setup() {
    const size = min(window.innerWidth, window.innerHeight);
    createCanvas(size, size);

    game = new ChaosGame(3, 1);
    game.rotate(radians(30));

    nPointsInp = createInput('0');
    maxNInp = createInput(game.getMaxNumOfPoints());
    perDrawInp = createInput(game.getPointsPerDraw());

    createP()
        .position(width, 0)
        .child(createDiv('Vertices: ')
            .child(createButton('-')
                .mousePressed(minusVertFunc))
            .child(createButton('+')
                .mousePressed(plusVertFunc)))
        .child(createDiv('Place points: ')
            .child(nPointsInp)
            .child(createButton('Place')
                .mousePressed(placePointFunc)))
        .child(createDiv('Max points: ')
            .child(maxNInp)
            .child(createButton('Set')
                .mousePressed(setMaxPointsFunc)))
        .child(createDiv('Points per draw: ')
            .child(perDrawInp)
            .child(createButton('Save')
                .mousePressed(perDrawSetFunc)));
}

function draw() {
    background(0);

    game.play();
    game.show();

    /* Info */
    fill(255);
    text('N: ' + game.getNumOfPoints(), 0, 10);
    text('Vertices: ' + game.getNumOfVertices(), 0, 25);
}

function minusVertFunc() {
    game.removeVertex();
}

function plusVertFunc() {
    game.addVertex();
}

function placePointFunc() {
    game.playN(nPointsInp.value());
}

function setMaxPointsFunc() {
    game.setMaxNumOfPoints(maxNInp.value());
}

function perDrawSetFunc() {
    game.setPointsPerDraw(perDrawInp.value());
}
