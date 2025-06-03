import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../img/imageninicio.png"; // Importa la imagen de fondo


export default function Login() {
  const navigate = useNavigate(); // Hook para la navegación

  // Estados para almacenar el email y la contraseña
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario

    try {
      // Envía una solicitud POST al backend para autenticar al usuario
      //const url = process.env.REACT_APP_API_BACK + "/api/login/";
      const url = process.env.REACT_APP_API_BACK + "/api/auth/";


      console.log(process.env.REACT_APP_API_BACK) 
      

      //const url = process.env.REACT_APP_API_BACK + "/login/";

      const response = await axios.post(url, {
        Email,
        Password,
        
      });

      // Verifica la respuesta del backend
      if (response.status === 200) {
        const { IdUsuario, Email, Nombres, Rol } = response.data.data;

        // Almacenar los datos en sessionStorage
        sessionStorage.setItem("IdUsuario", IdUsuario);
        sessionStorage.setItem("Email", Email);
        sessionStorage.setItem("Nombres", Nombres);
        sessionStorage.setItem("Rol", Rol);

        // Si el inicio de sesión es exitoso, actualiza el estado para ocultar el componente Login
        setIsLoggedIn(true);
        // Redirige al usuario
        navigate("/inicio");
      } else {
        // Si el backend devuelve un estado diferente, muestra un mensaje de error
        alert("El usuario o la contraseña son incorrectos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // alert("Error al iniciar sesión. Por favor, intenta nuevamente.");
      alert("El usuario o la contraseña son incorrectos mano 2");
    }
  };

  if (isLoggedIn) {
    return null; // No renderiza nada si el usuario está logueado
  }

  return (
    <div
      className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="mb-8 md:mb-0 md:mr-8 text-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold uppercase hover:scale-105 transition-transform duration-300">
          Avance de obras
        </h1>
      </div>
      <form
        className="bg-white/80 p-6 md:p-8 rounded-lg w-11/12 sm:w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-xl font-semibold mb-4">Inicio Sesión</h2>
        <input
          type="text"
          name="Email"
          placeholder="Ingrese su correo electrónico"
          value={Email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoFocus
          className="block w-full h-12 px-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          value={Password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="block w-full h-12 px-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
        />
        <label className="flex items-center mb-4 text-sm">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            className="h-4 w-4 mr-2"
          />
          Recordarme
        </label>
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>

  );
}
