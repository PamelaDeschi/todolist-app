//import tareas from "./state.js"
let listaDeTareas = []
const formulario = document.getElementById ("form")
const ulDeTareas = document.getElementById ("lista-tareas")
const pendientesSpan = document.getElementById ("pendientes")
const btnBorrar = document.getElementById ("btn-borrar")


formulario.onsubmit = function (event) {
  event.preventDefault ()
  const userText = formulario.tarea.value
  addTarea (userText)
  formulario.tarea.value ="" //vaciar input (tarea)

}
function addTarea (nuevaTarea){
  listaDeTareas.push (nuevaTarea)
  save()
  const li = document.createElement ('li')
  li.textContent = nuevaTarea
  ulDeTareas.appendChild (li)
  pendientesSpan.textContent = listaDeTareas.length //longitud de la lista (cantidad de tareas en la lista)
  
  
  li.onclick = function () {
    li.remove () // ? eliminar del html
    // ? Encontrar la posion de la tarea
    save()
    const indice = listaDeTareas.findIndex (function (item){
    return item === nuevaTarea
  })
   listaDeTareas.splice (indice, 1)
   save()
   pendientesSpan.textContent = listaDeTareas.length //? actualizar pendientes
 }
}

btnBorrar.onclick = function () {
  listaDeTareas = []
  pendientesSpan.textContent = listaDeTareas.length
  ulDeTareas.innerHTML = ""
}

function save () {
  const listaDeTareasEnTexto = JSON.stringify (listaDeTareas)
  localStorage.setItem ('listaDeTareas', listaDeTareasEnTexto)
}

function init () {
  const listaDeTareasEnTexto = localStorage.getItem ('listaDeTareas')
  const array =JSON.parse (listaDeTareasEnTexto)
  let arrayAuxiliar
  if (array === null) {
    arrayAuxiliar = []
  } else {
    arrayAuxiliar = array
  }
  arrayAuxiliar.forEach(function (item) {
    addTarea (item)
  })
}

init()