if (typeof module === 'object' && module.exports) {
	// Node.js
	var fs = require('fs');
	eval(fs.readFileSync(__dirname + '/jspos-0.2.2/lexer.js', 'utf8'));
	eval(fs.readFileSync(__dirname + '/jspos-0.2.2/lexicon.js_', 'utf8'));
	eval(fs.readFileSync(__dirname + '/jspos-0.2.2/POSTagger.js', 'utf8'));
}

// if (document !== undefined) {
// 	var _createTextNode = document.createTextNode;
// 	document.createTextNode = function(data) {
// 		return _createTextNode(initPlainText(data, tenpb_options));
// 	}
// }

var tenpb = (function() {
	var 
		buttTypes = {
			CC:   [],  // Coordinating conjunction
			CD:   [],  // Cardinal number
			DT:   [],  // Determiner
			EX:   [],  // Existential there
			FW:   [],  // Foreign word
			IN:   [],  // Preposition or subordinating conjunction
			JJ:   ['butty', 'buttish'],  // Adjective
			JJR:  ['buttier'],  // Adjective, comparative
			JJS:  ['buttiest'],  // Adjective, superlative
			LS:   [],  // List item marker
			MD:   [],  // Modal
			NN:   ['butt'],  // Noun, singular or mass
			NNS:  ['butts'],  // Noun, plural
			NNP:  ['Butt'],  // Proper noun, singular
			NNPS: ['Butts'],  // Proper noun, plural
			PDT:  [],  // Predeterminer
			POS:  [],  // Possessive ending
			PRP:  [],  // Personal pronoun
			PRP$: [],  // Possessive pronoun
			RB:   ['buttingly', 'buttedly', 'buttly'],  // Adverb
			RBR:  ['buttier'],  // Adverb, comparative
			RBS:  ['buttiest'],  // Adverb, superlative
			RP:   [],  // Particle
			SYM:  [],  // Symbol
			TO:   [],  // to
			UH:   [],  // Interjection
			VB:   ['butt'],  // Verb, base form
			VBD:  ['butted'],  // Verb, past tense
			VBG:  ['butting'],  // Verb, gerund or present participle
			VBN:  ['butted'],  // Verb, past participle
			VBP:  ['butt'],  // Verb, non-3rd person singular present
			VBZ:  ['butts'],  // Verb, 3rd person singular present
			WDT:  [],  // Wh-determiner
			WP:   [],  // Wh-pronoun
			WP$:  [],  // Possessive wh-pronoun
			WRB:  []  // Wh-adverb
		},
		initModule, detachModule, initPlainText, fixCapitalization
	;

	initModule = function(container, options) {
		// window.tenpb_options = options;
		var treeWalker = document.createTreeWalker(container, window.NodeFilter.SHOW_TEXT, null, false);
		while (treeWalker.nextNode()) {
			if (treeWalker.currentNode.parentNode.tagName == "SCRIPT" || treeWalker.currentNode.parentNode.tagName == "STYLE") continue;
			treeWalker.currentNode.tenpb = { originalValue: treeWalker.currentNode.nodeValue };
			treeWalker.currentNode.nodeValue = initPlainText(treeWalker.currentNode.nodeValue, options);
		}
		container.classList.add('tenpb-on');
	};

	initPlainText = function(text, options) {
		var i, words, taggedWords, newWords, newWord;
			percent = (options && options.percent !== undefined ? options.percent : 10) / 100;

		words = text.toString().match(/\w+|\s+|[^\w\s]+/g);
		taggedWords = new POSTagger().tag(words);
		for (i = 0; i < words.length; i++) {
			if (!words[i].match(/\w/)) { continue; }
			if (Math.random() < percent) {
				newWords = buttTypes[taggedWords[i][1]];
				if (newWords.length > 0) {
					newWord = newWords[ Math.floor( Math.random() * newWords.length ) ];
					words[i] = fixCapitalization( words[i], newWord );
				}
			}
		}
		return words.join('');
	};

	detachModule = function(container) {
		var treeWalker = document.createTreeWalker(container, window.NodeFilter.SHOW_TEXT, null, false);

		while (treeWalker.nextNode()) {
			if (treeWalker.currentNode.tenpb != null) {
				treeWalker.currentNode.nodeValue = treeWalker.currentNode.tenpb.originalValue;
				delete treeWalker.currentNode.tenpb;
			}
		}

		container.classList.remove('tenpb-on');
	};

	fixCapitalization = function( source, target ) {
		if (source.toLowerCase() === source) {
			// All lower case.
			target = target.toLowerCase();
		}
		else if (source.length > 1 && (source.toUpperCase() === source)) {
			// All caps.
			target = target.toUpperCase();
		}
		else if (source[0].toUpperCase() === source[0]) {
			// First letter capitalized.
			target = target[0].toUpperCase() + target.slice(1).toLowerCase();
		}
		// If none of the above cases matched, return original target.
		return target;
	};

	return {
		initModule: initModule,
		initPlainText: initPlainText,
		detachModule: detachModule
	};
})();

if (typeof module === 'object' && module.exports) {
  module.exports = tenpb;
}