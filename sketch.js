//Create variables here
var dog
var happyDog
var database
var foodS
var foodStock

var milk
var fedTime
var lastFed

var feed
var addFood

var foodObj
var gs

var garden
var bedroom
var washroom
var vaccination
var running
var livingRoom
var injection
var deadDog
var dogVaccination
var lazy
var runningLeft

function preload()
{

	//load images here
  dog = loadImage("dogImg.png")
  happyDog = loadImage("dogImg1.png")
  milk = loadImage("Milk.png")
  garden = loadImage("Garden.png")
  bedroom = loadImage("BedRoom.png")
  washroom = loadImage("WashRoom.png")
  vaccination = loadImage("Vaccination.jpg")
  running = loadImage("running.png")
  livingRoom = loadImage("LivingRoom.png")
  injection = loadImage("Injection.png")
  deadDog = loadImage("deadDog.png")
  dogVaccination = loadImage("dogVaccination.png")
  lazy = loadImage("Lazy.png")
  runningLeft = loadImage("runningLeft.png")
} 

function setup() {

  db=firebase.database()
  createCanvas(500, 500);

  feed=createButton("Feed the Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

  db.ref("Food").on("value", function(data){FoodStock=data.val()})
  db.ref("gamestate").on("value", function(data){gs=data.val()})
  db.ref("FeedTime").on("value", function(data){fedTime=data.val()})


  dog = createSprite(100,100,20,20)

  //foodObj = createSprite(300,300,20,20)
  
  foodStock=db.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  

  background(46,139,87)
  //add styles here

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage( "happy" ,happyDog);
    // foodS.addImage("food" , milk)
  }
textSize(50)
  text(foodS, 200, 200)
  
  drawSprites();

  dog.scale=0.3

  // database.ref("/").update({Food:foodStock})
  // background(46,139,87)
  // //add styles here

  // if(keyWentDown(UP_ARROW)){
  //   writeStock(foodS);
  //   dog.addImage( "happy" ,happyDog);

  fill(255,255,254)
  textSize(15)
  if(lastFed >=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30)
  }else if(lastFed == 0){
    text("last Feed : 12 AM", 350,30)
  }else{
    text("Last Feed : "+lastFed + " AM", 350,30)
  }


  var x = 80
  var y = 90
  if(foodS >= 0){

for(var i=0; i<foodS; i+=1){
  if(i%10){
y+=0
  }
  image(milk, x , y, 20, 20 )
  x+=10
  // var milky=createSprite(i,240, 20, 20)
  // milky.addImage(milk)
  // milky.scale=0.01
}
  }

// if(gs!="Hungry"){
//   feed.hide()
//   addFood.hide()
//   dog.remove()
// }else{
//   feed.show()
//   addFood.show()
//   dog.addImage(dogVaccination)
// }

// currentTime=hour()
// if(currentTime==lastFed+1){
//   update("Playing")
//   foodObj.garden()
// }else if(currentTime==(lastFed+2)){
//   update("Sleeping")
//   foodObj.bedroom()
// }else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
//   update("Bathing")
//   foodObj.washroom()
// }else{
//   update("Hungry")
//   foodObj.display()
// }

imageMode(CENTER)
  currenttime=hour()
  
  if(currenttime===(fedTime)){
    gs="playing"
  image(garden, 250,250,500,500)
 //background(garden)
  }

  else if(currenttime===(fedTime+2)){
    gs="sleeping"
    image(bedroom, 250,250,500,500)
   // background(bedroom)
  }

  else if(currenttime>(fedTime+2)&& currenttime<=(fedTime+4)){
    gs="bathing"
     image(washroom, 250,250,500,500)
    //background(washroom)
  }

  else{
    gs="hungry"
  }


  if(gs!="hungry"){
    feed.hide()
    addFood.hide()
    dog.remove()
  }

  else{
    feed.show()
    addFood.show()
    dog.addImage(happyDog)
  }

  db.ref("/").update({
    gamestate:gs
  })
  
 }



function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  db.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog)
  foodS--
  db.ref('/').update({
    Food:foodS,
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++
  db.ref('/').update({
    Food:foodS
  })
}

function update(state){
  db.ref('/').update({
    gameState:state
  })
}