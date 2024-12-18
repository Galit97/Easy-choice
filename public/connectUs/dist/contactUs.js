function initContactUs() {
    var container = document.querySelector("#contactUsPopup");
    if (!container)
        return false;
    container.innerHTML = "";
    if (container) {
        container.innerHTML += render();
    }
    else {
        console.error("Target container not found!");
    }
}
function render() {
    return "\n      <div id=\"contactModal\" class=\"modal\">\n  <div class=\"modal-content\">\n    <span class=\"close\" onclick=\"closeContactForm()\">&times;</span>\n    <h2>Connect US</h2>\n    <form id=\"contactForm\" onsubmit=\"handleFormConnectUs(event)\">\n      <label for=\"name\">Full Name</label><br>\n      <input type=\"text\" id=\"name\" name=\"name\" required><br><br>\n      <label for=\"email\">Email</label><br>\n      <input type=\"email\" id=\"email\" name=\"email\" required><br><br>\n      <label for=\"message\">Message</label><br>\n      <textarea id=\"message\" name=\"message\" rows=\"4\" required></textarea><br><br>\n      <input type=\"submit\" id=\"sendButton\" value=\"Send\">\n    </form>\n  </div>\n</div>\n  ";
}
function ContactUsPopup() {
    initContactUs();
    document.getElementById("ContactModel").style.display = "block";
}
function closeContactForm() {
    document.getElementById("contactModel").style.display = "none";
}
window.onclick = function (event) {
    if (event.target == document.getElementById("contactModel")) {
        closeContactForm();
    }
};
function handleFormContactUs(event) {
    try {
        event.preventDefault();
        alert("ההודעה לא נשלחה לאף מקום");
        alert("בהמשך אני ינסה לשלוח את הודעה למייל אמיתי");
    }
    catch (error) {
        console.error(error);
        alert("error on submit function");
    }
}
