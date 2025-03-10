const express = require('express');
const router = express.Router();
const {client} = require('../config/twilioConfig');
const supabase = require('../config/supabaseConfig');

// router.post('/send-otp', async(req,res)=>{
//     const{phone} = req.body;
//     if(!phone){
//         return res.status(400).json({error: 'Phone number is required'});

//     }
//     const otp = Math.floor(10000 + Math.random()*900000);
//     try{
//         const message = await client.messages.create({
//             body: `Your otp is :${otp}`,
//             from: process.env.TWILIO_PHONE_NUMBER,
//             to:phone

//         });

//         res.json({
//             success:true,
//             messageSid:message.sid,
//             otp
//         })
//     }catch(error){
//         res.status(500).json({error:error.message});
//     }
// })

router.post('/signup',async(req,res)=>{
    const {phone} = req.body;
    if(!phone){
        return res.status(400).json({error: 'Phone number required'});

    }
    const{data,error} = await supabase.auth.signInWithOtp({phone});
    if(error){
        return res.status(500).json({error:error.message});
    }

    res.json({success: true,message: 'Otp sent to phone'});
})

router.post('/verify-otp', async (req,res)=>{
    const{phone,token} = req.body;

    if(!phone||!token){
        return res.status(400).json({error: 'Phone and token are required'});

    }
    const { data, error} = await supabase.auth.verifyOtp({phone,token,type: 'sms'});

    if(error){
        return res.status(400).json({error: error.message});
    }

    const userId = data.user.id;

    res.json({success: true, userId, message:'Otp verified successfully'});
})

router.post('/save-profile',async (req,res)=>{

    const{id, first_name, last_name, dob, gender, profile_pic} =req.body;

    if(!id|| !first_name|| !last_name || !gender){
        return res.status(400).json({error: 'Field required'});
    }

    const {data, error} = await supabase
        .from('user_profiles')
        .insert([{id,first_name,last_name,dob,gender,profile_pic}]);
    if(error){
        return res.status(500).json({error: error.message});
    }

    res.json({success:true, message:'Profile saved successfully', data});
})

module.exports = router;