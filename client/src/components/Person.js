import React, { useState, useEffect } from "react";
import { Badge, Table, Button } from "reactstrap";
import axios from 'axios';

function PersonPage() {
  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:5000/personApp/person/");
      res
        .json()
        .then((res) => setData(res))
        .catch((err) => setErrors(err));
    }

    fetchData();
  });

  var deneme = false;

  function editPerson() {
    console.log();
    deneme = false;
  }

  function deletePerson(id) {
    console.log(id);
    axios.delete(`http://localhost:5000/personApp/person/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    
  }

  function deleteAll()
  {
    axios.delete(`http://localhost:5000/personApp/person/deleteAll}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

  }

  return (
    <div className="container">
      <Badge color="info">Person</Badge>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Surname</th>
            <th>TC No</th>
            <th>Phone</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {data.map((person) => (
            <tr key={person._id}>
              <th scope="row">{person.id}</th>

              <td>{person.name}</td>
              <td>{person.surname}</td>
              <td>{person.tc}</td>
              <td>{person.phone}</td>
              <td>
                <Button onClick={() => editPerson()}>edit</Button>

                <Button onClick={() => deletePerson(person._id)}>delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PersonPage;
