package com.github.jordane_quincy.M2_Cryptographie.cryptanalyse;

import java.util.ArrayList;
import java.util.Map.Entry;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.github.jordane_quincy.M2_Cryptographie.utils.Util;

public class IndiceDeCoincidence {

	private static final Logger LOG = LogManager.getLogger(IndiceDeCoincidence.class);

	public static float getIndiceDeCoincidence(String texteChiffre, int longeurCle) {
		final float ic = 0f;
		final String texte = Util.removeAllNonAlphabeticalCharacters(texteChiffre);

		final ArrayList<ArrayList<Character>> lstSequence = getLstSequence(texte, longeurCle);

		final StringBuilder sb = new StringBuilder();
		for (final ArrayList<Character> sequence : lstSequence) {
			LOG.debug("sequence : " + sequence);
			final String sequenceString = Util.convertCharacterListToString(sequence);

			final Entry<Character, Integer> entryMaxOccurence = Util.getLetterWithMaxOccurence(sequenceString);
			LOG.debug("entryMaxOccurence : " + entryMaxOccurence);

			// TODO: prendre la lettre avec la plus grande occurence et faire le
			// calcul avec la lettre la plus fréquente de la langue en question
			// (mais comme ici on ne va faire que du francais...)
			// final char letterMax = entryMaxOccurence.getKey();
			// final BigDecimal letterMaxOccurence = new
			// BigDecimal(entryMaxOccurence.getValue());
			//
			// final BigDecimal ratio = letterMaxOccurence.divide(new
			// BigDecimal(sequence.size()), RoundingMode.HALF_UP);
			// LOG.debug(letterMaxOccurence + "/" + sequence.size() + "=" +
			// ratio);
			//
			// final char letterMaxDecoded = (char) (letterMax - 'E');
			// LOG.debug("letterMaxDecoded " + letterMaxDecoded);

			final char letterMax = entryMaxOccurence.getKey();
			final char letterMaxDecoded = (char) ('A' + (letterMax - 'E'));
			LOG.debug("letterMaxDecoded :" + (int) letterMax + "-" + (int) 'E' + ":" + (int) letterMaxDecoded + "="
					+ letterMaxDecoded);

			sb.append(letterMaxDecoded);

		}

		LOG.info(" cle = '" + sb.toString() + "'");

		return ic;
	}

	protected static ArrayList<ArrayList<Character>> getLstSequence(String texte, int longeurCle) {
		// on sait qu'on va avoir autant de sequence que la longeur de la cle
		final ArrayList<ArrayList<Character>> lstSequence = new ArrayList<>(longeurCle);

		for (int i = 0; i < texte.length(); i++) {
			final char lettre = texte.charAt(i);
			final int idxCle = i % longeurCle;
			// System.out.println("lettre : " + lettre + ", idxCle : " +
			// idxCle);

			final ArrayList<Character> sequence = getSequence(lstSequence, idxCle);

			sequence.add(lettre);
		}

		return lstSequence;
	}

	private static ArrayList<Character> getSequence(ArrayList<ArrayList<Character>> lstSequence, int idxSequence) {
		ArrayList<Character> sequence = null;
		try {
			sequence = lstSequence.get(idxSequence);
		} catch (final IndexOutOfBoundsException e) {
			// TODO : chaque sequence contient seulement une partie du texte,
			// au maximum :
			// (texte.length() / longeurCle ) + reste
			sequence = new ArrayList<>();

			lstSequence.add(sequence);
		}

		return sequence;
	}
}
