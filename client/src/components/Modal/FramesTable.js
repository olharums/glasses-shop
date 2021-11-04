import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import {
  createAccessories,
  createFrames,
  editFrames,
  fetchProviders,
} from "../../http/productsAPI";
import { check } from "../../http/userAPI";
import { Context } from "../../index";

const FramesTable = observer(({ edit, show, onHide, data }) => {
  const { frames } = useContext(Context);

  const id = data ? data.id : null;

  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(true);

  const dataFormation = () => {
    const formData = new FormData();
    formData.append("name", name ? name : data.name);
    return formData;
  };

  const checkEmpty = () => {
    if (!name) {
      setNameValid(false);
      return false;
    }
    return true;
  };

  const addRecord = () => {
    if (checkEmpty()) {
      const formData = dataFormation();
      createFrames(formData).then((data) => {
        setName("");
        setNameValid(true);
        onHide();
      });
    }
  };

  const editRecord = () => {
    const formData = dataFormation();
    formData.append("id", id);
    editFrames(formData).then((data) => {
      setName("");
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            onHide();
            setName("");
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
export default FramesTable;
