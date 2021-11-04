import React, { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { deleteOrders } from "../http/ordersAPI";
import {
  deleteAccessories,
  deleteFrames,
  deleteGlasses,
  deleteLenses,
} from "../http/productsAPI";
import { deleteProviders } from "../http/providersAPI";
import AddRecord from "./Modal/AddRecord";
import EditRecord from "./Modal/EditRecord";

const DataTable = ({
  titles,
  data,
  tableName,
  // handleUsers,
  handleOrders,
  handleLenses,
  handleGlasses,
  handleFrames,
  handleAccessories,
  handleProviders,
}) => {
  const [editShow, setEditShow] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);

  const [addShow, setAddShow] = useState(false);

  const handleTable = () => {
    if (tableName === "accessories") {
      handleAccessories();
    } else if (tableName === "frames") {
      handleFrames();
    } else if (tableName === "glasses") {
      handleGlasses();
    } else if (tableName === "lenses") {
      handleLenses();
    } else if (tableName === "providers") {
      handleProviders();
    } else if (tableName === "orders") {
      handleOrders();
      // } else if (tableName === "users") {
      //   handleUsers();
    }
  };

  const deleteElem = (tableName, id) => {
    if (tableName === "accessories") {
      deleteAccessories(id).then((data) => handleAccessories());
    } else if (tableName === "frames") {
      deleteFrames(id).then((data) => handleFrames());
    } else if (tableName === "glasses") {
      deleteGlasses(id).then((data) => handleGlasses());
    } else if (tableName === "lenses") {
      deleteLenses(id).then((data) => handleLenses());
    } else if (tableName === "providers") {
      deleteProviders(id).then((data) => handleProviders());
    } else if (tableName === "orders") {
      deleteOrders(id).then((data) => handleOrders());
    }
  };
  return (
    <Container className="mt-5 text-center">
      <Container className="mb-4" hidden={tableName === "users"}>
        <Button variant="outline-success" onClick={() => setAddShow(true)}>
          Добавить запись
        </Button>
      </Container>
      <Container>
        {data.length ? (
          <Table>
            <thead>
              <tr className="text-center">
                {Object.keys(data[0])
                  .filter(
                    (elem) =>
                      elem !== "createdAt" &&
                      elem !== "updatedAt" &&
                      elem !== "type"
                  )
                  .map((col) => {
                    return (
                      <th key={col} scope="col">
                        {col}
                      </th>
                    );
                  })}
                {tableName === "users" ? "" : <th scope="col"></th>}
                {tableName === "users" ? "" : <th scope="col"></th>}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => {
                return (
                  <tr key={row.id}>
                    {Object.keys(row)
                      .filter(
                        (elem) =>
                          elem !== "createdAt" &&
                          elem !== "updatedAt" &&
                          elem !== "type"
                      )
                      .map((k) => {
                        return (
                          <td key={k + row[k]} className="text-center">
                            {row[k]}
                          </td>
                        );
                      })}
                    {tableName === "users" ? (
                      ""
                    ) : (
                      <td className="text-center">
                        <Button
                          variant="outline-warning"
                          onClick={() => {
                            setRowToEdit(row);
                            setEditShow(true);
                          }}
                        >
                          Редакт.
                        </Button>
                      </td>
                    )}
                    {tableName === "users" ? (
                      ""
                    ) : (
                      <td className="text-center">
                        <Button
                          variant="outline-danger"
                          onClick={(e) => {
                            deleteElem(tableName, row.id);
                          }}
                        >
                          Удалить
                        </Button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <h3>Таблица пуста</h3>
        )}
      </Container>
      <AddRecord
        tableName={tableName}
        placeholders={titles}
        show={addShow}
        onHide={() => {
          handleTable();
          setAddShow(false);
        }}
      />{" "}
      <EditRecord
        tableName={tableName}
        row={rowToEdit}
        // placeholders={titles}
        show={editShow}
        onHide={() => {
          handleTable();
          setEditShow(false);
        }}
      />
    </Container>
  );
};
export default DataTable;
