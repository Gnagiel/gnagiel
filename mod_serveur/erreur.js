//=========================================================================
// Affichage d'une page d'erreur
// Auteur : G. Nagiel
// Version : 31/01/2016
//=========================================================================

"use strict";

var fs = require("fs");
var path = require("path");
"use strict";


var show_erreur = function (req, res, query) {

    res.writeHead(200, {'Content-Type': 'text/plain'});

    res.write('ERREUR SERVEUR');

    res.end();
};

//--------------------------------------------------------------------------

module.exports = show_erreur;
