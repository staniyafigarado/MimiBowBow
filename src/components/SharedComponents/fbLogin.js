import React from 'react';
export default class B extends React.Component {
  constructor(props) {
    super(props);
     this.state = { userInfo: {}, userInfoG: {} };
    // this.abc = this.abc.bind(this);
    this.onPressButton=this.onPressButton.bind(this);
   }
    logoutWithFacebook = () => {
        LoginManager.logOut();
        this.setState({ userInfo: {} });
    };

    getInfoFromToken = token => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
                string: 'email,id,name,first_name,last_name,picture',
            },
        };
        const profileRequest = new GraphRequest(
            '/me',
            { token, parameters: PROFILE_REQUEST_PARAMS },
            (error, user) => {
                if (error) {
                    console.log('login info has error: ' + error);
                } else {
                    this.setState({ userInfo: user });
                    console.log('result:', user);
                    // this.props.navigation.navigate('Home');
                    this.getWPnonce();
                }
            },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    };

    loginWithFacebook = () => {
        if (Platform.OS === "android") {
            LoginManager.setLoginBehavior("web_only")
        }
        // Attempt a login using the Facebook login dialog asking for default permissions.
        LoginManager.logInWithPermissions(['public_profile']).then(
            login => {
                if (login.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    alert('Login was successful with permissions: ' + login.grantedPermissions.toString());
                    AccessToken.getCurrentAccessToken().then(data => {
                        const accessToken = data.accessToken.toString();
                        this.getInfoFromToken(accessToken);

                    });
                }
            },
            error => {
                console.log('Login fail with error: ' + error);
            },
        );
    };
      insertData(nonce) {
        axios.get('https://mimiandbowbow.com/alpha/api/user/register/?username=' + this.state.userInfo.name + '&email=' + this.state.userInfo.email + '&user_pass=' + this.state.userInfo.id + '&nonce=' + nonce)
            .then(res => {
                const data = res.data;
                console.log(data);
                this.props.navigation.navigate("Home");
            }).catch(error => {
                console.log(error.response)
            });
    }

    getWPnonce() {
        axios.get('https://mimiandbowbow.com/alpha/api/get_nonce/?controller=user&method=register')
            .then(res => {
                this.insertData(res.data.nonce);
                ///console.log(res.data.nonce);
            }).catch(error => {
                console.log(error.response)
            });
    }
    onPressButton(){
        if(!this.state.userInfo.name)
        {
            this.loginWithFacebook();
        }else{
             this.logoutWithFacebook();
        }
    }

    state = { userInfo: {} };
    render() {
      return null
    }
}