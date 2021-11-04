import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Button, Card, Container, Form } from "react-bootstrap";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { login, registration } from "../http/userAPI";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useHistory();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password, full_name, phone_number);
      }
      console.log("data", data);
      // user.setUser(user); //was
      user.setCurrentUser(data);
      user.setIsAuth(true);
      history.push(SHOP_ROUTE); //redirect to the page
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  // console.log(isLogin);
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Войти" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Form.Control
            className="mt-3"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
          {!isLogin ? (
            <div>
              <Form.Control
                className="mt-3"
                placeholder="Full name"
                onChange={(e) => setFullName(e.target.value)}
                value={full_name}
              />
              <Form.Control
                className="mt-3"
                placeholder="Phone number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phone_number}
              />
            </div>
          ) : (
            ""
          )}
          <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                No account?{" "}
                <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
              </div>
            ) : (
              <div>
                Have account? <NavLink to={LOGIN_ROUTE}>Войти!</NavLink>
              </div>
            )}
            <Button
              style={{ width: 100 }}
              // className="justify-content-end"
              variant={"outline-warning"}
              onClick={click}
            >
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>{" "}
          </div>
        </Form>
      </Card>
    </Container>
  );
});
export default Auth;
