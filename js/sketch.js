function setup() {
    cnv = createCanvas(windowWidth, windowHeight, WEBGL);
    cnv.parent('container');
    frameRate(30);
    setupLines();

    // si on est sur un ordinateur
    if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
      cnv.mouseOver(startAnimation);
      cnv.mouseOut(stopAnimation);
     }
  }

  function startAnimation() {
    // Redémarrez votre animation ici
    loop(); // Démarre le cycle de dessin p5.js
  }
  
  function stopAnimation() {
    // Arrêtez votre animation ici
    noLoop(); // Arrête le cycle de dessin p5.js
  }
  
  let position = []
  let radiusX=200;
  let radiusY=170;
  let nbLines=20;
  
  
  function setupLines(){
    let sommeX=0;
    let sommeY=0;
    let x = random(-radiusX,radiusX);
    let y = random(-radiusY,radiusY);
    sommeX+=x;
    sommeY+=y;
    position.push([x,y]);
    for (let i = 0; i < nbLines; i++) {
        let newX = random(-radiusX,radiusX)+position[i][0];
        let newY=random(-radiusY,radiusY)+position[i][1];
        sommeX+=x;
        sommeY+=y;
        if(sommeX >= windowWidth){
            newX=0;
            sommeX=0;
        }
        if(sommeY >= windowHeight){
            newY=0;
            sommeY=0;
        }
        position.push([newX,newY])   

    }

  }
  
  let xOffset=0, yOffset=0;
  
  
  function drawLine() {
    let calculX=0,calculY=0;
    for (let i = 0; i < position.length-1; i++) {
          yOffset +=0.001;
          xOffset +=0.001;
          calculX=cos(xOffset)*15+mouseX/80;
          calculY=sin(yOffset)*10+mouseY/80;
          stroke(150);
          line(position[i][0]+calculX,position[i][1]+calculY,position[i+1][0]+calculX,position[i+1][1]+calculY);
          fill(150);
          circle(position[i][0]+calculX,position[i][1]+calculY,5);
        }
    circle(position[position.length-1][0]+calculX,position[position.length-1][1]+calculY,5);
  }
  
  function draw() {
    bg = background(45);
    drawLine();

    textSize(59);
    text('@auredev', 100,200);
    fill(0,0,0);
  
  }