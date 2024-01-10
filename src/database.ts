import { connect } from "mongoose";



// Expected output: 1969
export async function startConnection() {
    await connect('mongodb+srv://fernandogdo:pxndxsux17@cluster0.l8xmi.mongodb.net/?retryWrites=true&w=majority')
        .then(db => {
            console.log("DB Atlas is connect")
        })
        .catch(error => {
            console.log('error', error)
        })
}

// mongodb+srv://fernandogdo:<password>@cluster0.l8xmi.mongodb.net/?retryWrites=true&w=majority

// import { connect } from "mongoose";

// export async function startConnection() {
//     await connect('mongodb://localhost/nativeec')
//     console.log("DB is connect")
// }
