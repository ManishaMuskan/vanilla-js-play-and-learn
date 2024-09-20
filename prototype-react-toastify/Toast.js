const DEFAULT_OPTIONS = {
  position: "top-right",
  autoClose: 10000, // Auto-close after 10 seconds by default
  onClose: () => {}, // Default onClose callback
  canClose: true, // User can close the toast manually
  showProgressBar: true, // Show the progress bar by default
  pauseOnHover: true, // Pause progress bar when hovered by default
};

class Toast {
  // NOTE: Private class variables: They are accessed only within this class
  #toastElement;
  #removeBinderFn;
  #autoCloseTimeInMs;
  #autoCloseToastTimeout;
  // #startTime;
  #lastTimeBeforePauseStarted;
  #elapsedTime;
  // #progressRemainingPercent;
  #updateProgressInterval;
  #isHovered;
  // #pausedTime = 0;

  // NOTE: 'this' refers to to the Toast object created by new keyword
  // constructor(position, text, autoClose) {
  /**
   * Constructor method initializes a new Toast instance.
   * - Sets default or passed options and appends the toast element to DOM.
   * - Shows the toast with animation using requestAnimationFrame().
   */
  constructor(options) {
    this.#toastElement = document.createElement("div");
    this.#toastElement.classList.add("toast");

    // Binding 'this' to the remove method to ensure the correct context when used in events.
    this.#removeBinderFn = this.remove.bind(this);

    //#region INITIAL APPROACH - OPTIMIZED LATER
    // ------ 1st approach: Direct assignment in constructor (example from the earlier code) ---
    // this.position = position;
    // this.text = text;
    // this.autoClose = autoClose;

    // ------ 2nd approach: to avoid re-writing similar codes ---------
    // Object.entries({ ...DEFAULT_OPTIONS, ...options }).forEach(
    //   ([key, value]) => (this[key] = value)
    // );
    //#endregion

    // ------- 3rd approach: to avoid duplicate codes. More generic way to handle all options (default + passed ones)------
    this.update({ ...DEFAULT_OPTIONS, ...options });

    // Animation: To ensure the toast appears smoothly,
    // we use requestAnimationFrame to add the 'show' class after the element is appended.
    requestAnimationFrame(() => {
      this.#toastElement.classList.add("show");
    });
  }

  //#region MY NOTES ABOUT SETTER FUNCTION
  // ---- set property() ----
  // assume this as a function which will be executed and return once position is passed from the toast class object created by new keyword
  // cORRECTED_ai_EXPLANATION-The setter behaves like a function that runs whenever you assign a value to this.position. However, it's not automatically called when the object is created with new. It's only executed when you explicitly assign a value to this.position, either in the constructor or later.

  // Please note it will not exactly set up this.position = value, instead it will take the position value passed from class object(eg: new Toast('some-position', 'some-text')) and then execute this position function with value as arg and do whatever is written inside.
  // cORRECTED_ai_EXPLANATION-The setter doesn't directly assign this.position = value. Instead, it runs the custom logic you define inside the setter (in this case, placing the toast in the correct container). When you assign a value to this.position, it invokes the setter function and runs the logic written inside. So, new Toast('some-position') will set this.position = 'some-position', triggering the setter.

  // also, note initialization (this.position = position) is mandatory in constructors to use this setter function
  // cORRECTED_ai_EXPLANATION-It’s not mandatory to explicitly initialize properties in the constructor for the setter to work. The setter is triggered whenever this.position is assigned, whether inside the constructor or later through any method. However, if you want the setter to run during object creation, you should assign this.position in the constructor.

  // after initialization in constructor, all the setter functions will run for the properties which are initialized during the object creation using new keyword, if not initialized, setter fn will not run
  // cORRECTED_ai_EXPLANATION-he setter will only run when the property is explicitly assigned (e.g., this.position = 'some-position'). If you do not initialize it in the constructor or elsewhere, the setter will not run automatically just because the object is created. The setter needs an assignment to be triggered.

  // whenever this.position is assigned, this setter will run; like during update
  // cORRECTED_ai_EXPLANATION-Whenever you assign a value to this.position, whether in the constructor or any method (like update), the setter will be invoked, executing whatever logic is defined inside.
  //#endregion

