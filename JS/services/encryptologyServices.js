'use strict'
const config = require('config/config');
// const alphabet = config.alphabet;
const freqApparitionLetter = config.freqApparitionLetter;
const readline = require('readline');
const _ = require('lodash');
const menu = require('crypto');

/**
 * Fonction cryptant la lettre en fonction du décallage voulez-vous
 * @param  {char} letter lettre à crypter
 * @param  {String} l'alphabet a utiliser
 * @param  {int}  shift  Décallage voulu
 * @return {char}        lettre crypté
 */
const encodeLetter = (letter, alphabet, shift) => {
    let letterIndex = _.indexOf(alphabet, letter);
    if (letterIndex === -1) {
        // La lettre n'est pas dans l'alphabet
        return null;
    }
    return alphabet[(letterIndex + shift) % alphabet.length];
};

const decodeLetter = (letter, alphabet, shift) => {
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
            console.log("le texte est : " + textToEncode);
            console.log("la clé est : " + usedKey);
            let alphabet = config.getAlphabet(textToEncode);
            let shift = _.indexOf(alphabet, usedKey);
            for (let i = 0; i < textToEncode.length; i++) {
                let encodedLetter = encodeLetter(textToEncode[i], alphabet, shift);
                if (!encodedLetter) {
                    // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
                    console.log(`Nous ne pouvons pas continuer car le caractère ${textToEncode[i]} de votre texte ne se trouve pas dans l'alphabet`);
                    process.exit(1);
                }
                encodedText += encodedLetter;
            }
            console.log(`le texte crypté est : "${encodedText}"\n\n\n`);
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
            console.log("le texte est : " + textToDecode);
            console.log("la clé est : " + usedKey);
            let alphabet = config.getAlphabet(textToDecode);
            let shift = _.indexOf(alphabet, usedKey);
            for (let i = 0; i < textToDecode.length; i++) {
                let decodedLetter = decodeLetter(textToDecode[i], alphabet, shift);
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

  console.log(`letterMaxOccurence : "${letterMaxOccurence}" (${maxOccurence})\n`);

  return letterMaxOccurence;
};

const cesarDecrypting = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    rl.question("Quel texte voulez-vous décrypter ? ", answer => {
        let textToDecrypt = answer;
        rl.close();
        let alphabet = config.getAlphabet(textToDecrypt);

        //On est en français donc la letter qui apparait le plus dans le texte chiffré est un 'e' dans le texte en clair
        let letterMaxOccurence = analyseFrequence(textToDecrypt);

        let shiftLetterMaxOccurence = _.indexOf(alphabet, letterMaxOccurence);

        let shiftLetterE = 4; // le 'E' ou 'e' est toujours à la cinquième place (alphabet[4]) que l'on soit en majuscule ou minuscule

        let shift = ((shiftLetterMaxOccurence - shiftLetterE) % alphabet.length);
        // console.log(`shift : "${shift}"\n`);

        var decodedText = '';
        for (let i = 0; i < textToDecrypt.length; i++) {
            let decodedLetter = decodeLetter(textToDecrypt[i], alphabet, shift);
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
            console.log("le texte est : " + textToEncode);
            console.log("la clé est : " + usedKey);
            let alphabet = config.getAlphabet(textToEncode);
            for (let i = 0; i < textToEncode.length; i++) {
                let shift = _.indexOf(alphabet, usedKey[i % usedKey.length]);
                //console.log(`usedKey : "${usedKey[i % usedKey.length]}"\n`);
                let encodedLetter = encodeLetter(textToEncode[i], alphabet, shift);
                if (!encodedLetter) {
                    // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
                    console.log(`Nous ne pouvons pas continuer car le caractère ${textToEncode[i]} de votre texte ne se trouve pas dans l'alphabet`);
                    process.exit(1);
                }
                encodedText += encodedLetter;
                //console.log(`encodedText : "${encodedText}"\n`);
            }
            console.log(`le texte crypté est : "${encodedText}"\n\n\n`);
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
            console.log("le texte est : " + textToDecode);
            console.log("la clé est : " + usedKey);
            let alphabet = config.getAlphabet(textToDecode);
            for (let i = 0; i < textToDecode.length; i++) {
                let shift = _.indexOf(alphabet, usedKey[i % usedKey.length]);
                let decodedLetter = decodeLetter(textToDecode[i], alphabet, shift);
                if (!decodedLetter) {
                    // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
                    console.log(`Nous ne pouvons pas continuer car le caractère ${textToDecode[i]} de votre texte ne se trouve pas dans l'alphabet`);
                    process.exit(1);
                }
                decodedText += decodedLetter;
            }
            console.log(`le texte crypté est : "${decodedText}"\n\n\n`);
            next();
        });
    });
};


