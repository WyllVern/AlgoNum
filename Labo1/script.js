var float = {
  x: 0, //nombre floatant
  m: [], // tableau pour la mantisse
  eBin: [], // tableau pour l'exposant
  bits32: 23,
  bits64: 52,
  e: 127, //exposant (32bits, E=8 => 127 si n'est rien dit)
  s: 0, //signe de bit (0->+ et 1->-)
  
  
  //méthodes pour trouver le signe, mantisse et l'exposant
  //permet de trouver le signe de bit
  computeSigne : function(){
     if(this.x < 0){ // si x est < 0 alors notre bits de signe devien -1
       this.s=1
       this.x *= -1;
     }else{
       this.s=0;
     }
  },
  

  
  //calcule l'exposant selon si l'utilisateur choisi 32 ou 64 bits
  computeExposant : function(nbBits){
    (nbBits===32) ? this.e = 127 : this.e = 1023;
    if(this.x < 1){
      while (this.x<1){
        this.x*=2; 
        this.e--;
        console.log("x < 1 donc e = "+ this.e +" et x = "+this.x)
      }
    }else if(this.x>=2){
      while(this.x>=2){
        this.x/=2;
        this.e++;
        console.log("x >= 2 donc e = "+ this.e +" et x = "+this.x)
      }
    }
    this.convertExposantToBin();
  },
  
  convertExposantToBin : function(){
    this.eBin = this.e.toString(2).split('');
  },
  
 makeArrayMantisseEmpty : function(){
   if(this.m.length > 0){this.m = [];}
 },
  
 computeMantisse : function(nbBits){
    //on vérifie si le tableau m[] est vide ? 
    this.makeArrayMantisseEmpty(this.m);
    console.log("IN : computeMantisse");
    this.x--;
    console.log("x = "+this.x);
    let sizeM;
    (nbBits===32) ? this.sizeM = 23 : this.sizeM = 52;
    console.log("Taille de la mantisse = "+this.sizeM);
    for (var i = 0; i < this.sizeM; i++) {
        console.log("----------------------------------------");
        console.log("x = "+ this.x);
        this.x *= 2;
        console.log(this.x+" * 2 = "+ this.x);
        if(this.x < 1){
          this.m.push(0);
          console.log("m["+i+"] ajout -> "+this.m[i]);
          console.log(this.m);
        }else{
          this.m.push(1);
          console.log("m["+i+"] ajout -> "+this.m[i]);
          console.log(this.m);
          this.x--;
        }
    }
  },
  
  casSpecialZero : function(n){
    
    console.log("traiter le cas 0");
    this.makeArrayMantisseEmpty();
    this.m = Array(n).fill(0);    //rempli le tableau de 0
  },
  
  /*input*/
  decTo: function(x, n){ //nombre de bits que l'on veut
    this.x = x;
    if(this.x == 0 || this.x == -0){
      this.casSpecialZero(n);
      return 1;
    }
    this.computeSigne();
    this.computeExposant(n);
    this.computeMantisse(n);
  },
  
  print: function(){
      $('bin').value = this.s+this.eBin.join('')+this.m.join('');
  } 
};


/*
* fonction anonyme qui retourne l'élément qui porte l'id 
*/
var $ = function(id){
  return document.getElementById(id);
};

function decToBin(){
  var dec = $('dec');
  float.decTo(dec.value, 32);
  float.print();
}; 
