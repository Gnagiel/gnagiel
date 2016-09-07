//=========================================================================
// Traitement de "jouer"
// Auteur : G. Nagiel
// Version : 15/01/2016
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');
var Cookies = require('cookies');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
    var membre;
	var listeQ;
    var contenu_fichier;
    var Qarray;
	var Nb;
	var Q;
	var QuestionPosees;
	var Qposees
	var QposeesArray;
	var trouve;
	var i;
	var score;
	var pseudo;
    	
    Qarray = fs.readFileSync("./mod_trivial/questions.json", 'utf-8');  
    Qarray = JSON.parse(Qarray);

	Qposees = fs.readFileSync("./mod_trivial/questionposees.json", 'utf-8');  
    Qposees = JSON.parse(Qposees);
	
	//CHOIX D'UN NOMBRE ALEATOIRE POUR L'INDICE DU TABLEAU DES QUESTIONS 
	Nb = Math.floor((Math.random() * Qarray.length) + 0);
	console.log("Nb = " + Nb);
    
	//BOUCLE PERMETTANT DE VERIFIER SI LA QUESTION EST DEJA POSEES
	trouve = false;
	i = 0;
    while(i<Qposees.length) {
        if(Qposees[i].question === Qarray[Nb].question) {            
			trouve = true;			
		}
		console.log(Qposees[i].question);
		console.log(Qarray[Nb].question);
		console.log("taille tab 1 = " + Qarray.length);
		console.log("taille tab 2 = " + Qposees.length);
		i++;
		console.log("i = " + i);
    }
	
	//SI QUESTION NON POSEES
	if (trouve === false) { 
		
		Q = Qarray[Nb];
		QuestionPosees = JSON.stringify(Qarray[Nb]);
		var QposeesArray = {};
		QposeesArray.question = Q.question;
		QposeesArray.reponse = Q.reponse;
        Qposees[Qposees.length] = QposeesArray;

        var contenu_fichier = JSON.stringify(Qposees);
		
		fs.writeFileSync("./mod_trivial/questionposees.json", contenu_fichier, 'utf-8');
		fs.writeFileSync("./mod_trivial/questionEnCours.json", QuestionPosees, 'utf-8');
		page = fs.readFileSync('./mod_trivial/jouer.html', 'UTF-8');
		var cookies = new Cookies( req, res )
		pseudo = cookies.get( "pseudo");
    
		marqueurs = {};
		marqueurs.pseudo = pseudo;
		marqueurs.question = Q.question;
		page = page.supplant(marqueurs); 
		
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(page);
		res.end();
	
	//SI PLUS DE QUESTIONS
	} else if (Qposees.length === Qarray.length) {
		page = fs.readFileSync('./mod_trivial/resultat.html', 'UTF-8');
		score = fs.readFileSync("./mod_trivial/score.json", 'utf-8');
		marqueurs = {};
		marqueurs.score = score;
		page = page.supplant(marqueurs);
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(page);
		res.end();
	
	//SI QUESTION DEJA POSEES	
	} else {
		trait (req, res, query);
	} 
}

//---------------------------------------------------------------------------

module.exports = trait;