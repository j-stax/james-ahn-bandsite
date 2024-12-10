// const showsData = [
//     {
//         date: "Mon Sept 09 2024",
//         venue: "Ronald Lane",
//         location: "San Francisco, CA"
//     },
//     {
//         date: "Tues Sept 17 2024",
//         venue: "Pier 3 East",
//         location: "San Francisco, CA"
//     },
//     {
//         date: "Sat Oct 12 2024",
//         venue: "View Lounge",
//         location: "San Francisco, CA"
//     },
//     {
//         date: "Sat Nov 16 2024",
//         venue: "Hyatt Agency",
//         location: "San Francisco, CA"
//     },
//     {
//         date: "Fri Nov 29 2024",
//         venue: "Moscow Center",
//         location: "San Francisco, CA"
//     },
//     {
//         date: "Dec 18 2024",
//         venue: "Press Club",
//         location: "San Francisco, CA"
//     },
// ];

// Once HTML is loaded and parsed, call function to initialize dynamic features
window.addEventListener("DOMContentLoaded", loadedHandler);

// Initialize dynamic page features
async function loadedHandler() {
    document.querySelector(".nav__shows").style.color = "#FFFFFF";
    document.querySelector(".nav__bio").style.removeProperty("border-bottom");

    const api = await getApi();
    await createShowsSection(api);

    const showsComponents = document.querySelectorAll(".shows__component");
    showsComponents.forEach(component => component.addEventListener("click", selectComponent.bind(component)));
    const showsButtons = document.querySelectorAll(".shows__button");
    showsButtons.forEach(button => button.addEventListener("click", (event) => event.stopPropagation()));
}

async function getApi() {
    let api = null;
    try {
        const response = await axios.get('https://unit-2-project-api-25c1595833b2.herokuapp.com/register');
        if (response.status === 200) {
            const apiKey = response.data["api_key"];
            api = new BandSiteApi(apiKey);
        }
        else {
            console.log(response.status);
        }
    }
    catch (err) {
        console.log(err);
    }

    return api;
}

// Construct the Shows section and attach to the DOM tree
async function createShowsSection(api) {
    const showsData = await api.getShows();

    // Find and assign parent node
    const mainElementNode = document.querySelector("main");

    // Create the necessary elements/nodes
    const showsSectionNode = document.createElement("section");
    showsSectionNode.classList.add("shows");
    const showsComponentContainerNode = document.createElement("div");
    showsComponentContainerNode.classList.add("shows__component-container");
    const showsHeaderNode = document.createElement("h2");
    const showsHeaderTextNode = document.createTextNode("Shows");
    const showsLabelsForTabletNode = document.createElement("div");
    showsLabelsForTabletNode.classList.add("shows__tablet-labels");
    const dateLabelForTabletNode = document.createElement("p");
    const venueLabelForTabletNode = document.createElement("p");
    const locationLabelForTabletNode = document.createElement("p");
    const labelsForTabletBtn = document.createElement("button");
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
    const dateTextNode = document.createTextNode(showObject.date);
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