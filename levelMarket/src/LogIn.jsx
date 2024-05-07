const LogIn = () => {

  return ( 
    <div className="p-4 m-4 align-middle">
      <form action="/submit-login" method="POST" className="w-1/2">
            <label htmlFor="username">Usuario:</label>
            <input type="text" id="username" name="username" required/>

            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" required/>

            <button>Iniciar Sesion</button>
        </form>
    </div>
  );
}
 
export default LogIn;