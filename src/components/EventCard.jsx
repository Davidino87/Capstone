import React, { useState } from "react";
import { Card, Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StarButton from "./StarButton";
import { useSelector } from "react-redux";
import UpdateEventDialog from "./UpdateEventDialog";
import DeleteEventDialog from "./DeleteEventDialog";
import { dateConverter } from "../utils";

function EventCard({ event, isFavorite, handleFavoriteToggle, onUpdate }) {
  const navigate = useNavigate();
  const [openUpdateDialog, setOpenUpdateDialog] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState();

  const user = useSelector((state) => state.user.activeUser);

  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={event.image}
          style={{
            maxWidth: 500,
            maxHeight: 500,
          }}
        />
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-start">
            {event.name}{" "}
            <StarButton
              event={event}
              isFavorite={isFavorite}
              onToggle={handleFavoriteToggle}
            />
          </Card.Title>
          <Card.Text>
            <strong>Data:</strong> {dateConverter(event.date)}
            <br />
            <strong>Luogo:</strong> {event.place}
            <br />
          </Card.Text>

          <Stack direction="horizontal" gap={2}>
            <Button
              variant="outline-dark"
              onClick={() => navigate(`/detail/${event.id}`)}
            >
              Dettagli
            </Button>
            {event.userId === user?.id && (
              <Button variant="dark" onClick={() => setOpenUpdateDialog(true)}>
                Modifica
              </Button>
            )}
            {event.userId === user?.id && (
              <Button
                variant="danger"
                onClick={() => setOpenDeleteDialog(true)}
              >
                Elimina
              </Button>
            )}
          </Stack>
        </Card.Body>
      </Card>
      <UpdateEventDialog
        event={event}
        handleClose={(updated) => {
          if (updated) {
            onUpdate();
          }
          setOpenUpdateDialog(false);
        }}
        show={openUpdateDialog}
      />
      <DeleteEventDialog
        event={event}
        handleClose={(deleted) => {
          if (deleted) {
            onUpdate();
          }
          setOpenDeleteDialog(false);
        }}
        show={openDeleteDialog}
      />
    </>
  );
}

export default EventCard;
