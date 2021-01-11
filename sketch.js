var PLAY=1;
var END=0 ;
var START;
var gameState = START;
var float1,float2,floatsGroup;
var ground,groundImage;
var sky,skyImage;
var girl,girlImage;
var girl_standing,girl_standing1;
var invisibleGround;
var fireGround,fireGroundImage;
var fireGround1,fireGround1Image;
var coin,coinImage,coinsGroup;
var hill,hillImage;
var restart,restartImage;
var coinSound,gameOverSound;
var Score;

function preload(){
float2 = loadImage("Tile.png");
//groundImage = loadImage("ground (2).png");
skyImage = loadImage(" Back.jpg");
fireGroundImage = loadImage("icicle.png");
fireGround1Image = loadImage("icicle-1.png")
fireGround2Image = loadImage("icicle-2.png")
fireGround3Image = loadImage("icicle-3.png")
coinImage = loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png")
hillImage = loadImage("iceberg.png");
girl_standing = loadAnimation("santa5 - 2.png");
girl_standing1 = loadAnimation("santa5 - 1.png");
girlImage = loadAnimation("santa1.png","santa2.png","santa3.png","santa4.png","santa5.png","santa6.png","santa7.png","santa8.png","santa9.png","santa10.png","santa11.png","santa12.png");
restartImage = loadImage("restart1.png");
coinSound = loadSound("Coin Sound.wav");
gameOverSound = loadSound("GameOver Sound.wav");
}

function setup(){
  createCanvas(800,400)
  floatsGroup = createGroup();
  coinsGroup = createGroup();
  sky = createSprite(450,300,600,600);
  sky.addImage(skyImage);
  sky.scale = 3 ;
  //ground = createSprite(400,360,600,600);
  //ground.addImage(groundImage);
 // ground.scale = 0.2;
  girl = createSprite(110,190,20,50);
  girl.addAnimation("standing",girl_standing);
  girl.addAnimation("standing",girl_standing1);
  girl.addAnimation("running",girlImage);
  girl.scale = 0.5;
  invisibleGround = createSprite(400,330,800,10);
  invisibleGround.visible = false;
  fireGround = createSprite(100,350,600,600)
  fireGround.addImage(fireGroundImage)
  fireGround.scale=0.06;
  fireGround1 = createSprite(700,350,600,600)
  fireGround1.addImage(fireGround1Image)
  fireGround1.scale=0.06;
  fireGround2 = createSprite(300,350,600,600)
  fireGround2.addImage(fireGround2Image)
  fireGround2.scale=0.06
  fireGround3 = createSprite(500,350,600,600)
  fireGround3.addImage(fireGround3Image)
  fireGround3.scale=0.06
  hill = createSprite(150,320,10,10);
  hill.addImage(hillImage);
  hill.setCollider("rectangle",10,30,200,190);
  //hill.debug = true;
  restart = createSprite(400,200);
  restart.addImage(restartImage);
  restart.scale = 0.8;
  restart.visible = false;
  Score = 0;
}
function draw(){
background("yellow");
  fireGround.visible = false;
  fireGround1.visible = false;
  fireGround2.visible = false;
  fireGround3.visible = false;
  girl.velocityY = girl.velocityY + 0.8;
if(gameState === START){
    girl.collide(hill)
if (keyWentDown("space")){
  gameState = PLAY;
  girl.visible = true;
   hill.visible = true;
  restart.visible = false;
}
}
if(gameState === PLAY){
    girl.changeAnimation("running",girlImage);
 if(keyDown("space")&& girl.y >= 100) {
      girl.velocityY = -12;
  }
   hill.visible = false;
    restart.visible = false;
    fireGround.visible = true;
    fireGround1.visible = true;
    fireGround2.visible = true;
    fireGround3.visible = true;
    sky.velocityX =-1;
 if (sky.x < 0){
     sky.x = 380;
    }  
 if (girl.x>0){
  girl.x = 50;
  }
//ground.velocityX =- 3
   //if (ground.x < 0){
    // ground.x = 400;
  // }
// girl.collide(invisibleGround);
if (girl.isTouching(floatsGroup)){
  girl.collide(floatsGroup);
}
  spawnFloats();
if(girl.isTouching(coinsGroup)){
  Score = Score + 1;
  coinsGroup.destroyEach();
  coinSound.play();
}
if(girl.isTouching(invisibleGround)){
  gameState = END;
  gameOverSound.play();
}
}
if (gameState === END){
    girl.changeAnimation("standing",girl_standing1);
    restart.visible = true;
    girl.velocityY = 0;
    girl.velocityX = 0;
    coinsGroup.setLifetimeEach(-1);
    floatsGroup.setLifetimeEach(-1);   
    coinsGroup.setVelocityXEach(0);
    floatsGroup.setVelocityXEach(0); 
    sky.velocityX=0;
    //ground.velocityX=0;
    floatsGroup.destroyEach();
    coinsGroup.destroyEach();
if(mousePressedOver(restart)){
  reset();
}
}
  drawSprites();
  textSize(25);
  fill("red");
  text("Coins Collected : " + Score,350,50);
}
function reset(){
  girl.x =110;
  girl.y = 190;
  hill.visible = true;
  hill.collide(girl)
  gameState = START;
  restart.visible = false;
  girl.collide(invisibleGround);
  Score=0;
}
function spawnFloats(){
if (frameCount % 80 === 0){
  var floats = createSprite(400,165,10,40);
  floats.y = Math.round(random(150,250));
  floats.velocityX = -3
  floats.addImage(float2);
    floats.scale = 1.3;
    floats.lifetime = 300;
    girl.collide(floats);
    floats.setCollider("rectangle",0,10,50,10);
    //floats.debug = true;
    floatsGroup.add(floats);
}
  if (frameCount % 180=== 0){
  coin = createSprite(400,165,20,50);
  coin.addAnimation("rotation", coinImage);
 coin.y = Math.round(random(100,200));
  coin.velocityX = -3
  coin.scale = 0.4;
  coinsGroup.add(coin) 
}
}
