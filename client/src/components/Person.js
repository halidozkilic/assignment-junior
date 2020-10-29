import React, { useState, useEffect } from "react";
import { Badge, Table, Button, Input, InputGroup } from "reactstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
import alertify from "alertifyjs";

function PersonPage() {
  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState([]);

  const { register, handleSubmit } = useForm();

   const onSubmit = (data, e) => {
    e.target.reset();
    console.log(data);

    alertify.success( "added to table",2);

    axios.post("http://localhost:5000/personApp/person/",data)
    .then(res=>console.log(res))
    .catch(err=>console.log(err));

   

    
  }; 

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

  function editPerson(person) {
    console.log(person._id);
    deneme = false;
  }

  function deletePerson(person) {
    alertify.error(person.name + " deleted from table", 2);
    axios.delete(`http://localhost:5000/personApp/person/${person._id}`).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  }

  function deleteAll() {
    alertify.error(" All records deleted from table", 2);

    axios.delete(`http://localhost:5000/personApp/deleteAll/`).then((res) => {
      console.log(res);
      console.log(res.data);
    });
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
            <th>
              <Button color="warning" onClick={() => deleteAll()}>
                delete All
              </Button>
            </th>
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
                <Button color="info" onClick={() => editPerson(person)}>
                  edit
                </Button>{" "}
                <Button color="danger" onClick={() => deletePerson(person)}>
                  delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

          <div> {/*not working with REACTSTRAP !!!!! */ }
      <form onSubmit={handleSubmit(onSubmit)}>
          <input ref={register} name="_id" placeholder="Enter id" />

          <input ref={register} name="name" placeholder="Enter name" />

          <input ref={register} name="surname" placeholder="Enter surname" />

          <input ref={register} name="tc" placeholder="Enter tc" />

          <input ref={register} name="phone" placeholder="Enter phone" />

          <button type="submit">Create person!</button>
        </form>
      </div>
    </div>
  );
}

export default PersonPage;
