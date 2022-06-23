import React, { useContext, useEffect, useState } from 'react';
import '../assets/css/Login.css'
import logo from '../assets/img/log.png';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';

export const CreateUser = () => {
  const { register } = useContext(AuthContext);
  const redirect = useNavigate();
  const [registration, setRegistration] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(null);

  useEffect(() => {
    const submitRegistration = async () => {
      if (!registration) {
        return;
      }
      try {
        await register(registration);
        setShowErrorMessage(false)
        redirect('/');
      } catch (error) {
        setShowErrorMessage(true);
      }
    }
    submitRegistration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registration]);

  const handleSubmit = (e => {
    e.preventDefault();
    const payloadBody = {}
    for (const elem of e.target) {
      if (elem.name) {
        payloadBody[elem.name] = elem.value;
      }
    }
    setRegistration({ ...payloadBody });
  });

  return (
    <React.Fragment>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <img src={logo} width="100px" alt="User Icon" />
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" className="fadeIn second" name="firstName" placeholder="Nombre..." />
            <input type="text" className="fadeIn second" name="lastName" placeholder="Apellido..." />
            <input type="text" className="fadeIn second" name="email" placeholder="Correo..." />
            <input type="password" className="fadeIn third" name="password" placeholder="Password" />
            <input type="submit" className="fadeIn fourth" value="Crear" />
          </form>
          {showErrorMessage &&
            <div className="danger" role="alert">
              Error: No se pudo crear un usuario con estas credenciales.
            </div>
          }
        </div>
      </div>

    </React.Fragment>)
}

