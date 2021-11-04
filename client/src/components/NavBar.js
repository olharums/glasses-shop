import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Context } from "../index";
import {
  ADMIN_ROUTE,
  SHOP_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  BASKET_ROUTE,
} from "../utils/consts";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import image from "../images/icon.png";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const history = useHistory();
  const logOut = () => {
    user.setCurrentUser({});
    user.setIsAuth(false);
  };
  return (
    // <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Navbar
      className="navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#0a285d" }}
    >
      <Container>
        {/* <div className="container-fluid"> */}
        <NavLink to={SHOP_ROUTE} className="navbar-brand" href="#">
          <img
            src={image}
            alt=""
            width="35"
            height="30"
            className="d-inline-block align-text-top"
          />
          {/* ОПТИКА */}
          {/* </a> */}
        </NavLink>
        {/* </div> */}
        <NavLink to={SHOP_ROUTE} className="navbar-brand" href="#">
          ОПТИКА
        </NavLink>
        {/* <NavLink to={SHOP_ROUTE}>ОПТИКА</NavLink> */}
        <Button
          variant={"outline-success"}
          onClick={() => history.push(BASKET_ROUTE)}
        >
          Корзина
        </Button>
        {user.isAuth ? (
          <Nav>
            {" "}
            <Button
              variant={"outline-success"}
              onClick={() => history.push(ADMIN_ROUTE)}
            >
              База данных
            </Button>
            <Button variant={"outline-success"} onClick={() => logOut()}>
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav>
            {/* <NavLink to={REGISTRATION_ROUTE}> */}
            <Button
              variant={"outline-success"}
              onClick={() => history.push(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
            {/* </NavLink> */}
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
