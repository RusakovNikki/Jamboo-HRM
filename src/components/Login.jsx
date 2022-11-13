import React from "react"

const Login = () => {
  function createNewUser(e) {
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={createNewUser}>
        <label htmlFor="role">Кем вы являетесь?</label>
        <br />
        <select name="role" id="role">
          <option value="employee">Я сотрубник компании</option>
          <option value="supervisor">Я являюсь руководителем команды</option>
        </select>
        <br />
        <input type="text" placeholder="Введите никнейм" name="userName" />{" "}
        <br />
        <input
          type="password"
          placeholder="Введите пароль"
          name="password"
        />{" "}
        <br />
        {/* <input type="file" name="logo" accept="image/*" id="" /> */}
        <br />
        <input type="submit" value="Создать аккаунт" />
      </form>
    </div>
  )
}

export default Login
