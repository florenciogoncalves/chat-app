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
        const fatherContainer = document.getElementById(fatherId)
        const emojis = await this.getAllEmojis

        const emojiGroupFilter = groups => {
            return emojis.filter(emoji => {
                return groups.includes(emoji.group)
            }
            )
        }

        const emojiGroups = [
            {
                title: 'Smileys e pessoas',
                headers: ['smileys-emotion', 'people-body'],
                emojis: emojiGroupFilter(['smileys-emotion', 'people-body'])
            },
            {
                title: 'Animais e natureza',
                headers: ['animals-nature'],
                emojis: emojiGroupFilter(['animals-nature'])
            },
            {
                title: 'Comidas e bebidas',
                headers: ['food-drink'],
                emojis: emojiGroupFilter(['food-drink'])
            },
            {
                title: 'Actividades',
                headers: ['activities'],
                emojis: emojiGroupFilter(['activities'])
            },
            {
                title: 'Viagens e locais',
                headers: ['travel-places'],
                emojis: emojiGroupFilter(['travel-places'])
            },
            {
                title: 'Objectos',
                headers: ['objects'],
                emojis: emojiGroupFilter(['objects'])
            },
            {
                title: 'Símbolos',
                headers: ['symbols'],
                emojis: emojiGroupFilter(['symbols'])
            },
            {
                title: 'Bandeiras',
                headers: ['flags'],
                emojis: emojiGroupFilter(['flags'])
            },
        ]

        emojiGroups.forEach((group, idx) => {
            const container = document.createElement('div')
            container.id = 'group-' + idx
            container.classList.add('emojis-subgroup', 'd-grid')

            const title = document.createElement('p')
            title.textContent = group.title
            title.classList.add('emoji-subgroup--title', 'mb-2')
            container.appendChild(title)

            const container_emojis = document.createElement('div')
            container_emojis.classList.add('emoji-subgroup--container', 'gap-2', 'overflow-hidden', 'col-12', 'mb-4')
            group.emojis.forEach(emoji => {
                const child = document.createElement('button')
                child.classList.add('btn', 'fs-4', 'set-emoji', 'p-0', 'd-flex', 'align-items-center', 'justify-content-center', 'emoji-group--' + emoji.group)
                child.textContent = emoji.character
                container_emojis.appendChild(child)
            })
            container.appendChild(container_emojis)
            fatherContainer.appendChild(container)

        })
    }

    getEmoji(evt) {
        const input = document.getElementById(this.messageInput)

        input.value += evt.target.textContent
    }
}
