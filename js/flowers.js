let clouds = [];
let grass = [];
let grassColour;
let blue = 189;

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(RADIANS);
    grassColour = color("#C7FD48");
    for (var i = 0; i <= width; i += 10) {
        grass.push(new Grass(createVector(i + random(-150, 150), height - 30 + random(-20, 20))));
    }
    // Agregar nubes
    addCloud(100, 100);
    addCloud(200, 150);
    addCloud(300, 200);
}

function draw() {
    background(155, 186, 255, blue);
    drawGroundPerspective();
    stroke(grassColour, random(50, 200));
    for (var i = 0; i < grass.length; i++) {
        var g = grass[i];
        g.draw();
    }
    drawFlowers(7);
    drawClouds();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    grass = [];
    for (var i = 0; i <= width; i += 10) {
        grass.push(new Grass(createVector(i + random(-150, 150), height - 30 + random(-20, 20))));
    }
}

function drawGroundPerspective() {
    fill(170, 150, 146, 240);
    noStroke();
    beginShape();
    vertex(0, height - 50);
    vertex(width, height - 50);
    vertex(width, height - 10);
    vertex(0, height - 10);
    endShape(CLOSE);
}

function drawClouds() {
    for (let cloud of clouds) {
        makeCloud(cloud.x, cloud.y);
        cloud.x += 0.1; // Movimiento horizontal de las nubes
    }
}

function makeCloud(cloudx, cloudy) {
    fill(250);
    noStroke();
    ellipse(cloudx, cloudy, 70, 50);
    ellipse(cloudx + 10, cloudy + 10, 70, 50);
    ellipse(cloudx - 20, cloudy + 10, 70, 50);
}

function drawFlower(position, stemHeight, flowerHeight, flowerColor) {
    for (var i = 0; i < 10; i++) {
        stroke(85, 107, 47, 20);
        strokeWeight(3);
        if (frameCount <= 600) {
            line(position, height - 70, position, height - 70 - stemHeight + frameCount / 10);
        } else {
            line(position, height - 70, position, height - 70 - stemHeight);
        }
        noStroke();
    }

    push();
    fill(flowerColor);
    translate(position, height - 70 - stemHeight);
    noStroke();
    for (var j = 0; j < 10; j++) {
        if (frameCount <= 600) {
            ellipse(0, 10 + frameCount / 20, 10 + frameCount / 40, 20 + frameCount / 20);
        } else {
            ellipse(0, 40, 25, 50);
        }
        rotate(PI / 5);
    }
    pop();
}

function drawFlowers(numFlowers) {
    let basePosition = width / 2 - (numFlowers - 1) * 100 / 2;
    let flowerColors = [
        [230, 190, 230, 240],
        [235, 194, 204, 240],
        [245, 204, 174, 240],
        [245, 174, 154, 240],
        [245, 174, 184, 240],
    ];
    for (let i = 0; i < numFlowers; i++) {
        let position = basePosition + i * 100;
        let stemHeight = 150;
        let flowerColor = flowerColors[i % flowerColors.length];
        drawFlower(position, stemHeight, 50, flowerColor);
    }
}

function Grass(loc) {
    this.blades = [];
    this.am = int(random(4, 12));
    this.loc = loc;
    this.loc.x = this.loc.x + random(-100, 100);

    for (var i = 0; i < this.am; i++) {
        this.blades.push(new Blade(random(10, 50)));
    }

    Grass.prototype.draw = function() {
        for (var i = 0; i < this.blades.length; i++) {
            var blade = this.blades[i];
            push();
            translate(this.loc.x, this.loc.y);
            rotate(radians(blade.angle));
            blade.branch(blade.segments);
            pop();
        }
    }
}

function Blade(segments) {
    var num = 0;
    this.segments = segments;
    this.angle = random(-10, 10);

    this.branch = function(len) {
        var len = len * 0.79;
        strokeWeight(map(len, 1, this.segments, 0.1, 3));
        line(0, 0, 0, -len);
        push();
        translate(0, -len);
        if (len > 5) {
            rotate(radians(this.angle  + sin(len+num) ));
            this.branch(len)
        }
        pop();
        num += 0.01;
    }
}

function addCloud(x, y) {
    clouds.push({x: x, y: y});
}
document.getElementById('back').addEventListener('click', function (e) {
    e.preventDefault(); // Evitar que el enlace redireccione de inmediato
    const transitionLayer = document.getElementById('transitionLayer');
    transitionLayer.setAttribute('transition-style', 'out:circle:hesitate');

    // Esperar el tiempo de la animación antes de redirigir
    setTimeout(function () {
        window.location.href = e.target.href;
    }, 1500);
});

