let driversList = [
    {
        "id": 1,
        "username": "jimmy",
        "password": 123,
        "kindUser": "driver"
    }
]

let ownersList = [
    {
        "id": 1,
        "username": "alejo",
        "password": 123,
        "kindUser": "owner"
    }
]
let currentUser = {
    "id": -1,
    "username": "",
    "password": -1,
    "kindUser": ""
}

let vehicles = [
    {
        "plate": "ABC-123",
        "brand": "KENWORTH",
        "model": "2015",
        "owner": 1,
        "driverPercentage": 10,
        "driver": 1
    }
]

let vehicleTravels = [
    {
        "vehicle": "ABC-123",
        "date": "01/08/2021",
        "origin": "SOGAMOSO",
        "destiny": "BOGOTÁ",
        "value": "2500000",
        "expenses": "1500000",
        "gain": "500000",
        "details": {
            "gas": "400000",
            "toll": "400000",
            "maintenance": "200000",
            "load": "150000",
            "unload": "100000",
            "driver": "250000"
        }
    }
]

exports.driversList = driversList
exports.ownersList = ownersList
exports.currentUser = currentUser
exports.vehicles = vehicles
exports.vehicleTravels = vehicleTravels