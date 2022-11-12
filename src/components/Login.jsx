import React from "react"

const Login = () => {
  return (
    <div>
      <form>
        <label htmlFor="role">Кем вы являетесь?</label>
        <br />
        <select name="role" id="role">
          <option value="employee">Я сотрубник компании</option>
          <option value="employee">Я являюсь руководителем команды</option>
        </select>
        <br />
        <input type="text" placeholder="Введите никнейм" name="login" /> <br />
        <input
          type="password"
          placeholder="Введите пароль"
          name="password"
        />{" "}
        <br />
        <input type="file" name="logo" accept="image/*" id="" />
        <br />
        <button>Создать аккаунт</button>
      </form>
    </div>
  )
}

export default Login
