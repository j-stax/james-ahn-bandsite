import BandSiteApi from "./band-site-api.js";

// Converts integer representation of the days of the week to plain English
const dayMap = {
    0: "Mon",
    1: "Tue",
    2: "Wed",
    3: "Thu",
    4: "Fri",
    5: "Sat",
    6: "Sun"
}

// Converts integer representation of the months to 
const monthMap = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sept",
    9: "Oct",
    10: "Nov",
    11: "Dec"
}

let api = null;

// Display Shows section
async function initShows() { 
    api = await BandSiteApi.getInstance();
    await createShowsSection();

    // Add event listeners  
    const showsComponents = document.querySelectorAll(".shows__component");
    showsComponents.forEach(component => component.addEventListener("click", selectComponent.bind(component)));
    const showsButtons = document.querySelectorAll(".shows__button");
    showsButtons.forEach(button => button.addEventListener("click", (event) => event.stopPropagation()));
}

// Construct the Shows section and attach to the DOM tree
async function createShowsSection() {
    const showsData = await api.getShows();

    // Find and assign parent node
    const mainElementNode = document.querySelector("main");

    // Create the necessary elements/nodes
    const showsSectionNode = document.createElement("section");
    showsSectionNode.classList.add("shows");
    const showsComponentContainerNode = document.createElement("div");
    showsComponentContainerNode.classList.add("shows__component-container");
    const showsHeaderNode = document.createElement("h2");
    showsHeaderNode.classList.add("shows__header");
    const showsHeaderTextNode = document.createTextNode("Shows");
    const showsLabelsForTabletNode = document.createElement("div");
    showsLabelsForTabletNode.classList.add("shows__tablet-labels");
    const dateLabelForTabletNode = document.createElement("p");
    dateLabelForTabletNode.classList.add("shows__tablet-table-header");
    const venueLabelForTabletNode = document.createElement("p");
    venueLabelForTabletNode.classList.add("shows__tablet-table-header");
    const locationLabelForTabletNode = document.createElement("p");
    locationLabelForTabletNode.classList.add("shows__tablet-table-header");
    const labelsForTabletBtn = document.createElement("button");
    labelsForTabletBtn.classList.add("shows__button", "shows__tablet-hidden-btn");
    const dateTextNode = document.createTextNode("date");
    const venueTextNode = document.createTextNode("venue");
    const locationTextNode = document.createTextNode("location");
    const labelsForTabletBtnTextNode = document.createTextNode("buy tickets");

    // Append text nodes to respective parent nodes; build partial tree
    showsHeaderNode.appendChild(showsHeaderTextNode);
    dateLabelForTabletNode.appendChild(dateTextNode);
    venueLabelForTabletNode.appendChild(venueTextNode);
    locationLabelForTabletNode.appendChild(locationTextNode);
    labelsForTabletBtn.appendChild(labelsForTabletBtnTextNode);
    showsLabelsForTabletNode.appendChild(dateLabelForTabletNode);
    showsLabelsForTabletNode.appendChild(venueLabelForTabletNode);
    showsLabelsForTabletNode.appendChild(locationLabelForTabletNode);
    showsLabelsForTabletNode.appendChild(labelsForTabletBtn);

    // Construct the shows component and append to container node
    for (let i = 0; i < showsData.length; i++) {
        // Add headers for tablet and desktop views
        if (i == 0) {
            showsComponentContainerNode.appendChild(showsLabelsForTabletNode);
        }
        let showComponentNode = createShowComponent(showsData[i]);
        let dividerNode = document.createElement("hr");
        dividerNode.classList.add("shows__divider");
        showsComponentContainerNode.appendChild(showComponentNode);
        showsComponentContainerNode.appendChild(dividerNode);
    }

    // Complete the DOM tree for the shows section
    showsSectionNode.appendChild(showsHeaderNode);
    showsSectionNode.appendChild(showsComponentContainerNode);
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
    dateContainerNode.classList.add("shows__container");
    venueContainerNode.classList.add("shows__container");
    locationContainerNode.classList.add("shows__container");
    dateLabelNode.classList.add("shows__label");
    venueLabelNode.classList.add("shows__label");
    locationLabelNode.classList.add("shows__label");
    dateNode.classList.add("shows__date");
    venueNode.classList.add("shows__venue");
    locationNode.classList.add("shows__location");
    buyTicketsBtnNode.type = "button";
    buyTicketsBtnNode.classList.add("shows__button");

    // Create text nodes for labels and showObject values and append to parent nodes
    const dateLabelTextNode = document.createTextNode("date");
    const venueLabelTextNode = document.createTextNode("venue");
    const locationLabelTextNode = document.createTextNode("location");
    const dateTextNode = document.createTextNode(msToDate(showObject.date));
    const venueTextNode = document.createTextNode(showObject.place);
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

function selectComponent() {
    this.classList.toggle("selected");
    const components = document.querySelectorAll(".shows__component");
    for (let comp of components) {
        if (comp === this) {
            continue;
        }
        comp.classList.remove("selected");
    }
}

function msToDate(ms) {
    const date = new Date(ms);
    const day = date.getDate().toString().length == 1 ? `0${date.getDate()}` : date.getDate();
    return `${dayMap[date.getDay()]} ${monthMap[date.getMonth()]} ${day} ${date.getFullYear()}`;
}

initShows();