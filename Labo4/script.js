var $ = function(id) {
	return document.getElementById(id);
};


// return n!
function fact(n)
{
	if(n<=1)
		return 1;

	let ret = 1;
	for(i = 2; i <= n; i++)
	{
		ret = ret*i;
	}
	return ret;

}

// cos(x) using Taylor series
function mycos(x)
{
	var accu = 0;
	var i = 0;
	do
	{
		// Compute by iteration to avoid float overflow.
		var value = Math.pow(-1,i);
		for(var j = 1; j <= 2*i; j++)
		{
			value *= x;
			value /= (j < 2) ? 1 : j;
		}
		accu += value;
		i++;
	} while (value != 0);
	return accu;
}

// cos'(x)
function derivate(x, h)
{
	let ret=0;
	ret = (8.0*(mycos(x+(h/2.0))-mycos(x-(h/2.0))) - mycos(x+h) + mycos(x-h))/(6*h);
	return ret;
}

// cos"(x)
function derivate2(x,h)
{
	let ret=0;
	// 4th degree polynom (formula from page 21 of chapter 4 pdf)
	ret = (8.0*(derivate(x+(h/2.0),h)-derivate(x-(h/2.0),h)) - derivate(x+h,h) + derivate(x-h,h))/(6*h);
	return ret;
}

// Call when the compute button is clicked
function compute()
{
	let h=0.001;
	//Debug and verification
	console.log("Cos(x)= ");
	console.log(mycos(Math.PI*3));
	console.log("Cos'(x)= ");
	console.log(derivate(Math.PI*3,h));
	console.log("Cos''(x)= ");
	console.log(derivate2(Math.PI*3,h)); // Should be -1*cos(x)
	plot(h);
}

// Plot cos(x), cos'(x) and cos"(x) using plotly (plot.ly)
function plotFonction(traceX, traceY, traceY1, traceY2) {
	DIVPLOT = $('plot');
	DIVPLOT.innerHTML = "";
	var trace = {
		x: traceX,
		y: traceY,
		name: 'Cos(x)',
		type: 'scattergl',
		line: {
			color: 'rgb(255,0,0)',
			width: 3
		}
	};

	var trace1 = {
		x: traceX,
		y: traceY1,
		name: 'Cos\'(x)',
		type: 'scattergl',
		line: {
			color: 'rgb(0,255,0)',
			width: 3
		}
	};

	var trace2 = {
		x: traceX,
		y: traceY2,
		name: 'Cos"(x)',
		type: 'scattergl',
		line: {
			color: 'rgb(0,0,255)',
			width: 3
		}
	};

	var layout = {
		yaxis: {
			autorange: true
		},
		title: 'Graphe de Cos(x) en série de Taylor et ses 2 premières dérivées'
	};
	Plotly.newPlot(DIVPLOT, [trace, trace1, trace2], layout);
}
function plot(h)
{
	// This arrays contains series of numbers to be plotted
	let y= [];
	let x=[];
	let y1= [];
	let y2= [];
	let step =0.2;
	let index = 0;

	// Intervals : [-2 Pi ; 2 Pi], step : 0.2
	for (var i = -2*Math.PI; i < 2*Math.PI; i+=step) {
		y.push(mycos(i));
		x.push(i);
		y1.push(derivate(i,h));
		y2.push(derivate2(i,h));
		console.log("cos(" + x[x.length-1] + ") = " + y[y.length-1]);
		console.log("cos'(" + x[x.length-1] + ") = " + y1[y1.length-1]);
		console.log("cos\"(" + x[x.length-1] + ") = " + y2[y2.length-1]);
		console.log("-----------");
		addtableau(x[x.length-1], y[y.length-1], y1[y1.length-1], y2[y2.length-1], index);
		index++;

	}
	
	plotFonction(x,y, y1, y2);
}

// Add a row to the table (x, cos(x), cos'(x) and cos"(x))
function addtableau(x, y, y1, y2, i)
{
	var table = $("tbody");
	var row;
	row = table.insertRow(i);
	row.insertCell(0).innerHTML += x;
	row.insertCell(1).innerHTML += y;
	row.insertCell(2).innerHTML += y1;
	row.insertCell(3).innerHTML += y2;
}