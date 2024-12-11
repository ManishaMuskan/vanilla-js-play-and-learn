// document.querySelector("#searchBox").addEventListener("keyup", (e) => {
//   callFetchApiOnThrottle(e.target.value, "abc", "xyz");
// });

let counter = 0;
function fetchApi(value, param1, param2) {
  console.log(
    value,
    param1,
    param2,
    "fetching Api - " + ++counter + " times..."
  );
}

function throttle(fn, delay) {
  let delayedExpired = true;
  return function () {
    let args = arguments;
    if (delayedExpired) {
      fn.apply(this, args);
      delayedExpired = false;
      setTimeout(() => {
        delayedExpired = true;
      }, delay);
    }
  };
}

let callFetchApiOnThrottle = throttle(fetchApi, 1000);