const vigenereDecrypting = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    rl.question("Quel texte voulez-vous décrypter ? ", answer => {
        let textToDecrypt = 'QODBSWWOFOLOFMWMSZFKHSEESFWCSKJOFSTSSBEESVSCPKGOGCCXHKQAISGOG'; //'IRTGQTFTEFKENVRTOVLIGETDNVCITRBXGLVHGKYXVTFPTXCSGCYBKJCTPKPPKEGACCJPKKTTPRGIFVQRGEBPKKPTOFLICZRQTLGHURGIGKGCEVJPKK'; //FIXME: remettre : answer;
        rl.close();

        let alphabet = config.getAlphabet(textToDecrypt);

        let tab = [];
        let longueurCleMax = 2; //FIXME: pouvoir saisir la longeur de la clé (ou plutôt demandé si on reboucle en incrémentant la longueur de la cle)
        for (let i = 0; i < longueurCleMax; i++) {
          //init
          tab.push([]);
        }

        //on place chaque lettre dans le tableau correspondant
        for (let i = 0; i < textToDecrypt.length; i++) {
          let letterCurrent = textToDecrypt[i];
          //console.log('letterCurrent', letterCurrent, (i % longueurCleMax) );

          tab[i % longueurCleMax].push(letterCurrent);
        }

        let cle = '';

        //on calcule l'ic pour chaque partie du texte
        for (let i = 0; i < longueurCleMax; i++) {
          // console.log('tab['+ i +']', tab[i]);
          let partTextToDecrypt = tab[i].join('');
          console.log('['+ i +'] partTextToDecrypt:', partTextToDecrypt);

          let sumIc = 0;
          let mapLetterOccurence = countLetterOccurence(partTextToDecrypt);
          for (let [letter, countLetter] of mapLetterOccurence) {
            let icCurrentLetter = (countLetter * (countLetter -1) ) / (partTextToDecrypt.length * (partTextToDecrypt.length -1));
            // console.log('icCurrentLetter', letter, ':', icCurrentLetter);
            sumIc += icCurrentLetter;
          }
          console.log('sumIc pour ['+ i +']', sumIc);



          //On trouve la lettre avec le + d'occurence
          let letterMaxOccurence = analyseFrequence(partTextToDecrypt);

          // let shiftLetterMaxOccurence = _.indexOf(alphabet, letterMaxOccurence);

          let shiftLetterE = 4; // le 'E' ou 'e' est toujours à la cinquième place (alphabet[4]) que l'on soit en majuscule ou minuscule

          // let shift = alphabet[(shiftLetterMaxOccurence - shiftLetterE) % alphabet.length];

          let decodedLetter = decodeLetter(letterMaxOccurence, alphabet, shiftLetterE);
          console.log(`letterMaxOccurence : "${letterMaxOccurence}" = "${decodedLetter}"\n`);

          if (!decodedLetter) {
              // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
              console.log(`Nous ne pouvons pas continuer car le caractère ${letterMaxOccurence} de votre texte ne se trouve pas dans l'alphabet`);
              process.exit(1);
          }

          cle += decodedLetter;

        }

        console.log(`Nous proposons la clé "${cle}"`);



        // let sumIc = 0;
        // let mapLetterOccurence = countLetterOccurence(textToDecrypt);
        // for (let [letter, countLetter] of mapLetterOccurence) {
        //   let icCurrentLetter = (countLetter * (countLetter -1) ) / (textToDecrypt.length * (textToDecrypt.length -1));
        //   console.log('icCurrentLetter', letter, ':', icCurrentLetter);
        //   sumIc += icCurrentLetter;
        // }
        // console.log('sumIc :', sumIc);



        // const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        // r2.question("Avec quelle clé le texte a été chiffré ? ", (answer) => {
        //     let usedKey;
        //     let decodedText = "";
        //     usedKey = answer;
        //     r2.close();
        //     console.log("le texte est : " + textToDecode);
        //     console.log("la clé est : " + usedKey);
        //     let alphabet = config.getAlphabet(textToDecode);
        //     for (let i = 0; i < textToDecode.length; i++) {
        //         let shift = _.indexOf(alphabet, usedKey[i % usedKey.length]);
        //         let decodedLetter = decodeLetter(textToDecode[i], alphabet, shift);
        //         if (!decodedLetter) {
        //             // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
        //             console.log(`Nous ne pouvons pas continuer car le caractère ${textToDecode[i]} de votre texte ne se trouve pas dans l'alphabet`);
        //             process.exit(1);
        //         }
        //         decodedText += decodedLetter;
        //     }
        //     console.log(`le texte crypté est : "${decodedText}"\n\n\n`);
        //     next();
        // });
    });
};

