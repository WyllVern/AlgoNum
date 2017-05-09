function compute() {
    // var a = 0;
    // var b = 1;
    // var h = (b - a) / 2;
    // var wi = [5 / 9, 8 / 9, 5 / 9];
    // var xi = [-(1 / 5) * Math.sqrt(15), 0, (1 / 5) * Math.sqrt(15)];
    // var total = 0;
    /*
    METHODE DE SIMPSON CAR GAUSS C'EST DE LA GROOOOOSSSSEE MEEERDDDEE
    */
    var n = 500;
    //
    //   for (var i = 0; i < n; i++) {
    //     total += wi[i]*f(h*xi[i]+(a+b)/2);
    //     console.log(total);
    //   }
    // console.log("vrai total" + (h*total)*4);
    //   return h*total;
    // }

    h = (b - a) / n;
    j = f(a);
    var t0 = performance.now();
    for (i = 1; i <= n - 2; i = i + 2) {
        x = a + i * h;
        j = j + 4 * f(x) + 2 * f(x + h)
    }
    j = j + 4 * f(b - h) + f(b);
    var t1 = performance.now();
    console.log((t1-t0).toFixed(3)+" ms");
    console.log("pi=" + (4*(j * h / 3)).toFixed(16));
    console.log("pi="+Math.PI.toFixed(16));

}

function f(x) {
    return 1 / (1 + x * x);
}
