import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Button, Card, Col, Container, Image, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import { PRODUCT_ROUTE } from "../utils/consts";

const ProductItem = observer(({ item }) => {
  const history = useHistory();
  const { basket } = useContext(Context);
  const addToBasket = () => {
    basket.addItem(item);
    localStorage.setItem("basket", JSON.stringify(basket.list));
  };
  return (
    <Col md={3} className="mb-4">
      <Card
        style={{
          height: "380px",
          cursor: "pointer",
          border: "1px solid #a2a2a2",
          display: "grid",
        }}
      >
        <Card
          onClick={(e) =>
            history.push(PRODUCT_ROUTE + "/" + item.type + "/" + item.id)
          }
          style={{
            // width: 150,
            border: "none",
            borderRadius: 0,
            borderBottom: "1px solid #a2a2a2",
          }}
        >
          <Image
            width={"auto"}
            height={"200"}
            src={process.env.REACT_APP_API_URL + item.img}
          />
        </Card>
        {/* <div style={{ height: "100" }}> */}
        <h5 className="text-center">{item.name}</h5>
        {/* </div> */}
        <h6 className="text-center">
          <span style={{ color: "#a2a2a2" }}>
            {item.purpose ? "Предназначение: " : "Производство: "}
          </span>
          {item.purpose || item.manufacturer}
        </h6>
        <h6 className="text-center">
          <span style={{ color: "#a2a2a2" }}>{"Цена: "}</span>
          {item.price}$
        </h6>
        <h6 className="text-center">
          <span style={{ color: "#a2a2a2" }}>{"Категория: "}</span>
          {item.type === "accessories"
            ? "Аксессуары"
            : item.type === "glasses"
            ? "Очки"
            : "Линзы"}
        </h6>
        {/* <div> */}
        <Container className="text-center">
          <Button size="sm" onClick={() => addToBasket()}>
            Добавить в корзину
          </Button>
        </Container>
        {/* </div> */}
      </Card>
      {/* <Modal show={show} onHide={onHide} size="lg" centered> */}
      <Modal size="sm" centered>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button>Close</Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
});
export default ProductItem;
