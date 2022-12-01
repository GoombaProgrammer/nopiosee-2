﻿namespace Qualleish
{
    /// <summary>
    /// Lexer isnt  A LEXER
    /// </summary>
    internal class Lexer
    {
        public static Dictionary<string, (string, string)> words = new Dictionary<string, (string, string)>(){
            {"about", ("ôna", "default")},
            {"cool", ("casa", "default")},
            {"hello", ("xao hy", "default")},
            {"hi", ("xao hy", "default")},
            {"hey", ("xao hy", "default")},
            {"king", ("yo", "default")},
            {"queen", ("yo phú", "default")},
            {"man", ("nuơ", "default")},
            {"woman", ("nuơ phú", "default")},
            {"bike", ("xao py", "default")},
            {"i", ("ỹia", "default")},
            {"am", ("esta", "default")},
            {"me", ("ỹia", "default")},
            {"dog", ("húna", "default")},
            {"cat", ("kaya", "default")},
            {"a", ("con", "default")},
            {"an", ("con", "default")},
            {"ask", ("gritol", "default")},
            {"how", ("guñ", "default")},
            {"is", ("es", "default")},
            {"poop", ("xao sta", "default")},
            {"stinky", ("sta", "default")},
            {"at the", ("ñ", "default")},
            {"the", ("ca", "default")},
            {"free", ("grai", "default")},
            {"current", ("ànot", "default")},
            {"house", ("bi pàl", "default")},
            {"place", ("pàl", "default")},
            {"living", ("bi", "default")},
            {"live", ("bi", "default")},
            {"life", ("razon", "default")},
            {"you", ("táy", "default")},
            {"he", ("el", "default")},
            {"she", ("ela", "default")},
            {"his", ("par el", "afternext")},
            {"him", ("par ell", "afternext")},
            {"her", ("par ela", "afternext")},
            {"love", ("corzo", "default")},
            {"loves", ("corzo", "default")},
            {"it", ("eso", "default")},
            {"all", ("ra", "default")},
            {"pant", ("có", "default")},
            {"shirt", ("ay", "default")},
            {"clothing", ("có ay", "default")},
            {"clothe", ("có ay", "default")},
            {"mine", ("ỹir", "default")},
            {"my", ("par ỹi", "afternext")},
            {"not", ("kong", "default")},
            {"and", ("y", "default")},
            {"when", ("ưl", "default")},
            {"amazing", ("hanya", "default")},
            {"super", ("ila", "default")},
            {"this", ("này", "default")},
            {"that", ("néy", "default")},
            {"gun", ("xeng", "default")},
            {"book", ("bak", "default")},
            {"computer", ("computer", "default")},
            {"phone", ("fón", "default")},
            {"your", ("par táy", "afternext")},
            {"do", ("cor", "default")},
            {"know", ("ól", "default")},
            {"here", ("óki", "default")},
            {"bathroom", ("lery", "default")},
            {"chair", ("zút", "default")},
            {"seat", ("zút", "default")},
            {"toilet", ("lery zút", "default")},
            {"aardvark", ("êy píl", "default")},
            {"heaven", ("thiên", "default")},
            {"hell", ("kong thiên", "default")},
            {"no", ("nú", "default")},
            {"friend", ("bâng", "default")},
            {"balloon", ("o", "default")},
            {"have", ("yú", "default")},
            {"like", ("tigh", "default")},
            {"eat", ("an", "default")},
            {"eating", ("an", "default")},
            {"umbrella", ("omprâ", "default")},
            {"wear", ("veo", "default")},
            {"pig", ("píl", "default")},
            {"earth", ("êy", "default")},
            {"right now", ("sho", "default")},
            {"now", ("usho", "default")},
            {"right", ("dar ris", "default")},
            {"left", ("dar kiá", "default")},
            {"direction", ("dar", "default")},
            {"way", ("pàtta", "default")},
            {"welcome", ("xao arôy", "default")},
            {"english", ("teing ega", "default")},
            {"dutch", ("teing neder", "default")},
            {"afrikaans", ("teing afrik", "default")},
            {"netherlands", ("neder", "default")},
            {"england", ("ega", "default")},
            {"africa", ("afrik", "default")},
            {"german", ("teing gao", "default")},
            {"germany", ("gao", "default")},
            {"language", ("teing", "default")},
            {"nopiosee", ("teing nopiosee", "default")},
            {"based", ("gybe", "default")},
            {"high", ("gok", "default")},
            {"on", ("lá", "default")},
            {"vietnam", ("viet nam", "default")},
            {"vietnamese", ("teing viet", "default")},
            {"japanese", ("teing japan", "default")},
            {"bread", ("bana mí", "default")},
            {"cake", ("bana", "default")},
            {"milk", ("bana sua", "default")},
            {"drink", ("õng", "default")},
            {"speak", ("grit", "default")},
            {"spoken", ("grital", "default")},
            {"say", ("grite", "default")},
            {"said", ("gritel", "default")},
            {"talk", ("gritál", "default")},
            {"talking", ("gritál", "default")},
            {"word", ("ánáy", "default")},
            {"to", ("se", "default")},
            {"are", ("qi", "default")},
            {"can", ("áqia", "default")},
            {"learn", ("hõb", "default")},
            {"learning", ("hõb", "default")},
            {"want", ("muõ", "default")},
            {"just", ("zoa", "default")},
            {"follow", ("õray", "default")},
            {"but", ("mala", "default")},
            {"similar", ("mapa", "default")},
            {"asia", ("ashia", "default")},
            {"other", ("ánd", "default")},
            {"enjoy", ("luz", "default")},
            {"please", ("pofa", "default")},
            {"thing", ("tin", "default")},
            {"will", ("yõ", "default")},
            {"rule", ("regel", "default")},
            {"as", ("un", "default")},
            {"hate", ("ghõ", "default")},
            {"hates", ("ghõ", "default")},
            {"wants", ("muõ", "default")},
            {"use", ("oga", "default")},
            // NUMBERS
            {"one", ("unas", "default")},
            {"two", ("dor", "default")},
            {"three", ("trê", "default")},
            {"four", ("kwar", "default")},
            {"five", ("vin", "default")},
            {"six", ("sê", "default")},
            {"seven", ("sêven", "default")},
            {"eight", ("ê", "default")},
            {"nine", ("nê", "default")},
            {"ten", ("dê", "default")},
            {"eleven", ("dêlê", "default")},
            {"twelve", ("dêtwa", "default")},
            {"thirteen", ("dêtrê", "default")},
            {"fourteen", ("dêkwar", "default")},
            {"fifteen", ("dêkvin", "default")},
            {"sixteen", ("dêsê", "default")},
            {"seventeen", ("dêsêven", "default")},
            {"eighteen", ("dêê", "default")},
            {"nineteen", ("dênê", "default")},
            {"twenty", ("dêtwa", "default")},
            {"thirty", ("trêdêtwa", "default")},
            {"forty", ("kwardêtwa", "default")},
            {"fifty", ("kvidêtwa", "default")},
            {"sixty", ("sêdêtwa", "default")},
            {"seventy", ("sêvendêtwa", "default")},
            {"eighty", ("êdêtwa", "default")},
            {"ninety", ("nêdêtwa", "default")},
            {"hundred", ("hûn", "default")},
            {"thousand", ("tûn", "default")},
            {"million", ("mîl", "default")},
            {"billion", ("bîl", "default")},
            {"trillion", ("trîl", "default")},
            {"quadrillion", ("kwartrîl", "default")},
            {"adult", ("od chí", "default")},
            // COLORS
            {"black", ("nê", "default")},
            {"white", ("wê", "default")},
            {"red", ("rê", "default")},
            {"green", ("grê", "default")},
            {"blue", ("blê", "default")},
            {"yellow", ("yê", "default")},
            {"orange", ("orê", "default")},
            {"purple", ("prê", "default")},
            {"brown", ("brê", "default")},
            {"grey", ("gael", "default")},
            {"gray", ("goê", "default")},
            {"pink", ("pê", "default")},
            // FAMILY
            {"family", ("famir", "default")},
            {"mother", ("mó", "default")},
            {"father", ("pá", "default")},
            {"son", ("só", "default")},
            {"daughter", ("dó", "default")},
            {"sister", ("sí", "default")},
            {"brother", ("bó", "default")},
            {"husband", ("jubár", "default")},
            {"wife", ("jubór", "default")},
            {"grandmother", ("grá mó", "default")},
            {"grandfather", ("grá pá", "default")},
            {"grandson", ("grá só", "default")},
            {"granddaughter", ("grá dó", "default")},
            {"grandparent", ("grá para", "default")},
            {"grandchild", ("grá chí", "default")},
            {"uncle", ("unor", "default")},
            {"aunt", ("oner", "default")},
            {"cousin", ("sefe", "default")},
            {"nephew", ("sofo", "default")},
            {"niece", ("sefe", "default")},
            {"child", ("chí", "default")},
            {"children", ("chía", "default")},
            {"parent", ("para", "default")},
            // ANIMALS
            {"animal", ("animál", "default")},
            {"horse", ("hóro", "default")},
            {"bird", ("fogel", "default")},
            {"fish", ("cóya", "default")},
            {"cow", ("koo", "default")},
            {"sheep", ("chíp", "default")},
            {"goat", ("góta", "default")},
            {"elephant", ("eléfánt", "default")},
            {"monkey", ("mónga", "default")},
            {"lion", ("leon", "default")},
            {"tiger", ("tíger", "default")},
            {"zebra", ("zébra", "default")},
            {"snake", ("séna", "default")},
            {"bear", ("bíra", "default")},
            {"camel", ("kámel", "default")},
            {"chicken", ("chíken", "default")},
            {"crocodile", ("kroko", "default")},
            {"dolphin", ("dólfín", "default")},
            {"duck", ("dúk", "default")},
            {"eagle", ("égel", "default")},
            {"fox", ("fóks", "default")},
            {"frog", ("froga", "default")},
            {"giraffe", ("gírafe", "default")},
            {"gull", ("gúl", "default")},
            {"hamster", ("hásmter", "default")},
            {"hippopotamus", ("hipópotamus", "default")},
            {"kangaroo", ("kangarú", "default")},
            {"kitten", ("kíten", "default")},
            {"koala", ("kóala", "default")},
            {"leopard", ("lípard", "default")},
            {"lobster", ("lóbastra", "default")},
            {"owl", ("óu", "default")},
            {"panda", ("pánda", "default")},
            {"penguin", ("pingwin","default")},
            // HOUSE
            {"room", ("rúm", "default")},
            {"kitchen", ("kíchen", "default")},
            {"hall", ("hola", "default")},
            {"garage", ("gárag", "default")},
            {"garden", ("gárdan", "default")},
            {"yard", ("járd", "default")},
            {"basement", ("básemùnt", "default")},
            {"attic", ("átik", "default")},
            // FOOD
            {"food", ("fúd", "default")},
            {"butter", ("búter", "default")},
            {"cheese", ("chís", "default")},
            {"meat", ("fúd mit", "default")},
            {"pasta", ("páso", "default")},
            {"rice", ("arto", "default")},
            {"soup", ("súp", "default")},
            {"vegetables", ("fúd véget", "default")},
            {"fruit", ("fúd goalt", "default")},
            {"water", ("anay", "default")},
            {"wine", ("wín", "default")},
            {"beer", ("aber", "default")},
            {"coffee", ("ca feh", "default")},
            {"tea", ("tí", "default")},
            {"sugar", ("súgar", "default")},
            {"salt", ("sált", "default")},
            {"spice", ("spáis", "default")},
            {"flour", ("flúr", "default")},
            {"egg", ("tôg", "default")},
            {"pork", ("pólk", "default")},
            {"thief", ("ré nuơ", "default")},
            {"robber", ("ré nuơ", "default")},
            {"gone", ("ré", "default")},
            {"be", ("dù", "default")},
            // FRUIT
            {"apple", ("ápol", "default")},
            {"banana", ("tung", "default")},
            {"grape", ("yasol", "default")},
            {"lemon", ("jados", "default")},
            {"pear", ("pír", "default")},
            {"pineapple", ("ananas", "default")},
            {"strawberry", ("tró bei", "default")},
            {"watermelon", ("fúd anay", "default")},
            // BODY
            {"head", ("het", "default")},
            {"hair", ("tére", "default")},
            {"eye", ("asi", "default")},
            {"nose", ("nos", "default")},
            {"mouth", ("láut", "default")},
            {"ear", ("irel", "default")},
            // PLACES
            {"home", ("bi pàl", "default")},
            {"street", ("stríte", "default")},
            {"city", ("síti", "default")},
            {"town", ("táun", "default")},
            {"village", ("yáge", "default")},
            {"country", ("kúntre", "default")},
            // UNCOMMON
            {"air", ("er", "default")},
            {"happy", ("fèlis", "default")},
            {"birthday", ("od bi", "default")},
            {"card", ("kárd", "default")},
            {"money", ("ganta", "default")},
            {"credit card", ("kredet kárd", "default")},
            {"bank", ("báng", "default")},
            {"airplane", ("wáin", "default")},
            {"airport", ("er port", "default")},
            {"bus", ("bús", "default")},
            {"car", ("ká", "default")},
            {"train", ("tréin", "default")},
            {"ship", ("ve anay", "default")},
            {"boat", ("ve anay", "default")},
            {"plane", ("wáin", "default")},
            {"there", ("qá", "default")},
            // TIME
            {"week", ("lain", "default")},
            {"month", ("tónd", "default")},
            {"year", ("tos", "default")},
            {"day", ("déi", "default")},
            {"hour", ("pór", "default")},
            {"minute", ("tôi", "default")},
            {"second", ("zel", "default")},
            {"time", ("tóy", "default")},
            {"remaining", ("xao qá", "default")},
        };
    }
}
