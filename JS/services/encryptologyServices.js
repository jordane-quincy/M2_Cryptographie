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
var encodeLetter = (letter, shift) => {
    let letterIndex = _.indexOf(alphabet, letter);
    if (letterIndex === -1) {
        // La lettre n'est pas dans l'alphabet
        return null;
    }
    return alphabet[(letterIndex + shift) % alphabet.length];
};

var decodeLetter = (letter, shift) => {
    let letterIndex = _.indexOf(alphabet, letter);
    if (letterIndex === -1) {
        return null;
    }
    return alphabet[
        (
            (letterIndex - shift) % alphabet.length >= 0 ?
                (letterIndex - shift) % alphabet.length
                :
                ((letterIndex - shift) % alphabet.length) + alphabet.length
        )
    ];
}

var cesarEncoding = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});
    var textToEncode;
    var usedKey;
    var encodedText = "";
    rl.question("Quel texte voulez-vous chiffrer ? ", (answer) => {
        textToEncode = answer;
        rl.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});

        r2.question("Avec quelle clé voulez-vous chiffrer ? ", (answer) => {
            usedKey = answer;
            r2.close();
            console.log("le text est : " + textToEncode);
            console.log("la clé est : " + usedKey);
            var shift = _.indexOf(alphabet, usedKey);
            for (var i = 0; i < textToEncode.length; i++) {
                let encodedLetter = encodeLetter(textToEncode[i], shift);
                if (!encodedLetter) {
                    // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
                    console.log(`Nous ne pouvons pas continuer car le caractère ${textToEncode[i]} de votre texte ne se trouve pas dans l'alphabet`);
                    process.exit(1);
                }
                encodedText += encodeLetter(textToEncode[i], shift);
            }
            console.log(`le text crypté est : "${encodedText}"\n\n\n`);
            next();
        });
    });
};

var cesarDecoding = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});
    var textToDecode;
    var usedKey;
    var decodedText = "";
    rl.question("Quel texte voulez-vous déchiffrer ? ", (answer) => {
        textToDecode = answer;
        rl.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});

        r2.question("Avec quelle clé le texte a été chiffré ? ", (answer) => {
            usedKey = answer;
            r2.close();
            console.log("le text est : " + textToDecode);
            console.log("la clé est : " + usedKey);
            var shift = _.indexOf(alphabet, usedKey);
            for (var i = 0; i < textToDecode.length; i++) {
                let decodedLetter = decodeLetter(textToDecode[i], shift);
                if (!decodedLetter) {
                    // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
                    console.log(`Nous ne pouvons pas continuer car le caractère ${textToDecode[i]} de votre texte ne se trouve pas dans l'alphabet`);
                    process.exit(1);
                }
                decodedText += decodeLetter(textToDecode[i], shift);
            }
            console.log(`le text crypté est : "${decodedText}"\n\n\n`);
            next();
        });
    });
};

module.exports = {
    encodeLetter,
    decodeLetter,
    cesarEncryption,
    cesarDecoding
};
