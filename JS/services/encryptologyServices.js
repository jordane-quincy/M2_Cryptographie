'use strict'
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
const encodeLetter = (letter, shift) => {
    let letterIndex = _.indexOf(alphabet, letter);
    if (letterIndex === -1) {
        // La lettre n'est pas dans l'alphabet
        return null;
    }
    return alphabet[(letterIndex + shift) % alphabet.length];
};

const decodeLetter = (letter, shift) => {
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
};

const cesarEncoding = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});
    rl.question("Quel texte voulez-vous chiffrer ? ", answer => {
        let textToEncode = answer;
        rl.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        r2.question("Avec quelle clé voulez-vous chiffrer ? ", answer => {
            let usedKey;
            let encodedText = "";
            usedKey = answer;
            r2.close();
            console.log("le text est : " + textToEncode);
            console.log("la clé est : " + usedKey);
            let shift = _.indexOf(alphabet, usedKey);
            for (let i = 0; i < textToEncode.length; i++) {
                let encodedLetter = encodeLetter(textToEncode[i], shift);
                if (!encodedLetter) {
                    // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
                    console.log(`Nous ne pouvons pas continuer car le caractère ${textToEncode[i]} de votre texte ne se trouve pas dans l'alphabet`);
                    process.exit(1);
                }
                encodedText += encodedLetter;
            }
            console.log(`le text crypté est : "${encodedText}"\n\n\n`);
            next();
        });
    });
};

const cesarDecoding = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    rl.question("Quel texte voulez-vous déchiffrer ? ", answer => {
        let textToDecode = answer;
        rl.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        r2.question("Avec quelle clé le texte a été chiffré ? ", answer => {
            let usedKey;
            let decodedText = "";
            usedKey = answer;
            r2.close();
            console.log("le text est : " + textToDecode);
            console.log("la clé est : " + usedKey);
            let shift = _.indexOf(alphabet, usedKey);
            for (let i = 0; i < textToDecode.length; i++) {
                let decodedLetter = decodeLetter(textToDecode[i], shift);
                if (!decodedLetter) {
                    // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
                    console.log(`Nous ne pouvons pas continuer car le caractère ${textToDecode[i]} de votre texte ne se trouve pas dans l'alphabet`);
                    process.exit(1);
                }
                decodedText += decodedLetter;
            }
            console.log(`le text décrypté est : "${decodedText}"\n\n\n`);
            next();
        });
    });
};


const countLetterOccurence = (textToDecrypt) => {
  var mapLetterOccurence = new Map();
  for (let i = 0; i < textToDecrypt.length; i++) {
    let letterCurrent = textToDecrypt[i];
    // console.log(`letterCurrent : "${letterCurrent}"\n`);
    let countLetter = mapLetterOccurence.get(letterCurrent) === undefined ? 0 : mapLetterOccurence.get(letterCurrent);
    // console.log(`countLetter : "${countLetter}"\n`);

    countLetter++;
    mapLetterOccurence.set(letterCurrent, countLetter);
  }

  return mapLetterOccurence;
};

const analyseFrequence = (textToDecrypt) => {
  let mapLetterOccurence = countLetterOccurence(textToDecrypt);

  var maxOccurence = 0;
  var letterMaxOccurence = '';
  for (var [letter, countLetter] of mapLetterOccurence) {
    // console.log(`mapLetterOccurence : "${letter}" = "${countLetter}"`);
    if(countLetter > maxOccurence){
      maxOccurence = countLetter;
      letterMaxOccurence = letter;
    }
  }

  console.log(`letterMaxOccurence : "${letterMaxOccurence}" ("${maxOccurence}")\n`);

  return letterMaxOccurence;
};

