const express = require('express')
const { route } = require('./BookRoute')
const router = express.Router()
const memberUrl = '/members'

router.get(memberUrl ,async(req ,res)=> {
    try {
        const allMember = await memberService.getAllMember()
        res.json(allMember).status(201)
    } catch (error) {
        console(error)
    }
})

router.post(memberUrl ,async(req ,res)=>{
    try {
        await memberService.addMember(req.body)
        res.status(201).send("Member Save Successfully")
    } catch (error) {
        console(error)
    }
})

router.patch(memberUrl ,async(req,res)=>{
    try {
        await memberService.updateMember(req.body ,req.params)
        res.status(201).send("Member Update Successed")
    } catch (error) {
        console.log(error)
    }
})

router.delete(memberUrl ,async(req ,res)=>{
    try {
        await memberService.deleteMember(req.params)
        res.status(201).send("Member Deleted ")
    } catch (error) {
        console.log(error)
    }
})