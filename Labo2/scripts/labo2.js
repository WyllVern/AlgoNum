/*
AN_Labo2_EquipeB2.
Méthode choisie : par dichotomie
*/

var $ = function(id) {
    return document.getElementById(id);
};


function fun1(x) {
    return Math.sin(x) - (x / 13);
}

function fun2(x) {
    return (x / (1 - (x * x)));
}

function myFun(x) {
    if ($('fun1').checked)
        return fun1(x);
    else if ($('fun2').checked)
        return fun2(x);
}

function compute() {
    /*
    Idée de base:
    On va diviser l'intervalle en petites intervalles dans lequel on va chercher si la fonction
    change de signe (théorême de Cauchy)
    */

    var a = -100;
    var b = 100;
    var delta = 1 / 1e5;
    var step = 0.1;

    console.log(delta);

    // Données de plot:
    var traceX = [];
    var traceY = [];

    // Tableau des racines calculées
    var roots = [];


    for (var i = a; i < b; i += step) {
        // Idee: parcours chaque petit intervalles.
        var c = i;
        var d = i + step;

        var fa = myFun(c);
        var fb = myFun(d);

        traceX.push(c);
        traceY.push(fa);

        // Si la fonction change de signe dans cette intervalles on applique la bissection
        if (fa * fb <= 0) {

            // Application de la bissection
            while (Math.abs(c - d) > delta) {
                var m = (c + d) / 2;
                var fm = myFun(m);
                if ((fm * fa) <= 0) {
                    d = m;
                    fb = fm;
                } else {
                    c = m;
                    fa = fm;
                }
                //console.log(m);
            }
            console.log("m affiché au final: " + m);

            // Check continuité
            var delt10 = delta * 10;
            //console.log(Math.round(m * (1 / (delta * 10))) / (1 / (delta * 10)));
            //console.log(Math.round(m / (delta * 10)) * (delta * 10)); // Pas le même résultat ?

            var mRound = Math.round(m * (1 / delt10)) / (1 / delt10);
            var fmRound = myFun(mRound);

            if (fmRound == Infinity || fmRound == -Infinity) {
                //roots.push(fmRound);
                console.log(m + " ~= " + mRound + " : n'est pas une racine mais une asymptote de f");
                roots.push(m + " ~= " + mRound + " (asymptote)");
            } else {
                roots.push(m + " ~= " + mRound);
            }
        }
    }

    // Affiche racines
    printRoot(roots);

    // Plot fonction
    plotFonction(traceX, traceY);
}

function plotFonction(traceX, traceY) {
    DIVPLOT = $('plot');
    DIVPLOT.innerHTML = "";

    // Utilisation de l'API Plotly
    var trace = {
        x: traceX,
        y: traceY,
        type: 'scattergl',
        line: {
            color: 'rgb(255,140,0)',
            width: 3
        }
    };

    var layout = {
        yaxis: {
            autorange: true
        }
    };

    // Optimisation de l'affichage pour fun2.
    if ($('fun2').checked) {
        layout = {
            yaxis: {
                range: [-0.1, 0.1],
                //autorange: true
            }
        };
    }

    Plotly.newPlot(DIVPLOT, [trace], layout);
}

function printRoot(roots) {
    //console.log(roots);
    var tableRoots = $("racines");
    tableRoots.innerHTML = "";
    for (var i = 0; i < roots.length; i++) {
        tableRoots.insertRow(i).insertCell(-1).innerHTML += roots[i];
    }
}
