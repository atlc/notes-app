import React, { useEffect, useState } from 'react';
import { RiMailSendFill, RiLockPasswordFill } from 'react-icons/ri';
import { useToaster } from '../../../hooks/useToaster';
import Loader from '../../../components/Loader';
import { POST } from '../../../services/api';
import { useHistory } from 'react-router-dom';
import { useAuthState } from '../../../hooks/useAuthState';

const LoginRegister = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formDone, setFormDone] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const bathBomb = useToaster();
    const history = useHistory();
    const { setIsLoggedIn } = useAuthState();


    useEffect(() => {
        if (email && password && (isRegistering ? username : true)) {
            setFormDone(true);
        } else {
            setFormDone(false);
        }
    }, [username, email, password, isRegistering]);


    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!formDone) return;
        setShowLoader(true);


        const data: { [key: string]: string } = {
            username,
            email,
            password
        }

        if (!isRegistering) {
            delete data.username;
        }

        try {
            const res = await POST(`/auth/${isRegistering ? 'register' : 'login'}`, data)
            if (res.token) {
                setIsLoggedIn(true);
                setShowLoader(false);
                bathBomb({ message: `User was ${isRegistering ? 'registered' : 'logged in'}!`, time_ms: 1500 })
                    .then((tid) => {
                        localStorage.clear();
                        localStorage.setItem('token', res.token);
                        localStorage.setItem('user_id', res.id);
                        history.push('/profile');
                    })
            } else {
                setShowLoader(false);
            }
        } catch (error) {
            setShowLoader(false);
            bathBomb({ message: error, type: 'error', time_ms: 6000 });
        }
    }

    if (showLoader) {
        return <Loader loadingText={isRegistering ? 'Registering user' : 'Logging in'} />
    }

    return (
        <div className='rounded-3 col-sm-10 col-md-6 col-lg-4 p-5 shadow border-2' style={{ "backgroundColor": "#dadfdf" }}>
            <h1 style={{ "color": "#223636" }}>{isRegistering ? 'Register!' : 'Log In!'}<button onClick={() => setIsRegistering(!isRegistering)} className='btn link-success'>{isRegistering ? 'Go back to login?' : 'Need to register?'}</button></h1>
            <form className='w-100 mt-5'>
                {isRegistering && <div className="form-group">
                    <label style={{ "color": "#223636" }}><h4><strong>@</strong> Username</h4></label>
                    <input value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} maxLength={24} type="text" className="form-control" />
                    {isRegistering && <small className="form-text text-muted text-right">{username.length} / 24</small>}
                </div>}
                <div className="form-group">
                    <label style={{ "color": "#223636" }}><h4><RiMailSendFill /> Email address</h4></label>
                    <input value={email} maxLength={64} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="email" className="form-control" />
                    {isRegistering && <small className="form-text text-muted text-right">{email.length} / 64</small>}
                </div>
                <div className="form-group">
                    <label style={{ "color": "#223636" }}><h4><RiLockPasswordFill /> Password</h4></label>
                    <input value={password} maxLength={72} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type="password" className="form-control" />
                    {isRegistering && <small className="form-text text-muted text-right">{password.length} / 72</small>}
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={!formDone} type="submit"
                    style={{ "backgroundColor": "#2f4f4f", "color": "#dadfdf" }}
                    className="mt-2 btn btn-primary"
                >{formDone ? isRegistering ? 'Register' : 'Login' : 'Please ensure all fields are filled out'}</button>
            </form>
        </div>
    )
}

export default LoginRegister;