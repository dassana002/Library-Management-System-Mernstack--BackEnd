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
        res.status(201).send("saved ")
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server error")
    }
})

router.patch(staffUrl, async(req ,res)=> {
    try {
        await staffService.updateStaff(req.params ,req.body)
        res.status(201).send("Updated successed")
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server error")
    }
})

router.delete(staffUrl, async(req ,res)=> {
    try {
        await staffService.deleteStaff(req.params)
        res.status(201).send("Deleted")
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server error")
    }
})

module.exports = router