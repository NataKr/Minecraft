//global variables
var r=20;
var c=25;
var gameGrid=new Array(r);
var selectedTool="";
var selectedInventory="";

$(document).ready(function(){
  $("#startGame").on("click", generateGameField);
});

generateGameField=function(){
  $(".start-screen").hide();
  $(".wrapper-wrapper").show();

  //creating the world field
  for (var i=0; i<r; i++){
    gameGrid[i]=new Array(c);
    for (var j=0; j<c; j++){
      var cell=$("<div/>");
      cell.attr("id", "column"+i+"row"+j);
      cell.addClass("worldCell");
      cell.css({"width":"3.92%", "height":"4.9%"});
      cell.css({"border": "0.3px solid black"});
      cell.css({"display": "inline-block"});
      if (i<15){
        cell.css({"background-color":"#5389E9"});
      }
      cell.data("row", i);
      cell.data("column", j);
      if (i==15){
        cell.addClass("grass");
      } else if(i>15){
        cell.addClass("soil");
      }
      cell.on("click", action);
      $(".worldBox").append(cell);
      gameGrid[i][j]=cell;
    }
  }

}

/*$(document).ready(function(){ //this will be attached to the button click event in the beginning
  for (var i=0; i<r; i++){
    gameGrid[i]=new Array(c);
    for (var j=0; j<c; j++){
      var cell=$("<div/>");
      cell.attr("id", "column"+i+"row"+j);
      cell.addClass("worldCell");
      cell.css({"width":"3.92%", "height":"4.9%"});
      cell.css({"border": "0.3px solid black"});
      cell.css({"display": "inline-block"});
      cell.css({"background-color":"blue"});
      cell.data("row", i);
      cell.data("column", j);
      cell.on("click", action);

      $(".worldBox").append(cell);
      gameGrid[i][j]=cell;
    }
  }
  console.log(gameGrid);
  console.log(gameGrid[1][1].data("column")+" "+gameGrid[1][1].data("row"));
  console.log(gameGrid[1][1].attr("id"));
});*/

action=function(event){
  alert($(this).attr("id"));
  console.log($(this).attr("id"));
}
