function setup() {
    canvas=createCanvas(280, 280);
    canvas.center();
    background("white");
}

function clearCanvas() {
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}

function preload() {
    classifier=ml5.imageClassifier('DoodleNet');
}

function draw() {
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResults);
}

function gotResults(error, result) {
    if (error) {
        console.error(error);
    }
    console.log(result);
    var result = result[0].label;
    document.getElementById('label').innerHTML='nome:'+result.replace('_', ' ');
    document.getElementById('confidence').innerHTML='precisão:'+Math.round(result[0].confidence*100)+'%';
    utterThis=new SpeechSynthesisUtterance(result.replace('_', ' '));
    synth.speak(utterThis);
}