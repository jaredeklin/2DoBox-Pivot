var $saveButton = $('#save-button');
var $ideaList = $('.idea-list');
var $ideaTitle = $('.idea-title');
var $ideaContent = $('.idea-content');
var qualityArray = ['swill', 'plausible', 'genius'];


// The text fields should be cleared and ready to accept a new idea.
// The idea should be persisted. It should still be present upon reloading the page.

$saveButton.on('click', function(event){
  event.preventDefault();
  var $ideaTitle = $('.idea-title');
  var $ideaContent = $('.idea-content');
  console.log($ideaTitle, $ideaContent);
  var newCard = new Card($ideaTitle.val(), $ideaContent.val());
  newCard.createCard();
  addToStorage(newCard);
})

function Card(title, body) {
 this.title = title;
 this.uniqueId = $.now();
 this.body = body;
 this.quality = 0;
}

Card.prototype.createCard = function () {
  $ideaList.prepend(`<article class="unique-id-style" id="${this.uniqueId}">
    <h2>${this.title}</h2>
    <img class="delete-button" src="images/delete.svg" alt="delete-idea">
    <p class="idea-details">${this.body}</p>
    <img class="upvote-button" src="images/upvote.svg" alt="upvote-idea">
    <img class="downvote-button" src="images/downvote.svg" alt="downvote-idea">
    <p class="idea-quality"><span class="quality-value">${qualityArray[this.quality]}</span></p>
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
  upvoteButton();
  downvoteButton();
});

function upvoteButton() {
  this.quality++;
}

function downvoteButton() {
  this.quality--;
}







  //Clicking upvote on the idea should increase its quality one notch (“swill” → “plausible”, “plausible” → “genius”).
  //Clicking downvote on the idea should decrease its quality one notch (“genius” → “plausible”, “plausible” → “swill”).
  //Incrementing a “genius” idea or decrementing a “swill” idea should have no effect.



  //When a user clicks the title or body of an idea in the list, that text should become an editable text field, pre-populated with the existing idea title or body.
  //The user should be able to “commit” their changes by pressing “Enter/Return” or by clicking outside of the text field.
  //If the user reloads the page, their edits will be reflected.



  //As a user types in the search box, the list of ideas should filter in real time to only display ideas whose title or body include the user’s text. The page should not reload.
  //Clearing the search box should restore all the ideas to the list.





