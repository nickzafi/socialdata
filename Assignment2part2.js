
var path = d3.geo.path();
var scalingVariable=1;
var w=1000*scalingVariable;
var h=800*scalingVariable;
          var flagHoverOrCklick=-1;//1 for click 0 for hover
          var previousState=2;//flag to tell what was the last status
          var colorsForClusters=["red","blue","green","yellow","MediumAquaMarine  ","magenta"];
      var centroids=[   //this is a list with all the cntroids
      [[-122.41721258127922,37.787394262218022],[-122.41924311718914,37.760004216652128]],[[-122.41582476469686,37.761346056903406],[-122.41709742374232,37.787424549878409],
      [-122.47811474903897,37.738906485698408]],[[-122.41708247002195,37.787427118841762],[-122.41579332831969,37.761446811162173],[-122.46632498052548,37.718814247089576],[-122.48639782848089,37.758572304670537]
      ],[[-122.41584224261476,37.761425698684391],[-122.41876997704011,37.787654471039687],[-122.46632498052548,37.718814247089576],[-122.48639782848089,37.758572304670537],[-122.4045346858759,37.785530686729118]
      ],[[-122.41584104423832,37.761422316262603],[-122.41734574019395,37.786264082251279],[-122.48653563661559,37.758492982548702],[-122.46632498052548,37.718814247089576],[-122.40357635664827,37.785479856299915],
      [-122.42168637567067,37.790816208502285]]
      ];


      var projection = d3.geo.mercator()
      .center([-122.433701, 37.767683])
      .scale(250000)
      .translate([w / 2, h / 2]);
      //Create SVG element
      var svg = d3.select("#area2")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

      var path = d3.geo.path()
      .projection(projection);


      d3.json("San.json", function(json) {//reading the json to draw the map
        
        svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .style("fill","black")
        .attr("opacity", "0.8")
        .attr("stroke", "white")
        .attr("stroke-width",2)
        .attr("d", path);

      });


function changeCentroids(className,positionInList){//function for changing the centroids.Works for all buttons and functionalities

          svg.selectAll(".circle2").remove();//destroy what we had
          svg.selectAll(".circle3").remove();
          svg.selectAll(".circle4").remove();
          svg.selectAll(".circle5").remove();
          svg.selectAll(".circle6").remove();


          svg.selectAll(className)  //create new class for the new centoids (better understanded by our brains)
          .data(centroids[positionInList])
          .enter()
          .append("circle")    
          .attr("class",className)
          .attr("cx", function(d) {
            return projection([d[0],d[1]])[0];
          })
          .attr("cy", function(d) {
            return projection([d[0],d[1]])[1];
          })
          .attr("r", 5)
          .attr("stroke", "white")
          .attr("fill", "white")
          .transition()
          .delay(1000)
          .attr("r", 10)
          .attr("fill-opacity", "0.0")
          .attr("stroke-width",3)
          .attr("stroke-opacity","1.0");

        }
        
    d3.csv("PointsAndClusters.csv", function(data) {//read csv with all the crime coordinates

      function outOfButton(){//function that works for every button and is called when you hover away. Sets to previous status if you changed after a hover
              if(flagHoverOrCklick==0){// need to know if you clicked or just hovered. Take action only after hover
                svg.selectAll("circle")
                .data(data)
                .attr("fill", function(d){
                  if (previousState==2) {return colorsForClusters[d.k2];}
                  else if (previousState==3) {return colorsForClusters[d.k3];}
                  else if (previousState==4) {return colorsForClusters[d.k4];}
                  else if (previousState==5) {return colorsForClusters[d.k5];}
                  else if (previousState==6) {return colorsForClusters[d.k6];}

                });
                if (previousState==2) {changeCentroids("circle2",0);}
                else if (previousState==3) {changeCentroids("circle3",1);}
                else if (previousState==4) {changeCentroids("circle4",2);}
                else if (previousState==5) {changeCentroids("circle5",3);}
                else if (previousState==6) {changeCentroids("circle6",4);}
                
              }
            }

      function pointsOfCrimes(Cur){//function that works for every button and is called when you click to change the values
        svg.selectAll("circle")
        .data(data)
        .attr("fill", function(d){
          if (Cur==2) {return colorsForClusters[d.k2];}
          else if (Cur==3) {return colorsForClusters[d.k3];}
          else if (Cur==4) {return colorsForClusters[d.k4];}
          else if (Cur==5) {return colorsForClusters[d.k5];}
          else if (Cur==6) {return colorsForClusters[d.k6];}
        });
      }

          svg.selectAll("circle")  //create the points
          .data(data)
          .enter()
          .append("circle")     
          .attr("cx", function(d,i) {
            return projection([d.X, d.Y])[0];
          })
          .attr("cy", function(d) {
            return projection([d.X, d.Y])[1];
          })
          .attr("r", 5)
          .attr("fill", function(d){
            return colorsForClusters[d.k2];
          })
          .attr("opacity", "0.5");

          changeCentroids("circle2",0);//create for the first time centroids


////////////////////////////////BUTTON 2////////////////////////////////////////

d3.select("button2")
.on("click", function() {

  previousState=2;
  flagHoverOrCklick=1;
  pointsOfCrimes(2);
  changeCentroids("circle2",0);

});

d3.select("button2")
.on("mouseover", function() {
  
  flagHoverOrCklick=0;
  pointsOfCrimes(2);
  changeCentroids("circle2",0);

});

d3.select("button2")
.on("mouseout", function() {
  outOfButton();

});

////////////////////////////////BUTTON 3////////////////////////////////////////
d3.select("button3")
.on("click", function() {

  previousState=3;
  flagHoverOrCklick=1;
  pointsOfCrimes(3);
  changeCentroids("circle3",1);

});
d3.select("button3")
.on("mouseover", function() {
  
  flagHoverOrCklick=0;
  pointsOfCrimes(3);
  changeCentroids("circle3",1);

});



d3.select("button3")
.on("mouseout", function() {
  outOfButton();

});


////////////////////////////////BUTTON 4////////////////////////////////////////

d3.select("button4")
.on("click", function() {

  previousState=4;
  flagHoverOrCklick=1;
  pointsOfCrimes(4);
  changeCentroids("circle4",2);
});

d3.select("button4")
.on("mouseover", function() {
  
  flagHoverOrCklick=0;
  pointsOfCrimes(4);
  changeCentroids("circle4",2);

});

d3.select("button4")
.on("mouseout", function() {
  outOfButton();

});

////////////////////////////////BUTTON 5////////////////////////////////////////

d3.select("button5")
.on("click", function() {

  previousState=5;
  flagHoverOrCklick=1;
  pointsOfCrimes(5);
  changeCentroids("circle5",3);
});

d3.select("button5")
.on("mouseover", function() {
  
  flagHoverOrCklick=0;
  pointsOfCrimes(5);
  changeCentroids("circle5",3);

});

d3.select("button5")
.on("mouseout", function() {
  outOfButton();

});
////////////////////////////////BUTTON 6////////////////////////////////////////

d3.select("button6")
.on("click", function() {

  previousState=6;
  flagHoverOrCklick=1;
  pointsOfCrimes(6);
  changeCentroids("circle6",4);

});

d3.select("button6")
.on("mouseover", function() {
  
  flagHoverOrCklick=0;
  pointsOfCrimes(6);
  changeCentroids("circle6",4);

});

d3.select("button6")
.on("mouseout", function() {
  outOfButton();

});

//////END/////
});