window.onload = function() {
  persistIdea();
}

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
 this.quality = quality || 0;
}

Card.prototype.createCard = function () {
  $ideaList.prepend(`<article class="unique-id-style" id="${this.uniqueId}">
    <h2 class="title-output">${this.title}</h2>
    <img class="delete-button" src="images/delete.svg" alt="delete-idea">
    <p class="body-output">${this.body}</p>
    <img class="upvote-button" src="images/upvote.svg" alt="upvote-idea">
    <img class="downvote-button" src="images/downvote.svg" alt="downvote-idea">
    <h3 class="idea-quality">quality:</h3>
    <h3 class="quality-value">${qualityArray[this.quality]}</h3>
    <hr>
    </article>`);
}


function addToStorage(object) {
  var stringifyObj = JSON.stringify(object);
  localStorage.setItem(object.uniqueId, stringifyObj);
}

$ideaList.on('click', function(e) {
  if (e.target.className === 'delete-button') {
    var ideaId = e.target.closest('.unique-id-style').id;
    $(`#${ideaId}`).remove();
    localStorage.removeItem(ideaId);
  }


});

var qualityArray = ['swill', 'plausible', 'genius'];

$ideaList.on('click', function(e) {
  if (e.target.className === 'upvote-button') {
    if ($(e.target).siblings('.quality-value').text() === 'swill')  {
      $(e.target).siblings('.quality-value').text(qualityArray[1]);
    } else if ($(e.target).siblings('.quality-value').text() === 'plausible') {
      $(e.target).siblings('.quality-value').text(qualityArray[2])
    }
  }
});

$ideaList.on('click', function(e) {
  if (e.target.className === 'downvote-button') {
    if ($(e.target).siblings('.quality-value').text() === 'genius') {
      $(e.target).siblings('.quality-value').text(qualityArray[1]);
    } else if ($(e.target).siblings('.quality-value').text() === 'plausible') {
      $(e.target).siblings('.quality-value').text(qualityArray[0])
    }
  }
});



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




