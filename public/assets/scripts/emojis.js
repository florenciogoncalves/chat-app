export default class Emojis {
    constructor(container, messageInput) {
        this.EMOJI_API_URL = 'https://emoji-api.com/emojis?access_key='
        this.EMOJI_API_KEY = 'bf915d556c7b290f9d8f0a3f08e46c1a242dcb0f'
        this.container = container
        this.messageInput = messageInput
    }

    get getAllEmojis() {
        const EMOJI_API_KEY = this.EMOJI_API_KEY
        const EMOJI_API_URL = this.EMOJI_API_URL

        async function main() {
            let allEmojis = null

            await fetch(`${EMOJI_API_URL}${EMOJI_API_KEY}`)
                .then(result => result.json())
                .then(emojis => allEmojis = emojis)

            return allEmojis
        }

        return main()
    }

    async insertAllEmojisInto(fatherId = this.container) {
        const container = document.getElementById(fatherId)
        const emojis = await this.getAllEmojis

        await emojis.forEach(emoji => {
            const child = document.createElement('button')
            child.classList.add('btn', 'fs-3', 'set-emoji', 'p-0', 'd-flex', 'align-items-center', 'justify-content-center')
            child.textContent = emoji.character
            container.appendChild(child)
        })
    }

    getEmoji(evt) {
        const input = document.getElementById(this.messageInput)

        input.value += evt.target.textContent
    }
}
