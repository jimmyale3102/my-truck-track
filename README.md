# my-truck-track

My Truck track busca facilitar el registro, visualización y cálculos de los viajes realizados en el sector camionero, teniendo en cuenta los gastos, porcentaje de ganancia de los conductores y calculando las ganancias

## Información inicial

Inicialmente en el proyecto cuenta con una información base que se muestra a continuación:

```javascript
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
```

- `driversList` Va a contener la lista de conductores registrados
- `ownersist` Va a contener la lista de dueños registrados
- `currentUser` Modelo de un usuario. Se usa para identificar el usuario que se encuentre logueado y hacer las respectivas validaciones
- `vehicles` Va a contener la lista de camiones
- `vehicleTravels` Va a contener la información de todos los viajes registrados





