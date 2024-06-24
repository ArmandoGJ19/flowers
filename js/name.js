let font;
let points;
let bounds;
let nameToDisplay = '';

function preload(){
    displayFont = loadFont('./utils/Chick Regular.ttf');
    bodyFont = loadFont('./utils/Chick Regular.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    document.getElementById('submitName').addEventListener('click', () => {
        nameToDisplay = document.getElementById('nameInput').value;
        document.getElementById('modal').style.display = 'none';
        generatePoints(nameToDisplay);
    });

    document.getElementById('openModal').addEventListener('click', () => {
        document.getElementById('modal').style.display = 'flex';
    });

    noLoop(); // Stop draw loop until name is submitted
}

function generatePoints(name) {
    // Aumenta el tamaño de la fuente aquí
    let fontSize = 300; // Ajusta este valor para aumentar el tamaño del texto
    points = displayFont.textToPoints(name, 0, 0, fontSize, {
        sampleFactor: 0.5,
    });

    bounds = displayFont.textBounds(name, 0, 0, fontSize);

    for(let i = 0; i < points.length; i++){
        let pt = points[i];
        pt.x = pt.x - bounds.x - bounds.w / 2;
        pt.y = pt.y - bounds.y - bounds.h / 2;
    }

    loop(); // Start draw loop after points are generated
}

function draw() {
    background(0);
    if (nameToDisplay) {
        drawText();
        drawGrass();
    }
}

function drawText(){
    noStroke();
    textFont(bodyFont);
    // Aumenta el tamaño de la fuente del texto aquí también
    textSize(32); // Ajusta este valor para aumentar el tamaño del texto
    fill(150);
    text('', width / 2 - bounds.w / 2 + 30, height / 2 + bounds.h / 2 + 20);
}

function drawGrass(){
    translate(width / 2, height / 2);
    let from = color(78, 112, 4, 90);
    let to = color(193, 186, 0, 90);
    let grassColor = lerpColor(to, from, 0.5);

    for(let i = 0; i < points.length; i++){
        stroke(grassColor);
        let p = points[i];
        let offsetX = 0;
        let offsetY = 0;
        n = noise(i * 10);
        offsetX += n * 20 - 5;
        offsetY += noise(i * 10) * 20;
        n = noise(i * 0.01 + millis() * -0.001);
        offsetX += n * 10;
        line(p.x, p.y, p.x + offsetX, p.y - 30 + offsetY);

        firstPoint = points[0].x;
        lastPoint = points[points.length-1].x;
        let padding = 200;
        let mappedVal = map(mouseX, 0, width, firstPoint - padding, lastPoint + padding, true);

        if(mappedVal >= p.x){
            drawFlowers(p.x + offsetX, p.y - 30 + offsetY);
        }
    }
}

function drawFlowers(pointX, pointY){
    push();
    translate(pointX, pointY);
    stroke(0, 0, 0, 30);
    strokeWeight(1);
    let petalAmount = 10;
    let pointAngle = 360 / petalAmount;
    let radius = 0;
    for (angle = 0; angle < 360; angle += pointAngle){
        stroke(color(127, 134, 170, 90));
        x = cos(radians(angle)) * 5;
        y = sin(radians(angle)) * 5;
        line(radius, radius, x + radius + noise(angle) * 2, y + radius + noise(angle) * 2);
    }
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
document.getElementById('viewFlowers').addEventListener('click', function (e) {
    e.preventDefault(); // Evitar que el enlace redireccione de inmediato
    const transitionLayer = document.getElementById('transitionLayer');
    transitionLayer.setAttribute('transition-style', 'in:circle:hesitate');

    // Esperar el tiempo de la animación antes de redirigir
    setTimeout(function () {
        window.location.href = e.target.href;
    }, 1500);
});

