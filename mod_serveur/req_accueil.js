//=========================================================================
// Traitement de "req_commencer"
// Auteur : G. Nagiel
// Version : 31/01/2016
//=========================================================================
"use strict";


require('remedial');


var trait = function (req, res, query, cookies, fs) {

    var marqueurs;
    var page;
	var pseudo;
	
    // AFFICHAGE DE LA PAGE D'ACCUEIL

    page = fs.readFileSync('./html/modele_accueil_membre.html', 'utf-8');
	
	pseudo = cookies.get( "pseudo");
	if (pseudo) {
			marqueurs = {};
	    marqueurs.pseudo = pseudo;
	    page = page.supplant(marqueurs);

	    res.writeHead(200, {'Content-Type': 'text/html'});
	    res.write(page);
	    res.end();
	}
	else {
		page = fs.readFileSync('./html/modele_accueil.html', 'utf-8');

		marqueurs = {};
		marqueurs.erreur = "SESSION EXPIREE : reconnectez-vous";
		marqueurs.pseudo = "";
		page = page.supplant(marqueurs);
	  res.writeHead(200, {'Content-Type': 'text/html'});
	  res.write(page);
	  res.end();
	}

};
//--------------------------------------------------------------------------

module.exports = trait;