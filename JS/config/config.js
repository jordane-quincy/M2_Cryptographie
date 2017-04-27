const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
    // "a",
    // "b",
    // "c",
    // "d",
    // "e",
    // "f",
    // "g",
    // "h",
    // "i",
    // "j",
    // "k",
    // "l",
    // "m",
    // "n",
    // "o",
    // "p",
    // "q",
    // "r",
    // "s",
    // "t",
    // "u",
    // "v",
    // "w",
    // "x",
    // "y",
    // "z",
    // " ",
    // "!"
]

const freqApparitionLetter = [
    "E",
    "A",
    "I",
    "S",
    "N",
    "R",
    "T",
    "O",
    "L",
    "U",
    "D",
    "C",
    "M",
    "P",
    "G",
    "B",
    "V",
    "H",
    "F",
    "Q",
    "Y",
    "X",
    "J",
    "K",
    "W",
    "Z"
];

const getAlphabet = (textToAnalyse) => {
   if (textToAnalyse === textToAnalyse.toUpperCase()) {
     console.log('getAlphabet : UPPERCASE');

     let alphabetUpperCase = [];
     for (let i = 0; i < alphabet.length; i++) {
       alphabetUpperCase.push(alphabet[i].toUpperCase());
     }
     return alphabetUpperCase;
   }else if (textToAnalyse === textToAnalyse.toLowerCase()) {
     console.log('getAlphabet : lowercase');

     let alphabetLowerCase = [];
     for (let i = 0; i < alphabet.length; i++) {
       alphabetLowerCase.push(alphabet[i].toLowerCase());
     }
     return alphabetLowerCase;
   }else {
     console.log('getAlphabet : Case Mixed');
     let alphabetUpperCase = [];
     for (let i = 0; i < alphabet.length; i++) {
       alphabetUpperCase.push(alphabet[i].toUpperCase());
     }
     let alphabetLowerCase = [];
     for (let i = 0; i < alphabet.length; i++) {
       alphabetLowerCase.push(alphabet[i].toLowerCase());
     }
     return alphabetUpperCase.concat(alphabetLowerCase);
   }
};

const textForDecryptingPermuttation = "SOUFFREZQUUNCAVALIERCOMBATLESHAINESQUELQUECHOSEQUILNETENAITPASACEREGARDETUNESEDUCTIONIRRESISTIBLEDANSLAMOUSTACHEMOURONSJEUNESTOUSDEUXDELAVANCEFAITESLUIENTENDREQUESIELLESETAIENTMOINSLARGESMOINSDETROISOUDECINQHEURESCONNAISSANTLATENDANCEDESMONOMANIAQUESASEGROUPERAUTOURDECERTAINSPOINTSAUMONDEQUIECRIVEASAFEMMELENTEMENTPAREILLEALAMIENNE";
const key = "BCITHMVUGORQZSDWFXKPJALEYN";
const textEncoding = "KDJMMXHNFJJSIBABQGHXIDZCBPQHKUBGSHKFJHQFJHIUDKHFJGQSHPHSBGPWBKBIHXHVBXTHPJSHKHTJIPGDSGXXHKGKPGCQHTBSKQBZDJKPBIUHZDJXDSKOHJSHKPDJKTHJETHQBABSIHMBGPHKQJGHSPHSTXHFJHKGHQQHKHPBGHSPZDGSKQBXVHKZDGSKTHPXDGKDJTHIGSFUHJXHKIDSSBGKKBSPQBPHSTBSIHTHKZDSDZBSGBFJHKBKHVXDJWHXBJPDJXTHIHXPBGSKWDGSPKBJZDSTHFJGHIXGAHBKBMHZZHQHSPHZHSPWBXHGQQHBQBZGHSSH";


const permutation_encode_MAJ_text_uncrypted = 'VENIVIDIVICI';
const permutation_encode_MAJ_alphabet = 'RGECVJUASPOIMBWDTZXFHYKLNQ';
const permutation_encode_MAJ_text_crypted = 'YVBSYSCSYSES';

const permutation_encode_min_text_uncrypted = 'venividivici';
const permutation_encode_min_alphabet = 'rgecvjuaspoimbwdtzxfhyklnq';
const permutation_encode_min_text_crypted = 'yvbsyscsyses';

const permutation_encode_mix_text_uncrypted = 'VeniVidiVici';
const permutation_encode_mix_alphabet = 'RGECVJUASPOIMBWDTZXFHYKLNQrgecvjuaspoimbwdtzxfhyklnq';
const permutation_encode_mix_text_crypted = 'YvbsYscsYses';


const vigenere_encode_MAJ_text_uncrypted  = 'CEPREMIEREXERCICEPRATIQUEVISEAVERIFIERQUELESBASESSONTACQUISES';
const vigenere_encode_MAJ_cle = 'OK';
const vigenere_encode_MAJ_text_crypted = 'QODBSWWOFOLOFMWMSZFKHSEESFWCSKJOFSTSSBEESVSCPKGOGCCXHKQAISGOG';

const vigenere_encode_MAJ_text_uncrypted_4  = 'GAVROCHECOMPLETEMENTENVOLEETRADIEUXSETAITCHARGEDELAMISEENTRAINILALLAITVENAITDESCENDAITREMONTAITBRUISSAITETINCELAIT';
const vigenere_encode_MAJ_cle_4 = 'CRYP';
const vigenere_encode_MAJ_text_crypted_4 = 'IRTGQTFTEFKENVRTOVLIGETDNVCITRBXGLVHGKYXVTFPTXCSGCYBKJCTPKPPKEGACCJPKKTTPRGIFVQRGEBPKKPTOFLICZRQTLGHURGIGKGCEVJPKK';


module.exports = {
    alphabet,
    freqApparitionLetter
    , getAlphabet
};
