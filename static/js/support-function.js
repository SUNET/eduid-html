document.addEventListener("htmx:afterSwap", function () {
  let input = document.querySelector(".search-input-wrapper input");
  let button = document.getElementById("search-button");
  button.disabled = true;
  if (input !== null && button !== null) {
    input.addEventListener("input", function () {
      if (input.value.trim() !== "") {
        button.disabled = false;
      } else button.disabled = true;
    });
  }
});
