import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listReservations } from "../utils/api";
import { previous, today, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const reservationsTable = (
    <table className="table mt-3">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Party Size</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation, index) => {
          return (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{reservation.first_name}</td>
              <td>{reservation.last_name}</td>
              <td>{reservation.reservation_date}</td>
              <td>{reservation.reservation_time}</td>
              <td>{reservation.people}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )

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
      {reservations.length ? reservationsTable:(<p className="mt-4">"No reservations were found"</p>)}
    </main>
  );
}

export default Dashboard;
