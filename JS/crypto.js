'use strict'
const appModulePath = require('app-module-path');
appModulePath.addPath('./');
const readline = require('readline');
const _ = require('lodash');
const alphabet = require('config/config').alphabet;
const encryptologyServices = require('services/encryptologyServices');

var menu = () => {
    console.log("Quel service voulez-vous utilisez ?");
    console.log("1 - César : Chiffrer un texte en donnant la clé");
    console.log("2 - César : Déchiffrer un texte en donnant la clé");
    console.log("3 - César : Décrypter un texte");
    console.log("4 - Permutation : Chiffrer un texte en donnant la clé");
    console.log("5 - Permutation : Déchiffrer un texte en donnant la clé");
    console.log("6 - Permutation : Décrypter un texte");
    console.log("7 - Vigenère : Chiffrer un texte en donnant la clé");
    console.log("8 - Vigenère : Déchiffrer un texte en donnant la clé");
    console.log("9 - Vigenère : Décrypter un texte (via Indice de coïncidence)");
    console.log("10 - Merkle - Hellman : Chiffrer un texte");
    console.log("11 - Merkle - Hellman : Déchiffrer une séquence");
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
                encryptologyServices.cesarDecrypting(menu);
                break;
            case "4":
                encryptologyServices.permuttationEncoding(menu);
                break;
            case "5":
                encryptologyServices.permuttationDecoding(menu);
                break;
            case "6":
                encryptologyServices.permuttationDecrypting(menu);
                break;
            case "7":
                encryptologyServices.vigenereEncoding(menu);
                break;
            case "8":
                encryptologyServices.vigenereDecoding(menu);
                break;
            case "9":
                encryptologyServices.vigenereDecrypting(menu);
                break;
            case "10":
                encryptologyServices.merkleHellmanEncoding(menu);
                break;
            case "11":
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
