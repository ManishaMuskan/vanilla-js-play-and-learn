document.querySelector("#searchBox").addEventListener("keyup", (e) => {
  // console.log(e.target.value);
  callFetchApiWithDebounce(e.target.value, "arg1", "arg2");
});

let counter = 0;
function fetchApi(value, param1, param2) {
  console.log("fetching api - " + ++counter + " times...");
  console.log(value, param1, param2);
}

function debounce(fn, delay) {
  let timer;
  return function () {
    let context = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

let callFetchApiWithDebounce = debounce(fetchApi, 300);
