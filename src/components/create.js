import React, { useState, useRef, useEffect } from 'react';
import { Button, Message, Form, Grid, Segment, Header, Divider, Input } from 'semantic-ui-react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import jsPDF from 'jspdf';
import QRCode from 'qrcode.react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';

export default function Create() {
  let history = useNavigate();
  const [prenom, setFirstName] = useState('');
  const [nom, setLastName] = useState('');
  const [addresse, setAdresse] = useState('');
  const [telephone, setTelephone] = useState('');
  const [hauteur, setHauteur] = useState('');
  const [largeur, setLargeur] = useState('');
  const [poids, setPoids] = useState('');
  const [prenomDest, setPrenomDest] = useState('');
  const [nomDest, setNomDest] = useState('');
  const [addresseDest, setAdresseDest] = useState('');
  const [telephoneDest, setTelephoneDest] = useState('');
  const [orderId, setOrderId] = useState(null);
  const [formData, setFormData] = useState({})
  const qrCodeRef = useRef(null);

  // Convert the formData object to a string
  const qrCodeValue = JSON.stringify(formData);

  const postData = () => {
    setFormData({
      nom: nom,
      prenom: prenom,
      addresse: addresse,
      telephone: telephone,
      hauteur: hauteur,
      largeur: largeur,
      poids: poids,
      prenomDest: prenomDest,
      nomDest: nomDest,
      addresseDest: addresseDest,
      telephoneDest: telephoneDest
    });
    axios
      .post('add', {
        nom: nom,
        prenom: prenom,
        addresse: addresse,
        telephone: telephone,
        hauteur: hauteur,
        largeur: largeur,
        poids: poids,
        prenomDest: prenomDest,
        nomDest: nomDest,
        addresseDest: addresseDest,
        telephoneDest: telephoneDest
      })
      .then((res) => {
        const orderId = res.data.orderId; // Assuming the order ID is returned in the response data
        console.log('Order ID:', orderId); // Print the order ID
        setOrderId(orderId);

        html2canvas(document.querySelector('#qrCodeContainer')).then((canvas) => {
          const qrCodeDataUri = canvas.toDataURL('image/jpeg');

          const pdf = new jsPDF();
          pdf.setFontSize(12);
          pdf.text(`Nom: ${nom}`, 10, 10);
          pdf.text(`Prénom: ${prenom}`, 10, 20);
          pdf.text(`Adresse: ${addresse}`, 10, 30);

          // Calculate the aspect ratio of the QR code image
          const qrCodeWidth = 500;
          const qrCodeHeight = qrCodeWidth * (canvas.height / canvas.width);

          // Add the QR code image to the PDF
          pdf.addImage(qrCodeDataUri, 'JPEG', 10, 40, qrCodeWidth, qrCodeHeight);

          pdf.save('form.pdf'); // Trigger the download of the PDF
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  return (
    <div>
      {orderId && (
        <div>
          <Message success>
            <Message.Header>Payement accepté !</Message.Header>
            <Message.Content>
              Voici votre numéro de suivi de colis: {orderId}
            </Message.Content>
            <Message.Content>
              Partagez le avec le destinataire afin qu'il puisse suivre son colis !
            </Message.Content>
            <div id="qrCodeContainer">
                        
              <QRCodeSVG ref={qrCodeRef} value={qrCodeValue} />
            </div>
          </Message>
        </div>
      )}
      <Form className="create-form">

        <Segment>
          <Grid columns={2} relaxed='very'>
            <Grid.Column>
              <Divider horizontal>
                <Header as='h4' inverted color='grey'>
                  Expéditeur :
                </Header>
              </Divider>
              <Form.Field required>
                <label>Prenom</label>
                <input placeholder="Prenom" onChange={(e) => setFirstName(e.target.value)} />
              </Form.Field>
              <Form.Field required>
                <label>Nom</label>
                <input placeholder="Nom" onChange={(e) => setLastName(e.target.value)} />
              </Form.Field>
              <Form.Field required>
                <label>Addresse</label>
                <input placeholder="Addresse" onChange={(e) => setAdresse(e.target.value)} />
              </Form.Field>
              <Form.Field required>
                <label>Numéro de téléphone</label>
                <input placeholder="Téléphone" onChange={(e) => setTelephone(e.target.value)} />
              </Form.Field>
              <Form.Field required>
                <label>Hauteur</label>
                <input placeholder="Hauteur" onChange={(e) => setHauteur(e.target.value)} />
              </Form.Field>
              <Form.Field required>
                <label>Largeur</label>
                <input placeholder="Largeur" onChange={(e) => setLargeur(e.target.value)} />
              </Form.Field>
              <Form.Field required >
                <label>Poids</label>
                <Input
                  label={{ basic: true, content: 'kg' }}
                  labelPosition='right'
                  placeholder='Poids'
                  onChange={(e) => setPoids(e.target.value)}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Divider horizontal>
                <Header as='h4' inverted color='grey'>
                  Destinataire :
                </Header>
              </Divider>
              <Form.Field required>
                <label>Prenom</label>
                <input placeholder="Prenom" onChange={(e) => setPrenomDest(e.target.value)} />
              </Form.Field>
              <Form.Field required>
                <label>Nom</label>
                <input placeholder="Nom" onChange={(e) => setNomDest(e.target.value)} />
              </Form.Field>
              <Form.Field required>
                <label>Addresse</label>
                <input placeholder="Addresse" onChange={(e) => setAdresseDest(e.target.value)} />
              </Form.Field>
              <Form.Field required>
                <label>Numéro de téléphone</label>
                <input placeholder="Téléphone" onChange={(e) => setTelephoneDest(e.target.value)} />
              </Form.Field>
            </Grid.Column>
          </Grid>

          <Divider vertical></Divider>
        </Segment>



        <Button onClick={postData} type="submit" >
          Envoyer le colis
        </Button>
      </Form>


    </div>
  );
}