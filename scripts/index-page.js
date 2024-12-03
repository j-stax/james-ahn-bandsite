const data = [
    {
        user: "Victor Pinto",
        timestamp: "11/02/2023",
        text: "This is art. This is inexplicable magic expressed in the purest way everything that makes " + 
                "up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        user: "Christina Cabrera",
        timestamp: "10/28/2023",
        text: "I feel blessed to have seen them in person. What a show! They were just perfection. " + 
                "If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        user: "Issac Tadesse",
        timestamp: "10/20/2023",
        text: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. " + 
                "Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];

const dateMonthMap = {
    0: "01",
    1: "02",
    2: "03",
    3: "04",
    4: "05",
    5: "06",
    6: "07",
    7: "08",
    8: "09",
    9: "10",
    10: "11",
    11: "12"
};

window.addEventListener("DOMContentLoaded", loadedHandler);

// TODO: onChange form validation?; Shows page tablet

// Initialize dynamic page features
function loadedHandler() {
    loadComments();
    const commentForm = document.querySelector(".comments__form");
    commentForm.addEventListener("submit", submitHandler);
}

function loadComments() {
    for (let commentObj of data) {
        createNewCommentComponent(commentObj);
    }
}

/* Comment form handler.
 * Validates inputs and appends new comment component to the page.
*/
function submitHandler(event) {
    event.preventDefault();
    const form = event.target;
    const userVal = form.user.value.trim();
    const commentVal = form.comment.value.trim();
    
    if (!isValid(userVal)) {
        document.getElementById("user").style.borderColor = "#D22D2D";
    }

    if (!isValid(commentVal)) {
        document.getElementById("comment").style.borderColor = "#D22D2D";
    }

    if (isValid(userVal) && isValid(commentVal)) {
        document.getElementById("user").style.borderColor = "#E1E1E1";
        document.getElementById("comment").style.borderColor = "#E1E1E1";

        let date = new Date();
        date = `${dateMonthMap[date.getMonth()]}/${date.getDate()}/${date.getFullYear()}`;

        const newCommentObj = {
            user: userVal,
            timestamp: date,
            text: commentVal
        };

        data.splice(0, 0, newCommentObj);   // Add to the front of the list
        resetCommentsContainer();
        loadComments();
        form.reset();
    }
}

// Form validation
function isValid(inputField) {
    if (inputField.length == 0 || inputField == null) {
        return false;
    }
    return true;
}


// Clear all comments from the page
function resetCommentsContainer() {
    let commentsContainer = document.querySelector(".comments__body-container");
    const childNodes = commentsContainer.children;

    for (let i = childNodes.length-1; i > 1; i--) {
        let childNode = commentsContainer.children[i];
        childNode.parentNode.removeChild(childNode);
    }
}

// Create a new comment component and append to the DOM tree
function createNewCommentComponent(commentObject) {
    // Create component elements
    const parentNode = document.querySelector(".comments__body-container");
    const newComponentNode = document.createElement("article");
    const newAvatarNode = document.createElement("div");
    const newCommentTextContainerNode = document.createElement("div");
    const newCommentHeaderNode = document.createElement("div"); 
    const newCommentUserNode = document.createElement("p");
    const newCommentTimestampNode = document.createElement("p");
    const newCommentNode = document.createElement("p");
    const newDividerNode = document.createElement("hr");

    // Add class names for styling
    newComponentNode.classList.add("comments__comment-component");
    newAvatarNode.classList.add("comments__avatar-placeholder");
    newCommentTextContainerNode.classList.add("comments__text-container");
    newCommentHeaderNode.classList.add("comments__component-header");
    newCommentUserNode.classList.add("comments__user");
    newCommentTimestampNode.classList.add("comments__timestamp");
    newCommentNode.classList.add("comments__text");

    // Create text nodes for comment object values
    const newUserTextNode = document.createTextNode(commentObject.user);
    const newTimestampTextNode = document.createTextNode(commentObject.timestamp);
    const newCommentTextNode = document.createTextNode(commentObject.text);

    // Append the text nodes to their respective element nodes
    newCommentUserNode.appendChild(newUserTextNode);
    newCommentTimestampNode.appendChild(newTimestampTextNode);
    newCommentNode.appendChild(newCommentTextNode);

    // Create the DOM tree for the comment component
    newCommentHeaderNode.appendChild(newCommentUserNode);
    newCommentHeaderNode.appendChild(newCommentTimestampNode);
    newCommentTextContainerNode.appendChild(newCommentHeaderNode);
    newCommentTextContainerNode.appendChild(newCommentTextNode);
    newComponentNode.appendChild(newAvatarNode);
    newComponentNode.appendChild(newCommentTextContainerNode);

    // Append the comment component to the comments section in the DOM tree
    parentNode.appendChild(newComponentNode);
    parentNode.appendChild(newDividerNode);
}