var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameState = "play"
var score = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  
}

function setup(){
  createCanvas(580,450);
  
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);
  
  
  coinGroup = new Group();
  climbersGroup = new Group();
  
  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);
}

function draw(){
  background(0);
  
  
  if (gameState === "play") {
    ocean.velocityY = 1;
    if(keyDown("left_arrow")){
      frog.x = frog.x - 3;
    }
    
    if(keyDown("right_arrow")){
      frog.x = frog.x + 3;
    }
    
    if(mouseDown("left")){
      frog.velocityY = -10;
    }
    
    frog.velocityY = frog.velocityY + 0.8
    
    if(ocean.y > 300){
      ocean.y = 150
    }
    spawnCoin();

    if(climbersGroup.isTouching(frog)){
      frog.velocityY = 0;
    }
    if(coinGroup.isTouching(frog)){
      score = score +1;
      coinGroup.destroyEach();
    }
    if( frog.y > 600){
      frog.destroy();
      gameState = "end"
    }
    
    drawSprites();
    textSize(20);
    fill('red');
    text("SCORE : " + score,240,55);
  }
  
  if (gameState === "end"){
    
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnCoin() {
  
  if (frameCount % 280 === 0) {
    var coin = createSprite(200, -50);
    var climber = createSprite(200,10);
    climber.scale = 0.3;
    coin.scale = 0.1;
    climber.debug = 'true';
    climber.setCollider('rectangle', 0, 0, 400,20)
    
    coin.x = Math.round(random(120,400));
    climber.x = coin.x;
   
    
    coin.addImage(coinImg);
    climber.addImage(climberImg);
    
    coin.velocityY = 1;
    climber.velocityY = 1;
    
    
    frog.depth = coin.depth;
    frog.depth +=1;
   
    //assign lifetime to the variable
    coin.lifetime = 800;
    climber.lifetime = 800;
   
    coinGroup.add(coin);
    climbersGroup.add(climber);
   
  }
}

