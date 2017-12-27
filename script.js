window.onload = function() {
  persistIdea();
}

$('#save-button').on('click', saveList);
$('.idea-list').on('click', '.delete-button', deleteCard);
$('.idea-list').on('click', '.upvote-button', upVote);
$('.idea-list').on('click', '.downvote-button', downVote);
$('.search-bar').on('keyup', filter);
$('.idea-title, .idea-content').on('input', enableBtn);
$('.idea-list').on('blur', '.title-output', editTitle);
$('.idea-list').on('blur', '.body-output', editBody);

function Card(title, body, uniqueId, quality) {
 this.title = title;
 this.uniqueId = uniqueId || $.now();
 this.body = body;
 this.quality = quality || 'swill';
}

function editTitle() {
  var cardId = $(this).parent().attr('id');
  var retrieveObject = localStorage.getItem(cardId);
  var parseObject = JSON.parse(retrieveObject);
  parseObject.title = $(this).text();
  addToStorage(parseObject);
}

function editBody() {
  var cardId = $(this).parent().attr('id');
  var retrieveObject = localStorage.getItem(cardId);
  var parseObject = JSON.parse(retrieveObject);
  parseObject.body = $(this).text();
  addToStorage(parseObject);
}


function persistIdea() {
  for(i = 0; i < localStorage.length; i++) {
    var getObject = localStorage.getItem(localStorage.key(i));
    var parseObject = JSON.parse(getObject);
    var persistCard = new Card(parseObject.title, parseObject.body, parseObject.uniqueId, parseObject.quality);
    persistCard.createCard();
  }
}

function saveList(event){
  event.preventDefault();
  var newCard = new Card($('.idea-title').val(), $('.idea-content').val());
  newCard.createCard();
  addToStorage(newCard);
  clearInput();
  enableBtn();
}

function clearInput() {
  $('.idea-title').val('');
  $('.idea-content').val('');
  $('.idea-title').focus();
}


Card.prototype.createCard = function () {
  $('.idea-list').prepend(`<article class="unique-id-style" id="${this.uniqueId}">
    <h2 class="title-output" contenteditable="true">${this.title}</h2>
    <img class="delete-button" src="images/delete.svg" alt="delete-idea">
    <p class="body-output" contenteditable="true">${this.body}</p>
    <img class="upvote-button" src="images/upvote.svg" alt="upvote-idea">
    <img class="downvote-button" src="images/downvote.svg" alt="downvote-idea">
    <h3 class="idea-quality">quality:</h3>
    <h3 class="quality-value">${this.quality}</h3>
    <hr>
    </article>`);
}

function addToStorage(object) {
  var stringifyObj = JSON.stringify(object);
  localStorage.setItem(object.uniqueId, stringifyObj);
}

function deleteCard() {
  var cardId = $(this).parent().attr('id');
  var retrieveObject = localStorage.getItem(cardId);
  var parseObject = JSON.parse(retrieveObject);
  $(this).parent().remove();
  localStorage.removeItem(cardId);
};

function upVote() {
  var qualityArray = ['swill', 'plausible', 'genius'];
  var cardId = $(this).parent().attr('id');
  var retrieveObject = localStorage.getItem(cardId);
  var parseObject = JSON.parse(retrieveObject);
  if ($(this).siblings('.quality-value').text() === 'swill')  {
    $(this).siblings('.quality-value').text(qualityArray[1]);
    parseObject.quality = 'plausible';
    console.log(parseObject.quality);
  } else if ($(this).siblings('.quality-value').text() === 'plausible') {
    $(this).siblings('.quality-value').text(qualityArray[2])
    parseObject.quality = 'genius';
  }
  addToStorage(parseObject);
};

function downVote() {
  var qualityArray = ['swill', 'plausible', 'genius'];
  var cardId = $(this).parent().attr('id');
  var retrieveObject = localStorage.getItem(cardId);
  var parseObject = JSON.parse(retrieveObject);
  if ($(this).siblings('.quality-value').text() === 'genius') {
    $(this).siblings('.quality-value').text(qualityArray[1]);
    parseObject.quality = 'plausible';
  } else if ($(this).siblings('.quality-value').text() === 'plausible') {
    $(this).siblings('.quality-value').text(qualityArray[0])
    parseObject.quality = 'swill'
  }
  addToStorage(parseObject);
};

function filter() {
  var searchInput = $('.search-bar').val().toLowerCase();
  for (var i = 0; i < $('.title-output').length; i++){
    if ($($('.title-output')[i]).text().toLowerCase().includes(searchInput) || $($('.body-output')[i]).text().toLowerCase().includes(searchInput)){
      $($('.title-output')[i]).parent().show();
    } else {
      $($('.title-output')[i]).parent().hide();
    }
  }
}

function enableBtn () {
  if($('.idea-title').val() === "" || $('.idea-content').val() === "") {
    $('#save-button').attr('disabled', true) 
  } else {
    $('#save-button').attr('disabled', false)
  }
} 



  







