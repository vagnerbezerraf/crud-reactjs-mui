import React, { useState, useEffect } from 'react';
import './App.css';
import MaterialTable from 'material-table'


function App() {
  const url = "https://localhost:49155/api/Evento"
  const [data, setData] = useState([])
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    fetch(url).then(resp => resp.json())
      .then(resp => setData(resp))
      .catch(erro => { console.error(erro) })
  }
  const columns = [
    { title: "ID", field: "id", editable: 'never'},
    { title: "Tipo Evento", field: "idtipoevento", type: "numeric",  validate: rowData => rowData.idtipoevento === undefined || rowData.idtipoevento === "" ? "Required" : true},
    { title: "Descrição", field: "descricao", validate: rowData => rowData.descricao === undefined || rowData.descricao === "" ? "Required" : true },
    { title: "Data Cadastro", field: 'data', type: "date" }
  ]

  return (
    <div className="App">
      <h1 align="center">CRUD Material UI With React</h1>
      <MaterialTable
        title="Eventos Cadastrados"
        columns={columns}
        data={data}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        editable={{
          onRowAdd: (newData) => new Promise((resolve, reject) => {
            //Backend call
            fetch(url, {
              method: "POST",
              headers: {
                'Content-type': "application/json"
              },
              body: JSON.stringify(newData)
            }).then(resp => resp.json())
              .then(resp => {
                getData()
                resolve()
              }).catch(erro => { console.error(erro)})
          }),
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
            //Backend call
            fetch(url + "/" + oldData.id, {
              method: "PUT",
              headers: {
                'Content-type': "application/json"
              },
              body: JSON.stringify(newData)
            }).then(resp => resp.json())
              .then(resp => {
                getData()
                resolve()
              })
              .catch(erro => { console.error(erro)})
          }),
          onRowDelete: (oldData) => new Promise((resolve, reject) => {
            //Backend call
            fetch(url + "/" + oldData.id, {
              method: "DELETE",
              headers: {
                'Content-type': "application/json"
              },

            }).then(resp => resp.json())
              .then(resp => {
                getData()
                resolve()
              }).catch(erro => { console.error(erro)}) 
          })
        }}
      />
    </div>
  );
}

export default App;
