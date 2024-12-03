const showsData = [
    {
        date: "Mon Sept 09 2024",
        venue: "Ronald Lane",
        location: "San Francisco, CA"
    },
    {
        date: "Tues Sept 17 2024",
        venue: "Pier 3 East",
        location: "San Francisco, CA"
    },
    {
        date: "Sat Oct 12 2024",
        venue: "View Lounge",
        location: "San Francisco, CA"
    },
    {
        date: "Sat Nov 16 2024",
        venue: "Hyatt Agency",
        location: "San Francisco, CA"
    },
    {
        date: "Fri Nov 29 2024",
        venue: "Moscow Center",
        location: "San Francisco, CA"
    },
    {
        date: "Dec 18 2024",
        venue: "Press Club",
        location: "San Francisco, CA"
    },
];

// Once HTML is loaded and parsed, develop the Shows section
window.addEventListener("DOMContentLoaded", createShowsSection);

// Construct the Shows section and attach to the DOM tree
function createShowsSection() {
    // Find and assign parent node
    const mainElementNode = document.querySelector("main");

    // Create section, header elements; construct partial tree
    const showsSectionNode = document.createElement("section");
    showsSectionNode.classList.add("shows");
    const showsHeaderNode = document.createElement("h2");
    const showsHeaderTextNode = document.createTextNode("Shows");
    showsHeaderNode.appendChild(showsHeaderTextNode);
    showsSectionNode.appendChild(showsHeaderNode);

    for (let showObject of showsData) {
        let showComponentNode = createShowComponent(showObject);
        let dividerNode = document.createElement("hr");
        showsSectionNode.appendChild(showComponentNode);
        showsSectionNode.appendChild(dividerNode);
    }

    // Attach section to the DOM tree
    mainElementNode.appendChild(showsSectionNode);
}

function createShowComponent(showObject) {
    // Create component elements
    const showComponentContainerNode = document.createElement("div");
    const dateContainerNode = document.createElement("div");
    const venueContainerNode = document.createElement("div");
    const locationContainerNode = document.createElement("div");
    const dateLabelNode = document.createElement("p");
    const venueLabelNode = document.createElement("p");
    const locationLabelNode = document.createElement("p");
    const dateNode = document.createElement("p");
    const venueNode = document.createElement("p");
    const locationNode = document.createElement("p");
    const buyTicketsBtnNode = document.createElement("button");

    // Add respective classes or attributes
    showComponentContainerNode.classList.add("shows__component");
    dateContainerNode.classList.add("shows__container--date");
    venueContainerNode.classList.add("shows__container--venue");
    locationContainerNode.classList.add("shows__container--location");
    dateLabelNode.classList.add("shows__label");
    venueLabelNode.classList.add("shows__label");
    locationLabelNode.classList.add("shows__label");
    dateNode.classList.add("shows__date");
    venueNode.classList.add("shows__venue");
    locationNode.classList.add("shows__location");
    buyTicketsBtnNode.type = "button";

    // Create text nodes for labels and showObject values and append to parent nodes
    const dateLabelTextNode = document.createTextNode("date");
    const venueLabelTextNode = document.createTextNode("venue");
    const locationLabelTextNode = document.createTextNode("location");
    const dateTextNode = document.createTextNode(showObject.date);
    const venueTextNode = document.createTextNode(showObject.venue);
    const locationTextNode = document.createTextNode(showObject.location);
    const btnTextNode = document.createTextNode("buy tickets");
    dateLabelNode.appendChild(dateLabelTextNode);
    venueLabelNode.appendChild(venueLabelTextNode);
    locationLabelNode.appendChild(locationLabelTextNode);
    dateNode.appendChild(dateTextNode);
    venueNode.appendChild(venueTextNode);
    locationNode.appendChild(locationTextNode);
    buyTicketsBtnNode.appendChild(btnTextNode);

    // Construct the component tree
    dateContainerNode.appendChild(dateLabelNode);
    dateContainerNode.appendChild(dateNode);
    venueContainerNode.appendChild(venueLabelNode);
    venueContainerNode.appendChild(venueNode);
    locationContainerNode.appendChild(locationLabelNode);
    locationContainerNode.appendChild(locationNode);
    showComponentContainerNode.appendChild(dateContainerNode);
    showComponentContainerNode.appendChild(venueContainerNode);
    showComponentContainerNode.appendChild(locationContainerNode);
    showComponentContainerNode.appendChild(buyTicketsBtnNode);

    return showComponentContainerNode;
}