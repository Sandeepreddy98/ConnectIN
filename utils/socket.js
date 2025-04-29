const socket = require('socket.io');
const crypto = require('crypto');

const createHash = (userId,targetUserId) => {
    const tempRoomId = [userId,targetUserId].sort().join("$")
    const roomId = crypto.createHash('sha256').update(tempRoomId).digest('hex');
    return roomId
}

const initializeSocket = (server) => {
    const io = socket(server,{
        cors:{
            origin : process.env.CLIENT_URI,
        }
    })

    io.on('connection',(socket) => {
        
        socket.on("joinChat",({firstName,_id,targetUserId}) => {
            const roomId = createHash(_id,targetUserId)
            socket.join(roomId)
        })

        socket.on("sendMessage",({firstName,_id,targetUserId,text}) => {
            const roomId = createHash(_id,targetUserId)
            io.to(roomId).emit("messageFromServer",{firstName,_id,targetUserId,text})
        })

        socket.on("leaveChat",() => {

        })
    })
}

module.exports = initializeSocket