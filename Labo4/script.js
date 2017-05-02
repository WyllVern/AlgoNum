var $ = function(id) {
	return document.getElementById(id);
};



// https://www.developpez.net/forums/d1282843/webmasters-developpement-web/javascript-ajax-typescript-dart/javascript/fonction-factoriel-d-nombre/
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

function mycos(x)
{
	var accu = 0;
	var i = 0;
	do
	{
			//On ne veut pas sortir des limites du float, on fait donc notre calcul par itération moche.
			//Si on faisait (-1)^i * x^2i / 2i!, on obtient de trop gros chiffres.
			var value = Math.pow(-1,i);
			for(var j = 1; j <= 2*i; j++)
			{
					value *= x;
					value /= (j < 2) ? 1 : j;
			}
			accu += value;
			i++;
			//au bout d'un moment, on n'ajoute plus rien
	} while (value != 0)
	return accu;
}


function derivate(x, h)
{
	let ret=0;
	ret = (8.0*(mycos(x+(h/2.0))-mycos(x-(h/2.0))) - mycos(x+h) + mycos(x-h))/(6*h);
	return ret;
}
function derivate2(x,h)
{
	let ret=0;
	ret = (8.0*(derivate(x+(h/2.0),h)-derivate(x-(h/2.0),h)) - derivate(x+h,h) + derivate(x-h,h))/(6*h);
	return ret;
}

function compute()
{
	let h=0.001;
	console.log("Cos(x)= ");
	console.log(mycos(Math.PI*3));
	console.log("Cos'(x)= ");
	console.log(derivate(Math.PI*3,h));
	console.log("Cos''(x)= ");
	console.log(derivate2(Math.PI*3,h));
	plot(h);
}

function plotFonction(traceX, traceY, traceY1, traceY2) {
    DIVPLOT = $('plot');
    DIVPLOT.innerHTML = "";

    // Utilisation de l'API Plotly
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
	let y= [];
	let x=[];
	let y1= [];
	let y2= [];
	let step =0.2;
	for (var i = -2*Math.PI; i < 2*Math.PI; i+=step) {
		y.push(mycos(i));
		x.push(i);
		y1.push(derivate(i,h));
		y2.push(derivate2(i,h));

	}
	console.log(x);
	console.log("Cos(x): "+y);
	console.log("Cos'(x): "+y1);
	console.log("Cos\"(x): "+y2);
	plotFonction(x,y, y1, y2);



}
