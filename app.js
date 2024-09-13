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
// Escucha los cambios en el campo de entrada (input)
/*document.getElementById('busquedad').addEventListener('input', async (event) => {
    const characterName = event.target.value.trim(); // Obtiene el valor del input y elimina espacios en blanco

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
                // Limpiamos el contenido anterior
                document.getElementById('busquedad').innerHTML = '';
                document.getElementById('contenido').innerHTML = `<nav class="nav">
                    <input id="busquedad" type="text"></nav>`;
                // Mostramos los resultados
                displayCharacterInfo(data.data.results[0]);
            } else {
                document.getElementById('busquedad').innerHTML = `<p>No se encontró el personaje "${characterName}".</p>`;
            }

        } catch (error) {
            console.error('Error en la solicitud:', error);
            document.getElementById('busquedad').innerHTML = `<p>Error al obtener la información del personaje.</p>`;
        }
    } else {
        // Limpiamos el contenido si no hay input
        document.getElementById('busquedad').innerHTML = `<p>Escribe el nombre de un personaje para buscar.</p>`;
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
                /*for (let i = 0; i < 1; i++) {
                    displayCharacterInfo(jsonInfo.data.results[i]);
                }*/
                displayCharacterInfo(jsonInfo.data.results[8]);
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
    const contenidoDiv = document.getElementById("contenido");
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
    let body = document.body.style;
    body.backgroundImage = `
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 1) 100%),
        url('${imageUrl}')`;
    body.backgroundSize = 'cover';
    body.backgroundPosition = 'center';
    contenidoDiv.innerHTML += `
        <section class="objeto objeto-a">
            <div 
                class="character-image" 
                style="background-image: url('${imageUrl}');">
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
                ${comics || '<li>No hay comics disponibles.</li>'}
            </div>
            <div class="titulo">
                Series
            </div>
            <div class="informacion">
                ${series || '<li>No hay series disponibles.</li>'}
            </div>
            <div class="titulo">
                Stories
            </div>
            <div class="informacion">
                ${stories || '<li>No hay historias disponibles.</li>'}
            </div>
            <div class="titulo">
                Events
            </div>
            <div class="informacion">
                ${events || '<li>No hay eventos disponibles.</li>'}
            </div>
            <div class="titulo">
                Más Información
            </div>
            <div class="informacion">
                ${urls || 'No hay enlaces adicionales.'}
            </div>
        </section>
    `;
}
find("spider-man");

/*

<div 
    class="character-image" 
    style="
    background-image: 
        linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 1) 100%),
        url('${imageUrl}');");">
    <div class="nombre">
        ${name}
    </div>
</div>

*/ 