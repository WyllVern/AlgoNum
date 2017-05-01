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

function mycos(x, nmax)
{
	let ret = 0;
	var signe = -1;
	for (var i = 0; i <= nmax; i++)
	{
		if(i%2==0)
			signe
		ret += ((Math.pow(-1, i)) / (fact(2*i))) * Math.pow(x, 2*i);
	}

	return ret;
}

function derivate(x, h, borne)
{
	let ret=0;
	ret = (mycos(x+h,borne)-mycos(x-h,borne))/2*h;
	return ret;
}

function compute()
{
	let borne = 4;
	//console.log(fact(10));
	console.log(mycos(0, borne));
	console.log(derivate(0, 0.001, borne));
	
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