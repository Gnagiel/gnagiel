//=========================================================================
// Serveur
// Auteur : G. Nagiel
// Version : 31/01/2016
// New commit de test !!!
//=========================================================================
"use strict";

var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");	 


//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_commencer = require("./mod_serveur/req_commencer.js");
var req_accueil = require("./mod_serveur/req_accueil.js");
var req_afficher_formulaire_inscription = require("./mod_serveur/req_afficher_formulaire_inscription.js");
var req_inscrire = require("./mod_serveur/req_inscrire.js");
var req_identifier = require("./mod_serveur/req_identifier.js");
var debuter = require("./mod_trivial/debuter.js");
var jouer = require("./mod_trivial/jouer.js");
var verifier = require("./mod_trivial/verifier.js");
var debuterNS = require("./mod_NS/debuterNS.js");
var commencerNS = require("./mod_NS/commencerNS.js");
var analyserNS = require("./mod_NS/analyserNS.js");
var req_static = require("./mod_serveur/req_static.js");
var erreur = require("./mod_serveur/erreur.js");
var Facebook = require('facebook-node-sdk');
var Cookies = require('cookies');
//var facebook = new Facebook({ appID: '1176946892316790', secret: '45f96c33fa0681b982696c446b2d43e7' });

/*facebook.api('/amachang', function(err, data) {
  console.log("FB : "+data); // => { id: ... }
  
});*/
//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (req, res) {
	var cookies = new Cookies( req, res );
	
    var ressource;
    var requete;
    var pathname;;
    var query;
	
	
	
    requete = url.parse(req.url, true);
    pathname = requete.pathname;
    query = requete.query;
	console.log("==============================================");
	console.log(pathname);
	console.log("==============================================");
	
	// ROUTEUR
	
   try {
        switch (pathname) {
				case '/':
 				case '/req_commencer':
					req_commencer(req, res, query, cookies, fs);
				break;
				case '/req_accueil':
					req_accueil(req, res, query, cookies, fs);
				break;
        case '/req_afficher_formulaire_inscription':
					req_afficher_formulaire_inscription(req, res, query);
				break;
        case '/req_inscrire':
					req_inscrire(req, res, query, querystring, cookies, fs);
				break;
        case '/req_identifier':
					req_identifier(req, res, query, cookies, fs, querystring);
				break;
        case '/debuter':
					debuter(req, res, query, querystring, cookies, fs);
				break;
        case '/jouer':
					jouer(req, res, query, querystring, cookies, fs);
				break;
        case '/verifier':
					verifier(req, res, query, querystring, cookies, fs);
				break;
				case '/debuterNS':
					debuterNS(req, res, query, querystring, cookies, fs);
				break;
        case '/commencerNS':
					commencerNS(req, res, query, querystring, cookies, fs);
				break;
        case '/analyserNS':
					analyserNS(req, res, query, querystring, cookies, fs);
				break;
        case '/membres/membres.json':
					res.writeHead(400, {'Content-Type': 'text/html'});
					res.end();
				break;
        default:
					req_static(req, res, pathname);
				break;
        }
    } catch (e) {
        console.log('Erreur : ' + e.stack);
        console.log('Erreur : ' + e.message);
        //console.trace();
        erreur(req, res, query);
		
    }
       
};
//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

var mon_serveur = http.createServer(traite_requete);
var port = 5000;
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
