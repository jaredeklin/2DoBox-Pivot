window.onload = function() {
  persistIdea();
  showLastTen();
  incompleteText();
}

$('#save-button').on('click', saveList);
$('.two-do-list').on('click', '.delete-button', deleteCard);
$('.two-do-list').on('click', '.upvote-button, .downvote-button', vote);
$('.filter-bar').on('keyup', filter);
$('.title, .task').on('input', enableBtn);
$('.two-do-list').on('blur', '.title-output', editTitle);
$('.two-do-list').on('blur', '.task-output', editBody);
$('.two-do-list').on('click', '.completed-task', grabObject);
$('.critical, .high, .normal, .low, .none').on('click', importanceFilter)
$('.show-completed-button').on('click', showCompletedTasks);
$('.show-more-button').on('click', showMore);


function Card(title, body, uniqueId, importance, completed) {
 this.title = title;
 this.uniqueId = uniqueId || $.now();
 this.body = body;
 this.importance = importance || 'normal';
 this.completed = completed || false;
}

function showMore() {
  for(var i = 0; i < $('.unique-id-style').length; i++){
    $($('.unique-id-style')[i]).show();
  }
}

function importanceFilter() {
  var importanceVal = $(this).text().toLowerCase();
  for (var i = 0; i < $('.importance-value').length; i++){
    if ($($('.importance-value')[i]).text() === importanceVal){
      $($('.importance-value')[i]).parent().show()
    } else {
      $($('.importance-value')[i]).parent().hide()
    }
  }
}

function grabObject() {
  var cardId = $(this).parent().attr('id');
  var returnedObject = getFromStorage(cardId);
  var thisThing = this;
  toggleClass(thisThing, returnedObject)
}

function toggleClass(thisThing, returnedObject) {
  $(thisThing).parent().toggleClass('completed');
  returnedObject.completed = !returnedObject.completed;
  if(returnedObject.completed === true){
    $(thisThing).html('<img src="images/checkmark.svg">Done!!!!<img src="images/checkmark.svg">');
  } else {
    $(thisThing).text('Incomplete');
  }
  addToStorage(returnedObject);
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
  for(var i = 0; i < localStorage.length; i++) {
    var getObject = localStorage.getItem(localStorage.key(i));
    var parseObject = JSON.parse(getObject);
    var persistCard = new Card(parseObject.title, parseObject.body, parseObject.uniqueId, parseObject.importance, parseObject.completed);
    if(parseObject.completed === false) {
      persistCard.createCard();
    }
  }
}

function showCompletedTasks() {
  $('.unique-id-style').remove();
  persistIdea();
  getCompletedCards();
  updateStyleForCompleted();
  incompleteText();
}

function getCompletedCards () {
  for(var i = 0; i < localStorage.length; i++) {
    var getObject = localStorage.getItem(localStorage.key(i));
    var parseObject = JSON.parse(getObject);
    var persistCard = new Card(parseObject.title, parseObject.body, parseObject.uniqueId, parseObject.importance, parseObject.completed);
    if(parseObject.completed === true){
      persistCard.createCard();
    }
  }
}

function updateStyleForCompleted(){
  for(var i = 0; i < $('.unique-id-style').length; i++){
    if($($('.completed-task')[i]).text() === 'Completed: true'){
      $($('.unique-id-style')[i]).toggleClass('completed');
      $($('.completed-task')[i]).html('<img src="images/checkmark.svg">Done!!!!<img src="images/checkmark.svg">');
    }
  }
}

function showLastTen(){
  for(var i = 0; i < $('.completed-task').length; i++){
    if(i > 9) {
      $($('.completed-task')[i]).parent().hide();
    }
  }
}

function incompleteText () {
  for(var i = 0; i < $('.completed-task').length; i++) {
    console.log($($('.completed-task')[i]).text());
    if($($('.completed-task')[i]).text() === 'Completed: false') {
      $($('.completed-task')[i]).text('Incomplete');
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
  incompleteText();
}

function clearInput() {
  $('.title').val('');
  $('.task').val('');
  $('.title').focus();
}

Card.prototype.createCard = function () {
  $('.two-do-list').prepend(`<article class="unique-id-style" id="${this.uniqueId}">
    <h2 class="title-output" contenteditable="true">${this.title}</h2>
    <button class="delete-button"></button>
    <p class="task-output" contenteditable="true">${this.body}</p>
    <button class="upvote-button"></button>
    <button class="downvote-button"></button>
    <h3 class="importance">Importance:</h3>
    <h3 class="importance-value">${this.importance}</h3>
    <button class="completed-task">Completed: ${this.completed}</button>
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

function vote() {
  var voteTarget = this;
  var importanceArray = ['none', 'low', 'normal', 'high', 'critical'];
  var cardId = $(voteTarget).parent().attr('id');
  var returnedObject = getFromStorage(cardId);
  var index = importanceArray.indexOf($(voteTarget).siblings('.importance-value').text());
  changeImportance(voteTarget, importanceArray, returnedObject, index);
};

function changeImportance(voteTarget, importanceArray, returnedObject, index){
  if (event.target.classList.contains('upvote-button')) {
    $(voteTarget).siblings('.importance-value').text(importanceArray[index + 1])
  } else {
    $(voteTarget).siblings('.importance-value').text(importanceArray[index - 1])
  }
  returnedObject.importance = $(voteTarget).siblings('.importance-value').text()
  addToStorage(returnedObject);
}

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
  var countTitle = $('.title').val().length;
  var countTask = $('.task').val().length;
  if($('.title').val() === "" || $('.task').val() === "" || countTitle > 120 || countTask >120) {
    $('#save-button').attr('disabled', true) 
  } else {
    $('#save-button').attr('disabled', false)
  }
} 



