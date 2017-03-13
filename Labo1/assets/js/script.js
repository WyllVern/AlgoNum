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
    source : https://en.wikipedia.org/wiki/IEEE_floating_point#Interchange_formats
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
    console.log(this.eSize + " "+this.eDecimal);

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
    /*
      va nous permettre d'avoir le bon nombre de 
      ex (127).toString(2) --> 1111111 ->(7) avec le while on va rajouter
      le bit manquant que la méthode toString ignore. donc res = 01111111
    */
    while(this.eBin.length != this.eSize){
      this.eBin = '0'+this.eBin;
    }
    console.log("exposant dec to bin (taille "+ this.eSize+") -> "+ this.eBin);
  },
  
 makeArrayMantisseEmpty : function(){
   if(this.mBin.length > 0){this.mBin = [];}
 },
 
 /*****************************************************************
 Gestion des différents cas Inifiny et NaN
 https://fr.wikipedia.org/wiki/IEEE_754#Format_simple_pr.C3.A9cision_.2832_bits.29
******************************************************************/
 checkCas : function(){
   
   let eBin = this.eBin.split("");
   let casInifni = Array(this.eSize).fill(1);
   let casNaN;
   /*on traite le cas infini*/
   for (var i = 0; i < eBin.length; i++) {
     if(eBin[i] != casInifni[i]){ // cas infini
       return false; // pas infini
     }
   }
   $('decimal').value = "";
   $('decimal').placeholder="Inifni OR NaN";   
   return true;
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
    this.mBin = Array(this.nbBits).fill(0);    //rempli le tableau de 0
    this.xBin = [];
    this.xBin = Array(this.nbBits).fill(0);
    $('binaire').value = this.xBin.join('');
  },
  
  /*input*/
  decToBin: function(x, nbBits){ //nombre de bits que l'on veut
    this.xDec = x;
    this.computeSigne();
    this.setNbits(nbBits);
    if(this.xDec == 0 || this.xDec == -0){
      this.computeSigne();
      this.casSpecialZero();
      return 1;
    }

    this.computeExposant();
    this.computeMantisse();

  },
  
  binToDec: function(x, nbBits){
    this.xBin = x.toString().split("");
    
   /**********************************************************************
    met a jour le nombre binaire si il ne respecte pas le nombre de bits 
   **********************************************************************/
    while(this.xBin.length != this.nbBits){ 
      if(this.xBin.length < this.nbBits){
        this.xBin.push('0');  
      }else{
         this.xBin.pop();  
      }
    }

    $('binaire').value = this.xBin.join('');

    this.xBin.reverse();
    
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
     this.mReal = mReal;
     console.log(mReal);
     
     /*calcule de l'exposant*/
     console.log("Calcule de l'exposant");
     let e = 0;
     let j = 0;
     let eBin=[];
     for (var i = this.mSize; i < this.mSize+this.eSize; i++) {
       if(this.xBin[i] == 1){
         eBin.push(1);
         console.log("e = "+e+" | e += 2^"+j);
         e+=Math.pow(2, j);
       }else{
         eBin.push(0);
       }
       j++;
     }
     
     this.eBin = eBin.reverse().join('');
     alert(this.eBin);
     
     if(this.checkCas()){
       alert("lasflksadjf");
       return 0;
     }
     alert("STOP");
     
    console.log("e' = "+e); 
    let a=0;
    this.s =  this.xBin[this.xBin.length-1];
    a = (-2*this.s+1) * mReal * Math.pow(2, e-this.eDecalage);
    console.log(a);
    this.xDec = a;
    $('decimal').value = a;
    $('signe').value = (this.s == 1) ? 'négatif' : 'positif'; 
    $('mSize').value = this.mSize;
    $('mReel').value = mReal;
    $('nbBitsExponent').value = this.eSize;
    $('decalage').value = this.eDecalage;
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
    alert("Entrez une valeur entre 12 et 230");
  }else{
    var xDec = $('decimal');
    var nbBits = $('nbBits');
    float.decToBin(xDec.value, nbBits.value);
    float.checkCas();
    float.print();    
  }
}; 

function binToDec(){
    var xBin = $('binaire');
    var nbBits = $('nbBits');
    if(xBin.value == 0){
      float.casSpecialZero();
      return 0;
    }
    float.binToDec(xBin.value, nbBits.value);
}; 

function checkNbBits(id){
  if(id.value < 12 || id.value > 230 || id.value == ""){
    return true;
  }
  return false;
};
