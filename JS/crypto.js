'use strict' 
const appModulePath = require('app-module-path');
appModulePath.addPath('./');
const readline = require('readline');
const _ = require('lodash');
const alphabet = require('config/config').alphabet;
const encryptologyServices = require('services/encryptologyServices');

var menu = () => {
    console.log("Quel service voulez-vous utilisez ?");
    console.log("1 - Chiffrer un texte en donnant une clé avec l'algorithme de César");
    console.log("2 - Déchiffrer un texte en donnant la clé avec l'algorithme de César");
    console.log("3 - Chiffrer un texte en donnant une clé avec l'algorithme de Permutation");
    console.log("4 - Déchiffrer un texte en donnant la clé avec l'algorithme de Permutation");
    console.log("7 - Chiffrer un texte en donnant une clé avec l'algorithme de Vigènere");
    console.log("8 - Déchiffrer un texte en donnant la clé avec l'algorithme de Vigènere");
    console.log("9 - Décrypter un texte avec l'algorithme de César");
    console.log("10 - Décrypter un texte avec l'algorithme de Permutation");
    console.log("11 - Chiffrer un texte avec l'algorithme de Merkle - Hellman");
    console.log("12 - Décrypter un texte avec l'algorithme de Vigènere (via Indice de coïncidence)");
    console.log("13 - Déchiffrer une séquence avec l'algorithme de Merkle - Hellman");
    console.log("0 - Quitter");
    var readline1 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});
    readline1.question("Faites-votre choix : ", (answer) => {
        readline1.close();
        switch (answer) {
            case "1":
                encryptologyServices.cesarEncoding(menu);
                break;
            case "2":
                encryptologyServices.cesarDecoding(menu);
                break;
            case "3":
                encryptologyServices.permuttationEncoding(menu);
                break;
            case "4":
                encryptologyServices.permuttationDecoding(menu);
                break;
            case "7":
                encryptologyServices.vigenereEncoding(menu);
                break;
            case "8":
                encryptologyServices.vigenereDecoding(menu);
                break;
            case "9":
                encryptologyServices.cesarDecrypting(menu);
                break;
            case "10":
                encryptologyServices.permuttationDecrypting(menu);
                break;
            case "11":
                encryptologyServices.merkleHellmanEncoding(menu);
                break;
            case "12":
                encryptologyServices.vigenereDecrypting(menu);
                break;
            case "13":
                encryptologyServices.merkleHellmanDecoding(menu);
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
