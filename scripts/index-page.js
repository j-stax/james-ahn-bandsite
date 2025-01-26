import BandSiteApi from "./band-site-api.js";

const avatarMap = {}    // local store for avatar URLs for new comments
let api = null;

// Add event listeners
document.querySelector(".comments__form").addEventListener("submit", submitHandler);
document.querySelector(".comments__avatar-file-icon-btn").addEventListener("click", () => {
    document.querySelector(".comments__avatar-file-input").click();
});
document.querySelector(".comments__avatar-file-input").addEventListener("change", (event) => {
    readFile(event.target);
});

// Display Comments section
async function initComments() {
    api = await BandSiteApi.getInstance();
    await loadComments();
}

// Generate and display all comments from the comments list
async function loadComments() {
    const data = await api.getComments();
    data.sort((a, b) => b.timestamp - a.timestamp);
    
    for (let commentObj of data) {
        createNewCommentComponent(commentObj);
    }

    // Add likes event listeners
    const heartsRegular = document.querySelectorAll(".comments__heart-regular");
    heartsRegular.forEach(heart => heart.addEventListener("click", heartClickHandler));

    // Add delete icon event listener
    const deleteIcons = document.querySelectorAll(".comments__delete-icon");
    deleteIcons.forEach(icon => icon.addEventListener("click", deleteCommentHandler));
}

// Read the uploaded image file and display the image
// Adding and removing classes would not work on empty input for form validation.
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
            document.querySelector(".comments__avatar-file-icon-btn i").classList.add("invisible");
        }
    }
    catch (exception) {
        alert("Error: File upload failed. Only image files accepted.");
        console.log(exception);
    }
}

