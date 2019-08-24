var menu = document.getElementById("menu");
var nav = document.getElementById("nav");
var exit = document.getElementById("exit");
menu.addEventListener("click", e => {
  nav.classList.toggle("hide-mobile");
  e.preventDefault();
});
exit.addEventListener("click", e => {
  nav.classList.toggle("hide-mobile");
  e.preventDefault();
});
function blog(i) {
  window.location = "/blog?id=" + i;
}

function comment(pid) {
  console.log("Inside comment function");
  let commentdata = {
    pid,
    value: document.getElementById("comment").value
  };
  console.log(commentdata);

  fetch("/comment", {
    method: "POST",
    body: JSON.stringify(commentdata),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(async res => {
    const response = await res.json();
    console.log("New Comment :", response);
    let div = document.createElement("div");
    let strong = document.createElement("strong");
    let span = document.createElement("span");
    let commentuser = document.createTextNode(response.name);
    let commentbody = document.createTextNode(" : " + response.comment);
    strong.appendChild(commentuser);
    span.appendChild(commentbody);
    div.appendChild(strong);
    div.appendChild(span);
    document.getElementById("comment-section").appendChild(div);
    document.getElementById("comment").value = "";
  });
}