  /**
   * A setter for the `position` property.
   * This method ensures the toast is placed in the correct container according to its position.
   */
  set position(value) {
    // Get the current container for the toast element.
    const currentContainer = this.#toastElement.parentElement;

    // Create or select the toast container based on the position value.
    const selector = `div.toast-container[data-position="${value}"]`;
    const toastContainer =
      document.querySelector(selector) || createContainer(value);

    // Append the toast to the selected container.
    toastContainer.append(this.#toastElement);

    // During updating position, check if the current container becomes empty (no child nodes), remove it.
    if (currentContainer !== null && !currentContainer.hasChildNodes()) {
      currentContainer.remove();
    }
  }

  /**
   * A setter for the `text` property.
   * It simply sets the inner text of the toast element.
   */
  set text(value) {
    this.#toastElement.textContent = value;
  }

  //#region THIS WORKS ALONG WITH FIRST AND SECOND APPROACH OF set showProgressBar
  // set autoClose(autoCloseTimingInMs) {
  //   if (autoCloseTimingInMs === false) {
  //     this.showProgressBar = false;
  //     return;
  //   }
  //   this.#autoCloseTimeInMs = autoCloseTimingInMs;

  //   const removeToast = () => {
  //     this.#autoCloseToastTimeout = requestAnimationFrame(removeToast);
  //     if (this.#elapsedTime >= autoCloseTimingInMs) {
  //       this.remove();
  //     }
  //   };

  //   this.autoCloseToastInterval = requestAnimationFrame(removeToast);
  // }
  //#endregion

  /**
   * A setter for `autoClose` property.
   * This handles the logic of automatically closing the toast after a certain time.
   * Uses requestAnimationFrame to calculate elapsed time and close the toast.
   */
  set autoClose(autoCloseTimingInMs) {
    if (autoCloseTimingInMs === false) {
      this.showProgressBar = false;
      return;
    }
    this.#autoCloseTimeInMs = autoCloseTimingInMs;
    this.#elapsedTime = 0;

    const removeToast = (currentTime) => {
      if (!this.#lastTimeBeforePauseStarted) {
        this.#lastTimeBeforePauseStarted = currentTime;
      }

      if (!this.#isHovered) {
        this.#elapsedTime += currentTime - this.#lastTimeBeforePauseStarted;
      }

      if (this.#elapsedTime >= autoCloseTimingInMs) {
        this.remove();
        return;
      }

      this.#autoCloseToastTimeout = requestAnimationFrame(removeToast);
      this.#lastTimeBeforePauseStarted = currentTime;
    };

    this.autoCloseToastInterval = requestAnimationFrame(removeToast);
  }

  /**
   * A setter for `canClose` property.
   * If set to true, the toast can be clicked to close it.
   */
  set canClose(value) {
    this.#toastElement.classList.toggle("can-close", value);
    if (value) {
      // this.#toastElement.addEventListener("click", this.remove.bind(this));
      // this.#toastElement.addEventListener("click", () => this.remove());
      this.#toastElement.addEventListener("click", this.#removeBinderFn);
    } else {
      this.#toastElement.removeEventListener("click", this.#removeBinderFn);
    }
  }

  // #region set showProgressBar - WORKING CODE - FIRST APPROACH
  // set showProgressBar(value) {
  //   // toggle 'show-progress' class based upon value
  //   this.#toastElement.classList.toggle("show-progress", value);

  //   let totalPercent = 100;
  //   this.#toastElement.style.setProperty(
  //     "--remaining-progress",
  //     `${totalPercent}%`
  //   );

  //   const updateProgressBeforeNextRepaint = (currentTime) => {
  //     if (!this.#startTime) {
  //       this.#startTime = currentTime; // Set start time on the first frame
  //     }

  //     if (this.#isHovered) {
  //       this.#pausedTime += currentTime - this.#lastTimeBeforePauseStarted;
  //     } else {
  //       this.#elapsedTime = currentTime - this.#startTime - this.#pausedTime;
  //       this.#progressRemainingPercent =
  //         totalPercent - (this.#elapsedTime / this.#autoCloseTimeInMs) * 100;

  //       this.#toastElement.style.setProperty(
  //         "--remaining-progress",
  //         `${this.#progressRemainingPercent}%`
  //       );
  //     }
  //     this.#lastTimeBeforePauseStarted = currentTime;

  //     if (this.#progressRemainingPercent > 0) {
  //       this.#updateProgressInterval = requestAnimationFrame(
  //         updateProgressBeforeNextRepaint
  //       );
  //     }
  //   };

  //   this.#updateProgressInterval = requestAnimationFrame(
  //     updateProgressBeforeNextRepaint
  //   );
  // }
  //#endregion

  //#region SECOND APPROACH - also, working, but if showProgressBar=false, elapsed time will never be calculated and hence will never be auto closed. So modify the logic a bit and doing the calculation in autoClose fn
  // set showProgressBar(value) {
  //   if (value) {
  //     // toggle 'show-progress' class based upon value
  //     this.#toastElement.classList.toggle("show-progress", value);

  //     let totalPercent = 100;
  //     this.#toastElement.style.setProperty(
  //       "--remaining-progress",
  //       `${totalPercent}%`
  //     );

  //     this.#elapsedTime = 0;

  //     const updateProgress = (currentTime) => {
  //       if (!this.#lastTimeBeforePauseStarted) {
  //         this.#lastTimeBeforePauseStarted = currentTime;
  //       }

  //       if (!this.#isHovered) {
  //         this.#elapsedTime += currentTime - this.#lastTimeBeforePauseStarted;
  //         this.#progressRemainingPercent =
  //           totalPercent - (this.#elapsedTime / this.#autoCloseTimeInMs) * 100;

  //         this.#toastElement.style.setProperty(
  //           "--remaining-progress",
  //           `${this.#progressRemainingPercent}%`
  //         );
  //       }

  //       this.#lastTimeBeforePauseStarted = currentTime;
  //       this.#updateProgressInterval = requestAnimationFrame(updateProgress);
  //     };

  //     this.#updateProgressInterval = requestAnimationFrame(updateProgress);
  //   }
  // }
  // #endregion

  /**
   * A setter for `showProgressBar` property.
   * This handles the display and updating of the progress bar using requestAnimationFrame.
   */
  set showProgressBar(value) {
    if (value) {
      // toggle 'show-progress' class based upon value
      this.#toastElement.classList.toggle("show-progress", value);

      // initialize progress
      let totalPercent = 100;
      this.#toastElement.style.setProperty(
        "--remaining-progress",
        `${totalPercent}%`
      );

      const updateProgress = () => {
        //
        if (!this.#isHovered) {
          let progressRemainingPercent =
            totalPercent - (this.#elapsedTime / this.#autoCloseTimeInMs) * 100;

          this.#toastElement.style.setProperty(
            "--remaining-progress",
            `${progressRemainingPercent}%`
          );

          if (progressRemainingPercent < 0) {
            return;
          }
        }

        this.#updateProgressInterval = requestAnimationFrame(updateProgress);
      };

      this.#updateProgressInterval = requestAnimationFrame(updateProgress);
    }
  }

