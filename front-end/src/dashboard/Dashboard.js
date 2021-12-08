import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import { previous, today, next } from "../utils/date-time";
import TableList from "./TableList";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "./ReservationsList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal)
      .then(setTables)
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <div className="btn-group" role="group" aria-label="Basic example">
        <Link to={`/dashboard?date=${previous(date)}`} type="button" className="btn btn-secondary">
          <span className="oi oi-chevron-left"></span> Previous
        </Link>
        <Link to={`/dashboard?date=${today()}`} type="button" className="btn btn-secondary">Today</Link>
        <Link to={`/dashboard?date=${next(date)}`} type="button" className="btn btn-secondary" >
          Next <span className="oi oi-chevron-right"></span>
        </Link>
      </div>
      <ErrorAlert error={reservationsError} />
      {reservations.length ? <ReservationsList reservations={reservations}/>:(<p className="mt-4">No reservations were found</p>)}
      <TableList tables={tables}/>
    </main>
  );
}

export default Dashboard;
