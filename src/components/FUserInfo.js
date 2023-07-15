
export class UserInfo {
    constructor({ userName, userDescription, userAvatar }) {
      this._userNameElem = userName;
      this._userDescriptionElem = userDescription;
      this._userAvatarElem = userAvatar;
    }
  
    getUserInfo() {
      return {
        userName: this._userNameElem.textContent,
        userDescription: this._userDescriptionElem.textContent
      }
    }
  
    setUserInfo(data) {
      this._userNameElem.textContent = data.name;
      this._userDescriptionElem.textContent = data.about;
    }
  
    setUserAvatar(data) {
      this._userAvatarElem.src = data.avatar;
    }
  }