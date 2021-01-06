/* const square = function(){
    return x * x
} */


/* const square = (x) => {
    return x * x
} */


/* const square = (x) => x * x
console.log(square(2)) */


const event = {
    name: "Birthday Party",
    guestList: ["Ahmet", "Mehmet", "Hasan"],
    printGuestList(){
        console.log(this.name + ' Guest List:')
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name)
        })
    }
}

event.printGuestList() 