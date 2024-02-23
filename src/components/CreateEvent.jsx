import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import EventForm from "./EventForm";

function CreateEvent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.activeUser);

  useEffect(() => {
    if (!user?.id) {
      navigate("/");
    }
  }, [navigate, user]);

  const onFormSubmit = async (formData, event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }
    const { name, description, place, date, image } = formData;
    try {
      const response = await fetch("http://localhost:3001/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
          setAlert({ variant: "danger", message: `Creation error: ${data}` })
        );
        return;
      }
      dispatch(
        setAlert({
          variant: "success",
          message: `Creazione riuscita con successo`,
        })
      );
      navigate("/");
    } catch (e) {
      dispatch(
        setAlert({ variant: "danger", message: `Creation error: ${e}` })
      );
    }
  };

  return (
    <>
      <h2 className="mt-4">Creazione evento</h2>
      <EventForm onFormSubmit={onFormSubmit} actionName="Crea" />
    </>
  );
}

export default CreateEvent;
