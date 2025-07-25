import { createStore } from 'vuex'; 
import axios from 'axios';
import router from '@/router/router';
import signalR  from '@/services/signalRService';

const store = createStore({
  state: {
    allUser: [],
    user: {},
    receiveMessage: [],
    listRoom_id: [],
    lisetMessager:[],
    listSearch:[],
    allFriend: [],
    friendInvitation: []
  },
  getters: {
    AllUser: function(state){
      return state.allUser
    },
    listSearch: function(state){
      return state.listSearch
    },
    user: function(state){
      return state.user
    },
    receiveMessage: function(state){
      return state.receiveMessage
    },
    listRoom_id: function(state){
      return state.listRoom_id
    },
    lisetMessager: function(state){
      return state.lisetMessager
    },
    allFriend: function(state){
      return state.allFriend
    },
    friendInvitation: function(state){
      return state.friendInvitation
    }
  },
  mutations: {
    getUser(state, user){
      state.user = user
    },
    getListSearch(state, listSearch){
      state.listSearch = listSearch.filter(item => item.user_id !== localStorage.getItem('user_id'));
    }
    ,
    getALLUser(state, allUser){
      state.allUser = allUser.filter(item => item.user_id != localStorage.getItem('user_id'));
    },
    getMessageByRoomId(state, receiveMessage){
      state.receiveMessage = receiveMessage
    },
    getListRoom_id(state, listRoom_id){
      state.listRoom_id = listRoom_id
    },
    getLisetMessager(state, lisetMessager){
      state.lisetMessager = lisetMessager
    },
    getALLFriendInvitation(state, friendInvitation){
      state.friendInvitation = friendInvitation
    },
    getALLFriend(state, friends){
      state.allFriend = friends
    },
    deleteFriend(state,friend){
      state.allFriend = state.allFriend.filter(
        item => item.user_id !== friend
      );
    },
    deleteFriendInvitation(state, user){
      state.friendInvitation = state.friendInvitation.filter(
        item => item.user_id !== user
      );
    }
  },
  actions: {
    registerUser(context ,user){
      axios({
        method: 'Post',
        url: 'http://localhost:5100/api-auth/auth/Register',
        data: user
      })
    },

    loginUser(context, request){
      axios({
        method: 'Post',
        url: 'http://localhost:5100/api-auth/auth/Login',
        data: request
      })
      .then(async Response => {
          localStorage.setItem('token', Response.data.token)
          localStorage.setItem('user_id', Response.data.user.user_id)
          context.commit("getUser", Response.data.user)
          await signalR.startConnection()
          router.push('/')
      })
    },

    CheckedRoomUser(context, payload){
      const user = payload
      axios({
        method: 'Post',
        url: 'http://localhost:5100/api-chat/Chat/RoomUser',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: user

      })
      .then(async Response => {
        if(Response.data){ 
          router.push(`/messager/${payload.receiver_id}`)
        }
        else{
          await signalR.createRoomTwo(user)
          router.push(`/messager/${payload.receiver_id}`)
        }
      })
      .catch(error => {
        console.error('Lỗi:', error);
      });
    },

    getALLUser(context){
      axios({
        method: 'Get',
        url: 'http://localhost:5100/api-auth/AuthUser/GetAll',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(Response => {
          context.commit('getALLUser', Response.data)
      })
      .catch(error => {
        console.error('Lỗi:', error);
      });
    },

    getByUserId(context){
      axios({
        method: 'Get',
        url: 'http://localhost:5100/api-auth/AuthUser/GetByID',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          ID: localStorage.getItem("user_id")
        }
      })
      .then(Response => {
          context.commit('getUser', Response.data)

      })
      .catch(error => {
        console.error('Lỗi:', error);
      });
    },

    getMessageByRoomId(context, payload){
      axios({
        method: 'Get',
        url: "http://localhost:5100/api-chat/Chat/GetMessage",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          room_id: payload
        }
      })
      .then(Response => {
         context.commit("getMessageByRoomId", Response.data)
      })
      .catch(error => {
        console.error('Lỗi:', error);
      });
    },

    resetReceiveMessage(context){
      context.commit("getMessageByRoomId", '')
    },

    getListRoom_id(context, user_id){
      axios({
        method: 'Get',
        url: "http://localhost:5100/api-chat/Chat/GetRoomByUser_id",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          user_id: user_id
        }
      })
      .then(Response => {
         context.commit("getListRoom_id", Response.data)
      })
      .catch(error => {
        console.error('Lỗi:', error);
      });
    },

    GetRoomWithUsersByRoom_id(context, payload){
      let room_id = payload
      axios({
        method: 'Post',
        url: "http://localhost:5100/api-chat/Chat/GetRoomWithUsersByRoom_id",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: room_id
      })
      .then(Response => {
        context.commit("getLisetMessager",Response.data)
      })
      .catch(error => {
        console.error('Lỗi:', error);
      });
    },
    getListSearch(context, payload){
      axios({
        method: 'Get',
        url: "http://localhost:5100/api-auth/AuthUser/GetUserByFullname",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          payload: payload
        },
      })
      .then(Response => {
        context.commit("getListSearch",Response.data)
      })
      .catch(error => {
        console.error('Lỗi:', error);
      });
    },
    getALLFriendInvitation(context){
      axios({
        method: 'Get',
        url: 'http://localhost:5100/api-auth/Friendship/GetFriendInvitationByUser_id',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          id: localStorage.getItem('user_id')
        }
      })
      .then(Response => {
          context.commit('getALLFriendInvitation', Response.data)
      })
      .catch(error => {
        console.error('Lỗi:', error);
      });
    },
    AddFriend(context, model){
      axios({
        method: 'Post',
        url: 'http://localhost:5100/api-auth/Friendship',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: model
      })
      .then(Response => {
        console.error('Thành công');
      })
      .catch(error => {
        console.error('Lỗi:', error);
      });
    },
    getALLFriend(context){
      axios({
        method: 'Get',
        url: 'http://localhost:5100/api-auth/Friendship/GetFriendByUser_id',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          id: localStorage.getItem('user_id')
        }
      })
      .then(Response => {
          context.commit('getALLFriend', Response.data)
      })
      .catch(error => {
        console.error('Lỗi:', error);
      });
    },
  }
});

export default store; 