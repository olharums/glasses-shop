import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown, Container } from "react-bootstrap";
import { createOrders, editOrders } from "../../http/ordersAPI";
import {
  fetchAccessories,
  fetchGlasses,
  fetchLenses,
} from "../../http/productsAPI";
import { Context } from "../../index";
import QuantityButton from "../QuantityButton";

const OrdersTable = observer(({ edit, show, onHide, data }) => {
  const { product, user } = useContext(Context);

  const id = data ? data.id : null;

  const [sum, setSum] = useState(0);

  const [accessoriesData, setAccessoriesData] = useState("");
  const [accessoriesQuantity, setAccessoriesQuantity] = useState(0);

  const [glassesData, setGlassesData] = useState("");
  const [glassesQuantity, setGlassesQuantity] = useState(0);

  const [lensesData, setLensesData] = useState("");
  const [lensesQuantity, setLensesQuantity] = useState(0);

  const [orderValid, setOrderValid] = useState(true);

  const [sumInfo, setSumInfo] = useState(true);

  const calculateSum = () => {
    let commonPrice = 0;
    commonPrice += accessoriesData
      ? accessoriesData.price
      : data && data.accessoryId
      ? product.getAccessoriesById(data.id).price
      : 0;
    commonPrice += glassesData
      ? glassesData.price
      : data && data.glassId
      ? product.getGlassesById(data.id).price
      : 0;
    if (lensesData) {
      commonPrice += lensesData
        ? lensesData.price
        : data && data.lenseId
        ? product.getLensesById(data.id).price
        : 0;
    }

    setSum(commonPrice);
    return commonPrice;
  };

  const dataFormation = () => {
    const formData = new FormData();
    let orderDate = new Date();
    formData.append("date", data ? data.date : orderDate.toLocaleDateString());
    formData.append("sum", calculateSum());
    formData.append("userId", data ? data.userId : user.currentUser.id);
    if (accessoriesQuantity || (data && data.accessoriesQuantity)) {
      formData.append("accessoryId", accessoriesData.id);
      formData.append("accessoriesQuantity", accessoriesQuantity);
    }
    if (glassesQuantity || (data && data.glassesQuantity)) {
      formData.append("glassId", glassesData.id);
      formData.append("glassesQuantity", glassesQuantity);
    }
    if (lensesQuantity || (data && data.lensesQuantity)) {
      formData.append("lenseId", lensesData.id);
      formData.append("lensesQuantity", lensesQuantity);
    }
    return formData;
  };

  const checkEmpty = () => {
    setOrderValid(true);

    if (!accessoriesData && !glassesData && !lensesData) {
      setOrderValid(false);
      return false;
    }
    return true;
  };

  const clearing = () => {
    setAccessoriesData("");
    setGlassesData("");
    setLensesData("");
    setAccessoriesQuantity(0);
    setGlassesQuantity(0);
    setLensesQuantity(0);
    setSumInfo(true);
    setSum(0);
  };

  const addRecord = () => {
    if (checkEmpty()) {
      const formData = dataFormation();
      createOrders(formData).then((data) => {
        clearing();
        onHide();
      });
    }
  };

  const editRecord = () => {
    const formData = dataFormation();
    formData.append("id", id);
    editOrders(formData).then((data) => {
      clearing();
      onHide();
    });
  };

  useEffect(() => {
    fetchAccessories().then((data) => product.setAccessories(data.rows));
    fetchGlasses().then((data) => product.setGlasses(data.rows));
    fetchLenses().then((data) => product.setLenses(data.rows));
  }, []);
  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header>
        <Modal.Title>{edit ? "Изменить" : "Добавить"} запись</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="d-flex flex-column text-center">
          <Dropdown className="mb-3">
            <Dropdown.Toggle variant={orderValid ? "primary" : "danger"}>
              {accessoriesQuantity || (data && data.accessoriesQuantity)
                ? accessoriesData
                  ? accessoriesData.name
                  : data && data.accessoryId
                  ? product.getAccessoriesById(data.accessoryId).name
                  : "Выберите аксессуар"
                : "Выберите аксессуар"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {product.accessories.map((acc) => (
                <Dropdown.Item
                  key={acc.name}
                  onClick={(e) => {
                    setAccessoriesData(acc);
                    setSumInfo(true);
                    setAccessoriesQuantity(1);
                  }}
                >
                  {acc.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <QuantityButton
            access={Boolean(
              accessoriesQuantity || (data && data.accessoriesQuantity)
            )}
            value={
              accessoriesQuantity
                ? accessoriesQuantity
                : data && data.accessoriesQuantity
                ? data.accessoriesQuantity
                : 0
            }
            setValue={setAccessoriesQuantity}
          />
          <Dropdown className="mb-3">
            <Dropdown.Toggle variant={orderValid ? "primary" : "danger"}>
              {glassesQuantity || (data && data.glassesQuantity)
                ? glassesData
                  ? glassesData.name
                  : data && data.glassId
                  ? product.getGlassesById(data.glassId).name
                  : "Выберите очки"
                : "Выберите очки"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {product.glasses.map((gl) => (
                <Dropdown.Item
                  key={gl.name}
                  onClick={(e) => {
                    setGlassesData(gl);
                    setSumInfo(true);
                    setGlassesQuantity(1);
                  }}
                >
                  {gl.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <QuantityButton
            access={Boolean(glassesQuantity || (data && data.glassesQuantity))}
            value={
              glassesQuantity
                ? glassesQuantity
                : data && data.glassesQuantity
                ? data.glassesQuantity
                : 0
            }
            setValue={setGlassesQuantity}
          />
          <Dropdown className="mb-3">
            <Dropdown.Toggle variant={orderValid ? "primary" : "danger"}>
              {lensesQuantity || (data && data.lensesQuantity)
                ? lensesData
                  ? lensesData.name
                  : data && data.lenseId
                  ? product.getLensesById(data.lenseId).name
                  : "Выберите линзы"
                : "Выберите линзы"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {product.lenses.map((lens) => (
                <Dropdown.Item
                  key={lens.name}
                  onClick={(e) => {
                    setLensesData(lens);
                    setSumInfo(true);
                    setLensesQuantity(1);
                  }}
                >
                  {lens.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <QuantityButton
            access={Boolean(lensesQuantity || (data && data.lensesQuantity))}
            value={
              lensesQuantity
                ? lensesQuantity
                : data && data.lensesQuantity
                ? data.lensesQuantity
                : 0
            }
            setValue={setLensesQuantity}
          />
          <Container>
            <Button
              variant="warning"
              onClick={() => {
                setSumInfo(false);
                calculateSum();
              }}
            >
              {sumInfo ? "Показать" : "Обновить"} сумму
            </Button>
            <h3 hidden={sumInfo} className="mt-3 text-center">
              Сумма: {sum}$
            </h3>
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
export default OrdersTable;
