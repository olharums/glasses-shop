import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { Context } from "..";
import DataTable from "../components/DataTable";
import { fetchAllOrders } from "../http/ordersAPI";
import {
  fetchAccessories,
  fetchFrames,
  fetchGlasses,
  fetchLenses,
} from "../http/productsAPI";
import { fetchProviders } from "../http/providersAPI";

import { fetchAllUsers } from "../http/userAPI";
const Admin = observer(() => {
  const { providers, product, frames, user, orders } = useContext(Context);
  const [data, setData] = useState([]);
  const [tableName, setTableName] = useState("");

  const handleAccessories = () => {
    fetchAccessories().then((data) => {
      product.setAccessories(data.rows);
      setData(data.rows);
    });
    setTableName("accessories");
  };
  const handleGlasses = () => {
    fetchGlasses().then((data) => {
      product.setGlasses(data.rows);
      setData(data.rows);
    });
    setTableName("glasses");
  };
  const handleLenses = () => {
    fetchLenses().then((data) => {
      product.setLenses(data.rows);
      setData(data.rows);
    });
    setTableName("lenses");
  };
  const handleProviders = () => {
    fetchProviders().then((data) => {
      providers.setTypes(data);
      setData(data);
    });
    setTableName("providers");
  };
  const handleFrames = () => {
    fetchFrames().then((data) => {
      frames.setTypes(data);
      setData(data);
    });
    setTableName("frames");
  };
  const handleUsers = () => {
    fetchAllUsers().then((data) => {
      user.setAllUsers(data);
      setData(data);
    });
    setTableName("users");
  };
  const handleOrders = () => {
    fetchAllOrders().then((data) => {
      orders.setTypes(data);
      setData(data);
    });
    setTableName("orders");
  };

  return (
    <Container>
      {/* <h1 className="text-center m-3">Таблицы</h1> */}
      <ButtonGroup className="d-flex flex-row justify-content-center mt-4">
        <Button onClick={handleUsers}>Клиенты</Button>
        <Button onClick={handleOrders}>Заказы</Button>
        <Button onClick={handleLenses}>Линзы</Button>
        <Button onClick={handleGlasses}>Очки</Button>
        <Button onClick={handleFrames}>Оправы</Button>
        <Button onClick={handleAccessories}>Аксессуары</Button>
        <Button onClick={handleProviders}>Поставщики</Button>
      </ButtonGroup>
      {tableName ? (
        <DataTable
          data={data}
          tableName={tableName}
          // handleUsers={handleUsers}
          handleOrders={handleOrders}
          handleLenses={handleLenses}
          handleGlasses={handleGlasses}
          handleFrames={handleFrames}
          handleAccessories={handleAccessories}
          handleProviders={handleProviders}
        />
      ) : (
        <h3 className="text-center mt-4">Выберите таблицу</h3>
      )}
      {/* {table} */}
    </Container>
  );
});
export default Admin;
