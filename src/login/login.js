import React, { useState } from "react";
import './login.css'
import { useNavigate } from "react-router-dom";

function Login() {

    const [userInformation, setUserInformation] = useState({
        email: '',
        userName: '',
    })
    const [isSucsses, setIsSucsses] = useState(true);

    const navigate = useNavigate();

    function handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        setUserInformation({
            ...userInformation,
            [name]: value
        })
    }

    async function handleSubmit() {
        await checkLoginStatus();
    }

    function checkLoginStatus() {
        sessionStorage.setItem("isAuthenticated", false)
        fetch(`http://localhost:3001/login?email=${userInformation.email}&userName=${userInformation.userName}`)
            .then(response => response.json())
            .then(res => {
                if (res.sucsses) {
                    sessionStorage.setItem("userId", res.data.id);
                    navigate('/chat', { state : { userInformation } })
                }
                else {
                    setUserInformation({
                        email: '',
                        userName: '',
                    });
                }
                setIsSucsses(res.sucsses);
            })
    }

    return (
        <div>
            <main className="join-main">
                <div className="form-control">
                    <label >Email Address</label>
                    <input
                        value={userInformation.email}
                        onChange={handleChange}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email address..."
                        required
                    />
                </div>
                <div className="form-control">
                    <label>Username</label>
                    <input
                        value={userInformation.userName}
                        onChange={handleChange}
                        type="text"
                        name="userName"
                        id="username"
                        placeholder="Enter username..."
                        required
                    />
                </div>
                {!isSucsses &&
                    <div className="errMsg">User does not exist please register</div>}
                <div className="flex">
                    <button type="submit" className="btn" onClick={handleSubmit}>Login to Chat</button>
                </div>
            </main>
        </div>
    );
}
export default Login;