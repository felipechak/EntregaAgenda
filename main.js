const nameInput = document.getElementById("nameInput")
const cellInput = document.getElementById("cellInput")
const submitButton = document.getElementById("submitButton")


const convertToHTMLElement = (name, phone) => {
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
  <img src="img/trash-fill.svg"/>
</div>
</li>`
}

window.localStorage.setItem("lista",JSON.stringify([]))

const leerLista = ()=>{
    return JSON.parse(window.localStorage.getItem("lista"))
}

const agregarContacto = (name, phone) => {
    let lista = leerLista()
    let nuevoElemento = {
        nombre: name,
        telefono: phone
    }
    lista.push(nuevoElemento)
    console.log(lista)
    window.localStorage.setItem("lista",JSON.stringify(lista))
}

submitButton.addEventListener("click",()=>{
    let nuevoNombre = nameInput.value
    let nuevoTelefono = cellInput.value

    agregarContacto(nuevoNombre, nuevoTelefono)

    leerLista().forEach(c => {
        document.getElementById("contact-list").innerHTML += convertToHTMLElement(c.nombre,c.telefono)
    });
    
})