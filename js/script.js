//global variables
var Minecraft={};
var r=20;
var c=25;
Minecraft.gameGrid=new Array(r);
var selectedTool="";
var sessionToolsArray=[];

$(document).ready(function(){
  var h = window.innerHeight;
  var w = window.innerWidth;
  $(".start-screen").css( { "height":h+"px", "width":w+"px" } );

  $("#startGame").on("click", Minecraft.generateGameField);
  Minecraft.bindFunctionsToToolsAndInventory();

  //bind function to size selection Field
  $("#btn-resize").click(function(){
    var userWidth=parseInt($("#size").val());
    if (userWidth>=400&&userWidth<=1200){
      var world=$(".worldBox div");
      for (var i=world.length-1; i>=0; i--){
        world[i].remove();
      }
      Minecraft.generateGameFieldWithParameter(Minecraft.gameGrid,userWidth);
    }
  });

});

Minecraft.bindFunctionsToToolsAndInventory=function(){

  $(".tools").on("click", Minecraft.chooseTool);
  $(".tools").on("mouseover mouseout", Minecraft.emphasize);

  //bind function to Inventory
  $(".inventory").on("click", Minecraft.chooseTool);
  $(".inventory").on("mouseover mouseout", Minecraft.emphasize);
  $(".reset").on("click", Minecraft.clearField);
}

Minecraft.generateGameField=function(){

  $(".start-screen").hide(); //changed jon
  $(".wrapper-wrapper").show();
  Minecraft.soundTheme();
  var d = new Date();
  var time = d.getHours();

  //creating the world field
  for (var i=0; i<r; i++){

    Minecraft.gameGrid[i]=new Array(c);
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

      cell.on("click", Minecraft.changeWorld);
      cell.hover(Minecraft.hightlight, Minecraft.unhightlight);

      $(".worldBox").append(cell);
      Minecraft.gameGrid[i][j]=cell;
    }
  }
  Minecraft.gameGrid[9][17].addClass("leaf");
  Minecraft.gameGrid[7][19].addClass("leaf");
  Minecraft.gameGrid[9][21].addClass("leaf");
}

Minecraft.chooseTool=function(event){
  $(this).css({"opacity":"0.8", "background-color":"blue"});
  selectedTool=$(this);
  var sound = new Audio("./images/click.wav");
  sound.play();
  sessionToolsArray.push($(this));
  if (sessionToolsArray.length>1){
    sessionToolsArray[sessionToolsArray.length-2].css({"opacity":"1", "background-color":"#0C0B3D"});
    sessionToolsArray.shift();
  }

}

Minecraft.emphasize=function(event){
  $(this).toggleClass("highlighted");
}

Minecraft.clearField=function(){

  var world=$(".worldBox div");
  for (var i=world.length-1; i>=0; i--){
    world[i].remove();
  }

  //Minecraft.generateGameField();
  Minecraft.generateRandomWorld();

  var invArray=$(".inventory");
  invArray.text(0);
  $(".inventory.person").text(5);
  $(".inventory.wholeTree").text(2);
}

Minecraft.hightlight=function(event){
  $(this).css({"height":"4.95%", "width":"3.95%"});

  $(this).css({"border":"0.3px solid white"});
}

Minecraft.unhightlight=function(event){
  $(this).css({"height":"5%", "width":"4%"});
  $(this).css({"border":"none"});
}

Minecraft.generateRandomWorld=function(){

  $(".start-screen").hide();
  $(".wrapper-wrapper").show();
  Minecraft.soundTheme();
  var rndTree;
  var rnd=Math.ceil(Math.random()*4)+1;

  var rndRock=Math.ceil(Math.random()*21);

  var rndCloud=Math.ceil(Math.random()*18);

  do {
    rndTree=Math.ceil(Math.random()*21);
  } while(rndTree>=(rndRock-1)&&rndTree<=(rndRock+3));

  var d = new Date();
  var time = d.getHours();

  //creating the world field
  for (var i=0; i<r; i++){

    Minecraft.gameGrid[i]=new Array(c);
    for (var j=0; j<c; j++){
      var cell=$("<div/>");
      cell.attr("id", "row"+i+"column"+j);

      cell.css({"width":"4%", "height":"5%"});

      cell.css({"display": "inline-block"});

      if ((i==(19-rnd-1)||i==(19-rnd-2))&&(j>=rndRock&&j<rndRock+3)){
        cell.addClass("rock");
      }

      if (i<(19-rnd)){
        if (time>=6&&time<=18){
          cell.css({"background-color":"#8ECFF9"});
        }
        if (time<6||time>18){
          cell.css({"background-color":"#627197"});
        }
      }

      if ((i==(19-rnd-9)&&(j>=rndCloud&&j<(rndCloud+5)))||((i==19-rnd-10)&&(j>=(rndCloud+1)&&j<(rndCloud+4)))||((i==19-rnd-11)&&(j==rndCloud+2))){
        cell.css({"background-color":"white"});
      }

      if (i==(19-rnd)){
        cell.addClass("grass");
      } else if(i>(19-rnd)){
        cell.addClass("soil");
      }

      cell.data("row", i);
      cell.data("column", j);

      cell.on("click", Minecraft.changeWorld);
      cell.hover(Minecraft.hightlight, Minecraft.unhightlight);

      $(".worldBox").append(cell);
      Minecraft.gameGrid[i][j]=cell;
    }
  }

  var rndChooseTree=Math.floor(Math.random()*2);

  if(rndChooseTree==0){
    Minecraft.createTree((19-rnd-4),rndTree);
  } else{
    Minecraft.createSecondTree((19-rnd-6), rndTree);
  }
}

