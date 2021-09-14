"use strict";

/*********************/
// Global Variables //
/******************/

let timeOut = null;
let newTracksNum = 2;
let currentSectionId = "";
let sectionTracks = document.querySelectorAll(".track");
let trackLinks = document.querySelectorAll(".scroll_to");
const header = document.querySelector(".header");
const sectionHero = document.querySelector(".section-hero");
const addNewTrack = document.querySelector("#add-track");
const featuredTracks = document.querySelector("#featured-tracks");
const navList = document.querySelector(".nav-list");
const headerHeight = header.offsetHeight;
const btnTop = document.querySelector(".btn-top");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

/**************/
// Functions //
/************/

const addSmoothScroll = (trackLink) => {
  trackLink.addEventListener("click", (evt) => {
    evt.preventDefault();

    const scrolledToElem = document.querySelector(
      `#${trackLink.getAttribute("data-link")}`
    );

    scrolledToElem.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
};

const hideHeader = () => {
  timeOut = setTimeout(() => {
    header.classList.add("hide-header");
  }, 5000);
};

const scrollTop = () => {
  const sectionHeroTop = sectionHero.offsetTop;
  const sectionHeroHeight = sectionHero.clientHeight;

  if (scrollY >= sectionHeroTop + sectionHeroHeight * 0.5) {
    // Scrolling down
    if (btnTop.classList.contains("display-none"))
      btnTop.classList.remove("display-none");
  } else {
    // Scrolling up to top page
    if (scrollY < sectionHeroTop + sectionHeroHeight)
      btnTop.classList.add("display-none");
  }
};

const highLight = () => {
  currentSectionId = "";
  sectionTracks = document.querySelectorAll(".track");
  trackLinks = document.querySelectorAll(".scroll_to");
  highLightTrack();
  highLightLink();
};

const highLightLink = () => {
  for (const trackLink of trackLinks) {
    trackLink.classList.remove("active");
    if (currentSectionId === trackLink.getAttribute("data-link")) {
      trackLink.classList.add("active");
    }
  }
};

const highLightTrack = () => {
  for (let sectionTrack of sectionTracks) {
    const sectionTrackRect = sectionTrack.getBoundingClientRect();
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );

    sectionTrack.classList.remove("track-active");
    if (sectionTrackRect.top <= vh / 2 && sectionTrackRect.bottom > vh / 2) {
      currentSectionId = sectionTrack.getAttribute("id");
      sectionTrack.classList.add("track-active");
    }
  }
};

const createNewTrack = () => {
  // Main Track Element
  const trackSection = document.createElement("section");
  trackSection.id = `new-track-${newTracksNum}`;
  trackSection.classList.add("track");

  //   Sub Track Elements
  const trackLabel = createTrackLabel();
  const trackInfo = document.createElement("div");
  const applyLink = document.createElement("a");

  trackInfo.classList.add("track-info");
  applyLink.classList.add("track-cta");
  applyLink.textContent = "Coming Soon";
  applyLink.href = "#";

  trackInfo.append(createTrackRequirements(), createTrackOutcomes());
  trackSection.append(trackLabel, trackInfo, applyLink);
  return trackSection;
};

const createTrackRequirements = () => {
  const trackRequirements = document.createElement("div");
  trackRequirements.classList.add("track-requirements");

  //   Elements within "trackRequirements" element
  const requirementsText = document.createElement("p");
  const requirementsList = document.createElement("ul");
  requirementsText.classList.add("b-text");
  requirementsList.classList.add("track-requirements-list");
  requirementsText.textContent = "Requirements";

  for (let i = 0; i < 3; i++) {
    const requirementItem = document.createElement("li");
    requirementItem.textContent = "Lorem ipsum dolor sit amet consectetur.";
    requirementsList.append(requirementItem);
  }

  trackRequirements.append(requirementsText, requirementsList);

  return trackRequirements;
};

const createTrackOutcomes = () => {
  const trackOutcomes = document.createElement("div");
  trackOutcomes.classList.add("track-outcomes");

  //   Elements within "trackOutcomes" element
  const outcomesText = document.createElement("p");
  const outcomesList = document.createElement("ul");
  const outcomesFirstItem = document.createElement("li");
  const outcomesSecondItem = document.createElement("li");
  const outcomesMainText = document.createElement("p");
  const ableToLearnText = document.createElement("span");
  const outcomesMainList = document.createElement("ul");

  outcomesText.classList.add("b-text", "mb");
  outcomesList.classList.add("track-outcomes-list");
  outcomesMainText.classList.add("b-text");
  ableToLearnText.classList.add("underline");
  outcomesSecondItem.classList.add("remove-li-style");
  outcomesMainList.classList.add("track-outcomes-main-list");

  outcomesText.textContent = "Learning Outcomes";
  outcomesMainText.textContent = "New Stuff";
  ableToLearnText.textContent = "By the end of this part, you will be able to:";

  for (let i = 0; i < 3; i++) {
    const outcomeItem = document.createElement("li");
    outcomeItem.textContent = "Lorem ipsum dolor sit amet consectetur.";
    outcomesMainList.append(outcomeItem);
  }

  outcomesFirstItem.append(outcomesMainText, ableToLearnText);
  outcomesSecondItem.append(outcomesMainList);
  outcomesList.append(outcomesFirstItem, outcomesSecondItem);
  trackOutcomes.append(outcomesText, outcomesList);

  return trackOutcomes;
};

const createTrackLabel = () => {
  const trackLabel = document.createElement("div");
  trackLabel.classList.add("track-label");

  //   Elements within "trackLabel" element
  const trackTitle = document.createElement("h2");
  const trackLevelImg = document.createElement("img");
  trackTitle.classList.add("track-title");
  trackTitle.textContent = `Upcoming New Track ${newTracksNum}`;
  trackLevelImg.src = "img/questionMark.png";
  trackLevelImg.alt = "Track Level Badge";
  trackLevelImg.style.height = "7rem";

  trackLabel.append(trackTitle, trackLevelImg);

  return trackLabel;
};

const createNewTrackLink = () => {
  const newLi = document.createElement("li");
  const newTrackLink = document.createElement("a");
  newTrackLink.classList.add("nav-link", "scroll_to");
  newTrackLink.href = `#new-track-${newTracksNum}`;
  newTrackLink.setAttribute("data-link", `new-track-${newTracksNum}`);
  newTrackLink.textContent = `New Track ${newTracksNum}`;
  newLi.append(newTrackLink);
  newTracksNum++;
  addSmoothScroll(newTrackLink);

  return newLi;
};

const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

/***********/
// Events //
/*********/

document.addEventListener("scroll", () => {
  header.classList.remove("hide-header");

  clearInterval(timeOut);
  hideHeader();

  scrollTop();
  highLight();
});

btnTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

addNewTrack.addEventListener("click", (evt) => {
  evt.preventDefault();
  console.log(featuredTracks.childElementCount);
  if (featuredTracks.childElementCount < 8) {
    const newTrack = createNewTrack();
    featuredTracks.append(newTrack);
    navList.append(createNewTrackLink());
  } else {
    openModal();
  }
});

btnCloseModal.addEventListener("click", closeModal);

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/***************/
// Executions //
/*************/

hideHeader();

for (const trackLink of trackLinks) {
  addSmoothScroll(trackLink);
}
