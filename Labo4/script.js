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
	/*if(Math.round(n)==n){
		var i=1
		var entree=n;
		while(i<entree-1){
			n= n+n*i;
			i=i+1;
		}
		//console.log(n);
		return n;
	}

	else {
		return undefined;
	}*/

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


	//console.log(fact(10));
	// for (var i = 0; i < 10; i++) {
	// 		//console.log("iteration "+i+" : "+mycos(i));
	// 		console.log("iteration "+i);
	// 			console.log(derivate(i, 0.001));




/*
	console.log((Math.pow(-1, 0)) / (fact(2*0)));
	console.log(Math.pow(Math.PI, 2*0));
	console.log((Math.pow(-1, 0)) / (fact(2*0)) * Math.pow(Math.PI, 2*0));
	console.log("------");
	console.log((Math.pow(-1, 1)) / (fact(2*1)));
	console.log(Math.pow(Math.PI, 2*1));
	console.log((Math.pow(-1, 1)) / (fact(2*1)) * Math.pow(Math.PI, 2*1));
*/


}
