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
    return await this.request({ endpoint:`group/${groupId}`, method: 'GET'})
  }

  // to create a new group, credentials must have:
    //  name, subject, isbn, school, description, capacity
  async createNewGroup(credentials){
    return await this.request({ endpoint: 'group', method: 'POST', data: credentials })
  }
  async addMemberToGroup({ groupId, memberToAdd}){
    return await this.request({ endpoint: `group/${groupId}/add`, method: 'POST',  data: {email: memberToAdd} })
  }
  //function to get an array of users who are apart of a specific team
  async fetchMemberList(groupId){
    return await this.request({endpoint: `group/${groupId}/members`, method: 'GET' })
  }

  /* Gets all the team members from multiple teams. Pass in array of all team ids we want to do this for
  async fetchTeamMembers(teamIds) {
    return await this.request({endpoint: `team/teams/users`, method: 'GET', data: {teamIds}})
  }*/

}

// export default new ApiClient(API_BASE_URL || "http://localhost:3001")
export default new ApiClient(API_BASE_URL)