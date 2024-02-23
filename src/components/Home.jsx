import React, { useEffect, useState, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import EventCard from "./EventCard";
import { useDispatch } from "react-redux";
import { setAlert } from "../redux/features/alertSlice";

const getEvents = async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3001/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(setAlert({ variant: "danger", message: `Events error: ${data}` }));
      return;
    }
    return data;
  } catch (e) {
    dispatch(setAlert({ variant: "danger", message: `Events error: ${e}` }));
  }
};

function Home() {
  const [events, setEvents] = useState();
  const dispatch = useDispatch();
  const fetchEvents = useCallback(async () => {
    const response = await getEvents(dispatch);
    setEvents(response);
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await fetchEvents();
    })();
  }, [dispatch, fetchEvents]);

  return (
    <>
      <h2 className="mt-4">Eventi</h2>
      <Row>
        {events?.map((event) => (
          <Col key={event.id} xs={12} md={6} lg={4} className="mb-4">
            <EventCard
              event={event}
              onUpdate={async () => {
                await fetchEvents();
              }}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Home;
