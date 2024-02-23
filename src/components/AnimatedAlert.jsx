import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setAlert } from "../redux/features/alertSlice";
import { useTranslate } from "../hooks/useTranslate";

function AnimatedAlert() {
  const alert = useSelector((state) => state.alert.alert);
  const dispatch = useDispatch();
  const { translatedText } = useTranslate(alert?.message);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        dispatch(setAlert(null));
      }, 13000);

      return () => clearTimeout(timer);
    }
  }, [alert, dispatch]);

  return translatedText && alert ? (
    <Alert
      variant={alert.variant}
      show={true}
      onClose={() => dispatch(setAlert(null))}
      dismissible
      className="position-fixed w-25 "
      style={{
        right: 0,
        zIndex: 2,
      }}
    >
      {alert?.message}
    </Alert>
  ) : null;
}

export default AnimatedAlert;
