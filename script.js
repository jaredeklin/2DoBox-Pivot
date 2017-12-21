window.onload = function() {
  persistIdea();
}

var $saveButton = $('#save-button');
var $ideaList = $('.idea-list');
var $ideaTitle = $('.idea-title');
var $ideaContent = $('.idea-content');
var qualityArray = ['swill', 'plausible', 'genius'];

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
    <h2>${this.title}</h2>
    <img class="delete-button" src="images/delete.svg" alt="delete-idea">
    <p class="idea-details">${this.body}</p>
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

$ideaList.on('click', function(e){
  if (e.target.className === 'delete-button') {
    var ideaId = e.target.closest('.unique-id-style').id;
    $(`#${ideaId}`).remove();
    localStorage.removeItem(ideaId);
  } 
  if (e.target.className === 'upvote-button') {
    if (siblings('.quality-value').text() === 'swill') {
    }
    console.log('hi');
    // this.quality++;
  }
    
  if (e.target.className === 'downvote-button') {
    // this.quality--;

  }
});


// function upvoteButton(e) {

//     console.log(this.target);
//   // e.target.siblings('')

// }

// function downvoteButton(e) {

// }

  //Clicking upvote on the idea should increase its quality one notch (“swill” → “plausible”, “plausible” → “genius”).
  //Clicking downvote on the idea should decrease its quality one notch (“genius” → “plausible”, “plausible” → “swill”).
  //Incrementing a “genius” idea or decrementing a “swill” idea should have no effect.



  //When a user clicks the title or body of an idea in the list, that text should become an editable text field, pre-populated with the existing idea title or body.
  //The user should be able to “commit” their changes by pressing “Enter/Return” or by clicking outside of the text field.
  //If the user reloads the page, their edits will be reflected.
  // content editable 
  // event listener (keyup)



  //As a user types in the search box, the list of ideas should filter in real time to only display ideas whose title or body include the user’s text. The page should not reload.
  //Clearing the search box should restore all the ideas to the list.





