//=========================================================================
// Traitement de "verifier"
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
	var Q;
	var QuestionPosees;
	var QuestionEnCours;
	var resultat;
	var score;
	var est;
	var pseudo;


		page = fs.readFileSync('./mod_trivial/verifier.html', 'UTF-8');
		QuestionPosees = fs.readFileSync("./mod_trivial/questionposees.json", 'utf-8'); 
		QuestionEnCours = fs.readFileSync("./mod_trivial/questionEnCours.json", 'utf-8');
		Q = JSON.parse(QuestionEnCours);
		score = fs.readFileSync("./mod_trivial/score.json", 'utf-8');
		console.log(score);
		
		//VERIFICATION DE LA REPONSE
		
		//SI CORRECT
		if (query.reponse === Q.reponse) {
			resultat = "correcte";
			score++;
			est = "est de";
			
		//SI INCORRECT	
		} else {
			resultat = "incorrecte";
			est = "reste de";
		}
		
		fs.writeFileSync("./mod_trivial/score.json", score, 'utf-8');
		
		//SUPPLANT DE LA PAGE HTML
		var cookies = new Cookies( req, res )
		pseudo = cookies.get( "pseudo");
		
		marqueurs = {};
		marqueurs.pseudo = pseudo;
        marqueurs.tareponse = query.reponse;
		marqueurs.question = Q.question;
		marqueurs.reponse = Q.reponse;
		marqueurs.resultat = resultat;
		marqueurs.est = est;
		marqueurs.score = score;
        page = page.supplant(marqueurs);
		
	res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
}
//---------------------------------------------------------------------------

module.exports = trait;