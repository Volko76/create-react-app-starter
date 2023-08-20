import React, { useState, useEffect } from 'react';
import { Table, Button, Input } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Read() {
    const [APIData, setAPIData] = useState([]);
    const [order_id, setOrderID] = useState();




    const setData = (data) => {
        let { order_id, prenom, nom, est_arrive } = data;
        localStorage.setItem('Order_ID', order_id);
        localStorage.setItem('Prenom', prenom);
        localStorage.setItem('Nom', nom);
        localStorage.setItem('Est_Arrive', est_arrive)
    }

    const onDelete = (id) => {
        axios.delete(`delete/${id}`)
            .then(() => {
                getData();
            })
    }

    const getData = (id) => {
        axios.get(`all/${id}`)
            .then((response) => {
                setAPIData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }
    return (
        <div>
            <Input type='text' placeholder='Input Order ID' action  onChange={
                (e) => {
                    setOrderID(e.target.value)
                    console.log(order_id)
                }
            }>
                <input />
                <Button type='submit' onClick={(e) => getData(order_id)}>Search</Button>
            </Input>

            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Prenom</Table.HeaderCell>
                        <Table.HeaderCell>Nom</Table.HeaderCell>
                        <Table.HeaderCell>Colis Remis</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => (
                        <Table.Row key={data.order_id}>
                            <Table.Cell>{data.prenom}</Table.Cell>
                            <Table.Cell>{data.nom}</Table.Cell>
                            <Table.Cell>{data.est_arrive ? 'Oui' : 'Pas encore'}</Table.Cell>
                            <Link to='/update'>
                                <Table.Cell>
                                    <Button onClick={() => setData(data)}>Modifier</Button>
                                </Table.Cell>
                            </Link>
                            <Table.Cell>
                                <Button onClick={() => onDelete(data.order_id)}>Supprimer</Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}