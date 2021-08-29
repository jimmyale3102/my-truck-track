const plateExpression = new RegExp("[a-zA-Z]{3}-[0-9]{3}")

function validateTruckForm() {
    const plate = document.forms["truck-form"]["plate"].value
    const model = document.forms["truck-form"]["model"].value
    const percentage = document.forms["truck-form"]["percentage"].value
    if(!plateExpression.test(plate)) {
      alert("La placa debe tener el siguiente formato: XXX-000")
      return false
    }
    if(model.toString().length > 4) {
        alert("El modelo no debe ser mayor a 4 dígitos")
        return false
    }
    if(percentage.toString().length > 2) {
        alert("Porcentage incorrecto")
        return false
    }
}