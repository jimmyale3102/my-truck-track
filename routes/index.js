const express= require('express')
const { redirect } = require('statuses')
const router = express.Router()

// init data
const initData = require(`../resources/init_data`)
let driversList = initData.driversList
let ownersList = initData.ownersList
let currentUser = initData.currentUser
let vehicles = initData.vehicles
let vehicleTravels = initData.vehicleTravels

// Routes
router.get('/', (req,res) => {
    printData()
    res.render("index", {title:"Inicio", isDataWrong:false})
})

router.get('/home', (req,res) => {
    console.log(currentUser)
    if(currentUser.kindUser == "driver") {
        res.redirect(`/driver_home`)
    } else if(currentUser.kindUser == "owner") {
        res.redirect(`/owner_home`)
    } else {
        res.redirect(`/`)
    }
})

router.get(`/register`, (req, res) => {
    res.render(`register`, {title:"Registro", userExists:false})
})

// Login
router.post(`/`, (req, res) => {
    const {username, password, kindUser} = req.body
    if(validateUserData(username, password, kindUser)) {
        if(kindUser === "driver") {
            res.redirect(`/driver_home`)
        } else {
            res.redirect(`/owner_home`)
        }
    } else {
        res.render(`index`, {title:"Inicio", isDataWrong:true})
    }
})

router.post(`/register`, (req, res) => {
    const {username, password, kindUser} = req.body
    if(validateUser(username, password, kindUser)) {
        res.render(`register`, {title:"Registro", userExists:true})
    } else {
        res.render(`register`, {title:"Registro", userExists:false})
    }
})

router.post(`/add_truck`, (req, res) => {
    const {plate, brand, model, driver, percentage} = req.body
    if(validPlate(plate) && validDriver(driver)) {
        addTruck(plate, brand, model, driver, percentage)
        res.redirect(`/get_trucks`)
    } else {
        res.render(`truck`, {title:"Camiones", trucks:getOwnerTrucks(), isTruckWrong: true})
    }
})

router.post(`/add_travel`, (req, res) => {
    const {plate, origin, destiny, date, value, gas, toll, maintenance, load, unload} = req.body
    if(!validPlate(plate)) {
        addTravel(plate, origin, destiny, date, value, gas, toll, maintenance, load, unload)
        res.redirect(`/driver_home`)
    } else {
        res.render(`driver_home`, {title:"Conductor", travels:getDriverTravels, isTravelWrong: true})
    }
})

router.get(`/owner_home`, (req, res) => {
    res.render(`owner_home`, {title:"Dueño", travels:getOwnerVehiclesData()})
})

router.get(`/driver_home`, (req, res) => {
    res.render(`driver_home`, {title:"Conductor", travels:getDriverTravels(), isTravelWrong: false})
})

router.get(`/get_trucks`, (req, res) => {
    res.render(`truck`, {title:"Camiones", trucks:getOwnerTrucks(), isTruckWrong: false})
})

// Get driver travels
const getDriverTravels = function() {
    let travelsLoaded = []
    const vehiclesLoaded = vehicles.filter( function(vehicle, _) {
        return (vehicle["driver"] == currentUser.id)
    })
    vehiclesLoaded.forEach( vehicle => {
        vehicleTravels.forEach( travel => {
            if(vehicle.plate == travel.vehicle) {
                travelsLoaded.push(
                    {
                        "vehicle": vehicle,
                        "travel": travel,
                        "ownerName": ownersList.find( owner => owner.id == vehicle.owner).username
                    }
                )
            }
        })
    })
    return travelsLoaded
}

