		var dataset;  //Global variable
		var scalingVariable=1;
		var w=500*scalingVariable;
		var h=500*scalingVariable;
		var padding = 70*scalingVariable;
		var toggleYear=1;



		d3.csv("../socialdata/Dataset2003_2015.csv", function(data) {
    		dataset=data;    //Once loaded, copy to dataset.



/////////////////////////////////////////SCALES///////////////////////////////////////////

		//Create scale functions
		var xScale = d3.scale.linear()
		.domain([0, d3.max(dataset, function(d) { 
	
				return Number(d["prost2003"])+100; 
		})
		])
		.range([padding, w - padding ]);




		var yScale = d3.scale.linear()
		.domain([0, d3.max(dataset, function(d) { 
				return Number(d["theft2003"])+100; 
		})])
		.range([h-padding , padding]);




		var rScale = d3.scale.linear()
		.domain([0, d3.max(dataset, function(d) { 
				return Number(d["total2003"]); 
		})])
		.range([2, 20]);
		//Create SVG element
		var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h);





		var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h);


/////////////////////////////////////////SVGs///////////////////////////////////////////


		svg.selectAll("circle")  
		.data(dataset)
		.enter()
		.append("circle")     
		.attr("cx", function(d,i) {
			return xScale(Number(d["prost2003"]));
		})
		.attr("cy", function(d) {
			return yScale(Number(d["theft2003"]));
		})
		.attr("r", function(d) {
			return rScale(Number(d["total2003"]));
		})
		.attr("fill", "grey")
		.attr("opacity", "0.5")
		.attr("stroke", "black")
		.attr("stroke-width",2);



		svg.selectAll("text")  
		.data(dataset)
		.enter()
		.append("text")     
		.text(function(d) {
			return d["Area"];

		})
		.attr("x", function(d) {
			return xScale(Number(d["prost2003"]));
		})
		.attr("y", function(d) {
			return yScale(Number(d["theft2003"]));
		})
		.attr("font-family", "sans-serif")
		.attr("font-size", "12px")
		.attr("fill", "black");	



		svg.append("text")      // text label for the x axis
		        .attr("transform", "rotate(-90)")
		        .attr("x", -h/2)
		        .attr("y", padding/2 -5)
		        .style("text-anchor", "middle")
		        .text("Vehicle Theft");
		svg.append("text")      // text label for the x axis
		        .attr("x", w/2 )
		        .attr("y", h-padding/2 )
		        .style("text-anchor", "middle")
		        .text("Prostitution");





////////////////////////////////////////AXIS///////////////////////////////////////////
			var xAxis = d3.svg.axis()
							  .scale(xScale)
							  .orient("bottom")
							  .ticks(10);

			//Define Y axis
			var yAxis = d3.svg.axis()
							  .scale(yScale)
							  .orient("left")
							  .ticks(10);


//Create X axis
		svg.append("g")
		    .attr("class", "axis")
		    .attr("transform", "translate("+0+"," + (h-padding) + ")")
		    .call(xAxis);

			
		svg.append("g")
		    .attr("class", "axis")
		    .attr("transform", "translate(" + (padding) + ","+ 0 +")")
		    .call(yAxis);




/////////////////////////////////////////TRANSISION///////////////////////////////////////////

		d3.select("pp")
		.on("click", function() {
			toggleYear=1-toggleYear;

			svg.selectAll("text")  //TEXT
			.data(dataset)
			.transition()    
			.duration(1000)
			.each("start", function() {
				  	 d3.select(this)
				  	  .attr("fill", "magenta");
				  	  })    
			.attr("x", function(d) {
					   	if (toggleYear==1) {return xScale(Number(d["prost2003"]));}

					   	if (toggleYear==0) {return xScale(Number(d["prost2015"]));}
				  	   		 })
			.attr("y", function(d) {
					   	if (toggleYear==1) {return yScale(Number(d["theft2003"]));}
					   	if (toggleYear==0) {return yScale(Number(d["theft2015"]));}
				  	   		 })
			.transition()    // <-- Transition #2
			.duration(1000)
			.text(function(d) {
				 return d["Area"];

			})
			.attr("font-family", "sans-serif")
			.attr("font-size", "12px")
			.attr("fill", "black");	


			svg.selectAll("circle")
			.data(dataset)
			.transition()    // <-- Transition #1
			.duration(1000)
			.each("start", function() {
						   	d3.select(this)
						   	.attr("fill", "magenta")
						   	.attr("r", 7);
					   })
			.attr("cx", function(d) {

					   	if (toggleYear==1) {return xScale(Number(d["prost2003"]));}

					   	if (toggleYear==0) {return xScale(Number(d["prost2015"]));}
					   })
			.attr("cy", function(d) {
					   	if (toggleYear==1) {return yScale(Number(d["theft2003"]));}
					   	if (toggleYear==0) {return yScale(Number(d["theft2015"]));}

					})
			.transition()    // <-- Transition #2
			.duration(1000)
			.attr("fill", "grey")
			.attr("opacity", "0.5")
			.attr("stroke", "black")
			.attr("stroke-width",2)
			.attr("r", function(d) {
				if (toggleYear==1) return rScale(Number(d["total2015"]));
				else return rScale(Number(d["total2003"]));
			});





		
		});




	});

