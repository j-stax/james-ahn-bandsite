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
    for (let i = 0; i < data.length; i++) {
        displayComment(data[i]);
    }
}

function displayComment(commentObject) {
    const parentNode = document.querySelector(".comments__body-container");
    const newComponentNode = document.createElement("article");
    newComponentNode.classList.add("comments__comment-component");
    const newAvatarNode = document.createElement("div");
    newAvatarNode.classList.add("comments__avatar-placeholder");
    const newDivNode = document.createElement("div");
    const newCommentHeaderNode = document.createElement("div");
    newCommentHeaderNode.classList.add("comments__component-header");
    const newCommentAuthorNode = document.createElement("p");
    newCommentAuthorNode.classList.add("comments__author");
    const newCommentTimestampNode = document.createElement("p");
    newCommentTimestampNode.classList.add("comments__timestamp");
    const newCommentNode = document.createElement("p");
    newCommentNode.classList.add("comments__text");
    const newDividerNode = document.createElement("hr");

    const newAuthorTextNode = document.createTextNode(commentObject.author);
    const newTimestampTextNode = document.createTextNode(commentObject.timestamp);
    const newCommentTextNode = document.createTextNode(commentObject.text);

    newCommentAuthorNode.appendChild(newAuthorTextNode);
    newCommentTimestampNode.appendChild(newTimestampTextNode);
    newCommentNode.appendChild(newCommentTextNode);

    newCommentHeaderNode.appendChild(newCommentAuthorNode);
    newCommentHeaderNode.appendChild(newCommentTimestampNode);
    newDivNode.appendChild(newCommentHeaderNode);
    newDivNode.appendChild(newCommentTextNode);
    newComponentNode.appendChild(newAvatarNode);
    newComponentNode.appendChild(newDivNode);
    parentNode.appendChild(newComponentNode);
    parentNode.appendChild(newDividerNode);
}