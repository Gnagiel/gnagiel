//=========================================================================
// Traitement de "commencerNS"
// Auteur : G. Nagiel
// Version : 31/01/2016
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');
var Cookies = require('cookies');

var trait = function (req, res, query) {

	var Nb;
	var page;
	var marqueurs;
	var pseudo;
	
	//CHOIX D'UN NOMBRE SECRET 
	Nb = Math.floor((Math.random() * 10) + 1);
	console.log("Nb = " + Nb);
	var contenu_fichier = JSON.stringify(Nb);  
	fs.writeFileSync("./mod_NS/secret.json", contenu_fichier, 'utf-8');
		
	page = fs.readFileSync('./mod_NS/commencerNS.html', 'UTF-8');	
	var cookies = new Cookies( req, res )
	pseudo = cookies.get( "pseudo");

	marqueurs = {};
	marqueurs.pseudo = pseudo;
	marqueurs.resultat = "";
	page = page.supplant(marqueurs); 
		
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
	
}

//---------------------------------------------------------------------------

module.exports = trait;