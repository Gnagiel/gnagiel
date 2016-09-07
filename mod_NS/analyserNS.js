//=========================================================================
// Traitement de "analyserNS"
// Auteur : G. Nagiel
// Version : 31/01/2016
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');
var Cookies = require('cookies');

var trait = function (req, res, query) {

	var Nb;
	var resultat;
	var page;
	var marqueurs = {};
	var nb_joueur;
	var pseudo;
		
	Nb = fs.readFileSync("./mod_NS/secret.json", 'utf-8');
	Nb = parseInt(Nb, 10);
	nb_joueur = parseInt(query.reponse, 10);
	page = fs.readFileSync('./mod_NS/commencerNS.html', 'UTF-8');
	var cookies = new Cookies( req, res )
	pseudo = cookies.get( "pseudo");
	marqueurs.pseudo = pseudo;
	
	//VERIFICATION DE LA REPONSE
		
	//SI PLUS PETITE
	if (nb_joueur < Nb) {
		resultat = "Trop petit !";
		marqueurs.resultat = resultat;
		page = page.supplant(marqueurs);		
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(page);
		res.end();
	
	//SI PLUS GRANDE
	} else if (nb_joueur > Nb) {
		resultat = "Trop grand !";
		marqueurs.resultat = resultat;
		page = page.supplant(marqueurs);		
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(page);
		res.end();
	
	//SI EGALE
	} else {
		page = fs.readFileSync('./mod_NS/recommencerNS.html', 'UTF-8');
		page = page.supplant(marqueurs);
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(page);
		res.end();
	}
}
//---------------------------------------------------------------------------

module.exports = trait;