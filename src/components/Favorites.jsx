import React, { useEffect, useState, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import EventCard from "./EventCard";
import { useDispatch } from "react-redux";
import { setAlert } from "../redux/features/alertSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const getFavorites = async (dispatch, userId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/favorites?favoriteUserId=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      dispatch(
        setAlert({ variant: "danger", message: `Favorites error: ${data}` })
      );
      return;
    }
    return data;
  } catch (e) {
    dispatch(setAlert({ variant: "danger", message: `Favorites error: ${e}` }));
  }
};

function Favorites() {
  const [events, setEvents] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.activeUser);
  const fetchFavorites = useCallback(async () => {
    if (!user) {
      return;
    }
    const response = await getFavorites(dispatch, user.id);

    setEvents(response.map((e) => ({ ...e, id: e.eventId })));
  }, [dispatch, user]);

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
    fetchFavorites();
  }, [dispatch, fetchFavorites, navigate, user]);

  const refreshFetch = async () => {
    fetchFavorites();
  };

  return (
    <>
      <h2 className="mt-4">Preferiti</h2>
      <Row>
        {events.map((event) => (
          <Col key={event.id} md={4} className="mb-4">
            <EventCard
              event={event}
              isFavorite
              handleFavoriteToggle={refreshFetch}
              onUpdate={refreshFetch}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Favorites;
