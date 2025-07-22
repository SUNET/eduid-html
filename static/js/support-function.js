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

document.body.addEventListener("htmx:afterSettle", function () {
  const errorDiv = document.getElementById("errors");

  if (errorDiv && errorDiv.textContent.trim().toLowerCase() === "not authorized" && !errorDiv.querySelector("p")) {
    const msg = document.createElement("p");
    msg.innerHTML =
      "It seems you don't have permission to access the support page.<br>" +
      "Please click the login button in the header to continue.";
    msg.style.marginTop = "8px";
    msg.style.fontSize = "15px";
    msg.style.fontFamily = "Inter-regular";
    msg.style.color = "#5e5e5e";
    errorDiv.appendChild(msg);
  }
});

// let draggedRow = null;

// document.querySelectorAll(".row").forEach((row) => {
//   row.addEventListener("dragstart", (e) => {
//     draggedRow = row;
//     e.dataTransfer.effectAllowed = "move";
//     e.dataTransfer.setData("text/plain", row.id);
//     row.style.opacity = "0.5";
//   });

//   row.addEventListener("dragend", () => {
//     draggedRow.style.opacity = "1";
//     draggedRow = null;
//   });

//   row.addEventListener("dragover", (e) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = "move";
//   });

//   row.addEventListener("drop", (e) => {
//     e.preventDefault();
//     if (draggedRow === row) return;

//     const container = document.querySelector(".panel-body");
//     console.log("container", container);
//     const draggedIndex = Array.from(container.children).indexOf(draggedRow);
//     const targetIndex = Array.from(container.children).indexOf(row);

//     if (draggedIndex < targetIndex) {
//       container.insertBefore(draggedRow, row.nextSibling);
//     } else {
//       container.insertBefore(draggedRow, row);
//     }
//   });
// });
