const mongoose = require('mongoose')


const SettingSchema = new mongoose.Schema({
    versionCode: {
        type: Number
    },
    versionName: {
        type: Number
    },
    comment: {
        type: String
    },
    url: {
        type: String
    }
}, { timestamps: true })

const Setting = mongoose.model('setting', SettingSchema)
module.exports = Setting