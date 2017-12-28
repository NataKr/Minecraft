//global variables
var r=20;
var c=25;
var gameGrid=new Array(r);
var selectedTool="";
var sessionToolsArray=[];

$(document).ready(function(){
  var h = window.innerHeight;
  var w = window.innerWidth;
  $(".start-screen").css( { "height":h+"px", "width":w+"px" } );

  $("#startGame").on("click", generateGameField);
  bindFunctionsToToolsAndInventory();
});

bindFunctionsToToolsAndInventory=function(){

  $(".tools").on("click", chooseTool);
  $(".tools").on("mouseover mouseout", emphasize);

  //bind function to Inventory
  $(".inventory").on("click", chooseTool);
  $(".inventory").on("mouseover mouseout", emphasize);
}

generateGameField=function(){

  $(".start-screen").hide(); //changed jon
  $(".wrapper-wrapper").show();
  soundTheme();

  //creating the world field
  for (var i=0; i<r; i++){
    var d = new Date();
    var time = d.getHours();

    gameGrid[i]=new Array(c);
    for (var j=0; j<c; j++){
      var cell=$("<div/>");
      cell.attr("id", "row"+i+"column"+j);
      cell.css({"width":"4%", "height":"5%"});
      cell.css({"display": "inline-block"});

      if((i==14&&(j>=2&&j<=5))||(i==13&&(j==3||j==4))||((i<=10&&i>=8)&&(j>=18&&j<=20))){
        cell.addClass("leaf");
      }

      if((i>=11&&i<=14)&&(j==19)){
        cell.addClass("tree");
      }

      if (i==14&&((j>=12&&j<=14)||(j==22||j==23))){
        cell.addClass("rock");
      }

      if (i<15){
        if (time>=6&&time<=18){
          cell.css({"background-color":"#8ECFF9"});
        }
        if (time<6||time>18){
          cell.css({"background-color":"#627197"});
        }
      }

      if ((i==7&&(j>=3&&j<=10))||(i==8&&(j==7||j==6))||(i==6&&(j>=4&&j<=8))||(i==5&&j==5)){
        cell.css({"background-color":"white"});
      }

      if (i==15){
        cell.addClass("grass");
      } else if(i>15){
        cell.addClass("soil");
      }

      cell.data("row", i);
      cell.data("column", j);

      cell.on("click", changeWorld);
      cell.hover(hightlight, unhightlight);

      $(".worldBox").append(cell);
      gameGrid[i][j]=cell;
    }
  }
  gameGrid[9][17].addClass("leaf");
  gameGrid[7][19].addClass("leaf");
  gameGrid[9][21].addClass("leaf");

  $(".reset").on("click", clearField);
}

chooseTool=function(event){
  $(this).css({"opacity":"0.8", "background-color":"blue"});
  selectedTool=$(this);
  var sound = new Audio("./images/click.wav");
  sound.play();
  sessionToolsArray.push($(this));
  if (sessionToolsArray.length>1){
    sessionToolsArray[sessionToolsArray.length-2].css({"opacity":"1", "background-color":"#0C0B3D"});
    sessionToolsArray.shift();
  }
  console.log(selectedTool);
  console.log(sessionToolsArray);
}

emphasize=function(event){
  $(this).toggleClass("highlighted");
}

clearField=function(){

  var world=$(".worldBox div");
  for (var i=world.length-1; i>=0; i--){
    world[i].remove();
  }

  generateGameField();

  var invArray=$(".inventory");
  invArray.text(0);
  $(".inventory.person").text(5);
}

hightlight=function(event){
  $(this).css({"height":"4.95%", "width":"3.95%"});
  console.log($(this).css("height"));
  console.log($(this).css("width"));
  $(this).css({"border":"0.3px solid white"});
}

unhightlight=function(event){
  $(this).css({"height":"5%", "width":"4%"});
  $(this).css({"border":"none"});
}

changeWorld=function(event){

  if (selectedTool.attr("class").includes("tools")){
    if (selectedTool.attr("id")=="tool-shovel"){
      if ($(this).attr("class")=="grass"){
        $(this).removeClass("grass");
        var counter=parseInt($(".inventory.grass").text())+1;

        $(".inventory.grass").text(counter);
        digSound();
      }
      else if($(this).attr("class")=="soil"){
        $(this).removeClass("soil");
        var counter=parseInt($(".inventory.soil").text())+1;

        $(".inventory.soil").text(counter);
        digSound();
      }else{
        blink();
      }
    }

    else if (selectedTool.attr("id")=="tool-pickaxe"){
      if ($(this).attr("class")=="rock"){
        $(this).removeClass("rock");
        var counter=parseInt($(".inventory.rock").text())+1;
        $(".inventory.rock").text(counter);
        correctSound();
      } else if ($(this).attr("class")=="person"){
        $(this).removeClass("person");
        var counter=parseInt($(".inventory.person").text())+1;
        $(".inventory.person").text(counter);
        correctSound();
      }
      else{
        blink();
      }
    }

    else if(selectedTool.attr("id")=="tool-axe"){
      if ($(this).attr("class")=="leaf"){
        $(this).removeClass("leaf");
        var counter=parseInt($(".inventory.leaf").text())+1;
        $(".inventory.leaf").text(counter);
        woodcutSound();
      } else if ($(this).attr("class")=="tree"){
        $(this).removeClass("tree");
        var counter=parseInt($(".inventory.tree").text())+1;
        $(".inventory.tree").text(counter);
        woodcutSound();
      } else{
        blink();
      }
    }
  }

  else if (selectedTool.attr("class").includes("inventory")){
    var manipulatedClass=selectedTool.attr("id");
    var fullClassName=".inventory."+manipulatedClass;
    console.log(manipulatedClass);
    console.log(fullClassName);
    console.log(selectedTool);
    if (parseInt($(fullClassName).text())>0){
      if ($(this).attr("class")==null||$(this).attr("class")==""||$(this).attr("class")=="cloud"||$(this).attr("class")==undefined){

        flag=true;
        var elRow=parseInt($(this).data("row"));
        var elCol=parseInt($(this).data("column"));
        console.log(elRow);
        console.log(elCol);
        console.log(gameGrid[elRow][elCol]);
        while (flag){
          if (gameGrid[elRow+1][elCol].attr("class")==null||gameGrid[elRow+1][elCol].attr("class")==""||gameGrid[elRow+1][elCol].attr("class")==undefined){
              elRow++;
              console.log(elRow);
          }

          else{
            gameGrid[elRow][elCol].addClass(manipulatedClass); //
            var counter=parseInt($(fullClassName).text())-1;
            $(fullClassName).text(counter);
            correctSound();
            flag=false;
          }
        }
      }
      else{
        blink();
      }
    }

    else{
      blink();
    }
  }

}

blink=function(){
  var currentColor=selectedTool.css("background-color");
  console.log(currentColor);
  selectedTool.css({"background-color":"red"});
  var sound=new Audio("./images/error2.wav");
  sound.play();
  setTimeout(function(){
    selectedTool.css({"background-color":currentColor});
  },300);
}

correctSound=function(){
  var sound=new Audio("./images/brick.wav");
  sound.play();
}

digSound=function(){
  var sound=new Audio("./images/dig.wav");
  sound.play();
}

woodcutSound=function(){
  var sound=new Audio("./images/woodcutting.wav");
  sound.play();
}

soundTheme=function(){
  var sound=new Audio("./images/thunder.wav");
  sound.play();
  sound=new Audio("./images/forest.wav");
  sound.loop=true;
  sound.play();
}