/* Comment form handler.
 * Validates inputs and appends new comment component to the page.
*/
async function submitHandler(event) {
    event.preventDefault();
    const form = event.target;
    const nameVal = form.name.value.trim();
    const commentVal = form.comment.value.trim();
    const avatarElem = document.querySelector(".comments__new-avatar-container");
    const avatarURL = avatarElem.style.getPropertyValue("background-image");
    const avatarIcon = document.querySelector(".comments__avatar-file-icon-btn i");
    
    // Only submit the form if the text fields are filled
    if (!isValid(nameVal)) {
        document.getElementById("name").classList.add("invalid");
    }

    if (!isValid(commentVal)) {
        document.getElementById("comment").classList.add("invalid")
    }

    if (isValid(nameVal) && isValid(commentVal)) {
        document.getElementById("name").classList.remove("invalid");
        document.getElementById("comment").classList.remove("invalid");

        // New comment object
        const newCommentObj = {
            name: toTitleCase(nameVal),
            comment: commentVal[0].toUpperCase() + commentVal.slice(1)
        };

        // API call
        const responseObj = await api.postComment(newCommentObj);   

        // Cache avatar file path to local store
        if (avatarURL) {
            avatarMap[responseObj.id] = avatarURL.slice(4, -1);
        }

        clearComments();
        avatarElem.style.removeProperty("background-image");    // Reset for new avatar
        avatarElem.classList.remove("comments__avatar-image-position");
        avatarIcon.classList.remove("invisible");
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
function clearComments() {
    const commentsContainer = document.querySelector(".comments__body-container");
    const childNodes = commentsContainer.children;

    for (let i = childNodes.length-1; i > 1; i--) {
        commentsContainer.removeChild(childNodes[i]);
    }
}

// Create a new comment component and append to the DOM tree
function createNewCommentComponent(commentObject) {
    // Create component elements
    const parentNode = document.querySelector(".comments__body-container");
    const newComponentNode = document.createElement("article");
    const newAvatarNode = document.createElement("div");
    const newCommentTextContainerNode = document.createElement("div");
    const newCommentDeleteIconContainerNode = document.createElement("div");
    const newCommentHeaderNode = document.createElement("div"); 
    const newCommentNameNode = document.createElement("p");
    const newCommentTimestampNode = document.createElement("p");
    const newCommentNode = document.createElement("p");
    const newCommentLikesContainerNode = document.createElement("div");
    const newCommentLikesSpanNode = document.createElement("span");
    const newDividerNode = document.createElement("hr");

    // Add class names for style rulesets
    newComponentNode.classList.add("comments__comment-component");
    newComponentNode.id = commentObject.id;                                 // Assign id provided by API
    newAvatarNode.classList.add("comments__avatar-placeholder");
    newCommentTextContainerNode.classList.add("comments__text-container");
    newCommentDeleteIconContainerNode.classList.add("comments__delete-icon-container");
    newCommentHeaderNode.classList.add("comments__component-header");
    newCommentNameNode.classList.add("comments__name");
    newCommentTimestampNode.classList.add("comments__timestamp");
    newCommentNode.classList.add("comments__text");
    newCommentLikesContainerNode.classList.add("comments__likes");
    newCommentLikesSpanNode.classList.add("comments__likes-count");

    // Create text nodes for comment object values
    const newNameTextNode = document.createTextNode(commentObject.name);
    const newTimestampTextNode = document.createTextNode(getTimeDiff(commentObject.timestamp));     // Get time passed from current date/time and use as timestamp
    const newCommentTextNode = document.createTextNode(commentObject.comment);
    const newCommentLikesTextNode = document.createTextNode(commentObject.likes + " Likes");

    // Check if user uploaded an avatar file and retrieve if true
    if (commentObject.id in avatarMap) {
        newAvatarNode.style.backgroundImage = `url(${avatarMap[commentObject.id]})`;
        newAvatarNode.classList.add("comments__avatar-image-position");
    }

    // Append the text nodes to their respective element nodes
    newCommentNameNode.appendChild(newNameTextNode);
    newCommentTimestampNode.appendChild(newTimestampTextNode);
    newCommentNode.appendChild(newCommentTextNode);
    newCommentLikesSpanNode.appendChild(newCommentLikesTextNode);

    // Create the DOM tree for the comment component
    newCommentHeaderNode.appendChild(newCommentNameNode);
    newCommentHeaderNode.appendChild(newCommentTimestampNode);
    newCommentDeleteIconContainerNode.innerHTML += "<i class=\"fa-solid fa-minus comments__delete-icon\"></i>";
    newCommentLikesContainerNode.innerHTML = "<i class=\"fa-regular fa-heart comments__heart-regular\"></i>";
    newCommentLikesContainerNode.appendChild(newCommentLikesSpanNode);
    newCommentTextContainerNode.appendChild(newCommentDeleteIconContainerNode);
    newCommentTextContainerNode.appendChild(newCommentHeaderNode);
    newCommentTextContainerNode.appendChild(newCommentNode);
    newCommentTextContainerNode.appendChild(newCommentLikesContainerNode);
    newComponentNode.appendChild(newAvatarNode);
    newComponentNode.appendChild(newCommentTextContainerNode);

    // Append the comment component to the comments section in the DOM tree
    parentNode.appendChild(newComponentNode);
    parentNode.appendChild(newDividerNode);
}

async function heartClickHandler(event) {
    const heartIcon = event.target

    // Swap icons for clicked appearance
    heartIcon.classList.add("fa-solid");
    heartIcon.classList.remove("fa-regular");

    // Update likes count
    const commentComponentElem = heartIcon.parentNode.parentNode.parentNode;
    const updatedCommentObj = await api.likeComment(commentComponentElem.id);
    heartIcon.nextElementSibling.textContent = `${updatedCommentObj.likes} Likes`;

    // Reset heart display
    setTimeout(() => {
        heartIcon.classList.add("fa-regular");
        heartIcon.classList.remove("fa-solid");
    }, 5000);
}

// Remove comment and make delete API call
async function deleteCommentHandler(event) {
    const commentComponentElem = event.target.parentNode.parentNode.parentNode;
    const commentId = commentComponentElem.id;
    const horizontalLine = commentComponentElem.nextElementSibling;
    const commentsBodyContainer = document.querySelector(".comments__body-container");

    await api.deleteComment(commentId); // API call

    commentsBodyContainer.removeChild(horizontalLine);
    commentsBodyContainer.removeChild(commentComponentElem);
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
        if (diffSeconds <= 0) {
            return "Now";
        }
        if (diffSeconds === 1) {
            return "1 second ago";
        }
        return `${diffSeconds} seconds ago`;
    }
    if (diff < msToHour) {
        const diffMinutes = Math.round(diff / msToMin);
        return diffMinutes > 1 ? `${diffMinutes} minutes ago` : `${diffMinutes} minute ago`;
    }
    if (diff < msToDay) {
        const diffHrs = Math.round(diff / msToHour);
        return diffHrs > 1 ? `${diffHrs} hours ago` : `${diffHrs} hour ago`;
    }
    if (diff < msToMonth) {
        const diffDays = Math.round(diff / msToDay);
        return diffDays > 1 ? `${diffDays} days ago` : `${diffDays} day ago`;
    }
    if (diff < msToYear) {
        const diffMonths = Math.round(diff / msToMonth);
        return diffMonths > 1 ? `${diffMonths} months ago` : `${diffMonths} month ago`;
    }
    const diffYears = Math.round(diff / msToYear);
    return diffYears > 1 ? `${diffYears} years ago` : `${diffYears} year ago`;
}

function toTitleCase(str) {
    const sections = str.split(" ");
    sections.forEach((item, index) => {
        sections[index] = item[0].toUpperCase() + item.slice(1);
    });
    return sections.join(" ");
}

initComments();