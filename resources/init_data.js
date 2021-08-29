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
        "date": "2021-08-01",
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
    },
    {
        "vehicle": "ABC-123",
        "date": "2021-08-01",
        "origin": "SOGAMOSO",
        "destiny": "BARRANQUILLA",
        "value": "4000000",
        "expenses": "1700000",
        "gain": "2300000",
        "details": {
            "gas": "600000",
            "toll": "500000",
            "maintenance": "100000",
            "load": "50000",
            "unload": "50000",
            "driver": "400000"
        }
    }
]

exports.driversList = driversList
exports.ownersList = ownersList
exports.currentUser = currentUser
exports.vehicles = vehicles
exports.vehicleTravels = vehicleTravels