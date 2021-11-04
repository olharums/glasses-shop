import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown, Container } from "react-bootstrap";
import {
  createAccessories,
  createGlasses,
  editGlasses,
  fetchFrames,
  fetchProviders,
} from "../../http/productsAPI";
import { Context } from "../../index";

const GlassesTable = observer(({ edit, show, onHide, data }) => {
  const { frames } = useContext(Context);

  const id = data ? data.id : null;

  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(true);

  const [quantity, setQuantity] = useState("");
  const [quantityValid, setQuantityValid] = useState(true);

  const [color, setColor] = useState("");
  const [colorValid, setColorValid] = useState(true);

  const [price, setPrice] = useState("");
  const [priceValid, setPriceValid] = useState(true);

  const [purpose, setPurpose] = useState("");
  const [purposeValid, setPurposeValid] = useState(true);

  const [frame, setFrame] = useState("");
  const [frameValid, setFrameValid] = useState(true);

  const [image, setImage] = useState("");

  const dataFormation = () => {
    const formData = new FormData();
    formData.append("name", name ? name : data.name);
    formData.append("quantity", quantity ? quantity : data.quantity);
    formData.append("color", color ? color : data.color);
    formData.append("purpose", purpose ? purpose : data.purpose);
    formData.append("frameId", frame ? frame.id : data.frameId);
    formData.append("price", price ? price : data.price);
    return formData;
  };

  const checkEmpty = () => {
    setNameValid(true);
    setQuantityValid(true);
    setColorValid(true);
    setPurposeValid(true);
    setPriceValid(true);
    setFrameValid(true);

    if (!name) {
      setNameValid(false);
      return false;
    }
    if (!quantity) {
      setQuantityValid(false);
      return false;
    }
    if (!price) {
      setPriceValid(false);
      return false;
    }
    if (!color) {
      setColorValid(false);
      return false;
    }

    if (!purpose) {
      setPurposeValid(false);
      return false;
    }
    if (!frame) {
      setFrameValid(false);
      return false;
    }
    return true;
  };

  const clearing = () => {
    setName("");
    setQuantity("");
    setColor("");
    setPrice("");
    setPurpose("");
    setFrame("");
    setImage("");
  };

  const addRecord = () => {
    if (checkEmpty()) {
      const formData = dataFormation();
      formData.append("img", image);

      createGlasses(formData).then((data) => {
        clearing();
        onHide();
      });
    }
  };

  const editRecord = () => {
    const formData = dataFormation();
    formData.append("id", id);
    editGlasses(formData).then((data) => {
      clearing();
      onHide();
    });
  };

  useEffect(() => {
    fetchFrames().then((data) => frames.setTypes(data));
  }, []);

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>{edit ? "Изменить" : "Добавить"} запись</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="d-flex flex-column text-center">
          <Form.Control
            className={"mb-3" + (nameValid ? "" : " is-invalid")}
            placeholder={data && data.name ? data.name : "Название"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Form.Control
            className={"mb-3" + (quantityValid ? "" : " is-invalid")}
            placeholder={data && data.quantity ? data.quantity : "Количество"}
            onChange={(e) => setQuantity(Number(e.target.value))}
            value={quantity}
          />
          <Form.Control
            className={"mb-3" + (priceValid ? "" : " is-invalid")}
            placeholder={data && data.price ? data.price : "Цена"}
            onChange={(e) => setPrice(Number(e.target.value))}
            value={price}
          />
          <Form.Control
            className={"mb-3" + (colorValid ? "" : " is-invalid")}
            placeholder={data && data.color ? data.color : "Цвет"}
            type="text"
            onChange={(e) => setColor(e.target.value)}
            value={color}
          />
          <Form.Control
            className={"mb-3" + (purposeValid ? "" : " is-invalid")}
            placeholder={data && data.purpose ? data.purpose : "Предназначение"}
            onChange={(e) => setPurpose(e.target.value)}
            value={purpose}
          />
          <Dropdown className="mb-3">
            <Dropdown.Toggle variant={frameValid ? "primary" : "danger"}>
              {frame
                ? frame.name
                : data && data.frameId
                ? frames.getFrameById(data.frameId)
                : "Выберите оправу"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {frames.types.map((frame) => (
                <Dropdown.Item
                  key={frame.name}
                  onClick={(e) => setFrame(frame)}
                >
                  {frame.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Container className="center">
            <Form.Control
              hidden={edit}
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            onHide();
            clearing();
          }}
        >
          Закрыть
        </Button>
        <Button
          onClick={edit ? editRecord : addRecord}
          variant={edit ? "warning" : "success"}
        >
          {edit ? "Изменить" : "Добавить"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
});
export default GlassesTable;
