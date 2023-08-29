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
                        <button class="delete-button">
                          <img src="img/trash-fill.svg""/>
                        </button>
                        <button class="edit-menu" type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">
                          <img src="https://icons.getbootstrap.com/assets/icons/pencil-fill.svg"/>
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
        refrescarLista()
    }
    const actualizarContacto = (id,nuevoNumero) => {
        let lista = leerLista()
        for (let i = 0; i < lista.length; i++) {
            if(lista[i].id == id){
                lista[i].telefono = nuevoNumero;
                break;
            }
        }
        window.localStorage.setItem("lista",JSON.stringify(lista))
        refrescarLista()
    }
    function eliminarContacto(id) {
        console.log('borro')
        const nuevaLista = leerLista().filter(contacto => contacto.id != id);
        window.localStorage.setItem("lista",JSON.stringify(nuevaLista));
        refrescarLista()
    }

    submitButton.addEventListener("click",()=>{
        let nuevoNombre = nameInput.value
        let nuevoTelefono = cellInput.value

        agregarContacto(nuevoNombre, nuevoTelefono)
    })

    const refrescarLista = ()=> {
        document.getElementById("contact-list").innerHTML = ""
        leerLista().forEach(c => {
            let newContactElem = document.createElement("div")
            newContactElem.innerHTML = convertToHTMLElement(c.id,c.nombre,c.telefono)
            newContactElem = newContactElem.firstElementChild
            //console.log(newContactElem.firstElementChild)
            newContactElem.getElementsByClassName("delete-button")[0].addEventListener("click",()=>{
                eliminarContacto(c.id)
            })
            newContactElem.getElementsByClassName("edit-menu")[0].addEventListener("click",()=>{
                modalDOM = document.getElementById("myModal")
                modalDOM.getElementsByTagName("h6")[0].innerHTML = `Ingresa nuevo numero para <strong>${c.nombre}</strong>:`
                modalDOM.getElementsByTagName("input")[0].value = c.telefono
                //console.log(modalDOM.getElementsByClassName("edit-button")[0])
                modalDOM.getElementsByClassName("edit-button")[0].addEventListener("click", ()=>{
                    actualizarContacto(c.id, modalDOM.getElementsByTagName("input")[0].value)
                })
            })
            document.getElementById("contact-list").appendChild(newContactElem)
        });
    }

    refrescarLista()
})