const generatePermutationKey = (alphabet) => {
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


const isGoodPermuttationKey = (key, alphabet) => {
    // On vérifie si la clé donnée est bonne (2 lettres ne peuvent pas être chiffrer par la même lettre)
    if (key.length !== alphabet.length) {
        return false;
    }
    return alphabet.every(letter => {
        var reg = new RegExp("[^" + letter + "]", "g");
        return key.replace(reg, "").length === 1;
    });
};

const askKeyForPermuttationEncoding = (textToEncode, alphabet, callback, finalCallback) => {
    const r3 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    console.log(`Votre clé doit faire la taille de l'alphabet de l'algorithme.
    Une lettre correspond à une autre (2 lettres ne peuvent pas être chiffrées avec la même lettre)
    L'ordre de la clé suivra l'ordre des lettres de l'alphabet donnée juste en dessous
    L'alphabet supporté est : ${(alphabet.join("|"))}`);
    r3.question("Donner votre clé : ", (answer) => {
        let isGoodKey = isGoodPermuttationKey(answer, alphabet);
        console.log("is good key : " + isGoodKey);
        console.log("the key is : " + answer);
        r3.close();
        if (!isGoodKey) {
            console.log("La clé que vous venez de rentrer n'est pas conforme");
            askKeyForPermuttationEncoding(textToEncode, alphabet, callback, finalCallback);
        }
        else {
            callback(answer, textToEncode, alphabet, finalCallback);
        }
    });
};

const permuttationEncodingSuite = (key, textToEncode, alphabet, next) => {
    console.log(`La clé qui va être utilisée est donc : "${key}"`);
    let encodedText = "";
    for (let i = 0; i < textToEncode.length; i++) {
        // On récupère l'index de la lettre à encoder dans notre alphabet
        let indexOfLetterToEncode = _.indexOf(alphabet, textToEncode[i]);
        // On vérifie que la lettre se trouve bien dans l'alphabet
        if (indexOfLetterToEncode < 0) {
            console.log(`Nous ne pouvons pas continuer car le caractère ${textToEncode[i]} de votre texte ne se trouve pas dans l'alphabet`);
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
    r1.question("Quel texte voulez-vous chiffrer ?", answer => {
        let textToEncode = answer;
        let alphabet = config.getAlphabet(textToEncode);
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
                    key = generatePermutationKey(alphabet);
                    permuttationEncodingSuite(key, textToEncode, alphabet, next);
                    break;
                case "2":
                    askKeyForPermuttationEncoding(textToEncode, alphabet, permuttationEncodingSuite, next);
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
    r1.question("Quel texte voulez-vous déchiffrer ?", answer => {
        let textToDecode = answer;
        let alphabet = config.getAlphabet(textToDecode);
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
            if (!isGoodPermuttationKey(usedKey, alphabet)) {
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

// Récupérer tableau ordonnée des lettres de la plus présente dans le texte à la moins présente en partant de la map
const getTabOccurenceLetter = mapLetterOccurence => {
    let tabLetterOccurence = [];
    for (let [letter, countLetter] of mapLetterOccurence) {
        tabLetterOccurence.push(
            {
                letter,
                countLetter
            }
        );
    }
    tabLetterOccurence.sort((a, b) => {
        return b.countLetter - a.countLetter;
    });
    return tabLetterOccurence;
};

const permuttationDecrypting = next => {
    const r1 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    r1.question("Quel texte voulez-vous décrypter ?", answer => {
        let textToDecrypt = answer;
        r1.close();
        let mapLetterOccurence = countLetterOccurence(textToDecrypt);
        let tabLetterOccurence = getTabOccurenceLetter(mapLetterOccurence);
        tabLetterOccurence.forEach((letterToReplace, index) => {
            console.log(letterToReplace);
            console.log(index);
            let replacedLetter = freqApparitionLetter[index];
            console.log(replacedLetter);
            textToDecrypt = textToDecrypt.replace(new RegExp(letterToReplace.letter, 'g'), replacedLetter);
            console.log("Etape " + (index + 1) + "texte décrypté = " + textToDecrypt);
        });
        next();
    });
};

const generateSuperGrowingList = listSize => {
    let superGrowingList = [];
    for (let i = 0; i < listSize; i++) {
        let randomNumber = Math.floor(Math.random() * listSize) + 1;
        if (i === 0) {
            superGrowingList.push(randomNumber);
        }
        else {
            superGrowingList.push(randomNumber + _.sum(superGrowingList));
        }
    }
    console.log("Liste super croissante");
    console.log(superGrowingList);
    return superGrowingList;
};

const generateNonSuperGrowingSequence = (p, m, superGrowingList) => {
    let nonSuperGrowingSequence = [];
    superGrowingList.forEach(element => {
        nonSuperGrowingSequence.push((element * p) % m);
    });
    console.log("Suite non super croissante");
    console.log(nonSuperGrowingSequence);
    return nonSuperGrowingSequence;
};

const merkleHellmanEncoding = next => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});
    rl.question("Quel texte voulez-vous chiffrer ? ", answer => {
        let textToEncode = answer;
        rl.close();
        generateNonSuperGrowingSequence(7, 12, generateSuperGrowingList(24));

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
    permuttationDecoding,
    permuttationDecrypting,
    merkleHellmanEncoding,
    vigenereDecrypting
};
