(function () {
  'use strict';

  var slug = window.location.pathname.replace(/\/+$/, '').split('/').filter(Boolean).pop();
  var button = document.getElementById('generate-btn');
  var resultDisplay = document.getElementById('result-display');
  var resultContent = document.getElementById('result-content');
  var shareButton = document.getElementById('share-btn');
  var data = window.GeneratorData || {};
  var deck = [];
  var pairNouns = [
    'anchor', 'apple', 'arch', 'balloon', 'beacon', 'bell', 'bench', 'bicycle', 'book', 'bottle',
    'box', 'bridge', 'cabin', 'camera', 'candle', 'castle', 'chair', 'clock', 'cloud', 'compass',
    'door', 'engine', 'feather', 'field', 'flag', 'forest', 'garden', 'gate', 'harbor', 'island',
    'key', 'kite', 'ladder', 'lamp', 'letter', 'library', 'map', 'mirror', 'mountain', 'notebook',
    'ocean', 'path', 'pencil', 'planet', 'river', 'robot', 'room', 'signal', 'star', 'station',
    'stone', 'storm', 'street', 'table', 'tower', 'train', 'tree', 'umbrella', 'window', 'workshop'
  ];

  if (!button || !resultDisplay || !resultContent || !window.RandomEngine || !window.App) return;

  function field(id, label, control) {
    var wrapper = document.createElement('div');
    wrapper.className = 'option-group';
    wrapper.innerHTML = '<label for="' + id + '">' + label + '</label>' + control;
    return wrapper;
  }

  function addOptions(fields) {
    var wrapper = document.createElement('div');
    wrapper.className = 'generator-options';
    fields.forEach(function (item) { wrapper.appendChild(item); });
    button.parentNode.insertBefore(wrapper, button);
  }

  function selectField(id, label, options) {
    return field(id, label, '<select id="' + id + '">' + options.map(function (item) {
      return '<option value="' + item[0] + '">' + item[1] + '</option>';
    }).join('') + '</select>');
  }

  function numberField(max) {
    return field('result-count', 'How many?', '<input id="result-count" type="number" min="1" max="' + max + '" value="1">');
  }

  function checkboxField(id, label, checked) {
    return field(id, '', '<label class="checkbox-label"><input id="' + id + '" type="checkbox"' + (checked ? ' checked' : '') + '> ' + label + '</label>');
  }

  function setupControls() {
    if (slug === 'random-question-generator') {
      addOptions([selectField('prompt-category', 'Category', [['all','All categories'],['general','Conversation'],['fun','Fun'],['deep','Thoughtful'],['kids','Kids'],['work','Work'],['writing','Writing']])]);
    } else if (slug === 'would-you-rather-generator') {
      addOptions([selectField('prompt-category', 'Category', [['all','All categories'],['general','General'],['funny','Funny'],['kids','Kids'],['thoughtful','Thoughtful']])]);
    } else if (slug === 'never-have-i-ever-generator') {
      addOptions([selectField('prompt-category', 'Category', [['all','All categories'],['general','General'],['funny','Funny'],['travel','Travel'],['skills','Skills']])]);
    } else if (slug === 'truth-or-dare-generator') {
      addOptions([
        selectField('truth-mode', 'Prompt type', [['mixed','Truth or Dare'],['truth','Truth only'],['dare','Dare only']]),
        selectField('prompt-category', 'Group', [['all','All groups'],['general','General'],['friends','Friends'],['family','Family']])
      ]);
    } else if (slug === 'random-noun-generator') {
      addOptions([numberField(10), checkboxField('unique-results', 'No repeats in this set', true)]);
    } else if (slug === 'random-adjective-generator') {
      addOptions([
        numberField(10),
        selectField('adjective-mode', 'Output', [['adjective','Adjectives'],['pair','Adjective + noun']]),
        checkboxField('unique-results', 'No repeats in this set', true)
      ]);
    } else if (slug === 'random-card-picker') {
      addOptions([
        numberField(13),
        checkboxField('card-replacement', 'Return cards to the deck', false),
        checkboxField('include-jokers', 'Include two jokers', false)
      ]);
      var status = document.createElement('p');
      status.id = 'deck-status';
      status.className = 'generator-status';
      status.setAttribute('aria-live', 'polite');
      button.parentNode.insertBefore(status, button.nextSibling);
      var reset = document.createElement('button');
      reset.id = 'reset-deck';
      reset.className = 'btn btn-secondary btn-block';
      reset.type = 'button';
      reset.textContent = 'Reset Deck';
      button.parentNode.insertBefore(reset, status.nextSibling);
      reset.addEventListener('click', resetDeck);
      document.getElementById('include-jokers').addEventListener('change', resetDeck);
      resetDeck();
    } else if (slug === 'random-decision-maker') {
      var input = document.createElement('div');
      input.className = 'form-group';
      input.innerHTML = '<label for="decision-options">Options, one per line</label><textarea id="decision-options" rows="6" placeholder="Coffee&#10;Tea&#10;Water">Coffee\nTea\nWater</textarea><p class="field-help">Repeat an option on additional lines to give it more weight.</p>';
      button.parentNode.insertBefore(input, button);
      button.textContent = 'Choose an Option';
    }
  }

  function allCards() {
    var cards = [];
    ['Hearts','Diamonds','Clubs','Spades'].forEach(function (suit) {
      ['Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King'].forEach(function (rank) { cards.push(rank + ' of ' + suit); });
    });
    if (document.getElementById('include-jokers') && document.getElementById('include-jokers').checked) cards.push('Red Joker', 'Black Joker');
    return cards;
  }

  function resetDeck() {
    deck = RandomEngine.randomShuffle(allCards());
    updateDeckStatus();
  }

  function updateDeckStatus() {
    var status = document.getElementById('deck-status');
    if (status) status.textContent = deck.length + ' cards remaining in this deck.';
  }

  function promptPool(key) {
    var source = data[key] || {};
    var category = document.getElementById('prompt-category').value;
    if (key === 'truthOrDare') {
      var groups = category === 'all' ? Object.keys(source) : [category];
      var mode = document.getElementById('truth-mode').value;
      return groups.flatMap(function (group) {
        if (mode === 'mixed') return source[group].truth.concat(source[group].dare);
        return source[group][mode];
      });
    }
    return category === 'all' ? Object.values(source).flat() : source[category];
  }

  function pickMany(pool, count, unique) {
    if (unique) return RandomEngine.randomShuffle(pool).slice(0, Math.min(count, pool.length));
    return Array.from({ length: count }, function () { return RandomEngine.randomPick(pool); });
  }

  function valuesForSlug() {
    if (slug === 'random-question-generator') return [RandomEngine.randomPick(promptPool('questions'))];
    if (slug === 'would-you-rather-generator') return [RandomEngine.randomPick(promptPool('wouldYouRather'))];
    if (slug === 'never-have-i-ever-generator') return [RandomEngine.randomPick(promptPool('neverHaveIEver'))];
    if (slug === 'truth-or-dare-generator') return [RandomEngine.randomPick(promptPool('truthOrDare'))];
    if (slug === 'random-noun-generator' || slug === 'random-adjective-generator') {
      var count = Number(document.getElementById('result-count').value);
      var unique = document.getElementById('unique-results').checked;
      var pool = slug === 'random-noun-generator' ? data.nouns : data.adjectives;
      var values = pickMany(pool, count, unique);
      if (slug === 'random-adjective-generator' && document.getElementById('adjective-mode').value === 'pair') {
        values = values.map(function (value) { return value + ' ' + RandomEngine.randomPick(pairNouns); });
      }
      return values;
    }
    if (slug === 'random-card-picker') {
      var cardCount = Number(document.getElementById('result-count').value);
      if (document.getElementById('card-replacement').checked) return pickMany(allCards(), cardCount, false);
      if (deck.length < cardCount) {
        App.showToast('Reset the deck or choose fewer cards.', 'error');
        return null;
      }
      var drawn = deck.splice(0, cardCount);
      updateDeckStatus();
      return drawn;
    }
    if (slug === 'random-decision-maker') {
      var options = document.getElementById('decision-options').value.split(/\r?\n/).map(function (value) { return value.trim(); }).filter(Boolean);
      if (options.length < 2) {
        App.showToast('Enter at least two options.', 'error');
        return null;
      }
      return [RandomEngine.randomPick(options)];
    }
    return null;
  }

  function render(values) {
    resultContent.textContent = '';
    if (values.length === 1) {
      resultContent.textContent = values[0];
      return;
    }
    var list = document.createElement('ol');
    list.className = 'generated-result-list';
    values.forEach(function (value) {
      var item = document.createElement('li');
      item.textContent = value;
      list.appendChild(item);
    });
    resultContent.appendChild(list);
  }

  function generate() {
    var values = valuesForSlug();
    if (!values || !values.length) return;
    App.animateGenerate(button);
    render(values);
    resultDisplay.style.display = '';
    App.flashResult(resultDisplay);
    App.addToHistory(values.join(', '));
    App.trackToolUse(slug);
  }

  setupControls();
  button.addEventListener('click', generate);
  if (shareButton) shareButton.addEventListener('click', function () { App.shareResult(resultContent.textContent.trim()); });
})();
