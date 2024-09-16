// API Key and Configuration
const publicKey = 'dbff292637eb09e8a0fb40675ab4fd80';
const privateKey = '00c8bd2647392ea8fa16584bcd8f4016123cd4a0';
const ts = new Date().getTime();
const baseUrl = 'https://gateway.marvel.com/v1/public/characters';

// Generate MD5 hash using CryptoJS
const generateHash = () => {
    return CryptoJS.MD5(ts + privateKey + publicKey).toString();
};

// Fetch character information based on character name
const findCharacter = async (characterName) => {
    if (characterName) {
        const hash = generateHash();
        const url = `${baseUrl}?nameStartsWith=${characterName}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        try {
            const response = await fetch(url);
            const jsonData = await response.json();
            console.log(jsonData.data);

            if (jsonData && jsonData.data && jsonData.data.results && jsonData.data.results.length > 0) {
                jsonData.data.results.forEach(character => {
                    displayCharacterInfo(character);
                });
            } else {
                console.error(`Character "${characterName}" not found.`);
                document.getElementById('body-container').innerHTML = `<p>Character "${characterName}" not found.</p>`;
            }
        } catch (error) {
            console.error('Request error:', error);
            document.getElementById('body-container').innerHTML = `<p>Error retrieving character information.</p>`;
        }
    }
};

// Display character information on the webpage
function displayCharacterInfo(character) {
    const contentDiv = document.getElementById("body-container");
    const imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    const name = character.name;
    const description = character.description || 'No description available for this character.';
    const modified = character.modified || 'No modification date available.';
    
    let index = 1;
    const comics = character.comics.items.map(item => 
        `<div class="list-item">
            <div class="number">${index++}</div>
            <div class="text">${item.name}</div>
        </div>`
    ).join('');

    index = 1;
    const series = character.series.items.map(item => 
        `<div class="list-item">
            <div class="number">${index++}</div>
            <div class="text">${item.name}</div>
        </div>`
    ).join('');

    index = 1;
    const stories = character.stories.items.map(item => 
        `<div class="list-item">
            <div class="number">${index++}</div>
            <div class="text">${item.name}</div>
        </div>`
    ).join('');

    index = 1;
    const events = character.events.items.map(item => 
        `<div class="list-item">
            <div class="number">${index++}</div>
            <div class="text">${item.name}</div>
        </div>`
    ).join('');

    const urls = character.urls.map(url => 
        `<a href="${url.url}" target="_blank">${url.type}</a>`
    ).join('<br>');

    contentDiv.innerHTML += `
        <section id="background" class="background" style="
            background-image: url('${imageUrl}');
            background-size: cover;
            background-position: center;
            "
        >
            <section id="content" class="content">
                <section class="item item-a">
                    <div class="character-image" style="
                        background-image: url('${imageUrl}');
                    "></div>
                    <div class="name">
                        ${name}
                    </div>
                    <div class="description">
                        ${description}
                    </div>
                </section>
                <section class="item item-b">
                    <div class="title">Comics</div>
                    <div class="information">
                        ${comics || '<div class="no-info">No comics available.</div>'}
                    </div>
                    <div class="title">Series</div>
                    <div class="information">
                        ${series || '<div class="no-info">No series available.</div>'}
                    </div>
                    <div class="title">Stories</div>
                    <div class="information">
                        ${stories || '<div class="no-info">No stories available.</div>'}
                    </div>
                    <div class="title">Events</div>
                    <div class="information">
                        ${events || '<div class="no-info">No events available.</div>'}
                    </div>
                    <div class="date">
                        Last modified: ${modified}
                    </div>
                </section>
            </section>
        </section>
    `;
}
// Fetch characters starting with letters 'a' to 'z'
/*for (let i = 0; i < 26; i++) {
    findCharacter(String.fromCharCode(97 + i));
}*/

findCharacter("doctor");