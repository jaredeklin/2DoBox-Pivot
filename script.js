var $saveButton = $('#save-button');
var $ideaList = $('.idea-list');
var $ideaTitle = $('.idea-title');
var $ideaContent = $('.idea-content');


$saveButton.on('click', function(){
 var $ideaTitle = $('.idea-title').val();
 var $ideaContent = $('.idea-content').val();
 console.log($ideaTitle, $ideaContent);
 // Card();
})

 var newCard = new Card($ideaTitle.val(), $ideaContent.val() );

// still need the idea to create id

// create id

function Card(title, body, uniqueId) {
 this.title = title;
 this.body = body;
 // this.uniqueId = uniqueId;
 this.quality = "swill";
  createCard();
  console.log(createCard);
}

Card.prototype.createCard = function () {
    $ideaList.append(`<article id="${this.uniqueId}">
    <h2>${this.title}</h2>
    <img class="delete-button" src="images/delete.svg" alt="delete-idea">
    <p class="idea-details">${this.body}</p>
    <img class="upvote-button" src="images/upvote.svg" alt="upvote-idea">
    <img class="downvote-button" src="images/downvote.svg" alt="downvote-idea">
    <p class="idea-quality">quality: <span class="quality-value"></span></p>
    <hr>
  </article>`);
}
// prevent default

