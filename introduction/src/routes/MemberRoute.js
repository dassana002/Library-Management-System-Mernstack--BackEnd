const express = require('express')
const router = express.Router()
const memberUrl = '/members'
const memberService = require('../services/MemberService')

router.get(memberUrl ,async(req ,res)=> {
    try {
        const allMember = await memberService.getAllMembers()
        res.json(allMember).status(201)
    } catch (error) {
        console(error)
        res.status(500).send("Internal Server error")
    }
})

router.post(memberUrl ,async(req ,res)=>{
    try {
        await memberService.addMember(req.body)
        res.status(201).send("Member Saved Successfully")
    } catch (error) {
        console(error)
        res.status(500).send("Internal Server error")
    }
})

router.patch(memberUrl ,async(req,res)=>{
    try {
        await memberService.updateMember(req.body ,req.params)
        res.status(201).send("Member Updated Successed")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server error")
    }
})

router.delete(memberUrl ,async(req ,res)=>{
    try {
        await memberService.deleteMember(req.params)
        res.status(201).send("Member Deleted ")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server error")
    }
})

module.exports = router