Minecraft.generateGameFieldWithParameter=function(gameGrid, userWidth){
//  $(".start").hide();
  //$(".wrapper-wrapper").show();
  //
  var worldWidth=userWidth;
  var worldHeight=userWidth*0.8;
  var toolBoxWidth=Math.floor(userWidth*0.16);
  var toolBoxHeight=userWidth*0.8;

  $(".content-wrapper").css("width", (worldWidth+toolBoxWidth)+"px");
  $(".worldBox").css("width", worldWidth+"px");
  $(".worldBox").css("height", worldHeight+"px");
  $(".toolBox").css("width", toolBoxWidth+"px");
  $(".toolBox").css("height", toolBoxHeight+"px");
  $(".inventory").css("height", Math.ceil(toolBoxWidth*0.41)+"px");
  $(".inventory").css("width", Math.ceil(toolBoxWidth*0.41)+"px");
  $(".tools").css("height", Math.ceil(toolBoxWidth*0.58)+"px");
  $(".tools").css("width", Math.ceil(toolBoxWidth*0.58)+"px");

  if (userWidth<700){
    $("h4").css("font-size", "12px");
    $(".inventory").css("font-size", "10px");
    $(".tools").css("font-size", "10px");
    $(".reset").css("font-size","10px");
    $("body").css("font-family", "Arial, Helvetica, sans-serif");
    $("h4").hide();
  }
  else if(userWidth>=700){
    $("h4").show();
    $("h4").css("font-size", "12px");
    $(".inventory").css("font-size", "8px");
    $(".tools").css("font-size", "8px");
    $(".reset").css("font-size","12px");
    $("body").css("font-family", "'Press Start 2P', cursive");
  }

  //creating the world field
  for (var i=0; i<r; i++){
    for (var j=0; j<c; j++){
      $(".worldBox").append(gameGrid[i][j]);
      //console.log(gameGrid[i][j]);
    }
  }
}

