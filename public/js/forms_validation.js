const plateExpression = new RegExp("[a-zA-Z]{3}-[0-9]{3}")

function validateTruckForm() {
    const plate = document.forms["truck-form"]["plate"].value
    const brand = document.forms["truck-form"]["brand"].value
    const model = document.forms["truck-form"]["model"].value
    const driver = document.forms["truck-form"]["driver"].value
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
    if(brand === "" || model === "" || driver === "" || percentage === "") {
        alert("Completa la información")
        return false
    }
}

function validateTravelForm() {
    const plate = document.forms["new-travel-form"]["plate"].value
    const origin = document.forms["new-travel-form"]["origin"].value
    const destiny = document.forms["new-travel-form"]["destiny"].value
    const date = document.forms["new-travel-form"]["date"].value
    const value = document.forms["new-travel-form"]["value"].value
    const gas = document.forms["new-travel-form"]["gas"].value
    const toll = document.forms["new-travel-form"]["toll"].value
    const maintenance = document.forms["new-travel-form"]["maintenance"].value
    const load = document.forms["new-travel-form"]["load"].value
    const unload = document.forms["new-travel-form"]["unload"].value
    if(!plateExpression.test(plate)) {
      alert("La placa debe tener el siguiente formato: XXX-000")
      return false
    }
    if(origin === "" || destiny === "" || date === "" || value === "" || gas === "" || toll === ""
        || maintenance === "" || load === "" || unload === "") {
            alert("Completa la información")
            return false
    }
}