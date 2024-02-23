import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../redux/features/alertSlice";
import EventForm from "./EventForm";

function UpdateEventDialog({ event, handleClose, show }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.activeUser);

  const onFormSubmit = async (formData, e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }
    const { name, description, place, date, image } = formData;
    try {
      const response = await fetch(`http://localhost:3001/events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...event,
          name,
          description,
          place,
          date,
          image,
          userId: user.id,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch(
          setAlert({ variant: "danger", message: `Edit event error: ${data}` })
        );
        return;
      }
      dispatch(
        setAlert({
          variant: "success",
          message: `Modifica riuscita con successo`,
        })
      );

      handleClose(true);
    } catch (e) {
      dispatch(
        setAlert({ variant: "danger", message: `Edit event error: ${e}` })
      );
    }
  };

  return (
    <Modal
      show={!!user?.id && show}
      onHide={() => handleClose()}
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modifica evento</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <EventForm
          onFormSubmit={onFormSubmit}
          actionName="Modifica"
          value={event}
        />
      </Modal.Body>
    </Modal>
  );
}

export default UpdateEventDialog;
