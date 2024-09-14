const publicKey = 'dbff292637eb09e8a0fb40675ab4fd80'; // Reemplaza con tu clave pública de Marvel
const privateKey = '00c8bd2647392ea8fa16584bcd8f4016123cd4a0'; // Reemplaza con tu clave privada
const ts = new Date().getTime();
const baseUrl = 'https://gateway.marvel.com/v1/public/characters';
// Generar el hash MD5 usando CryptoJS
const generateHash = () => {
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    return hash;
};



// Función para buscar la información del personaje usando async/await
/*document.getElementById('search-btn').addEventListener('click', async () => {
    //const characterName = document.getElementById('character-name').value;
    
    if (characterName) {
        const hash = generateHash();
        const url = `${baseUrl}?nameStartsWith=${characterName}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

        try {
            // Hacemos la petición con await para esperar la respuesta
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            // Verificamos si hay resultados
            if (data && data.data && data.data.results && data.data.results.length > 0) {
                for (let i = 0; i < data.data.results.length; i++) {
                    displayCharacterInfo(data.data.results[i]);
                }
            } else {
                document.getElementById('character-info').innerHTML = `<p>No se encontró el personaje "${characterName}".</p>`;
            }

        } catch (error) {
            console.error('Error en la solicitud:', error);
            document.getElementById('character-info').innerHTML = `<p>Error al obtener la información del personaje.</p>`;
        }
    }
});*/



const find  = async characterName => {
    if (characterName) {
        const hash = generateHash();
        const url = `${baseUrl}?nameStartsWith=${characterName}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        try {
            const response = await fetch(url);
            const jsonInfo = await response.json();
            console.log(jsonInfo.data);
            if (jsonInfo && jsonInfo.data && jsonInfo.data.results && jsonInfo.data.results.length > 0) {
                for (let i = 0; i < jsonInfo.data.results.length; i++) {
                    displayCharacterInfo(jsonInfo.data.results[i]);
                }
                //displayCharacterInfo(jsonInfo.data.results[0]);
            } else {
                document.getElementsByClassName('contenido').innerHTML = `<p>No se encontró el personaje "${characterName}".</p>`;
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            document.getElementsByClassName('contenido').innerHTML = `<p>Error al obtener la información del personaje.</p>`;
        };
    };
};
function displayCharacterInfo(character) {
    const contenidoDiv = document.getElementById("cuerpo");
    const imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;
    const name = character.name;
    const description = character.description || 'No hay descripción disponible para este personaje.';
    let i = 1; 
    const comics = character.comics.items.map(item => 
        `<div class="lista">
            <div class="numeral">${i++}</div>
            <div class="texto">${item.name}</div>
        </div>`
    ).join('');
    i = 1;
    const series = character.series.items.map(item => 
        `<div class="lista">
            <div class="numeral">${i++}</div>
            <div class="texto">${item.name}</div>
        </div>`
    ).join('');
    i = 1;
    const stories = character.stories.items.map(item => 
        `<div class="lista">
            <div class="numeral">${i++}</div>
            <div class="texto">${item.name}</div>
        </div>`
    ).join('');
    i = 1;
    const events = character.events.items.map(item => 
        `<div class="lista">
            <div class="numeral">${i++}</div>
            <div class="texto">${item.name}</div>
        </div>`
    ).join('');
    const urls = character.urls.map(url => 
        `<a href="${url.url}" target="_blank">${url.type}</a>`
    ).join('<br>');
    contenidoDiv.innerHTML += `
        <section id="fondo" class="fondo" style="
            background-image: url('${imageUrl}');
            background-size: cover;
            background-position: center;
            "
        >
            <section id="contenido" class="contenido">
                <section class="objeto objeto-a">
                    <div 
                        class="character-image" 
                        style="
                        background-image: 
                            
                            url('${imageUrl}');">
                    </div>
                    <div class="nombre">
                            ${name}
                    </div>
                    <div class="descripcion">
                        ${description}
                    </div>
                </section>
                <section class="objeto objeto-b">
                    <div class="titulo">
                        Comics
                    </div>
                    <div class="informacion">
                        ${comics || '<div>No hay comics disponibles.</div>'}
                    </div>
                    <div class="titulo">
                        Series
                    </div>
                    <div class="informacion">
                        ${series || '<div>No hay series disponibles.</div>'}
                    </div>
                    <div class="titulo">
                        Stories
                    </div>
                    <div class="informacion">
                        ${stories || '<div>No hay historias disponibles.</div>'}
                    </div>
                    <div class="titulo">
                        Events
                    </div>
                    <div class="informacion">
                        ${events || '<div class="e">No hay eventos disponibles.</div>'}
                    </div>
                </section>
            </section>
        </section>
    `;
}
/*for (let i = 0; i < 26; i++) {
    find(String.fromCharCode(97 + i));
}*/
find('spider-man');