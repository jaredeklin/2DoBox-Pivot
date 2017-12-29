window.onload = function() {
  persistIdea();
  showLastTen();
}



$('#save-button').on('click', saveList);
$('.two-do-list').on('click', '.delete-button', deleteCard);
$('.two-do-list').on('click', '.upvote-button', upVote);
$('.two-do-list').on('click', '.downvote-button', downVote);
$('.filter-bar').on('keyup', filter);
$('.title, .task').on('input', enableBtn);
$('.two-do-list').on('blur', '.title-output', editTitle);
$('.two-do-list').on('blur', '.task-output', editBody);
$('.two-do-list').on('click', '.completed-task', toggleClass);

$('.show-more').on('click', function(){
  for (var i = 0; i < $('.unique-id-style').length; i++){
    $($('.unique-id-style')[i]).show();
  }
})

$('.critical').on('click', criticalFilter)

function criticalFilter(){
  for (var i = 0; i < $('.importance-value').length; i++){
    if ($($('.importance-value')[i]).text() === 'critical'){
      $($('.importance-value')[i]).parent().show()
    } else {
      $($('.importance-value')[i]).parent().hide()
    }
  }
}

function toggleClass() {
  $(this).parent().toggleClass('completed');
  var cardId = $(this).parent().attr('id');
  var returnedObject = getFromStorage(cardId);
  returnedObject.completed = !returnedObject.completed;
  if(returnedObject.completed === true){
    $(this).text('Completed: true');
  } else {
    $(this).text('Completed: false');
  }
  addToStorage(returnedObject);
} 

function Card(title, body, uniqueId, importance, completed) {
 this.title = title;
 this.uniqueId = uniqueId || $.now();
 this.body = body;
 this.importance = importance || 'normal';
 this.completed = completed || false;
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
  // if (localStorage.length > 10){
    for(var i = 0; i < localStorage.length; i++) {
      var getObject = localStorage.getItem(localStorage.key(i));
      var parseObject = JSON.parse(getObject);
      var persistCard = new Card(parseObject.title, parseObject.body, parseObject.uniqueId, parseObject.importance, parseObject.completed);
      if(parseObject.completed === false) {
        persistCard.createCard();
        console.log(parseObject.uniqueId, parseObject.completed);
      }
    }
  // }
}

$('.show-hide-button').on('click', showCompletedTasks);

function showCompletedTasks() {
  for(var i = 0; i < localStorage.length; i++) {
    var getObject = localStorage.getItem(localStorage.key(i));
    var parseObject = JSON.parse(getObject);
    var persistCard = new Card(parseObject.title, parseObject.body, parseObject.uniqueId, parseObject.importance, parseObject.completed);
    if(parseObject.completed === true){
      persistCard.createCard();
    }
    $('.show-hide-button').attr('disabled', true);
  }
}

function showLastTen(){
  for (var i = 0; i < $('.unique-id-style').length; i++){
    if(i > 9){
      $($('.unique-id-style')[i]).hide();
    }
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
    <button class="completed-task">Completed: ${this.completed}</button>
    <hr>
    </article>`);
    
    // if (this.completed === true){
    //   $(this).parent().addClass('completed')
    //   console.log($(this).parent());
    // }
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

function upVote(event) {
  var importanceArray = ['none', 'low', 'normal', 'high', 'critical'];
  var cardId = $(this).parent().attr('id');
  var returnedObject = getFromStorage(cardId);
  var index = importanceArray.indexOf($(this).siblings('.importance-value').text());
  if (event.target.classList.contains('upvote-button') && index < 4) {
    $(this).siblings('.importance-value').text(importanceArray[index + 1])
    returnedObject.importance = importanceArray[index + 1]
    addToStorage(returnedObject);
  }
};

function downVote() {
  var importanceArray = ['none', 'low', 'normal', 'high', 'critical'];
  var cardId = $(this).parent().attr('id');
  var returnedObject = getFromStorage(cardId);
  var index = importanceArray.indexOf($(this).siblings('.importance-value').text());
  if(event.target.classList.contains('downvote-button') && index > 0) {
    $(this).siblings('.importance-value').text(importanceArray[index - 1])
    returnedObject.importance = importanceArray[index - 1]
    addToStorage(returnedObject);
  }
};

function filter() {
  var searchInput = $('.filter-bar').val().toLowerCase();
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



  