Minecraft.changeWorld=function(event){

  if (selectedTool.attr("class").includes("tools")){
    if (selectedTool.attr("id")=="tool-shovel"){
      if ($(this).attr("class")=="grass"){
        $(this).removeClass("grass");
        var counter=parseInt($(".inventory.grass").text())+1;

        $(".inventory.grass").text(counter);
        Minecraft.digSound();
      }
      else if($(this).attr("class")=="soil"){
        $(this).removeClass("soil");
        var counter=parseInt($(".inventory.soil").text())+1;

        $(".inventory.soil").text(counter);
        Minecraft.digSound();
      }else{
        Minecraft.blink();
      }
    }

    else if (selectedTool.attr("id")=="tool-pickaxe"){
      if ($(this).attr("class")=="rock"){
        $(this).removeClass("rock");
        var counter=parseInt($(".inventory.rock").text())+1;
        $(".inventory.rock").text(counter);
        Minecraft.correctSound();
      } else if ($(this).attr("class")=="person"){
        $(this).removeClass("person");
        var counter=parseInt($(".inventory.person").text())+1;
        $(".inventory.person").text(counter);
        Minecraft.correctSound();
      }
      else{
        Minecraft.blink();
      }
    }

    else if(selectedTool.attr("id")=="tool-axe"){
      if ($(this).attr("class")=="leaf"){
        $(this).removeClass("leaf");
        var counter=parseInt($(".inventory.leaf").text())+1;
        $(".inventory.leaf").text(counter);
        Minecraft.woodcutSound();
      } else if ($(this).attr("class")=="tree"){
        $(this).removeClass("tree");
        var counter=parseInt($(".inventory.tree").text())+1;
        $(".inventory.tree").text(counter);
        Minecraft.woodcutSound();
      } else{
        Minecraft.blink();
      }
    }
  }

  else if (selectedTool.attr("class").includes("inventory")){

  if (selectedTool.attr("id")=="wholeTree"){

          if (parseInt($(".inventory.wholeTree").text())>0){


          if ($(this).attr("class")==null||$(this).attr("class")==""||$(this).attr("class")=="cloud"||$(this).attr("class")==undefined){

            var counter=0;//
            var elRow=parseInt($(this).data("row"));
            var elCol=parseInt($(this).data("column"));
            for(var i=0; i<4; i++){
              for (var j=0; j<3; j++){
                if (!(Minecraft.gameGrid[elRow+i][elCol+j].attr("class")=="cloud"||Minecraft.gameGrid[elRow+i][elCol+j].attr("class")==null||Minecraft.gameGrid[elRow+i][elCol+j].attr("class")==undefined||Minecraft.gameGrid[elRow+i][elCol+j].attr("class")=="")){
                  counter++;

                }
              }
            }

            if (counter>0){
              Minecraft.blink();

            }
            else{
              Minecraft.createTree(elRow, elCol);
              var counterItem=parseInt($(".inventory.wholeTree").text())-1;
              $(".inventory.wholeTree").text(counterItem);
            }
          }
          else{
            Minecraft.blink();
          }
        }
        else{
          Minecraft.blink();
        }
  }

  else{
        var manipulatedClass=selectedTool.attr("id");
        var fullClassName=".inventory."+manipulatedClass;

        if (parseInt($(fullClassName).text())>0){
          if ($(this).attr("class")==null||$(this).attr("class")==""||$(this).attr("class")=="cloud"||$(this).attr("class")==undefined){

            flag=true;
            var elRow=parseInt($(this).data("row"));
            var elCol=parseInt($(this).data("column"));

            while (flag){
              if (Minecraft.gameGrid[elRow+1][elCol].attr("class")==null||Minecraft.gameGrid[elRow+1][elCol].attr("class")==""||Minecraft.gameGrid[elRow+1][elCol].attr("class")==undefined){
                  elRow++;
                  if (elRow==19){
                    Minecraft.gameGrid[elRow][elCol].addClass(manipulatedClass); //
                    var counter=parseInt($(fullClassName).text())-1;
                    $(fullClassName).text(counter);
                    Minecraft.correctSound();
                    flag=false;
                  }
              }

              else{
                Minecraft.gameGrid[elRow][elCol].addClass(manipulatedClass); //
                var counter=parseInt($(fullClassName).text())-1;
                $(fullClassName).text(counter);
                Minecraft.correctSound();
                flag=false;
              }
            }
          }
          else{
            Minecraft.blink();
          }
        }

        else{
          Minecraft.blink();
        }
    }
  }

}

Minecraft.createTree=function(r,c){
  for (var i=r; i<r+2; i++){
    for (var j=c; j<c+3; j++){
      Minecraft.gameGrid[i][j].addClass("leaf");
    }
  }
  Minecraft.gameGrid[r+2][c+1].addClass("tree");
  Minecraft.gameGrid[r+3][c+1].addClass("tree");
}

Minecraft.createSecondTree=function(r,c){
  for (var i=r; i<r+3; i++){
    for (var j=c; j<c+3; j++){
      Minecraft.gameGrid[i][j].addClass("leaf");
    }
  }
  Minecraft.gameGrid[r+3][c+1].addClass("tree");
  Minecraft.gameGrid[r+4][c+1].addClass("tree");
  Minecraft.gameGrid[r+5][c+1].addClass("tree");
}

Minecraft.blink=function(){
  var currentColor=selectedTool.css("background-color");

  selectedTool.css({"background-color":"red"});
  var sound=new Audio("./images/error2.wav");
  sound.play();
  setTimeout(function(){
    selectedTool.css({"background-color":currentColor});
  },300);
}

Minecraft.correctSound=function(){
  var sound=new Audio("./images/brick.wav");
  sound.play();
}

Minecraft.digSound=function(){
  var sound=new Audio("./images/dig.wav");
  sound.play();
}

Minecraft.woodcutSound=function(){
  var sound=new Audio("./images/woodcutting.wav");
  sound.play();
}

Minecraft.soundTheme=function(){
  var sound=new Audio("./images/thunder.wav");
  sound.play();
  sound=new Audio("./images/forest.wav");
  sound.loop=true;
  sound.play();
}
