//=========================================================================
// Traitement de "debuter"
// Auteur : G. Nagiel
// Version : 15/01/2016
//=========================================================================
"use strict";

var fs = require("fs");
var Cookies = require('cookies');

var trait = function (req, res, query) {

    var marqueurs;
    var page;
	var score;
	var pseudo;
	
    // AFFICHAGE DE LA PAGE D'ACCUEIL
    page = fs.readFileSync('./mod_trivial/debuter.php', 'utf-8');
	var cookies = new Cookies( req, res )
	pseudo = cookies.get( "pseudo");
    
	marqueurs = {};
    marqueurs.pseudo = pseudo;
    page = page.supplant(marqueurs);
	
	// INITIALISATION DU SCORE ET DES QUESTIONS DEJA POSEES ET ECRITURE DANS UN FICHIER
	score = 0;
	fs.writeFileSync('./mod_trivial/score.json', score, 'utf-8');

	fs.writeFileSync('./mod_trivial/questionposees.json', '[]', 'utf-8')

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;