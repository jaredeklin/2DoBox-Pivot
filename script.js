window.onload = function() {
  persistIdea();
}

$('.idea-list').on('click', '.delete-button', deleteCard);
$('.idea-list').on('click', '.upvote-button', upVote);
$('.idea-list').on('click', '.downvote-button', downVote);
$('.search-bar').on('keyup', filter);
$('.idea-title, .idea-content').on('input', enableBtn);

var $saveButton = $('#save-button');
var $ideaList = $('.idea-list');
var $ideaTitle = $('.idea-title');
var $ideaContent = $('.idea-content');


function persistIdea() {
  for(i = 0; i < localStorage.length; i++) {
    var getObject = localStorage.getItem(localStorage.key(i));
    var parseObject = JSON.parse(getObject);
    var persistCard = new Card(parseObject.title, parseObject.body, parseObject.uniqueId, parseObject.quality);
    persistCard.createCard();
  }
}

$saveButton.on('click', function(event){
  event.preventDefault();
  var $ideaTitle = $('.idea-title');
  var $ideaContent = $('.idea-content');
  var newCard = new Card($ideaTitle.val(), $ideaContent.val());
  newCard.createCard();
  addToStorage(newCard);
  $('.idea-title').val('');
  $('.idea-content').val('');
  // $('.idea-title').focus();
})

function Card(title, body, uniqueId, quality) {
 this.title = title;
 this.uniqueId = uniqueId || $.now();
 this.body = body;
 this.quality = quality || 'swill';
}

Card.prototype.createCard = function () {
  $('.idea-list').prepend(`<article class="unique-id-style" id="${this.uniqueId}">
    <h2 class="title-output">${this.title}</h2>
    <img class="delete-button" src="images/delete.svg" alt="delete-idea">
    <p class="body-output">${this.body}</p>
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


<<<<<<< HEAD
  $('.search-bar').keyup(function(){
    var searchInput = $('.search-bar').val().toLowerCase();
    for (var i = 0; i < $('.title-output').length; i++){
      if ($($('.title-output')[i]).text().toLowerCase().includes(searchInput) || $($('.body-output')[i]).text().toLowerCase().includes(searchInput)){
        $($('.title-output')[i]).parent().show();
      } else {
        $($('.title-output')[i]).parent().hide();
      }
    }
    
  })
=======
>>>>>>> 85477636136e84962161b240b835f516661ee0bc




// function upvoteButton(e) {

//     console.log(this.target);
//   // e.target.siblings('')

// }

// function downvoteButton(e) {

// }


  //When a user clicks the title or body of an idea in the list, that text should become an editable text field, pre-populated with the existing idea title or body.
  //The user should be able to “commit” their changes by pressing “Enter/Return” or by clicking outside of the text field.
  //If the user reloads the page, their edits will be reflected.
  // content editable 
  // event listener (keyup)



  //As a user types in the search box, the list of ideas should filter in real time to only display ideas whose title or body include the user’s text. The page should not reload.
  //Clearing the search box should restore all the ideas to the list.

    // var cardId = $(e.target).closest('cardname').getProp('id')

    // $(`#${cardId} quality-value`)




