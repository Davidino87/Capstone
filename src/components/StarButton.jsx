import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../redux/features/alertSlice";
import { StarFill, Star } from "react-bootstrap-icons";

const getFavorite = async (eventId, userId) => {
  const response = await fetch(
    `http://localhost:3001/favorites?eventId=${eventId}&favoriteUserId=${userId}`
  );
  return await response.json();
};

const addFavorite = async (event, userId) => {
  const clonedEvent = { ...event };
  delete clonedEvent.id;
  return await fetch("http://localhost:3001/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...clonedEvent,
      favoriteUserId: userId,
      eventId: event.id,
    }),
  });
};

const removeFavorite = async (eventId, userId) => {
  const favorites = await getFavorite(eventId, userId);

  return await Promise.all(
    favorites.map((favorite) =>
      fetch(`http://localhost:3001/favorites/${favorite.id}`, {
        method: "DELETE",
      })
    )
  );
};

function StarButton({ event, isFavorite = false, onToggle }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(isFavorite);
  const user = useSelector((state) => state.user.activeUser);

  useEffect(() => {
    if (!user || isFavorite) {
      return;
    }

    const fetchFavorites = async () => {
      try {
        const favorites = await getFavorite(event.id, user.id);
        setSelected(favorites.length > 0);
      } catch (error) {
        console.error("Errore nel recupero dei preferiti:", error);
        setSelected(false);
      }
    };

    fetchFavorites();
  }, [event.id, isFavorite, user]);

  const handleFavoriteClick = async (selected) => {
    if (!event || !user) {
      return;
    }
    try {
      const response = selected
        ? await addFavorite(event, user.id)
        : await removeFavorite(event.id, user.id);
      onToggle?.(selected);
      return response;
    } catch (e) {
      dispatch(
        setAlert({ variant: "danger", message: `Favorites error: ${e}` })
      );
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Button
      variant="link"
      onClick={() => {
        const newSelected = !selected;
        setSelected(newSelected);
        handleFavoriteClick(newSelected);
      }}
      style={{
        color: selected ? "black" : "grey",
        fontSize: "20px",
        display: "contents",
      }}
    >
      {selected ? <StarFill /> : <Star />}
    </Button>
  );
}

export default StarButton;
