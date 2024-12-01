const data = [
    {
        author: "Victor Pinto",
        timestamp: "11/02/2023",
        text: "This is art. This is inexplicable magic expressed in the purest way everything that makes " + 
                "up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        author: "Christina Cabrera",
        timestamp: "10/28/2023",
        text: "I feel blessed to have seen them in person. What a show! They were just perfection. " + 
                "If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        author: "Issac Tadesse",
        timestamp: "10/20/2023",
        text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. " + 
                "Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];

window.addEventListener("DOMContentLoaded", loadComments);

function loadComments() {
    for (let i = 1; i <= data.length; i++) {
        let commentAuthor = document.querySelector(".comments__author-" + i);
        let commentTimestamp = document.querySelector(".comments__timestamp-" + i);
        let commentText = document.querySelector(".comments__text-" + i);

        let commentObj = data[i-1];
        commentAuthor.textContent = commentObj.author;
        commentTimestamp.textContent = commentObj.timestamp;
        commentText.textContent = commentObj.text;
    }
    

}