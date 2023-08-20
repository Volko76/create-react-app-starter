import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Update() {
  const navigate = useNavigate();
  const [order_id, setOrderID] = useState(null);
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [est_arrive, setEstArrive] = useState(false);

  useEffect(() => {
    setOrderID(localStorage.getItem('Order_ID'));
    setPrenom(localStorage.getItem('Prenom'));
    setNom(localStorage.getItem('Nom'));
    setEstArrive(localStorage.getItem('Est_Arrive'));
  }, []);

  const updateAPIData = () => {
    axios
      .put(`updating/${order_id}`, {
        order_id,
        prenom,
        nom,
        est_arrive
      })
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        console.error('Error updating data: ', error);
      });
  };

  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <label>Prenom</label>
          <input
            placeholder="Prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Nom</label>
          <input
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="I agree to the Terms and Conditions"
            checked={est_arrive}
            onChange={() => setEstArrive(!est_arrive)}
          />
        </Form.Field>
        <Button type="submit" onClick={updateAPIData}>
          Modifier
        </Button>
      </Form>
    </div>
  );
}