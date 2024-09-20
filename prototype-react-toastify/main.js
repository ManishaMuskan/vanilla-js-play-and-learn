import Toast from "./Toast.js";

const toast1 = new Toast({
  text: "Hello World",
  position: "top-right",
  canClose: true,
  autoClose: 10000,
});

// const toast2 = new Toast({
//   position: "top-right",
//   text: "Hello, I will be off after 3 secs",
//   autoClose: 3000,
// });

// const toast3 = new Toast({
//   position: "top-right",
//   text: "Remove me explicitly",
//   autoClose: false,
// });

// const toast4 = new Toast({
//   text: "Let's try default options",
// });

// setTimeout(() => {
//   console.log(toast1);
//   toast1.update({
//     text: 'changing text from "hello world" to bye!',
//     position: "bottom-right",
//   });
//   console.log(toast1);
// }, 2000);

document
  .querySelector('button[type="button"]')
  .addEventListener("click", function () {
    console.log("here");
    console.log("toast1", toast1);
    if (toast1) {
      toast1.remove();
    }
  });

document.querySelector(".show-toasts").addEventListener("click", function () {
  new Toast({ text: "Test Toast", position: "top-right" });
});