const cesarDecrypting = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    rl.question("Quel texte voulez-vous décrypter ? ", answer => {
        let textToDecrypt = answer;
        rl.close();

        let letterMaxOccurence = analyseFrequence(textToDecrypt);
        //On est en français donc la letter qui apparait le plus dans le texte chiffré est un 'e' dans le texte en clair

        let shiftLetterMaxOccurence = _.indexOf(alphabet, letterMaxOccurence);
        let shiftLetterE = _.indexOf(alphabet, 'E');//FIXME: prendre la premiere lettre du tableau de fréquence

        let shift = ((shiftLetterMaxOccurence - shiftLetterE) % alphabet.length);
        // console.log(`shift : "${shift}"\n`);

        var decodedText = '';
        for (let i = 0; i < textToDecrypt.length; i++) {
            let decodedLetter = decodeLetter(textToDecrypt[i], shift);
            // console.log(`textToDecrypt[i] : "${textToDecrypt[i]}" = "${decodedLetter}"\n`);
            if (!decodedLetter) {
                // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
                console.log(`Nous ne pouvons pas continuer car le caractère ${textToDecode[i]} de votre texte ne se trouve pas dans l'alphabet`);
                process.exit(1);
            }
            decodedText += decodedLetter;
        }
        console.log(`le texte déchiffré est : "${decodedText}"\n\n\n`);
        next();
    });
};

const vigenereEncoding = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});
    rl.question("Quel texte voulez-vous chiffrer ? ", answer => {
        let textToEncode = answer;
        rl.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        r2.question("Avec quelle clé voulez-vous chiffrer ? ", answer => {
            let usedKey;
            let encodedText = "";
            usedKey = answer;
            r2.close();
            console.log("le text est : " + textToEncode);
            console.log("la clé est : " + usedKey);
            for (let i = 0; i < textToEncode.length; i++) {
                let shift = _.indexOf(alphabet, usedKey[i % usedKey.length]);
                //console.log(`usedKey : "${usedKey[i % usedKey.length]}"\n`);
                let encodedLetter = encodeLetter(textToEncode[i], shift);
                if (!encodedLetter) {
                    // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
                    console.log(`Nous ne pouvons pas continuer car le caractère ${textToEncode[i]} de votre texte ne se trouve pas dans l'alphabet`);
                    process.exit(1);
                }
                encodedText += encodedLetter;
                //console.log(`encodedText : "${encodedText}"\n`);
            }
            console.log(`le text crypté est : "${encodedText}"\n\n\n`);
            next();
        });
    });
};


const vigenereDecoding = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    rl.question("Quel texte voulez-vous déchiffrer ? ", answer => {
        let textToDecode = answer;
        rl.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        r2.question("Avec quelle clé le texte a été chiffré ? ", (answer) => {
            let usedKey;
            let decodedText = "";
            usedKey = answer;
            r2.close();
            console.log("le text est : " + textToDecode);
            console.log("la clé est : " + usedKey);
            for (let i = 0; i < textToDecode.length; i++) {
                let shift = _.indexOf(alphabet, usedKey[i % usedKey.length]);
                let decodedLetter = decodeLetter(textToDecode[i], shift);
                if (!decodedLetter) {
                    // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
                    console.log(`Nous ne pouvons pas continuer car le caractère ${textToDecode[i]} de votre texte ne se trouve pas dans l'alphabet`);
                    process.exit(1);
                }
                decodedText += decodedLetter;
            }
            console.log(`le text crypté est : "${decodedText}"\n\n\n`);
            next();
        });
    });
};

const generatePermutationKey = () => {
    // On va générer une clé au hasard en inversant les lettres de l'alphabet
    let key = "";
    let copiedAlphabet = [...alphabet];
    while (copiedAlphabet.length > 0) {
        // On choisi un nombre random entre 0 et la taille de l'alphabet
        let random = Math.floor(Math.random() * copiedAlphabet.length);
        key += copiedAlphabet[random];
        copiedAlphabet.splice(random, 1);
    }
    return key;
};


const isGoodPermuttationKey = (key) => {
    // On vérifie si la clé donnée est bonne (2 lettres ne peuvent pas être chiffrer par la même lettre)
    if (key.length !== alphabet.length) {
        return false;
    }
    return alphabet.every(letter => {
        var reg = new RegExp("[^" + letter + "]", "g");
        return key.replace(reg, "").length === 1;
    });
};

