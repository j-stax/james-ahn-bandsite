const data = [
    {
        name: "James Bond",
        timestamp: new Date(2024, 11, 5, 13, 5, 30),
        comment: "This is a comment to test the timestamp feature."
    },
    {
        name: "Victor Pinto",
        timestamp: new Date(2023, 10, 2),
        comment: "This is art. This is inexplicable magic expressed in the purest way everything that makes " + 
                "up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        name: "Christina Cabrera",
        timestamp: new Date(2023, 9, 28),
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. " + 
                "If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        name: "Issac Tadesse",
        timestamp: new Date(2023, 9, 20),
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. " + 
                "Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];

/* Used for initial implentation of timestamp */
// const dateMonthMap = {
//     0: "01",
//     1: "02",
//     2: "03",
//     3: "04",
//     4: "05",
//     5: "06",
//     6: "07",
//     7: "08",
//     8: "09",
//     9: "10",
//     10: "11",
//     11: "12"
// };

window.addEventListener("DOMContentLoaded", loadedHandler);

/* Display comments on page.
 * Style navigation tab as active.
 * Add event listeners to elements.
*/ 
function loadedHandler() {
    loadComments();
    document.querySelector(".nav__bio").classList.add("nav__selected");
    document.querySelector(".nav__shows").classList.remove("nav__selected");
    document.querySelector(".comments__form").addEventListener("submit", submitHandler);
    document.querySelector(".comments__avatar-file-icon-btn").addEventListener("click", () => {
        document.querySelector(".comments__avatar-file-input").click();
    });
    document.querySelector(".comments__avatar-file-input").addEventListener("change", (event) => {
        readFile(event.target);
    });
}

// Generate and display all comments from the comments list
function loadComments() {
    for (let commentObj of data) {
        createNewCommentComponent(commentObj);
    }
}

// Read the uploaded image file and display the image
function readFile(input) {
    try {
        // Check that a file was successfully uploaded
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const url = URL.createObjectURL(file);
            const avatarElem = document.querySelector(".comments__new-avatar-container");

            // Display the image
            avatarElem.style.backgroundImage = `url(${url})`;
            avatarElem.classList.add("comments__avatar-image-position");
            document.querySelector(".comments__avatar-file-icon-btn").style.visibility = "hidden";
        }
    }
    catch (exception) {
        alert("Error: File upload failed. Only image files accepted.");
        console.log("File upload error.");
    }
}

/* Comment form handler.
 * Validates inputs and appends new comment component to the page.
*/
function submitHandler(event) {
    event.preventDefault();
    const form = event.target;
    const nameVal = form.name.value.trim();
    const commentVal = form.comment.value.trim();
    const avatarElem = document.querySelector(".comments__new-avatar-container");
    const avatarURL = avatarElem.style.getPropertyValue("background-image");
    const avatarIcon = document.querySelector(".comments__avatar-file-icon-btn");
    
    // Only submit the form if the text fields are filled.
    // Adding and removing classes would not work on empty input for form validation.
    if (!isValid(nameVal)) {
        document.getElementById("name").style.borderColor = "#D22D2D";
    }

    if (!isValid(commentVal)) {
        document.getElementById("comment").style.borderColor = "#D22D2D";
    }

    if (isValid(nameVal) && isValid(commentVal)) {
        document.getElementById("name").style.borderColor = "#E1E1E1";
        document.getElementById("comment").style.borderColor = "#E1E1E1";

        const date = new Date();
        // date = `${dateMonthMap[date.getMonth()]}/${date.getDate()}/${date.getFullYear()}`;   // Previous timestamp format

        // New comment object
        const newCommentObj = {
            avatar: avatarURL ? avatarURL : null,
            name: toTitleCase(nameVal),
            timestamp: date,
            comment: commentVal[0].toUpperCase() + commentVal.slice(1)
        };

        data.splice(0, 0, newCommentObj);   // Add to the front of the list
        resetCommentsContainer();
        avatarElem.style.removeProperty("background-image");    // Reset for new avatar
        avatarElem.classList.remove("comments__avatar-image-position");
        avatarIcon.style.visibility = "visible";
        loadComments();  // Display all comments including newly submitted comment
        form.reset();   // Clear input text fields
    }
}

// Form validation helper function
function isValid(inputField) {
    if (inputField.length == 0 || inputField == null) {
        return false;
    }
    return true;
}

// Clear all comments from the page by clearing the section from the DOM tree
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
    const newCommentNameNode = document.createElement("p");
    const newCommentTimestampNode = document.createElement("p");
    const newCommentNode = document.createElement("p");
    const newDividerNode = document.createElement("hr");

    // Add class names for style rulesets
    newComponentNode.classList.add("comments__comment-component");
    newAvatarNode.classList.add("comments__avatar-placeholder");
    newCommentTextContainerNode.classList.add("comments__text-container");
    newCommentHeaderNode.classList.add("comments__component-header");
    newCommentNameNode.classList.add("comments__name");
    newCommentTimestampNode.classList.add("comments__timestamp");
    newCommentNode.classList.add("comments__text");

    // Create text nodes for comment object values
    const newNameTextNode = document.createTextNode(commentObject.name);
    const newTimestampTextNode = document.createTextNode(getTimeDiff(commentObject.timestamp));     // Get time passed from current date/time and use as timestamp
    const newCommentTextNode = document.createTextNode(commentObject.comment);

    // Check if user uploaded an avatar file
    if (commentObject.avatar) {
        newAvatarNode.style.backgroundImage = commentObject.avatar;
        newAvatarNode.classList.add("comments__avatar-image-position");
    }

    // Append the text nodes to their respective element nodes
    newCommentNameNode.appendChild(newNameTextNode);
    newCommentTimestampNode.appendChild(newTimestampTextNode);
    newCommentNode.appendChild(newCommentTextNode);

    // Create the DOM tree for the comment component
    newCommentHeaderNode.appendChild(newCommentNameNode);
    newCommentHeaderNode.appendChild(newCommentTimestampNode);
    newCommentTextContainerNode.appendChild(newCommentHeaderNode);
    newCommentTextContainerNode.appendChild(newCommentTextNode);
    newComponentNode.appendChild(newAvatarNode);
    newComponentNode.appendChild(newCommentTextContainerNode);

    // Append the comment component to the comments section in the DOM tree
    parentNode.appendChild(newComponentNode);
    parentNode.appendChild(newDividerNode);
}

