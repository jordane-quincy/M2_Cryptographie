package com.github.jordane_quincy.M2_Cryptographie;

import com.github.jordane_quincy.M2_Cryptographie.Cesar.Cesar;
import com.github.jordane_quincy.M2_Cryptographie.utils.Util;

/**
 * Hello world!
 *
 */
public class App {

	public static void main(String[] args) {
		System.out.println("Hello World!");

		final String sourceText = "abcd".toUpperCase();
		final String key = "A".toUpperCase();

		System.out.println("Cesar :" + Cesar.encode(sourceText, key.charAt(0)));

		System.out.println(Util.countLetterOccurence("abcdaab"));
	}
}
