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

router.get(`/register`, (req, res) => {
    res.render(`register`, {title:"Registro", userExists:false})
})

// Login
router.post(`/`, (req, res) => {
    const {username, password, kindUser} = req.body
    if(validateUserData(username, password, kindUser)) {
        if(kindUser === "driver") {
            res.render(`index`, {title:"Inicio", isDataWrong:false})
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

router.get(`/owner_home`, (req, res) => {
    res.render(`owner_home`, {title:"Dueño", travels:getOwnerVehiclesData()})
})

router.post(`/add_truck`, (req, res) => {
    const {plate, brand, model, driver} = req.body
    console.log(req.body)
    res.redirect(`/owner_home`)
})

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