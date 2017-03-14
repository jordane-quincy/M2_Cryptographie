package com.github.jordane_quincy.M2_Cryptographie;

import java.util.Scanner;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.github.jordane_quincy.M2_Cryptographie.Cesar.Cesar;
import com.github.jordane_quincy.M2_Cryptographie.Permutation.Permutation;
import com.github.jordane_quincy.M2_Cryptographie.Vigenere.Vigenere;

/**
 * Hello world!
 *
 */
public class App {

	private static final Logger LOG = LogManager.getLogger(App.class);

	public static void main(String[] args) {
		// System.out.println("Hello World!");
		//
		// final String sourceText = "abcd".toUpperCase();
		// final String key = "A".toUpperCase();
		//
		// System.out.println("Cesar :" + Cesar.encode(sourceText,
		// key.charAt(0)));
		//
		// System.out.println(Util.countLetterOccurence("abcdaab"));
		//
		//

		// final String texteChiffre = Util.removeAllNonAlphabeticalCharacters(
		// "QODBS WWOFO LOFMW MSZFK HSEES FWCSK JOFST SSBEE SVSCP KGOGC CXHKQ
		// AISGO G");
		// final int longeurCleMax = 2;
		// LOG.info("longeurCleMax :" + longeurCleMax);
		//
		// for (int i = 1; i <= longeurCleMax; i++) {
		// final String cle = IndiceDeCoincidence.findKey(texteChiffre, i);
		// final String texteClair = Vigenere.decode(texteChiffre, cle);
		// LOG.info("texteClair selon la cle '" + cle + "' :" + texteClair);
		//
		// // final LanguageIdentifier lid = new
		// // LanguageIdentifier(texteClair);
		// // LOG.info("langage detected : " + lid.getLanguage());
		// final String lang = Util.detectLang(texteClair);
		// LOG.info("langage detected : " + lang);
		// }
		//
		final Scanner sc = new Scanner(System.in);
		sc.useDelimiter("\\n");

		System.out.println("Veuillez saisir la méthode souhaitée : ");
		System.out.println("1 : César");
		System.out.println("2 : Permutation");
		System.out.println("3 : Vigenère");
		final int methode = sc.nextInt();

		System.out.println("Veuillez saisir l'opération souhaitée : ");
		System.out.println("1 : Chiffrement avec une clé donnée");
		System.out.println("2 : Déchiffrement avec une clé donnée");
		final int operation = sc.nextInt();

		System.out.println("Veuillez saisir le texte source : ");
		final String sourceText = sc.next();

		System.out.println("Veuillez saisir la clé : ");
		final String keyString = sc.next();

		// plus besoin de lire des saisies clavier
		sc.close();

		switch (methode) {
		case 1:
			switch (operation) {
			case 1:
				Cesar.encode(sourceText, keyString.charAt(0));
				break;
			case 2:
				Cesar.decode(sourceText, keyString.charAt(0));
				break;
			default:
				break;
			}
			break;

		case 2:
			final String alphabet_fr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

			switch (operation) {
			case 1:
				Permutation.encode(sourceText, alphabet_fr, keyString);
				break;
			case 2:
				Permutation.decode(sourceText, keyString, alphabet_fr);
				break;
			default:
				break;
			}
			break;

		case 3:
			switch (operation) {
			case 1:
				Vigenere.encode(sourceText, keyString);
				break;
			case 2:
				Vigenere.decode(sourceText, keyString);
				break;
			default:
				break;
			}
			break;

		default:
			break;
		}

	}
}
