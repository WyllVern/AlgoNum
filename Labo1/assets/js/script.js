var float = {
  
  /*************************************
  Attributs de notre objet  
  *************************************/
  xDec: 0,       //nombre floatant
  xBin: 0,      //nombre binaire
  
  mBin: [],      // tableau pour la mantisse en binaire
  mReel: 0,      //mantisse reel
  mSize:23,      //nb de bit pour la mantisse
  
  eDecalage: 0,   //décalage
  eDecimal:0,   // exposant EMax
  eSize:0,    // taille de l'exposant
  eBin:0,   // exposant en binaire
  
  s: 0,       //signe de bits
  nbBits: 32,  //nmombre de bit sur lequel on encode l'information
 
  /*********************************************************************************
    Selon la norme IEEE 754-1985
    Voir tableau dans la sections Basic and interchange_formats
    source : https://en.wikipedia.org/wiki/IEEE_floating_point#Interchange_formats
  **********************************************************************************/ 
  IEEEFormatBits: [
    {bits: 16,  exponant: 5,  eMax: 15},
    {bits: 32,  exponant: 8,  eMax: 127},
    {bits: 64,  exponant: 11, eMax: 1023},
    {bits: 128, exponant: 15, eMax: 16383},
    {bits: 256, exponant: 19, eMax: 262143}
  ],
  
  /**********************************************************************************
   interchangeFormat() va nous permettre
   de vérifié si le nombre de bits existe déjà selon la norme IEEE 754-1985
   et de set la taille de l'exposant et son EMax
  **********************************************************************************/
  interchangeFormat : function(){
    for (var i = 0; i < this.IEEEFormatBits.length; i++) {
      if(this.IEEEFormatBits[i].bits == this.nbBits){
        this.eDecimal = this.eDecalage = this.IEEEFormatBits[i].eMax;
        this.eSize = this.IEEEFormatBits[i].exponant;
        console.log("EMAX :"+this.eDecimal);
        console.log("Exposant size :"+this.eSize);
        return 0;
      }
    }
    /*
    calcule de la taille de l'exposant selon selon la norme IEEE 754-1985.
    Ensuite enregistre la valeur de l'exposant Max et de sa taille dans le tableau
    pour éviter de le recalculer si l'utilisateur nous le demande
    */
    this.eSize = Math.round(4 * Math.log(this.nbBits) / Math.log(2) - 13);
    this.eDecimal = (Math.pow(2,this.eSize)/2)-1;
    this.IEEEFormatBits.push({bits: this.nbBits, exponant: this.eSize, eMax: this.eDecimal });
    return 0;
  },
  
  setNbits : function(nbBits){
    this.nbBits = Number(nbBits);
    this.interchangeFormat();
    this.mSize = this.nbBits - this.eSize - 1; // récupere la taille de la mantisse
  },  
  
  /********************************************************
  méthodes pour trouver le signe, mantisse et l'exposant
  permet de trouver le signe de bit
  *********************************************************/
  computeSigne : function(){
     if(this.xDec < 0){
       this.s=1;
       this.xDec *= -1;
     }else{
       this.s=0;
     }
  },
  
 /******************************************************
  va calculer l'exposant en décimal
 *******************************************************/
  computeExposant : function(){
    if(this.xDec < 1){
      while (this.xDec<1){
        this.xDec*=2; 
        this.eDecimal--;
        console.log("x < 1 donc e = "+ this.eDecimal +" et x = "+this.xDec)
      }
    }else if(this.xDec>=2){
      while(this.xDec>=2){
        this.xDec/=2;
        this.eDecimal++;
        console.log("x >= 2 donc e = "+ this.eDecimal +" et x = "+this.xDec)
      }
    }
    this.convertExposantToBin();
  },
  
  convertExposantToBin : function(){
    this.eBin = this.eDecimal.toString(2);
    console.log("exposant dec to bin (taille "+ this.eSize+") -> "+ this.eBin);
  },
  
 makeArrayMantisseEmpty : function(){
   if(this.mBin.length > 0){this.mBin = [];}
 },
  
 computeMantisse : function(){
    //on vérifie si le tableau m[] est vide ? 
    this.makeArrayMantisseEmpty(this.m);
    console.log("IN : computeMantisse");
    this.mReel = this.xDec;
    this.xDec--;
    console.log("x = "+this.xDec);
    console.log("Taille de la mantisse = "+this.mSize);
    for (var i = 0; i < this.mSize; i++) {
        console.log("----------------------------------------");
        console.log("x = "+ this.xDec);
        this.xDec *= 2;
        console.log(this.xDec+" * 2 = "+ this.xDec);
        if(this.xDec < 1){
          this.mBin.push(0);
          console.log("m["+i+"] ajout -> "+this.mBin[i]);
          console.log(this.mBin);
        }else{
          this.mBin.push(1);
          console.log("m["+i+"] ajout -> "+this.mBin[i]);
          console.log(this.mBin);
          this.xDec--;
        }
    }

  },
  
  casSpecialZero : function(){
    console.log("traiter le cas 0");
    this.makeArrayMantisseEmpty();
    this.eBin = 0;
    this.mReel = 0;
    this.mBin = Array(this.mSize).fill(0);    //rempli le tableau de 0
  },
  
  /*input*/
  decToBin: function(x, nbBits){ //nombre de bits que l'on veut
    this.xDec = x;
    this.computeSigne();
    this.setNbits(nbBits);
    if(this.xDec == 0 || this.xDec == -0){
      this.casSpecialZero();
      return 1;
    }

    this.computeExposant();
    this.computeMantisse();
  },
  
  binToDec: function(x, nbBits){
    this.xBin = x.toString().split("").reverse();
    this.setNbits(nbBits);
    let mReal = 0;
    console.log(this.mSize);
    for (var i = 0; i < this.mSize; i++) {
      if(this.xBin[i] == 1){
          console.log(mReal+" + 2^"+i);
          mReal+=Math.pow(2, i);
      }
    }
     
     mReal+=Math.pow(2, this.mSize);
     console.log(mReal+"/2^"+this.mSize);
     mReal /= Math.pow(2, this.mSize);
     console.log(mReal);
     
     /*calcule de l'exposant*/
     console.log("Calcule de l'exposant");
     let e = 0;
     let j = 0;
     for (var i = this.mSize; i < this.mSize+this.eSize; i++) {
       if(this.xBin[i] == 1){
         console.log("e = "+e+" | e += 2^"+j);
         e+=Math.pow(2, j);
       }
       j++;
     }
    console.log("e' = "+e); 
    let a=0;
    a = (-2*this.s+1) * mReal * Math.pow(2, e-this.eDecalage);
    console.log(a);
    $('decimal').value = a;
  },
  
  print: function(){
      $('binaire').value = this.s+this.eBin+this.mBin.join('');
      $('signe').value = (this.s == 1) ? 'négatif' : "positif";   
      $('mSize').value = this.mSize;
      $('mReel').value = this.mReel; 
      $('mBin').value = this.mBin.join('');
      $('eDec').value = this.eDecimal;
      $('eBin').value = this.eBin;
      $('nbBitsExponent').value = this.eSize;
      $('decalage').value = this.eDecalage;
  } 
};

/*
* fonction anonyme qui retourne l'élément qui porte l'id 
*/
var $ = function(id){
  return document.getElementById(id);
};

function decToBin(){
  if(this.checkNbBits($('nbBits'))){
    //traiter le 
    alert("Trop grand ou trop petit");
  }else{
    var xDec = $('decimal');
    var nbBits = $('nbBits');
    float.decToBin(xDec.value, nbBits.value);
    float.print();
  }
}; 

function binToDec(){
    var xBin = $('binaire');
    var nbBits = $('nbBits');
    float.binToDec(xBin.value, nbBits.value);
    //float.print();
}; 

function checkNbBits(id){
  if(id.value < 12 || id.value > 230 || id.value == ""){
    return true;
  }
  return false;
};
