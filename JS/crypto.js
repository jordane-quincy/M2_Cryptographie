const appModulePath = require('app-module-path');
appModulePath.addPath('./');
const readline = require('readline');
const _ = require('lodash');
const alphabet = require('config/config').alphabet;
const encryptologyServices = require('services/encryptologyServices');

var menu = () => {
    console.log("Quel service voulez-vous utilisez ?");
    console.log("1 - Chiffrer un text en donnant une clé avec l'algorithme de César");
    console.log("0 - Quitter");
    var readline1 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});
    readline1.question("Faites-votre choix : ", (answer) => {
        readline1.close();
        switch (answer) {
            case "1":
                encryptologyServices.cesarEncryption(menu);
                break;
            case "0":
                console.log("Au revoir");
                break;
            default:
                console.log("Vous avez entré un choix qui n'existe pas... Redonnez un choix svp\n");
                menu();
        }
    });
}
menu();
