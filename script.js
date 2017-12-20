var $saveButton = $('#save-button');
var $ideaList = $('.idea-list');
var $ideaTitle = $('.idea-title');
var $ideaContent = $('.idea-content');


// When visiting the application, the user should:
    // See a list of all existing ideas, including the title, body, and quality for each idea.
    // Ideas should appear in descending chronological order (with the most recently created idea at the top).


// When a user clicks “Save”:
// A new idea with the provided title and body should appear in the idea list.
// The text fields should be cleared and ready to accept a new idea.
// The page should not reload.
// The idea should be persisted. It should still be present upon reloading the page.

$saveButton.on('click', function(){
  var $ideaTitle = $('.idea-title');
  var $ideaContent = $('.idea-content');
  console.log($ideaTitle, $ideaContent);
  var newCard = new Card($ideaTitle.val(), $ideaContent.val());
  newCard.createCard();
  addToStorage(newCard);
})



// still need the idea to create id

// create id

function Card(title, body) {
 this.title = title;
 this.uniqueId = $.now();
 this.body = body;
 this.quality = "swill";
  // createCard();
  // console.log(createCard);
}

Card.prototype.createCard = function () {
  $ideaList.append(`<article class="unique-id-style" id="${this.uniqueId}">
    <h2>${this.title}</h2>
    <img class="delete-button" src="images/delete.svg" alt="delete-idea">
    <p class="idea-details">${this.body}</p>
    <img class="upvote-button" src="images/upvote.svg" alt="upvote-idea">
    <img class="downvote-button" src="images/downvote.svg" alt="downvote-idea">
    <p class="idea-quality"><span class="quality-value">${this.quality}</span></p>
    <hr>
    </article>`);
}
// prevent default

function addToStorage(object) {
  var stringifyObj = JSON.stringify(object);
  localStorage.setItem(object.uniqueId, stringifyObj);
} 

$ideaList.on('click', function(e){
  if (e.target.className === 'delete-button') {
    var ideaId = e.target.closest('.unique-id-style').id;
    $(`#${ideaId}`).remove();
  }
});

// bookmarkList.addEventListener('click', function(event) {
//   if (event.target.className === 'bookmark-buttons delete-button') {
//     event.target.parentNode.remove(bookmark);
//     bookmarkCount = bookmarkCount - 1;
//   }
// });

// When viewing the idea list:
  //Each idea in the list should have a link or button to “Delete” (or 𝗫).
  // Upon clicking “Delete”, the appropriate idea should be removed from the list.
  // The page should not reload when an idea is deleted.
  // The idea should be removed from localStorage. It should not re-appear on next page load.


//In order to change the recorded quality of an idea, the user will interact with it from the idea list.
  //Each idea in the list should include an “upvote” and “downvote” button.
  //Clicking upvote on the idea should increase its quality one notch (“swill” → “plausible”, “plausible” → “genius”).
  //Clicking downvote on the idea should decrease its quality one notch (“genius” → “plausible”, “plausible” → “swill”).
  //Incrementing a “genius” idea or decrementing a “swill” idea should have no effect.


// Editing an existing 
  //When a user clicks the title or body of an idea in the list, that text should become an editable text field, pre-populated with the existing idea title or body.
  //The user should be able to “commit” their changes by pressing “Enter/Return” or by clicking outside of the text field.
  //If the user reloads the page, their edits will be reflected.


//We’d like our users to be able to easily find specific ideas they already created, so let’s provide them with a filtering interface on the idea list.
  //At the top of the idea list, include a text field labeled “Search”.
  //As a user types in the search box, the list of ideas should filter in real time to only display ideas whose title or body include the user’s text. The page should not reload.
  //Clearing the search box should restore all the ideas to the list.





