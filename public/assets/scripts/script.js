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
btnOpenEmojis.addEventListener('click', () => {
    emojisContainer.classList.add('_expanded')
})

// Close emojis

btnCloseEmojis.addEventListener("click", () => {
    emojisContainer.classList.remove("_expanded");
});

main();