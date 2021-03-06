//=========================================================================
// Traitement de "req_identifier"
// Auteur : G. Nagiel
// Version : 31/01/2016
//=========================================================================

"use strict";


require('remedial');


var trait = function (req, res, query, cookies, fs, querystring) {

    var marqueurs;
    var pseudo;
    var password;
    var page;
    var membre;
    var contenu_fichier;
    var listeMembres;
    var i;
    var trouve;
	var parsedBody = [];

    // ON LIT LES COMPTES EXISTANTS

    contenu_fichier = fs.readFileSync("./membres/membres.json", 'utf-8');    
    listeMembres = JSON.parse(contenu_fichier);
	var body = '';
	req.on('data', function (data) {
		body += data;
	});
	req.on('end', function () {
		parsedBody = querystring.parse(body);
		var login = parsedBody["pseudo"];
		var pass = parsedBody["password"];

		cookies.set("pseudo", login, { maxAge: 20000});
		cookies.set("password", pass, { maxAge: 20000});

		// ON VERIFIE QUE LE PSEUDO/PASSWORD EXISTE

		trouve = false;
		i = 0;
		while(i<listeMembres.length && trouve === false) {
			if(listeMembres[i].pseudo === login) {
				if(listeMembres[i].password === pass) {
					trouve = true;
				}
			}
			i++;
		}
		
		// ON RENVOIT UNE PAGE HTML 

		if(trouve === false) {
			// SI IDENTIFICATION INCORRECTE, ON REAFFICHE PAGE ACCUEIL AVEC ERREUR

			page = fs.readFileSync('./html/modele_accueil.html', 'utf-8');

			marqueurs = {};
			marqueurs.erreur = "ERREUR : compte ou mot de passe incorrect";
			marqueurs.pseudo = login;
			page = page.supplant(marqueurs);

		} else {
			// SI IDENTIFICATION OK, ON ENVOIE PAGE ACCUEIL MEMBRE

			page = fs.readFileSync('./html/modele_accueil_membre.html', 'UTF-8');

			marqueurs = {};
			marqueurs.pseudo = login;
			page = page.supplant(marqueurs);
		}

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(page);
		res.end();
	});
};

//---------------------------------------------------------------------------

module.exports = trait;