// Add travel
const addTravel = function(plate, origin, destiny, date, value, gas, toll, maintenance, load, unload) {
    const driverData = vehicles.find( vehicle => vehicle.plate == plate)
    const driver = value * (driverData.driverPercentage/100)
    const expenses = gas + toll + maintenance + load + unload + driver
    const gain = value - expenses
    vehicleTravels.push(
        {
            "vehicle": plate.toUpperCase(),
            "date": date.toString(),
            "origin": origin.toUpperCase(),
            "destiny": destiny.toUpperCase(),
            "value": value.toString(),
            "expenses": expenses.toString(),
            "gain": gain.toString(),
            "details": {
                "gas": gas.toString(),
                "toll": toll.toString(),
                "maintenance": maintenance.toString(),
                "load": load.toString(),
                "unload": unload.toString(),
                "driver": driver.toString()
            }
        }
    )
}

// Add truck
const addTruck = function(plate, brand, model, driverUserName, percentage) {
    const driverData = driversList.find( driver => driver.username == driverUserName)
    vehicles.push(
        {
            "plate": plate.toUpperCase(),
            "brand": brand.toUpperCase(),
            "model": model.toString(),
            "owner": currentUser.id,
            "driverPercentage": percentage,
            "driver": driverData.id
        }
    )
}

const validPlate = function(plate) {
    const vehicleLoaded = vehicles.find( vehicle => vehicle.plate == plate)
    if(vehicleLoaded == undefined) {
        return true
    } else {
        return false
    }
}
const validDriver = function(driverUserName) {
    const driverLoaded = driversList.find( driver => driver.username == driverUserName)
    if(driverLoaded == undefined) {
        return false
    } else {
        return true
    }
}

// Get owner trucks data
const getOwnerTrucks = function() {
    let trucksLoaded = []
    console.log("GetOwnerVehicles")
    const vehiclesLoaded = vehicles.filter( function(vehicle, _) {
        return (vehicle["owner"] == currentUser.id)
    })
    vehiclesLoaded.forEach( vehicle => {
        console.log(vehicle)
        trucksLoaded.push(
            {
                "vehicle": vehicle,
                "driverName": driversList.find( driver => driver.id == vehicle.driver).username
            }
        )
    })
    console.log(trucksLoaded)
    return trucksLoaded
}

// Get owner vehicles data
const getOwnerVehiclesData = function() {
    let vehicleTravelsLoaded = []
    console.log("GetOwnerVehicles")
    const vehiclesLoaded = vehicles.filter( function(vehicle, _) {
        return (vehicle["owner"] == currentUser.id)
    })
    vehiclesLoaded.forEach( vehicle => {
        console.log(vehicle)
        vehicleTravels.forEach( travel => {
            if(vehicle.plate == travel.vehicle) {
                vehicleTravelsLoaded.push(
                    {
                        "vehicle": vehicle,
                        "travel": travel,
                        "driverName": driversList.find( driver => driver.id == vehicle.driver).username
                    }
                )
            }
        })
    })
    console.log(vehicleTravelsLoaded)
    return vehicleTravelsLoaded
}

// Register
const validateUser = function (username, password, kindUser) {
    let userData = {}
    if(kindUser === "driver") {
        userData = driversList.find( user => user.username == username)
    } else {
        userData = ownersList.find( user => user.username == username)
    }
    printData()
    if(userData != undefined) {
        return true
    } else {
        createUser(username, password, kindUser)
        return false
    }
}

const createUser = function(username, password, kindUser) {
    if(kindUser === "driver") {
        driversList.push({"id": driversList.length + 1, "username": username, "password": password, "kindUser": kindUser})
    } else {
        ownersList.push({"id": ownersList.length + 1, "username": username, "password": password, "kindUser": kindUser})
    }
    printData()
}

// Login
const validateUserData = function(username, password, kindUser) {
    if(kindUser === "driver") {
        currentUser = driversList.find( user => user.username == username && user.password == password)
    } else {
        currentUser = ownersList.find( user => user.username == username && user.password == password)
    }
    printData()
    if(currentUser != undefined) {
        return true
    } else {
        return false
    }
}

const printData = function() {
    console.log("Drivers:", driversList)
    console.log("Owners:", ownersList)
    console.log("Vehicles:", vehicles)
    console.log("CurrentUser", currentUser)
}

module.exports = router;