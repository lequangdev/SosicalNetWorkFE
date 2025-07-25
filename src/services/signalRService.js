import * as signalR from "@microsoft/signalr";
import { reject, resolve } from 'core-js/features/promise';
import { useStore } from 'vuex';

const store = useStore()

class SignalRService {
    constructor() {
        
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5300/chatHub", 
            {accessTokenFactory: () => { return localStorage.getItem('token')}})  
            .configureLogging(signalR.LogLevel.Information)
            .build();
    }

    startConnection() {
        return this.connection.start()
    }

    

    connectionRoom(room_id){
        this.connection.invoke("JoinRoomChat", room_id);
    }

    onReceiveRoom(callback){
        this.connection.on("ReceiveGroupInvite", (groupId) => {
            this.connection.invoke("JoinRoomChat", [groupId])
            .then(() => {
                console.log('Tham gia phòng thành công');
                callback(); 
            })
            .catch(err => console.error(err));
        });
    }

    stopConnection() {
        return this.connection.stop(null);
    }

    onReceiveMessage(message) {
        this.connection.on("ReceiveMessage", message);
    }

    sendMessage(message) {
        this.connection.invoke("SendMessageAsync", message)
            .catch(err => console.error("Error sending message: ", err));
    }
    createRoomTwo(roomTwoDTO) {
        return new Promise((resolve, reject) => {
            this.connection.invoke("CreateRoomChat", roomTwoDTO)
            .then(result => {
                resolve(result);
              })
              .catch(err => {
                console.error("CreateRoom error", err);
                reject(err);
              });
        })
    }

    // friend
    notAcceptFriendship(payload){
        this.connection.invoke("NotAcceptFriendship", payload)
        .catch(err => console.error("Error sending payload: ", err))
    }

    receiveNotAcceptFriendship(result){
        this.connection.on("ReceiveFromNotAcceptFriend", result)
    }

    async acceptFriendship(payload){
        try {
            await this.connection.invoke("AcceptFriendship", payload);
        } catch (err) {
            console.error("Error sending payload: ", err);
            throw err; 
        }
    }     //ldduy

    receiveAcceptFriendship(result){
        this.connection.on("ReceiveFromAcceptFriend", result)
    }

    sendFriend(payload){
        this.connection.invoke("sendFriend", payload)
        .catch(err => console.error("Error  sending payload: ", err));
    }

    receiveFriendship(result){
        this.connection.on("ReceiveFromSendFriend", result)
    }

}

const instance = new SignalRService;
Object.freeze(instance);
export default instance;
