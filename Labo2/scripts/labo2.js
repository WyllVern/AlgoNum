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
    idée de base:
    on va diviser l'intervale en petit intervale dans lequel on va chercher si la fonction
    change de signe (théorême de Cauchy)
    */

    var a = -100;
    var b = 100;
    var delta = 1 * Math.pow(10, -5);
    var step = 0.1;

    console.log(delta);

    // Données de plot:
    var traceX = [];
    var traceY = [];

    // Tableau des racines calculées
    var roots = [];


    for (var i = a; i < b; i += step) {
        // Idee: parcours chaque petit intervale.
        var c = i;
        var d = i + step;

        // Ajouter une condition pour verifier si la fct change de signe dans
        // L'intervalle. si c'est le cas, appliquer la bissection
        var fa = myFun(c);
        var fb = myFun(d);

        traceX.push(c);
        traceY.push(fa);

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
            roots.push(m);
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
        type: 'scatter',
    };
    var layout = {
        yaxis: {
            autorange: false
        }
    };

    Plotly.newPlot(DIVPLOT, [trace], layout);
}

function printRoot(roots) {
    //console.log(roots);
    var tableRoots = $("racines");
    tableRoots.innerHTML = "";
    for (var i = 0; i < roots.length; i++) {
        tableRoots.insertRow(i).insertCell(0).innerHTML += roots[i];
    }
}
