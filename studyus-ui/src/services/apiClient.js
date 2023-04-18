import axios from "axios"
import API_BASE_URL from "../constants"

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl
    this.token = null
    this.tokenName = "studyus_token"
  }
  
  setToken(token) {
    this.token = token
    localStorage.setItem(this.tokenName, token)
  }

  async request({ endpoint, method = `GET`, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`

    const headers = {
      "Content-Type": "application/json",
      Authorization: this.token ? `Bearer ${this.token}` : "",
    }

    try {
      const res = await axios({ url, method, data, headers })
      return { data: res.data, error: null }
    } catch (error) {
      console.error({ errorResponse: error.response })
      const message = error?.response?.data?.error?.message
      return { data: null, error: message || String(error) }
    }
  }
  
  // ----------------------- authentication -----------------------
  async login(credentials) {
    return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials })
  }
  async signup(credentials) {
    return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials })
  }
  async fetchUserFromToken() {
    return await this.request({ endpoint: `auth/me`, method: `GET` })
  }
  /*async fetchUserById(devId) {
    return await this.request({ endpoint: `auth/users/${devId}`, method: `GET`})
  }
  async checkValidEmail(userEmail){
    return await this.request({ endpoint: `team/user/${userEmail}`, method: `GET`, data: {email: userEmail} })
  }*/
  logoutUser() {
    this.setToken(null)
    localStorage.setItem(this.tokenName, "")
  }

  // ----------------------- group requests -----------------------
  async listAllGroups(){
    return await this.request({ endpoint:'group', method: 'GET'})
  }
  async fetchGroupById(groupId){
    console.log("apiClient groupID: " + groupId)
    return await this.request({ endpoint:`group/${groupId}`, method: 'GET'})
  }

  // to create a new group, credentials must have:
    //  name, subject, isbn, school, description, capacity
  async createNewGroup(credentials){
    return await this.request({ endpoint: 'group', method: 'POST', data: credentials })
  }
  async addMemberToGroup( groupId, memberToAdd ){
    console.log("addMemberToGroup groupId: " + groupId)
    return await this.request({ endpoint: `group/add`, method: 'POST',  data: {email: memberToAdd, groupId: groupId} })
  }
  async leaveGroup( groupId, userEmail ){
    console.log(userEmail)
    return await this.request({ endpoint: `group/remove`, method: 'POST',  data: {groupId: groupId, email: userEmail } })
  }
  //function to get an array of users who are a part of a specific group
  async fetchMemberList(groupId){
    console.log("fetchMemberList results: ", /*JSON.stringify(*/ await this.request({endpoint: `group/${groupId}/members`, method: 'GET' }))/*)*/;
    return await this.request({endpoint: `group/${groupId}/members`, method: 'GET' })
  }
  async checkGroupCapacity(groupId){
    console.log("Group Capacity: ", /*JSON.stringify(*/ await this.request({endpoint: `group/${groupId}/capacity`, method: 'GET' }))/*)*/;
    return await this.request({endpoint: `group/${groupId}/capacity`, method: 'GET' })
  }

  // function to search for group given search query
  async searchForGroups(query){
    return await this.request({ endpoint: `group/search`, method: 'POST', data: {query: query} })
  }

  // ------------------------ chat requests ------------------------

  // function to get all messages given a group id
  async fetchMessages(groupId){
    return await this.request({ endpoint: `chat/fetch`, method: 'POST', data: {groupId: groupId} })
  }
  // function to send message given a group/sender id, and the message
  async sendMessage(groupId, senderId, message){
    return await this.request({endpoint: `chat/send`, method: 'POST', data: {groupId: groupId, senderId: senderId, message: message}})
  }

  // ------------------------- call requests ----------------------


  // Function to start a call 
  async startCall(name) {
    return await this.request({endpoint: `call/create`, method: 'POST', data: {name}});
  }
  
  async endCall(name) {
    return await this.request({endpoint: `call/delete`, method: 'POST', data: {name}});
  }


}



// export default new ApiClient(API_BASE_URL || "http://localhost:3001")
export default new ApiClient(API_BASE_URL)