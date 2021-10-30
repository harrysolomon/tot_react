import React, {useEffect, useState} from 'react'
import { GoogleLogin } from 'react-google-login';

const BYOCGoogleLogin = () => {
    
    const [googleApiResponse, setGoogleApiResponse] = useState(null)

    console.log(Object.keys(localStorage))
    
    const responseSuccessGoogle = (response) => {
        console.log("the successful response is", response)
        setGoogleApiResponse(response)

    }

    const responseErrorGoogle = (response) => {
        console.log(response)
    }
    
    return (
        <div className="Google">
            <div className="col-md-6 offset-md-3 text-center">
                <h1>Login with Google</h1>

                <GoogleLogin
                    clientId="450718988857-d50uiqdq6q85ht4vl5oi1bu16up0kada.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseErrorGoogle}
                    cookiePolicy={'single_host_origin'}
                    responseType="code"
                    accessType="offline"
                    scope="profile email"
                    redirectUri="http://localhost:3001/google-login"

                />

                {
                    googleApiResponse? 
                    <div>{googleApiResponse.Aa}</div> :
                    <div> Loading</div>
                
                }

            </div>
        </div>
    )

}

export default BYOCGoogleLogin