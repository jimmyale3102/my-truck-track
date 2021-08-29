function onRowClick(tableId, callback) {
    var table = document.getElementById(tableId),
        rows = table.getElementsByTagName("tr"),
        i;
    for (i = 0; i < rows.length; i++) {
        table.rows[i].onclick = function (row) {
            return function () {
                callback(row);
            };
        }(table.rows[i]);
    }
  };

  onRowClick("travels_table", function (row){
    var value = row.getElementsByTagName("td")[5].innerHTML;
    var gain = row.getElementsByTagName("td")[7].innerHTML;
    var gas = row.getElementsByTagName("td")[8].innerHTML;
    var toll = row.getElementsByTagName("td")[9].innerHTML;
    var maintenance = row.getElementsByTagName("td")[10].innerHTML;
    var load = row.getElementsByTagName("td")[11].innerHTML;
    var unload = row.getElementsByTagName("td")[12].innerHTML;
    document.getElementById('value').innerHTML = "Valor: " +  value;
    document.getElementById('gain').innerHTML = "Ganancias: " +  gain;
    
    var trGas = document.createElement("tr")
    var trToll = document.createElement("tr")
    var trMantenance = document.createElement("tr")
    var trLoad = document.createElement("tr")
    var trUnload = document.createElement("tr")
    var tableBody = document.getElementById("details_body")

    // Gas
    var tdGas = document.createElement("td")
    tdGas.appendChild(document.createTextNode("ACPM"))
    var tdGasValue = document.createElement("td")
    tdGasValue.appendChild(document.createTextNode(gas))
    trGas.appendChild(tdGas)
    trGas.appendChild(tdGasValue)

    // Peaje
    var tdToll = document.createElement("td")
    tdToll.appendChild(document.createTextNode("PEAJES"))
    var tdTollValue = document.createElement("td")
    tdTollValue.appendChild(document.createTextNode(toll))
    trToll.appendChild(tdToll)
    trToll.appendChild(tdTollValue)

    // mantenimiento
    var tdMantenance = document.createElement("td")
    tdMantenance.appendChild(document.createTextNode("MANTENIMIENTO"))
    var tdMantenanceValue = document.createElement("td")
    tdMantenanceValue.appendChild(document.createTextNode(maintenance))
    trMantenance.appendChild(tdMantenance)
    trMantenance.appendChild(tdMantenanceValue)

    // Cargue
    var tdLoad = document.createElement("td")
    tdLoad.appendChild(document.createTextNode("CARGUE"))
    var tdLoadValue = document.createElement("td")
    tdLoadValue.appendChild(document.createTextNode(load))
    trLoad.appendChild(tdLoad)
    trLoad.appendChild(tdLoadValue)

    // Descargue
    var tdUnload = document.createElement("td")
    tdUnload.appendChild(document.createTextNode("DESCARGUE"))
    var tdUnloadValue = document.createElement("td")
    tdUnloadValue.appendChild(document.createTextNode(unload))
    trUnload.appendChild(tdUnload)
    trUnload.appendChild(tdUnloadValue)
    
    tableBody.appendChild(trGas)
    tableBody.appendChild(trToll)
    tableBody.appendChild(trMantenance)
    tableBody.appendChild(trLoad)
    tableBody.appendChild(trUnload)
  });