//función que obtiene la información de la API
async function obtener() {
    try {
        let promesa = await fetch("https://digimon-api.vercel.app/api/digimon");
        let json = await promesa.json();
        let p = document.getElementById("lista");
        agregar(json, p);
    } catch (error) {
        alert(error);
    }
}

//función que toma el array de la API y genera secciones por cada uno de los elementos
function agregar(data, elemento) {
    data.forEach(digi => {       //por cada elemento se almacena img, name y level
        const { img, name, level } = digi;

        //inserto de html que se creará en la página
        var cuerpo = `    
            <div class='col-4 border p-0'>
                <img class="imagen" src='${img}' style="height: 100%; width: 30%;">
            </div>
            <p class='col-4 border mb-0 digimon' style="padding: 2.5rem; font-weight: bold;">
            ${name}
            </p>
            <p class='col-4 border mb-0 niveldigi' style="padding: 2.5rem;">
            ${level}
            </p>
        `
        const divnuevo = document.createElement("div");
        divnuevo.className = "row p-0 g-0";
        divnuevo.innerHTML = cuerpo;
        insertAfter(divnuevo, elemento.lastElementChild);
        document.getElementById("oculto").style.display = "flex";
    });
}

//función para insertar despues del elemento hijo seleccionado 
function insertAfter(nodonuevo, nodoexistente) {
    nodoexistente.parentNode.insertBefore(nodonuevo, nodoexistente.nextSibling);
}

//llamando a la función para que se ejecjute en la página
obtener();

//función que escucha cuando se hace click en el botón de buscar, y llama a otra función
document.getElementById("boton").addEventListener("click", function (event) {
    event.preventDefault()
    obtener2();
});

//función del botón buscar, que almacena el input y luego lo transforma en el link de la API
async function obtener2() {
    try {
        var valor = document.getElementById("buscar").value;
        var link = "https://digimon-api.vercel.app/api/digimon/name/" + valor;
        let promesa = await fetch(link);
        let json = await promesa.json();
        agregar2(json);
    } catch (error) {
        alert("No existe digimon");
    }
}

//función del botón buscar, que toma el array de la API y la usa para buscar el personaje exacto que se escribió
function agregar2(data) {
    data.forEach(json => {
        const { img, name, level } = json;

        //parte de html que se generará en la card del documento 
        var cuerpo = `
            <div class="col-md-12">
                <img src="${img}" class="img-fluid rounded-start" style="">
            </div>
            <hr class="mb-0">
            <div class="col-md-12">
                <div class="card-body">
                    <h5 class="card-title font-weight-bold">${name}</h5>
                    <hr>
                    <p class="card-text">${level}</p>
                </div>
                <hr class="mt-0">
                <button id="boton2" class="mb-2 btn btn-outline-info" type="button">Volver</button>
            </div>
            `
        //la función oculta la lista general, luego crea un div que almacenará la card 
        //con el html a nterior usando la función de insertAfter
        //luego de insertarla, la hace visible y agrega otra función al botón "volver"
        //haciendo que este recargue la página    
        document.getElementById("seccion").style.display = "none";
        const divnuevo = document.createElement("div");
        divnuevo.innerHTML = cuerpo;
        let tar = document.getElementById("tarjeta");
        insertAfter(divnuevo, tar.lastElementChild);
        document.getElementById("tarjeta").style.display = "block";
        document.getElementById("boton2").addEventListener("click", function (){  
            window.location.reload();
        } )
    });
}