  /**
   * A setter for `pauseOnHover` property.
   * When hovering over the toast, it pauses the auto-close countdown and progress bar.
   */
  set pauseOnHover(value) {
    if (value) {
      // Pause the toast progress when hovered.
      this.#toastElement.addEventListener("mouseover", () => {
        this.#isHovered = true;
      });

      // Resume toast progress when the mouse leaves.
      this.#toastElement.addEventListener("mouseleave", () => {
        this.#isHovered = false;
      });
    } else {
      // Remove hover event listeners if pauseOnHover is disabled.
      this.#toastElement.removeEventListener("mouseover");
      this.#toastElement.removeEventListener("mouseleave");
    }
  }

  // these are the methods which can be called upon the Toast object

  /**
   * Removes the toast and performs cleanup like stopping intervals and removing the element from DOM.
   */
  remove() {
    const container = this.#toastElement.parentElement;

    // perform animation in reverse when elem removed
    this.#toastElement.classList.remove("show");
    // wait until transition ends and then remove element
    this.#toastElement.addEventListener("transitionend", () => {
      this.#toastElement.remove();

      // Clean up timeouts and intervals.
      cancelAnimationFrame(this.#autoCloseToastTimeout);
      cancelAnimationFrame(this.#updateProgressInterval);
      // clearInterval(this.#updateProgressBeforeNextRepaint);

      // remove container if no element is there
      if (container && !container.hasChildNodes()) {
        container.remove();
      }
    });
    this.onClose();
  }

  // it's the same thing we are doing during Obj initialization, so to avoid code duplicates, use this fn  to override - 1. the default options and initialize with new options' values during constructor initialization and 2. old options during update here

  /**
   * Update the toast options during its lifetime.
   */
  update(options) {
    Object.entries(options).forEach(([key, value]) => (this[key] = value));
  }

  // -----------My version------------
  // set showProgressBar(value) {
  //   this.#toastElement.classList.toggle("show-progress", value);

  //   if (value) {
  //     let visibleProgress = 100;
  //     let interval = 10;
  //     let totalStepsToReach100Percent = this.#autoCloseTimeInMs / interval;
  //     let decreasingProgressEachInterval = 100 / totalStepsToReach100Percent;

  //     this.#toastElement.style.setProperty("--progress", `${visibleProgress}%`);
  //     let setProgressInInterval;
  //     setProgressInInterval = setInterval(() => {
  //       visibleProgress -= decreasingProgressEachInterval;

  //       this.#toastElement.style.setProperty(
  //         "--progress",
  //         `${visibleProgress}%`
  //       );

  //       if (visibleProgress <= 0) {
  //         clearInterval(setProgressInInterval);
  //       }
  //     }, interval);
  //   }
  // }
}

/**
 * Helper function to create the container for the toast in the DOM.
 * This container holds all toasts in a specific position.
 */
function createContainer(value) {
  const toastContainer = document.createElement("div");
  toastContainer.classList.add("toast-container");
  toastContainer.dataset.position = value;
  document.body.append(toastContainer);

  return toastContainer;
}

export default Toast;
