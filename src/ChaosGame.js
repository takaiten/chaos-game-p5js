const DEFAULT_VERTICES_N = 3;
const DEFAULT_SAMPLES_PER_DRAW = 1000;
const DEFAULT_BACKGROUND_COLOR = 20;
const DEFAULT_LERP_PERCENT = 0.5;

class ChaosGame {
    constructor({
        initialVerticesCount = DEFAULT_VERTICES_N, 
        samplesPerDraw = DEFAULT_SAMPLES_PER_DRAW, 
        backgroundColor = DEFAULT_BACKGROUND_COLOR,
        lerpPercent = DEFAULT_LERP_PERCENT,
        rotation = 0,
        dimensions,
        radius,
    } = {}) {
        this.origin = createVector(dimensions.x / 2, dimensions.y / 2);
        this.backgroundColor = backgroundColor;
        this.dimensions = dimensions;
        this.lerpPercent = lerpPercent;
        this.samples = samplesPerDraw;
        this.rotation = rotation;
        this.radius = radius;
        this.vertices = [];
        this.colors = [];
        this.createVertices(initialVerticesCount);
        this.createColors(initialVerticesCount);

        this.reset();
    }

    createVertices(n) {
        this.vertices = new Array(n);

        const step = TWO_PI / n;
        for (let i = 0; i < n; i++) {
            this.vertices[i] = p5.Vector
                .fromAngle(step * i)
                .mult(this.radius)
                .add(this.origin);
        }
    }

    createColors(n) {
        if (n < 3) return;
        this.colors = new Array(n);

        // First three colors are RGB, next are random
        this.colors[0] = color(255, 0, 0);
        this.colors[1] = color(0, 255, 0);
        this.colors[2] = color(0, 0, 255);

        for (let i = 3; i < this.vertices.length; i++) {
            this.colors[i] = color(random(0, 255), random(0, 255), random(0, 255));
        }
    }

    reset() {
        background(this.backgroundColor);
        this.seed = createVector(
            random(0, this.dimensions.x), 
            random(0, this.dimensions.y)
        );
    }

    updateVertices(n) {
        this.createVertices(n);
        this.createColors(n);
        this.reset();
    }

    rotate() {
        if (+this.rotation < 1e-8) {
            return this.createVertices(this.vertices.length);
        };
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i] = p5.Vector
                .sub(this.vertices[i], this.origin)
                .rotate(+this.rotation)
                .add(this.origin);
        }
    }

    showVertices() {
        noStroke();
        for (let i = 0; i < this.vertices.length; i++) {
            if (!this.vertices[i]) break;

            fill(this.colors[i]);
            ellipse(this.vertices[i].x, this.vertices[i].y, 8);
        }
    }

    playN(n) {
        let rand = undefined;
        for (let i = 0; i < n; i++) {
            rand = int(random(0, this.vertices.length));

            this.seed.lerp(this.vertices[rand], this.lerpPercent);
            
            stroke(this.colors[rand] || 0);
            point(this.seed.x, this.seed.y);
        }
    }

    play() {
        this.playN(this.samples);
    }
}
