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
  let loginURL;
  if (location.hostname.includes("dev")) {
    loginURL = "https://dev.eduid.se/";
  } else if (location.hostname.includes("docker")) {
    loginURL = "https://html.eduid.docker/";
  } else loginURL = "https://eduid.se/";
  if (errorDiv && errorDiv.textContent.trim().toLowerCase() === "not authorized" && !errorDiv.querySelector("p")) {
    const style = document.createElement("style");
    style.innerHTML = `
    div.errors {
      font-family: "Inter-semibold", Arial, Helvetica, sans-serif;
      position: relative;
      color: #161616;
      border-radius: 4px;
      text-align: center;
      line-height: 1.5;
      margin-top: 17rem;
      font-size: 1.5rem;
    }
    div.errors::before {
      content: "";
      position: absolute;
      top: 9px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 100px;
      border: 8px solid #161616;
      border-radius: 50%;
      margin-top: -9rem;
    }
    div.errors::after {
      content: "";
      position: absolute;
      top: 11px;
      left: 50%;
      transform: translate(-50%, 0) rotate(-45deg);
      width: 9px;
      height: 105px;
      background-color: #161616;
      margin-top: -9rem;
    }
  `;
    const msg = document.createElement("p");
    msg.innerHTML =
      "It seems you don't have permission to access the support page.<br>" +
      `Please <a href="${loginURL}">log in</a> first, then try again.`;
    msg.style.marginTop = "8px";
    msg.style.fontSize = "15px";
    msg.style.fontFamily = "Inter-regular";
    msg.style.color = "#5e5e5e";
    errorDiv.appendChild(style);
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
