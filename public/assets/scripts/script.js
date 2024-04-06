import Emojis from "./emojis.js";

const emojis = new Emojis("emojis-container", "message-input");

// Insert emojis
async function main() {
    await emojis.insertAllEmojisInto();
    document.querySelectorAll(".set-emoji").forEach((btn) => {
        btn.addEventListener("click", (evt) => emojis.getEmoji(evt));
    });
}

const btnOpenEmojis = document.getElementById("open-emojis");
const btnCloseEmojis = document.getElementById("close-emojis");
const emojisContainer = document.getElementById("emojis--container");

// Open emojis
function openEmojis() {
    emojisContainer.classList.add('_expanded')
    btnOpenEmojis.classList.add('text-success')
    btnCloseEmojis.classList.remove('d-none')
}
btnOpenEmojis.addEventListener('click', openEmojis)

// Close emojis
function closeEmojis() {
    emojisContainer.classList.remove("_expanded");
    btnOpenEmojis.classList.remove('text-success')
    btnCloseEmojis.classList.add('d-none')
}
btnCloseEmojis.addEventListener("click", closeEmojis);

main();