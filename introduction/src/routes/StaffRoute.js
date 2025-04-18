const express = require('express')
const router = express.Router()
const staffUrl = '/staffs'
const staffService = require('../services/StaffService')

router.get(staffUrl, async(req ,res)=> {
    try {
        const allStaffs = await staffService.getAllStaff()
        res.json(allStaffs).status(201).send("Get All")
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server error")
    }
})

router.post(staffUrl, async(req ,res)=> {
    try {
        await staffService.addStaff(req.body)
        res.send(201).status("Saved successfully")
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server error")
    }
})

router.patch(staffUrl, async(req ,res)=> {
    try {
        await staffService.updateStaff(req.params ,req.body)
        res.send(201).status("Updated successed")
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server error")
    }
})

router.delete(staffUrl, async(req ,res)=> {
    try {
        await staffService.deleteStaff(req.params)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server error")
    }
})

module.exports = router