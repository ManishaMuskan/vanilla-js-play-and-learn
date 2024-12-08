var concept = "bubbling";
// Store references to active listeners
const activeListeners = {};

attachClickEventHandler();

// Event-Delegation to handle button clicks
document.querySelector(".flexBtnGroup").addEventListener("click", (e) => {
  if (e.target.dataset.concept) {
    concept = e.target.dataset.concept;
    attachClickEventHandler();
  }
});

// Wrapper for event listener function to maintain reference
function createEventListener(message) {
  return () => console.log(message);
}

function attachClickEventHandler() {
  const elemArray = [
    {
      elemId: "grandParent",
      message: "grandParent clicked!",
      useCaptureFlag: true,
    },
    { elemId: "parent", message: "parent clicked!", useCaptureFlag: false },
    { elemId: "child", message: "child clicked!", useCaptureFlag: true },
  ];

  elemArray.forEach(({ elemId, message, useCaptureFlag }) => {
    const elem = document.getElementById(elemId);

    // Remove previous event listener if it exists
    if (activeListeners[elemId]) {
      const { handlerFn, useCaptureFlag: oldFlag } = activeListeners[elemId];
      elem.removeEventListener("click", handlerFn, oldFlag);
    }

    // Determine the appropriate useCaptureFlag based on the selected concept
    let flag;
    if (concept === "bubbling") flag = false;
    else if (concept === "capturing") flag = true;
    else if (concept === "mixed") flag = useCaptureFlag;

    // Create a new event listener and attach it
    const handlerFn = createEventListener(message);
    elem.addEventListener("click", handlerFn, flag);

    // Store the reference of the newly added listener
    activeListeners[elemId] = { handlerFn, useCaptureFlag: flag };
  });
}
