import React, { useContext, useEffect, useState } from 'react';
import '../assets/css/Login.css'
import logo from '../assets/img/log.png';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';
import storage from '../utils/storage';



export const Login = () => {

  const { login } = useContext(AuthContext);
  const redirect = useNavigate();
  const [credentials, setCredentials] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(null);

  useEffect(() => {
    if(storage.getToken()){
      redirect('/redirect');
    }
  });
  useEffect(() => {
    const submitCredentials = async () => {
      if (!credentials) {
        return;
      }
      try {
        const { email, password } = credentials;
        await login(email, password);
        setShowErrorMessage(false)
        redirect('/redirect');
      } catch (error) {
        setShowErrorMessage(true);
      }
    }
    submitCredentials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials]);

  const handleSubmit = (e => {
    e.preventDefault();
    const payloadBody = {}
    for (const elem of e.target) {
      if (elem.name) {
        payloadBody[elem.name] = elem.value;
      }
    }
    setCredentials({ ...payloadBody });
  });
const toRegistrationPage = () => {redirect('/register')}  

  return (
    <React.Fragment>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <img src={logo} width="100px" alt="User Icon" />
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" className="fadeIn second" name="email" placeholder="correo..." />
            <input type="password" className="fadeIn third" name="password" placeholder="Password" />
            <input type="submit" className="fadeIn fourth" value="Log In" />
          </form>
          {showErrorMessage &&
            <div className="danger" role="alert">
              Error: No se pudo logear con estas credenciales
            </div>
          }
        </div>
        <div id="formFooter">
         <button onClick={toRegistrationPage} className='buttonreg fadeIn'>Registrate</button>
         </div>
      </div>

    </React.Fragment>)
}