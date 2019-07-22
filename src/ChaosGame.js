class ChaosGame {
    constructor(nOfPoints = 3, samplesPerCall = 1000, maxPointsCount = 50000) {
        this.max = maxPointsCount;
        this.origin = createVector(width / 2, height / 2); // Origin of game
        this.samples = samplesPerCall; // Set number of points generated per call of 'play'
        this.createVertices(nOfPoints);
        this.createColors(nOfPoints);

        this.renewPoints();
    }

    createVertices(n, radius = height / 3) {
        this.vertices = new Array(n);

        const step = TWO_PI / n;
        for (let i = 0; i < n; i++) {
            this.vertices[i] = p5.Vector
                .fromAngle(step * i)
                .mult(radius)
                .add(this.origin);
        }
    }

    createColors(n) {
        this.colors = new Array(n);
        /* First three colors are RGB, next are random */
        this.colors[0] = color(255, 0, 0);
        this.colors[1] = color(0, 255, 0);
        this.colors[2] = color(0, 0, 255);
        for (let i = 3; i < this.vertices.length; i++) {
            this.colors[i] = color(random(0, 255), random(0, 255), random(0, 255));
        }
    }

    renewPoints() {
        this.seed = createVector(random(0, width), random(0, height));
        this.points = [];
        this.pColors = [];
    }

    addVertex(radius = height / 3) {
        this.createVertices(this.vertices.length + 1);
        this.renewPoints();

        this.colors.push(color(random(0, 255), random(0, 255), random(0, 255)));
    }

    removeVertex(radius = height / 3) {
        if (this.vertices.length < 4)
            return;
        this.createVertices(this.vertices.length - 1);
        this.renewPoints();

        this.colors.pop();
    }

    rotate(angle) {
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i] = p5.Vector
                .sub(this.vertices[i], this.origin)
                .rotate(angle)
                .add(this.origin);
        }

        this.renewPoints();
    }

    show() {
        for (let i = 0; i < this.points.length; i++) {
            stroke(this.pColors[i]);
            point(this.points[i].x, this.points[i].y);
        }
        noStroke();
        for (let i = 0; i < this.vertices.length; i++) {
            fill(this.colors[i]);
            ellipse(this.vertices[i].x, this.vertices[i].y, 7);
        }
    }

    playN(n) {
        if (this.points.length > this.max)
            return;
        let c = 0.5;

        for (let i = 0; i < n; i++) {
            let rand = int(random(0, this.vertices.length));
            this.seed.lerp(this.vertices[rand], c);
            this.points.push(this.seed.copy());
            this.pColors.push(this.colors[rand]);
        }
    }

    play() {
        this.playN(this.samples);
    }

    setMaxNumOfPoints(max) {
        this.max = max;
    }

    setPointsPerDraw(n) {
        this.samples = n;
    }

    getPointsPerDraw() {
        return this.samples;
    }

    getNumOfPoints() {
        return this.points.length;
    }

    getNumOfVertices() {
        return this.vertices.length;
    }

    getMaxNumOfPoints() {
        return this.max;
    }
}
