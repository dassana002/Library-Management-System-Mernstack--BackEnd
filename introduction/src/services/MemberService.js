const Member = require('../models/MemberModel')

async function getAllMembers() {
    return Member.find()
}

async function addMember(member) {
    const newMember = new Member(member)
    return newMember.save()
}

async function updateMember(memberId,member) {
    return Member.findOneAndUpdate({ memberId: memberId }, member, { new: true })
}

async function deleteMember(memberId) {
    return Member.findOneAndDelete(memberId)
}

module.exports = {getAllMembers ,addMember ,updateMember ,deleteMember}
