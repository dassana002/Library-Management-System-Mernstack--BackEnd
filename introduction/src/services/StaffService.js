const Staff  = require('../models/StaffModel')

async function getAllStaff() {
    return Staff.find()
}

async function addStaff(staff) {
    const newStaff = new Staff(staff)
    return newStaff.save()
}

async function updateStaff(staffId ,staff) {
    return Staff.findOneAndUpdate({ staffId: staffId }, staff, { new: true })
}

async function deleteStaff() {
    return Staff.findOneAndDelete(staffId)
}

module.exports = {getAllStaff ,addStaff ,updateStaff ,deleteStaff}