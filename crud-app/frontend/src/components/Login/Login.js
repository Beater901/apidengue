import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post( 'http://localhost:3001/api/login', {email, password})
        .then(result => {
            console.log(result);
            if(result.data === "Success"){
                console.log("Inicio de sesión exitoso");
                alert('Inicio de sesión exitoso!')
                navigate('/home');
            }
            else{
                alert('Contraseña incorreca! Intente nuevamente por favor.');
            }
        })
        .catch(err => console.log(err));
    }


    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : "linear-gradient(#F6F5F7,#F6F5F7,rgba(245,246,248,.555))"}}>
                <div className="bg-white p-3 rounded" style={{width : '40%'}}>
                    <h2 className='mb-3 text-primary'>Iniciar sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email</strong>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Email"
                                className="form-control" 
                                id="exampleInputEmail1" 
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Contraseña</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Contraseña"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Conectarse</button>
                    </form>
                    {/* TO add ' appostopee */}
                    <p className='container my-2'>¿No tienes una cuenta?</p>
                    <Link to='/api/register' className="btn btn-secondary">Registrarse</Link>
                </div>
            </div>
        </div>
    )
};

export default Login;