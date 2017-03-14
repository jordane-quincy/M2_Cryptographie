package com.github.jordane_quincy.M2_Cryptographie;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.github.jordane_quincy.M2_Cryptographie.Vigenere.Vigenere;
import com.github.jordane_quincy.M2_Cryptographie.cryptanalyse.IndiceDeCoincidence;
import com.github.jordane_quincy.M2_Cryptographie.utils.Util;

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

		final String texteChiffre = Util.removeAllNonAlphabeticalCharacters(
				"QODBS WWOFO LOFMW MSZFK HSEES FWCSK JOFST SSBEE SVSCP KGOGC CXHKQ AISGO G");
		final int longeurCleMax = 2;
		LOG.info("longeurCleMax :" + longeurCleMax);

		for (int i = 1; i <= longeurCleMax; i++) {
			final String cle = IndiceDeCoincidence.findKey(texteChiffre, i);
			final String texteClair = Vigenere.decode(texteChiffre, cle);
			LOG.info("texteClair selon la cle '" + cle + "' :" + texteClair);

			// final LanguageIdentifier lid = new
			// LanguageIdentifier(texteClair);
			// LOG.info("langage detected : " + lid.getLanguage());
			final String lang = Util.detectLang(texteClair);
			LOG.info("langage detected : " + lang);
		}
	}
}
