/*
AN Labo5 EquipeB2
© 2017 by Dany Chea, Johnny Da Costa, Sylvain Renaud.
All rights reserved.
*/

function compute() {
  //Source: http://serge.mehl.free.fr/anx/meth_simpson.html
  //Parce qu'avec la quadrature de Gauss, c'est compliqué.

var $ = function( id ) { return document.getElementById( id ); };
  /*
  *a= borne inférieure
  *b= borne supérieure
  */
  var a = 0;
  var b = 1;
  var h = (b - a) / 2;

  //trouvé par expérimentation.
  var n = 550;

  h = (b - a) / n;
  j = f(a);

  //lancement du chrono
  var t0 = performance.now();

  //implémentation de Simpson
  for (i = 1; i <= n - 2; i = i + 2) {
    x = a + i * h;
    j = j + 4 * f(x) + 2 * f(x + h)
  }
  j = j + 4 * f(b - h) + f(b);

  var t1 = performance.now();

  //affichage des résultats
  console.log((t1 - t0).toFixed(3) + " ms");
  console.log("pi=" + (4 * (j * h / 3)).toFixed(17));
  console.log("pi=" + Math.PI.toFixed(17));

  $('piMachine').value="π= " + Math.PI.toFixed(17);
  $('piSimpson').value="π= " + (4 * (j * h / 3)).toFixed(17);
  $('time').value=(t1 - t0).toFixed(3) + " ms";


}

function f(x) {
  //fonction dont il faut calculer l'intégrale
  return 1 / (1 + x * x);
}