/* Calculates difference between input date/time and current date/time,
 * and returns the amount of time passed as a string.
*/
function getTimeDiff(prevDate) {
    const msToMin = 60 * 1000;          // milliseconds to one minute
    const msToHour = msToMin * 60;      // milliseconds to one hour
    const msToDay = msToHour * 24;      // milliseconds to one day
    const msToMonth = msToDay * 30;     // milliseconds to one month
    const msToYear = msToDay * 365;     // milliseconds to one year
    const diff = new Date() - prevDate;

    if (diff < msToMin) {
        const diffSeconds = Math.round(diff / 1000);
        return diffSeconds === 0 ? "Now" : `${diffSeconds} seconds ago`;
    }
    else if (diff < msToHour) {
        const diffMinutes = Math.round(diff / msToMin);
        return diffMinutes > 1 ? `${diffMinutes} minutes ago` : `${diffMinutes} minute ago`;
    }
    else if (diff < msToDay) {
        const diffHrs = Math.round(diff / msToHour);
        return diffHrs > 1 ? `${diffHrs} hours ago` : `${diffHrs} hour ago`;
    }
    else if (diff < msToMonth) {
        const diffDays = Math.round(diff / msToDay);
        return diffDays > 1 ? `${diffDays} days ago` : `${diffDays} day ago`;
    }
    else if (diff < msToYear) {
        const diffMonths = Math.round(diff / msToMonth);
        return diffMonths > 1 ? `${diffMonths} months ago` : `${diffMonths} month ago`;
    }
    else {
        const diffYears = Math.round(diff / msToYear);
        return diffYears > 1 ? `${diffYears} years ago` : `${diffYears} year ago`;
    }
}

function toTitleCase(str) {
    const sections = str.split(" ");
    sections.forEach((item, index) => {
        sections[index] = item[0].toUpperCase() + item.slice(1);
    });
    return sections.join(" ");
}
