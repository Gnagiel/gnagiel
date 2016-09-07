//=========================================================================
// Traitement de "debuterNS"
// Auteur : G. Nagiel
// Version : 31/01/2016
//=========================================================================
"use strict";

var fs = require("fs");
var Cookies = require('cookies');

var trait = function (req, res, query) {

    var page;
	var marqueurs;
	var pseudo;
	
    // AFFICHAGE DE LA PAGE D'ACCUEIL
    page = fs.readFileSync('./mod_NS/debuterNS.html', 'utf-8');
	var cookies = new Cookies( req, res )
	pseudo = cookies.get( "pseudo");
	
	marqueurs = {};
	marqueurs.pseudo = pseudo;
	page = page.supplant(marqueurs); 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(page);
    res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;