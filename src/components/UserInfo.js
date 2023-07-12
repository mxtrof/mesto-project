// export class UserInfo {
//     constructor({name, about}){
//         this._name = document.querySelector(name),
//         this._about = document.querySelector(about)
//     }
//     setUserInfo(res){
//         this._name.textContent = res.name;
//         this._about.textContent = res.about;
//         // return {name: this._name.value, about: this._about.value }
//     }
//     getUserInfo(api){
//         // api.setUserInfo()
//         // .then((res) => {
//         //     return {name: res.name, about: res.about}
//         //     // profileName.textContent = res.name;
//         //     // profileDescription.textContent = res.about;
//         // })
//         // .catch((err) => {
//         //     console.log(err);
//         // })
//     }

// }
export class UserInfo {
    constructor({ userName, userDescription, userAvatar }) {
      this._userNameElem = document.querySelector(userName);
      this._userDescriptionElem = document.querySelector(userDescription);
      this._userAvatarElem = document.querySelector(userAvatar);
    }
  
    getUserInfo() {
      return {
        userName: this._userNameElem.textContent,
        userDescription: this._userDescriptionElem.textContent
      }
    }
  
    setUserInfo=(data) =>{
      this._userNameElem.textContent = data.name;
      this._userDescriptionElem.textContent = data.about;
    }
  
    setUserAvatar(data) {
      this._userAvatarElem.src = data.avatar;
    }
  }