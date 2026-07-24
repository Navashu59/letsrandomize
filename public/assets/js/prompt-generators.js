(function () {
  'use strict';

  var path = window.location.pathname.replace(/\/+$/, '');
  var slug = path.split('/').filter(Boolean).pop();
  var button = document.getElementById('generate-btn');
  var resultDisplay = document.getElementById('result-display');
  var resultContent = document.getElementById('result-content');
  var shareButton = document.getElementById('share-btn');

  if (!button || !resultDisplay || !resultContent || !window.RandomEngine || !window.App) {
    return;
  }

  var prompts = {
    'random-question-generator': [
      'What is a small habit that makes your day better?',
      'What is something you would like to learn this year?',
      'Which place would you happily visit again?',
      'What is the best advice you have received?',
      'What everyday task would you automate if you could?',
      'Which book, film, or game changed your mind about something?',
      'What is a skill you learned later than most people?',
      'What would make this week feel successful?',
      'Which meal could you eat every week?',
      'What is one thing you appreciate about where you live?',
      'What topic can you talk about for ten minutes without preparing?',
      'If you had an extra free hour today, how would you use it?'
    ],
    'never-have-i-ever-generator': [
      'Never have I ever missed a flight or train.',
      'Never have I ever sent a message to the wrong person.',
      'Never have I ever stayed awake all night.',
      'Never have I ever tried to learn a musical instrument.',
      'Never have I ever gotten lost in a new city.',
      'Never have I ever cooked a meal without a recipe.',
      'Never have I ever forgotten an important birthday.',
      'Never have I ever sung in front of an audience.',
      'Never have I ever changed my opinion after a friendly debate.',
      'Never have I ever started a hobby and quit within a week.'
    ],
    'would-you-rather-generator': [
      'Would you rather have an extra hour every day or an extra day every month?',
      'Would you rather explore the ocean or explore space?',
      'Would you rather always arrive ten minutes early or ten minutes late?',
      'Would you rather give up music for a year or films for a year?',
      'Would you rather work on one big project or several small projects?',
      'Would you rather live near mountains or near the coast?',
      'Would you rather be able to speak every language or play every instrument?',
      'Would you rather plan every trip or travel without an itinerary?',
      'Would you rather reread a favorite book or start a new one?',
      'Would you rather cook dinner or wash the dishes?'
    ],
    'truth-or-dare-generator': [
      'Truth: What is a harmless habit you rarely admit to?',
      'Truth: What is the last thing that made you laugh?',
      'Truth: Which skill would you most like to improve?',
      'Truth: What is a small decision you are glad you made?',
      'Truth: What food combination do you like that others find unusual?',
      'Dare: Describe your day using only three words.',
      'Dare: Hum the chorus of a song for ten seconds.',
      'Dare: Give someone in the group a sincere compliment.',
      'Dare: Tell a two-sentence story using the words blue, door, and Tuesday.',
      'Dare: Balance a small object on the back of your hand for ten seconds.'
    ]
  };

  var suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  var ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
  var cards = [];
  suits.forEach(function (suit) {
    ranks.forEach(function (rank) {
      cards.push(rank + ' of ' + suit);
    });
  });

  function setupDecisionInput() {
    if (slug !== 'random-decision-maker' || document.getElementById('decision-options')) {
      return;
    }
    var wrapper = document.createElement('div');
    wrapper.className = 'form-group';
    wrapper.innerHTML =
      '<label for="decision-options">Options, one per line</label>' +
      '<textarea id="decision-options" rows="6" placeholder="Coffee&#10;Tea&#10;Water">Coffee\nTea\nWater</textarea>';
    button.parentNode.insertBefore(wrapper, button);
    button.textContent = 'Choose an Option';
  }

  function valueForSlug() {
    if (slug === 'random-noun-generator') {
      return RandomEngine.randomWord('noun');
    }
    if (slug === 'random-adjective-generator') {
      return RandomEngine.randomWord('adjective');
    }
    if (slug === 'random-card-picker') {
      return RandomEngine.randomPick(cards);
    }
    if (slug === 'random-decision-maker') {
      var options = document.getElementById('decision-options').value
        .split(/\r?\n/)
        .map(function (value) { return value.trim(); })
        .filter(Boolean);
      if (options.length < 2) {
        App.showToast('Enter at least two options.', 'error');
        return null;
      }
      return RandomEngine.randomPick(options);
    }
    return RandomEngine.randomPick(prompts[slug] || []);
  }

  function generate() {
    var value = valueForSlug();
    if (!value) return;
    App.animateGenerate(button);
    resultContent.textContent = value;
    resultDisplay.style.display = '';
    App.flashResult(resultDisplay);
    App.addToHistory(value);
    App.trackToolUse(slug);
  }

  setupDecisionInput();
  button.addEventListener('click', generate);

  if (shareButton) {
    shareButton.addEventListener('click', function () {
      App.shareResult(resultContent.textContent.trim());
    });
  }
})();
