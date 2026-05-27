/* ================================================
   LetsRandomize.com — Unified Randomization Engine
   Uses crypto.getRandomValues() with Math.random() fallback
   ================================================ */

const RandomEngine = (function() {
  'use strict';

  const hasCrypto = typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function';

  /**
   * Get a cryptographically secure random 32-bit unsigned integer
   */
  function secureRandom32() {
    if (hasCrypto) {
      const arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      return arr[0];
    }
    return Math.floor(Math.random() * 4294967296);
  }

  /**
   * Get a random float [0, 1) using crypto if available
   */
  function secureRandomFloat() {
    return secureRandom32() / 4294967296;
  }

  /**
   * Random integer between min and max (inclusive)
   */
  function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (min > max) { let t = min; min = max; max = t; }
    if (min === max) return min;
    const range = max - min + 1;
    return min + Math.floor(secureRandomFloat() * range);
  }

  /**
   * Random float between min and max
   */
  function randomFloat(min, max) {
    if (min > max) { let t = min; min = max; max = t; }
    return min + secureRandomFloat() * (max - min);
  }

  /**
   * Pick a random element from an array
   */
  function randomPick(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[randomInt(0, arr.length - 1)];
  }

  /**
   * Shuffle an array in place (Fisher-Yates) and return it
   */
  function randomShuffle(arr) {
    const shuffled = arr.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = randomInt(0, i);
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    return shuffled;
  }

  /**
   * Generate a random string of given length from charset
   */
  function randomString(length, charset) {
    charset = charset || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[randomInt(0, charset.length - 1)];
    }
    return result;
  }

  // --- Name databases ---
  const NAMES = {
    male_first: ['James','John','Robert','Michael','William','David','Richard','Joseph','Thomas','Charles','Christopher','Daniel','Matthew','Anthony','Mark','Donald','Steven','Andrew','Paul','Joshua','Kenneth','Kevin','Brian','George','Timothy','Ronald','Edward','Jason','Jeffrey','Ryan','Jacob','Gary','Nicholas','Eric','Jonathan','Stephen','Larry','Justin','Scott','Brandon','Benjamin','Samuel','Raymond','Gregory','Frank','Alexander','Patrick','Jack','Dennis','Jerry','Tyler','Aaron','Jose','Nathan','Henry','Peter','Douglas','Adam','Zachary','Walter','Kyle','Harold','Carl','Arthur','Dylan','Lawrence','Jordan','Jesse','Bryan','Billy','Christian','Albert','Joe','Eugene','Russell','Bobby','Philip','Randy','Harry','Vincent','Logan','Ralph','Roy','Bruce','Travis','Gerald','Wayne','Keith','Stanley','Ethan','Roger','Mason','Liam','Noah','Oliver','Lucas','Elijah','Aiden','Owen'],
    female_first: ['Mary','Patricia','Jennifer','Linda','Barbara','Elizabeth','Susan','Jessica','Sarah','Karen','Lisa','Nancy','Betty','Margaret','Sandra','Ashley','Dorothy','Kimberly','Emily','Donna','Michelle','Carol','Amanda','Melissa','Deborah','Stephanie','Rebecca','Sharon','Laura','Cynthia','Kathleen','Amy','Angela','Shirley','Anna','Brenda','Pamela','Emma','Nicole','Helen','Samantha','Katherine','Christine','Debra','Rachel','Carolyn','Janet','Catherine','Maria','Heather','Diane','Ruth','Julie','Olivia','Joyce','Virginia','Victoria','Kelly','Lauren','Christina','Joan','Evelyn','Judith','Megan','Andrea','Cheryl','Hannah','Jacqueline','Martha','Gloria','Teresa','Ann','Sara','Madison','Frances','Kathryn','Janice','Jean','Abigail','Alice','Judy','Sophia','Grace','Denise','Amber','Doris','Marilyn','Danielle','Beverly','Isabella','Theresa','Diana','Natalie','Brittany','Charlotte','Marie','Kayla','Alexis','Lori','Ava','Mia','Ella'],
    last: ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin','Lee','Perez','Thompson','White','Harris','Sanchez','Clark','Ramirez','Lewis','Robinson','Walker','Young','Allen','King','Wright','Scott','Torres','Nguyen','Hill','Flores','Green','Adams','Nelson','Baker','Hall','Rivera','Campbell','Mitchell','Carter','Roberts','Gomez','Phillips','Evans','Turner','Diaz','Parker','Cruz','Edwards','Collins','Reyes','Stewart','Morris','Morales','Murphy','Cook','Rogers','Gutierrez','Ortiz','Morgan','Cooper','Peterson','Bailey','Reed','Kelly','Howard','Ramos','Kim','Cox','Ward','Richardson','Watson','Brooks','Chavez','Wood','James','Bennett','Gray','Mendoza','Ruiz','Hughes','Price','Alvarez','Castillo','Sanders','Patel','Myers','Long','Ross','Foster','Jimenez','Powell','Jenkins','Perry','Russell','Sullivan','Bell','Coleman','Butler','Henderson','Barnes','Gonzales','Fisher','Vasquez','Simmons','Graham','Murray','Ford','Hamilton','Shaw','Wallace','Gibson','Holmes','Hunt','Andrews','Chapman','Fox','Stone','Webb','Knight','Burke','Dunn','Carroll','Hudson','Bishop'],
    japanese_first: ['Haruto','Yuto','Sota','Riku','Haruki','Hinata','Yui','Hana','Sakura','Mei','Aoi','Rin','Mio','Yuna','Sora','Akari','Koharu','Himari','Riko','Itsuki'],
    japanese_last: ['Sato','Suzuki','Takahashi','Tanaka','Watanabe','Ito','Yamamoto','Nakamura','Kobayashi','Kato','Yoshida','Yamada','Sasaki','Yamaguchi','Matsumoto','Inoue','Kimura','Hayashi','Shimizu','Yamazaki'],
    spanish_first: ['Santiago','Mateo','Sebastian','Leonardo','Diego','Emiliano','Miguel','Daniel','Alejandro','Isabella','Valentina','Camila','Sofia','Lucia','Mariana','Gabriela','Victoria','Martina','Renata','Elena'],
    spanish_last: ['Garcia','Rodriguez','Martinez','Lopez','Gonzalez','Hernandez','Perez','Sanchez','Ramirez','Torres','Flores','Rivera','Gomez','Diaz','Cruz','Morales','Reyes','Gutierrez','Ortiz','Ramos']
  };

  /**
   * Generate a random name
   * @param {string} type - 'first', 'last', 'full'
   * @param {string} gender - 'male', 'female', 'any'
   * @param {string} nationality - 'us', 'japanese', 'spanish'
   */
  function randomName(type, gender, nationality) {
    type = type || 'full';
    gender = gender || 'any';
    nationality = nationality || 'us';

    let firstPool, lastPool;

    if (nationality === 'japanese') {
      firstPool = NAMES.japanese_first;
      lastPool = NAMES.japanese_last;
    } else if (nationality === 'spanish') {
      firstPool = NAMES.spanish_first;
      lastPool = NAMES.spanish_last;
    } else {
      if (gender === 'male') {
        firstPool = NAMES.male_first;
      } else if (gender === 'female') {
        firstPool = NAMES.female_first;
      } else {
        firstPool = NAMES.male_first.concat(NAMES.female_first);
      }
      lastPool = NAMES.last;
    }

    if (type === 'first') return randomPick(firstPool);
    if (type === 'last') return randomPick(lastPool);
    return randomPick(firstPool) + ' ' + randomPick(lastPool);
  }

  // --- Word database ---
  const WORDS = {
    nouns: ['time','year','people','way','day','man','woman','child','world','life','hand','part','place','case','week','company','system','program','question','work','government','number','night','point','home','water','room','mother','area','money','story','fact','month','lot','right','study','book','eye','job','word','business','issue','side','kind','head','house','service','friend','father','power','hour','game','line','end','member','law','car','city','community','name','president','team','minute','idea','body','information','back','parent','face','others','level','office','door','health','person','art','war','history','party','result','change','morning','reason','research','girl','guy','moment','air','teacher','force','education','dog','cat','tree','bird','sun','star','moon','fire','ocean','river','mountain','flower','rain','wind','stone','cloud','island','bridge','garden','forest','snow','light','shadow','dream','music','song','dance','food','heart','love','hope','fear','peace','truth','door','window','road','path','field','wave','flame','seed','leaf','root','sky','earth','spirit','voice','sound','color'],
    verbs: ['be','have','do','say','go','get','make','know','think','take','see','come','want','look','use','find','give','tell','work','call','try','ask','need','feel','become','leave','put','mean','keep','let','begin','seem','help','show','hear','play','run','move','live','believe','hold','bring','happen','write','provide','sit','stand','lose','pay','meet','include','continue','set','learn','change','lead','understand','watch','follow','stop','create','speak','read','allow','add','spend','grow','open','walk','win','offer','remember','love','consider','appear','buy','wait','serve','die','send','expect','build','stay','fall','cut','reach','kill','remain','suggest','raise','pass','sell','require','report','decide','pull','develop','eat','draw','fight','carry','sleep','wish','dance','sing','cook','catch','fly','drive','jump','teach','climb','hide','choose','throw','paint','laugh','guess','smile','travel','burn','fix','pour','count','drop','push','drink','miss','fill','plant','swim','lift','spread'],
    adjectives: ['good','new','first','last','long','great','little','own','other','old','right','big','high','different','small','large','next','early','young','important','few','public','bad','same','able','free','strong','sure','true','full','fast','special','easy','clear','warm','cool','dark','bright','soft','hard','smooth','sharp','sweet','bitter','fresh','clean','quiet','loud','deep','wide','narrow','thick','thin','flat','round','straight','empty','dry','wet','hot','cold','rich','poor','happy','sad','angry','calm','brave','gentle','wild','simple','complex','modern','ancient','quick','slow','tall','short','heavy','light','rare','common','famous','secret','safe','lucky','perfect','strange','beautiful','ugly','smart','silly','proud','humble','hungry','tired','busy','lazy']
  };

  /**
   * Random English word
   * @param {string} wordType - 'noun', 'verb', 'adjective', 'any'
   */
  function randomWord(wordType) {
    wordType = wordType || 'any';
    if (wordType === 'noun') return randomPick(WORDS.nouns);
    if (wordType === 'verb') return randomPick(WORDS.verbs);
    if (wordType === 'adjective') return randomPick(WORDS.adjectives);
    const all = WORDS.nouns.concat(WORDS.verbs, WORDS.adjectives);
    return randomPick(all);
  }

  /**
   * Generate a UUID v4
   */
  function randomUUID() {
    if (hasCrypto && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = randomInt(0, 15);
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Get word list for external use
   */
  function getWordList(type) {
    if (type && WORDS[type]) return WORDS[type].slice();
    return WORDS.nouns.concat(WORDS.verbs, WORDS.adjectives);
  }

  /**
   * Get name list for external use
   */
  function getNameList(type) {
    if (type && NAMES[type]) return NAMES[type].slice();
    return NAMES;
  }

  // Public API
  return {
    randomInt: randomInt,
    randomFloat: randomFloat,
    randomPick: randomPick,
    randomShuffle: randomShuffle,
    randomString: randomString,
    randomName: randomName,
    randomWord: randomWord,
    randomUUID: randomUUID,
    getWordList: getWordList,
    getNameList: getNameList,
    NAMES: NAMES,
    WORDS: WORDS
  };

})();

// Make available globally
if (typeof window !== 'undefined') {
  window.RandomEngine = RandomEngine;
}
