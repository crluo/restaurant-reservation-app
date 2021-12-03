import React from "react";
import { Link } from "react-router-dom";

function ReservationsList({ reservations }){
    return (
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
                  <td><Link to={`/reservations/${reservation.reservation_id}/seat`} type="button" class="btn btn-outline-primary btn-sm">Seat</Link></td>
                </tr>
              )
            })}
          </tbody>
        </table>
    )
}

export default ReservationsList;