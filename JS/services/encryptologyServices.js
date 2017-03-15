const alphabet = require('config/config').alphabet;
const readline = require('readline');
const _ = require('lodash');
const menu = require('crypto');

/**
 * Fonction cryptant la lettre en fonction du décallage voulez-vous
 * @param  {char} letter lettre à crypter
 * @param  {int}  shift  Décallage voulu
 * @return {char}        lettre crypté
 */
var encryptLetter = (letter, shift) => {
    let letterInCode = _.indexOf(alphabet, letter);
    if (letterInCode === -1) {
        // La lettre n'est pas dans l'alphabet
        return null;
    }
    return alphabet[(letterInCode + shift) % alphabet.length];
};

var cesarEncryption = (next) => {

    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});
    var textToCrypt;
    var keyToCrypt;
    var encryptedText = "";
    rl.question("Quel texte voulez-vous chiffrer ? ", (answer) => {
        textToCrypt = answer;
        rl.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});

        r2.question("Avec quelle clé voulez-vous chiffrer ? ", (answer) => {
            keyToCrypt = answer;
            r2.close();
            console.log("le text est : " + textToCrypt);
            console.log("la clé est : " + keyToCrypt);
            var shift = _.indexOf(alphabet, keyToCrypt);
            for (var i = 0; i < textToCrypt.length; i++) {
                let encryptedLetter = encryptLetter(textToCrypt[i], shift);
                if (!encryptedLetter) {
                    // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
                    console.log(`Nous ne pouvons pas continuer car le caractère ${textToCrypt[i]} de votre texte ne se trouve pas dans l'alphabet`);
                    process.exit(1);
                }
                encryptedText += encryptLetter(textToCrypt[i], shift);
            }
            console.log(`le text crypté est : "${encryptedText}"\n\n\n`);
            next();
        });
    });
};

module.exports = {
    encryptLetter,
    cesarEncryption
};
