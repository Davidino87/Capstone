import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../redux/features/alertSlice";
import { Container, Row, Col, Image, Stack, Button } from "react-bootstrap";
import StarButton from "./StarButton";
import { dateConverter } from "../utils";
import UpdateEventDialog from "./UpdateEventDialog";
import DeleteEventDialog from "./DeleteEventDialog";

const getEvent = async (id, dispatch) => {
  try {
    const response = await fetch(`http://localhost:3001/events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(setAlert({ variant: "danger", message: `Detail error: ${data}` }));
      return;
    }
    return data;
  } catch (e) {
    dispatch(setAlert({ variant: "danger", message: `Detail error: ${e}` }));
  }
};

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openUpdateDialog, setOpenUpdateDialog] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState();
  const [event, setEvent] = useState();
  const user = useSelector((state) => state.user.activeUser);

  const fetchEvent = useCallback(
    async (id) => {
      const response = await getEvent(id, dispatch);
      setEvent(response);
    },
    [dispatch]
  );

  useEffect(() => {
    (async () => {
      await fetchEvent(id);
    })();
  }, [dispatch, fetchEvent, id]);

  return event ? (
    <Container fluid className="mt-2 event-detail-page">
      <Row noGutters>
        <Col className="text-center">
          <Image src={event.image} alt="Event" className="rounded-circle" fluid />
        </Col>
      </Row>
      <Row className="mx-0 px-4 py-3 event-info">
        <Stack direction="horizontal" gap={3}>
          <h1>{event.name}</h1>
          <StarButton className="ms-auto" event={event} />
        </Stack>
        <Col xs={12} className="event-description mt-3">
          <p>{event.description}</p>
        </Col>
        <Col xs={12} md={4} className="event-details">
          <p>
            <strong>Luogo:</strong> {event.place}
          </p>
          <p>
            <strong>Data:</strong> {dateConverter(event.date)}
          </p>
        </Col>
      </Row>
      <Stack direction="horizontal" gap={3} className="justify-content-center mb-2">
        {event.userId === user?.id && (
          <Button variant="dark" onClick={() => setOpenUpdateDialog(true)}>
            Modifica
          </Button>
        )}
        {event.userId === user?.id && (
          <Button variant="danger" onClick={() => setOpenDeleteDialog(true)}>
            Elimina
          </Button>
        )}
      </Stack>
      <UpdateEventDialog
        event={event}
        handleClose={(updated) => {
          if (updated) {
            fetchEvent(id);
          }
          setOpenUpdateDialog(false);
        }}
        show={openUpdateDialog}
      />
      <DeleteEventDialog
        event={event}
        handleClose={(deleted) => {
          if (deleted) {
            navigate("/");
          }
          setOpenDeleteDialog(false);
        }}
        show={openDeleteDialog}
      />
    </Container>
  ) : null;
}

export default Detail;
