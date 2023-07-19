import { useState } from "react";

export default function Login({onLogin, name,isLoadingSend}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }
  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(email, password);
  }

  return (
    <>      
      <section className="login page_login">
        <h2 className="login__title">Вход</h2>
        <form className="login__form form" 
                  action="#"
                  name={name}
                  noValidate
                  onSubmit={handleSubmit}

                  >
          
          <input
            
            className="login__form-input"
            placeholder="Email"
            name="email"
            type="email"
            required
            onChange={handleEmailChange}
          ></input>


          <input
            className="login__form-input"
            placeholder="Пароль"
            name="password"
            type="password"
            required
            onChange={handlePasswordChange}
          ></input>
          <span className="popup__error-span"></span>
          <button className="login__form-submit-button decoration" type="submit">
          {isLoadingSend ? 'Войти' +'...' : 'Войти'}
          </button>

        </form>

      </section>
    </>
  );
}

