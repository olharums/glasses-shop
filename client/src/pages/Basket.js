// import { observe } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Context } from "..";

const Basket = observer(() => {
  const { basket } = useContext(Context);

  const deleteItem = (item) => {
    basket.removeItem(item);
    localStorage.setItem("basket", JSON.stringify(basket.list));
  };
  const increaseQuantity = (item) => {
    basket.addItem(item);
    localStorage.setItem("basket", JSON.stringify(basket.list));
  };
  const decreaseQuantity = (item) => {
    basket.minimizeQuantity(item);
    localStorage.setItem("basket", JSON.stringify(basket.list));
  };

  useEffect(() => {
    basket.setList(JSON.parse(localStorage.getItem("basket")));
  }, []);

  const makeAnOrder = () => {};
  // const reducer = ;
  return (
    <Container>
      <h2 className="text-center m-4">Корзина</h2>
      {basket.list ? (
        <Row className="mt-2">
          <Col md={8}>
            {basket.list.map((arr) => {
              return (
                <Card className="p-4 mb-4" key={arr[0].type + arr[0].id}>
                  <Row style={{ display: "flex", alignItems: "center" }}>
                    <Col md={3}>
                      <img
                        alt="."
                        width={"200"}
                        height={"150"}
                        src={process.env.REACT_APP_API_URL + arr[0].img}
                      />
                    </Col>
                    <Col md={3} className={"ml-3"}>
                      <h3>{arr[0].name}</h3>
                      <h6>
                        <span style={{ color: "#a2a2a2" }}>
                          {arr[0].purpose
                            ? "Предназначение: "
                            : "Производство: "}
                        </span>
                        {arr[0].purpose || arr[0].manufacturer}
                      </h6>

                      <h6>
                        <span style={{ color: "#a2a2a2" }}>
                          {"Категория: "}
                        </span>
                        {arr[0].type === "accessories"
                          ? "Аксессуары"
                          : arr[0].type === "glasses"
                          ? "Очки"
                          : "Линзы"}
                      </h6>
                      <h4>
                        <span style={{ color: "#a2a2a2" }}>{"Цена: "}</span>
                        {arr[0].price}$
                      </h4>
                    </Col>
                    <Col style={{ display: "flex", alignItems: "center" }}>
                      <Row>
                        <Row className="mb-3">
                          <h4 className="text-center">Количество:</h4>
                        </Row>
                        <Row>
                          {/* <Col> */}
                          <Container
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-evenly",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              size="lg"
                              onClick={() => decreaseQuantity(arr[0])}
                            >
                              &minus;
                            </Button>

                            <h3 className="text-center">{arr[1]}</h3>
                            <Button
                              size="lg"
                              onClick={() => increaseQuantity(arr[0])}
                            >
                              +
                            </Button>
                          </Container>
                        </Row>
                      </Row>
                    </Col>
                    <Col
                      md={2}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Button
                        size="lg"
                        variant="outline-danger"
                        onClick={() => deleteItem(arr[0])}
                      >
                        Удалить
                      </Button>
                    </Col>
                  </Row>
                </Card>
              );
            })}
          </Col>
          <Col>
            <Card className="pt-3 pb-3">
              <h3 className="text-center">Товары:</h3>
              {basket.list.map((arr) => {
                return (
                  <Container className="p-4 mb-2" key={arr[0].type + arr[0].id}>
                    <Row style={{ display: "flex", alignItems: "center" }}>
                      <h3>{arr[0].name}</h3>
                    </Row>
                    <Row className="text-end">
                      <h4>
                        {arr[0].price}$ &times; {arr[1] + " = "}
                        {arr[0].price * arr[1]}$
                      </h4>
                    </Row>
                  </Container>
                );
              })}
              <Row className="text-end p-4">
                {/* <Col> */}
                <h2>
                  {"Итого: "}
                  {/* </h3> */}
                  {/* </Col>
                <Col> */}
                  {/* <h3> */}
                  {basket.list.length
                    ? basket.list.reduce((accumulator, arr) => {
                        return accumulator + arr[0].price * arr[1];
                      }, 0)
                    : ""}
                  $
                </h2>
                {/* </Col> */}
              </Row>
              <Container className="text-center mb-3">
                <Button size="lg" variant="success" onClick={makeAnOrder}>
                  Заказать
                </Button>
              </Container>
            </Card>
          </Col>
        </Row>
      ) : (
        <h3>Нет товаров</h3>
      )}
    </Container>
  );
});
export default Basket;
