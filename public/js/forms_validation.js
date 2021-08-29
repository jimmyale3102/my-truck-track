const plateExpression = new RegExp("[a-zA-Z]{3}-[0-9]{3}")

function validateTruckForm() {
    alert("Validate truck")
    const plate = document.forms["truck-form"]["plate"].value
    if(!plateExpression.test(plate)) {
      alert("Not match")
      return false
    }
}