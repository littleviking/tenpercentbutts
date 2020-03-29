const word_list = {
    "JJ":   ['butty', 'buttish', 'butted', 'butting'],  // Adjective
    "JJR":  ['buttier'],  // Adjective, comparative
    "JJS":  ['buttiest'],  // Adjective, superlative
    "NN":   ['butt'],  // Noun, singular or mass
    "NNP":  ['Butt'],  // Proper noun, singular
    "NNPS": ['Butts'],  // Proper noun, plural
    "NNS":  ['butts'],  // Noun, plural
    "RB":   ['buttingly', 'buttedly', 'buttly'],  // Adverb
    "VB":   ['butt'],  // Verb, base form (I think)
    "VBD":  ['butted'],  // Verb, past tense (they thought)
    "VBG":  ['butting'],  // Verb, gerund or present participle (thinking is fun)
    "VBN":  ['butted'],  // Verb, past participle (a *sunken* ship)
    //  "CD":   ['butt'],  // Cardinal number (quantity: one, two, three)
    //  "EX":   ['butt'],  // Existential there ("there" as in there is, there are)
    //  "IN":   ['butt'],  // Preposition or subordinating conjunction (under, through, although, because)
    //  "PRP$": ["butt's"],  // Possessive pronoun (my, your, our)
    // "CC":   [],  // Coordinating conjunction (and, but, or)
    // "DT":   [],  // Determiner (the, a, these)
    // "FW":   [],  // Foreign word
    // "LS":   [],  // List item marker
    // "MD":   [],  // Verb, modal auxillary (may, should)
    // "PDT":  [],  // Predeterminer (*both* his children, a lot of)
    // "POS":  [],  // Possessive ending ('s)
    // "PRP":  [],  // Personal pronoun (me, you, it)
    // "RBR":  [],  // Adverb, comparative
    // "RBS":  [],  // Adverb, superlative
    // "RP":   [],  // Adverb, particle (about, off, up)
    // "SYM":  [],  // Symbol (%)
    // "TO":   [],  // Infinitival to (what *to* do, *to* the market)
    // "UH":   [],  // Interjection (oh, oops, gosh)
    // "VBP":  [],  // Verb, non-3rd person singular present (I think)
    // "VBZ":  [],  // Verb, 3rd person singular present (she thinks)
    // "WDT":  [],  // Wh-determiner (which, whatever, whichever)
    // "WP":   [],  // Wh-pronoun (what, who, whom)
    // "WP$":  [],  // Possessive wh-pronoun (whose, whosever)
    // "WRB":  []  // Wh-adverb (where, when)
};
module.exports = (input_text, options) => new (require((options.syllable ? './tenpb.syllable.class' : './tenpb.pos.class')))(word_list, input_text, options).execute();