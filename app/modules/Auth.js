class Auth {

  static authenticateUser(token){
    localStorage.setItem('token', token);
  }

  static isUserAuthenticated(){
    return localStorage.getItem('token') !== null;
  }

  static deauthenticateUser(){
    localStorage.removeItem('token');
  }

  static getToken(){
    return localStorage.getItem('token');
  }

  static authorizeAdmin(){
    return localStorage.getItem('admin') === 'adminrole'
  }

  static makeAdmin(adminString){
    localStorage.setItem('admin', adminString)
  }

  static getAdmin(){
    return localStorage.getItem('admin')
  }

  static tossAdmin(){
    return localStorage.removeItem('admin')
  }

}

export default Auth;
