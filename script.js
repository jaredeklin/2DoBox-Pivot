window.onload = function() {
  persistIdea();
}

$('#save-button').on('click', saveList);
$('.two-do-list').on('click', '.delete-button', deleteCard);
$('.two-do-list').on('click', '.upvote-button', upVote);
$('.two-do-list').on('click', '.downvote-button', downVote);
$('.search-bar').on('keyup', filter);
$('.title, .task').on('input', enableBtn);
$('.two-do-list').on('blur', '.title-output', editTitle);
$('.two-do-list').on('blur', '.task-output', editBody);

function Card(title, body, uniqueId, importance) {
 this.title = title;
 this.uniqueId = uniqueId || $.now();
 this.body = body;
 this.importance = importance || 'none';
}

function editTitle() {
  var cardId = $(this).parent().attr('id');
  var returnedObject = getFromStorage(cardId);
  returnedObject.title = $(this).text();
  addToStorage(returnedObject);
}

function editBody() {
  var cardId = $(this).parent().attr('id');
  var returnedObject = getFromStorage(cardId);
  returnedObject.body = $(this).text();
  addToStorage(returnedObject);
}

function getFromStorage(cardId) {
  var retrieveObject = localStorage.getItem(cardId);
  var parseObject = JSON.parse(retrieveObject);
  return parseObject;
}


function persistIdea() {
  for(i = 0; i < localStorage.length; i++) {
    var getObject = localStorage.getItem(localStorage.key(i));
    var parseObject = JSON.parse(getObject);
    var persistCard = new Card(parseObject.title, parseObject.body, parseObject.uniqueId, parseObject.importance);
    persistCard.createCard();
  }
}

function saveList(event){
  event.preventDefault();
  var newCard = new Card($('.title').val(), $('.task').val());
  newCard.createCard();
  addToStorage(newCard);
  clearInput();
  enableBtn();
}

function clearInput() {
  $('.title').val('');
  $('.task').val('');
  $('.title').focus();
}


Card.prototype.createCard = function () {
  $('.two-do-list').prepend(`<article class="unique-id-style" id="${this.uniqueId}">
    <h2 class="title-output" contenteditable="true">${this.title}</h2>
    <img class="delete-button" src="images/delete.svg" alt="delete-idea">
    <p class="task-output" contenteditable="true">${this.body}</p>
    <img class="upvote-button" src="images/upvote.svg" alt="upvote-idea">
    <img class="downvote-button" src="images/downvote.svg" alt="downvote-idea">
    <h3 class="importance">Importance:</h3>
    <h3 class="importance-value">${this.importance}</h3>
    <hr>
    </article>`);
}

function addToStorage(object) {
  var stringifyObj = JSON.stringify(object);
  localStorage.setItem(object.uniqueId, stringifyObj);
}

function deleteCard() {
  var cardId = $(this).parent().attr('id');
  $(this).parent().remove();
  localStorage.removeItem(cardId);
};

function upVote() {
  var importanceArray = ['swill', 'plausible', 'genius'];
  var cardId = $(this).parent().attr('id');
  var returnedObject = getFromStorage(cardId);
  if ($(this).siblings('.importance-value').text() === 'swill')  {
    $(this).siblings('.importance-value').text(importanceArray[1]);
    returnedObject.importance = 'plausible';
    console.log(parseObject.importance);
  } else if ($(this).siblings('.importance-value').text() === 'plausible') {
    $(this).siblings('.importance-value').text(importanceArray[2])
    returnedObject.importance = 'genius';
  }
  addToStorage(returnedObject);
};

function downVote() {
  var importanceArray = ['swill', 'plausible', 'genius'];
  var cardId = $(this).parent().attr('id');
  var returnedObject = getFromStorage(cardId);
  if ($(this).siblings('.importance-value').text() === 'genius') {
    $(this).siblings('.importance-value').text(importanceArray[1]);
    returnedObject.importance = 'plausible';
  } else if ($(this).siblings('.importance-value').text() === 'plausible') {
    $(this).siblings('.importance-value').text(importanceArray[0])
    returnedObject.importance = 'swill'
  }
  addToStorage(returnedObject);
};

function filter() {
  var searchInput = $('.search-bar').val().toLowerCase();
  for (var i = 0; i < $('.title-output').length; i++){
    if ($($('.title-output')[i]).text().toLowerCase().includes(searchInput) || $($('.task-output')[i]).text().toLowerCase().includes(searchInput)){
      $($('.title-output')[i]).parent().show();
    } else {
      $($('.title-output')[i]).parent().hide();
    }
  }
}

function enableBtn () {
  if($('.title').val() === "" || $('.task').val() === "") {
    $('#save-button').attr('disabled', true) 
  } else {
    $('#save-button').attr('disabled', false)
  }
} 



  







