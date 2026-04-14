import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js";


const changeAvailability = async (req, res) => {
    try {
        
        const {docId} = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId , {available : !docData.available })
        res.json({success : true , message : 'Availability Changed'})

    } catch (error) {
        console.log(error);
        res.json({success:false, message : error.message})
        
    }
}

const doctorList = async (req, res) => {
    try {
        
        const doctors = await doctorModel.find({}).select(['-password','-email'])  //all doctors data except email pass for frontend

        res.json({success: true,doctors})

    } catch (error) {
        console.log(error);
        res.json({success:false, message : error.message})
    }
}

// API FOR DOCTOR LOGIN
const loginDoctor = async (req , res) => {

    try {
        
        const { email , password } = req.body
        const doctor = await doctorModel.findOne({email})

        if(!doctor){
            return res.json({success:false, message: "Invalid Credentials"})
        }

        const isMatch = await bcrypt.compare(password , doctor.password)

        if(isMatch){

            const token = jwt.sign({id : doctor._id} , process.env.JWT_SECRET)

            res.json({success: true , token})

        } else {
            res.json({success:false, message : 'Invalid Credentials'})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message : error.message}) 
    }
}


// API TO GET DOC APPOINTMENT FOR DOC PANEL
const appointmentsDoctor = async (req ,  res) => {
    try {
        
        // docId should NOT be taken from req.body (client input is untrusted and may be missing)
        // Instead, extract it from the auth middleware (req.docId) which is decoded from JWT
        // This ensures secure and consistent identification of the logged-in doctor
        const  docId  = req.docId
        const appointments = await appointmentModel.find({ docId })

        res.json({success: true, appointments})

    } catch (error) {
        console.log(error);
        res.json({success:false, message : error.message}) 
    }
}

// API TO MARK APPOIINTMENT COMPLETED FOR DOC PANEL
const appointmentComplete = async (req,res) => {
    try {
        
        const docId = req.docId
        const {appointmentId} = req.body 

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId === docId) {

            await appointmentModel.findByIdAndUpdate(appointmentId , {isCompleted : true})
            return res.json({success: true , message : "Appointment Completed"})

        }  else  {
            return res.json({success: false , message : "Mark Failed"})
        }



    } catch (error) {
        console.log(error);
        res.json({success:false, message : error.message}) 
    }
}

// API TO CANCEL APPOINTMENT FOR DOC PANEL
const appointmentCancel = async (req, res) => {
    try {
        
        const docId = req.docId
        const {appointmentId} = req.body 

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId === docId) {

            await appointmentModel.findByIdAndUpdate(appointmentId , {cancelled : true})
            return res.json({success: true , message : "Appointment Cancelled"})

        }  else  {
            return res.json({success: false , message : "Cancellation Failed"})
        }



    } catch (error) {
        console.log(error);
        res.json({success:false, message : error.message}) 
    }
}

// API TO GET DAHBOARD data from doctor panel
const doctorDashboard = async (req, res) => {
    try {
        
        const docId = req.docId
        const appointments = await appointmentModel.find({docId})

        let earnings = 0

        appointments.map((item) => {
            if(item.isCompleted || item.payment){
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item) => {
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments : appointments.length,
            patients : patients.length,
            latestAppointments : appointments.reverse().slice(0,5)
        }

        res.json({success: true, dashData})

    } catch (error) {
        console.log(error)
        res.json({success:false, message : error.message}) 
    }
}

export {changeAvailability , doctorList , loginDoctor , appointmentsDoctor , appointmentCancel , appointmentComplete, doctorDashboard}