const askKeyForPermuttationEncoding = (textToEncode, callback, finalCallback) => {
    const r3 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    console.log(`Votre clé doit faire la taille de l'alphabet de l'algorithme.
    Une lettre correspond à une autre (2 lettres ne peuvent pas être chiffrées avec la même lettre)
    L'ordre de la clé suivra l'ordre des lettres de l'alphabet donnée juste en dessous
    L'alphabet supporté est : ${(alphabet.join("|"))}`);
    r3.question("Donner votre clé : ", (answer) => {
        let isGoodKey = isGoodPermuttationKey(answer);
        console.log("is good key : " + isGoodKey);
        console.log("the key is : " + answer);
        r3.close();
        if (!isGoodKey) {
            console.log("La clé que vous venez de rentrer n'est pas conforme");
            askKeyForPermuttationEncoding(textToEncode, callback, finalCallback);
        }
        else {
            callback(answer, textToEncode, finalCallback);
        }
    });
};

const permuttationEncodingSuite = (key, textToEncode, next) => {
    console.log(`La clé qui va être utilisée est donc : "${key}"`);
    let encodedText = "";
    for (let i = 0; i < textToEncode.length; i++) {
        // On récupère l'index de la lettre à encoder dans notre alphabet
        let indexOfLetterToEncode = _.indexOf(alphabet, textToEncode[i]);
        // On vérifie que la lettre se trouve bien dans l'alphabet
        if (indexOfLetterToEncode < 0) {
            console.log(`Nous ne pouvons pas continuer car le caractère ${textToDecode[i]} de votre texte ne se trouve pas dans l'alphabet`);
            process.exit(1);
        }
        // Avec l'index on remplace tout simplement la lettre par la lettre correspondante présente dans la clé
        let encodedLetter = key[_.indexOf(alphabet, textToEncode[i])];
        encodedText += encodedLetter;
    }
    console.log(`le texte crypté est : "${encodedText}"\n\n\n`);
    next();
};

const permuttationEncoding = (next) => {
    const r1 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    r1.question("Quel text voulez-vous chiffrer ?", answer => {
        let textToEncode = answer;
        r1.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        console.log("Vous avez le choix entre donner votre clé, ou laisse l'algorithme générer la clé !");
        console.log("1 - Laisser l'algorithme générer la clé");
        console.log("2 - Donner une clé");
        r2.question("Quel est votre choix ?", answer => {
            let choix = answer;
            r2.close();
            let key;
            switch (choix) {
                case "1":
                    key = generatePermutationKey();
                    permuttationEncodingSuite(key, textToEncode, next);
                    break;
                case "2":
                    askKeyForPermuttationEncoding(textToEncode, permuttationEncodingSuite, next);
                    break;
                default:
                    console.log("Mauvais choix on recommence !!!");
                    permuttationEncoding(next);
            };
        });
    });
};

const permuttationDecoding = (next) => {
    const r1 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    r1.question("Quel text voulez-vous déchiffrer ?", answer => {
        let textToDecode = answer;
        r1.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});

        r2.question(`Avec quelle clé le texte a été chiffré ?
            La clé doit faire la taille de l'alphabet de l'algorithme.
            Une lettre correspond à une autre (2 lettres ne peuvent pas être chiffrées avec la même lettre)
            L'ordre de la clé suivra l'ordre des lettres de l'alphabet donnée juste en dessous
            L'alphabet supporté est : ${(alphabet.join("|"))} `, answer => {
            const usedKey = answer;
            r2.close();
            // On teste si la clé donnée est correcte
            if (!isGoodPermuttationKey(usedKey)) {
                console.log("La clé que vous venez de donner n'est pas conforme, on recommence !!");
                permuttationDecoding(next);
            }
            else {
                // La clé est correcte on peut faire le déchiffrement
                let decodedText = "";
                for (let i = 0; i < textToDecode.length; i++) {
                    let indexOfLetterToDecode = usedKey.indexOf(textToDecode[i]);
                    decodedText += alphabet[indexOfLetterToDecode];
                }
                console.log(`Le texte décrypté est : "${decodedText}"\n\n\n`);
                next();
            }
        });
    });
};

module.exports = {
    encodeLetter,
    decodeLetter,
    cesarEncoding,
    cesarDecoding,
    cesarDecrypting,
    vigenereEncoding,
    vigenereDecoding,
    permuttationEncoding,
    permuttationDecoding
};
