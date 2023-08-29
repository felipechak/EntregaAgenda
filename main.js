const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

document.addEventListener("DOMContentLoaded", ()=>{
    const nameInput = document.getElementById("nameInput")
    const cellInput = document.getElementById("cellInput")
    const submitButton = document.getElementById("submitButton")


    const convertToHTMLElement = (id,name, phone) => {
        return `
                <li class="list-group-item d-flex justify-content-between align-content-center">
                <div class="d-flex flex-row">
                    <img src="img/file-person-fill.svg" width="40" />
                    <div class="ml-2">
                        <h6 class="mb-0">${name}</h6>
                        <div class="about">
                            <span>${phone}</span>
                        </div>
                    </div>
                </div>
                <div class="check">
                <button onclick="eliminarContacto(${id})">
                  <img src="img/trash-fill.svg""/>
                </button>
                </div>
                </li>`
    }

    if (window.localStorage.getItem("lista") == null) {
        console.log('lista reiniciada')
        window.localStorage.setItem("lista",JSON.stringify([]))
    }

    const leerLista = ()=>{
        return JSON.parse(window.localStorage.getItem("lista"))
    }

    const agregarContacto = (name, phone) => {
        let lista = leerLista()
        let nuevoElemento = {
            id: generateString(5),
            nombre: name,
            telefono: phone
        }
        lista.push(nuevoElemento)
        console.log(lista)
        window.localStorage.setItem("lista",JSON.stringify(lista))
    }

    function eliminarContacto(id) {
        console.log('borro')
        const indice = leerLista().findIndex(contacto => contacto.id === id);
        if (indice !== -1) {
          window.localStorage.setItem("lista",JSON.stringify(leerLista().splice(indice, 1)));
          actualizarLista();
        }
    }

    submitButton.addEventListener("click",()=>{
        let nuevoNombre = nameInput.value
        let nuevoTelefono = cellInput.value

        agregarContacto(nuevoNombre, nuevoTelefono)

        refrescarLista()

    })

    const refrescarLista = ()=> {
        document.getElementById("contact-list").innerHTML = ""
        leerLista().forEach(c => {
            document.getElementById("contact-list").innerHTML += convertToHTMLElement(c.id,c.nombre,c.telefono)
        });
    }

    refrescarLista()
})


