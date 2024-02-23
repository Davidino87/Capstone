import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../redux/features/alertSlice";

function DeleteEventDialog({ event, handleClose, show }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.activeUser);

  const onDelete = async () => {
    if (!user?.id) {
      return dispatch(
        setAlert({
          variant: "danger",
          message: `Per poter rimuovere un evento devi prima effettuare la login`,
        })
      );
    }
    try {
      const response = await fetch(`http://localhost:3001/events/${event.id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch(
          setAlert({
            variant: "danger",
            message: `Delete event error: ${data}`,
          })
        );
        return;
      }
      dispatch(
        setAlert({
          variant: "success",
          message: `Eliminazione riuscita con successo`,
        })
      );

      handleClose(true);
    } catch (e) {
      dispatch(
        setAlert({ variant: "danger", message: `Delete event error: ${e}` })
      );
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Elimina evento</Modal.Title>
      </Modal.Header>

      <Modal.Body>Sei sicuro di voler elimanare questo evento ?</Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={onDelete}>
          Elimina
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteEventDialog;
