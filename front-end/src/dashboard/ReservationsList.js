import React from "react";
import { useHistory } from "react-router-dom";
import { updateReservationStatus } from "../utils/api";

function ReservationsList({ reservations }){
    const history = useHistory();

    async function handleReservationCancel(reservation_id) {
      let confirmation = window.confirm("Do you want to cancel this reservation? This cannot be undone.");
      if (confirmation) {
        const abortController = new AbortController();
        try{
          await updateReservationStatus(reservation_id, "cancelled", abortController.signal);
          history.go();
        } catch (error) {
          console.error(error)
        }
      }
    }
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
              <th scope="col">Seat</th>
              <th scope="col">Edit</th>
              <th scope="col">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => {
              return (
                <tr key={reservation.reservation_id}>
                  <th scope="row">{index + 1}</th>
                  <td>{reservation.first_name}</td>
                  <td>{reservation.last_name}</td>
                  <td>{reservation.reservation_date}</td>
                  <td>{reservation.reservation_time}</td>
                  <td>{reservation.people}</td>
                  <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
                  {reservation.status === "booked" ? (<td><a href={`/reservations/${reservation.reservation_id}/seat`} type="button" className="btn btn-primary btn-sm">Seat</a></td>) : (<td></td>)}
                  {reservation.status === "booked" ? (<td><a href={`/reservations/${reservation.reservation_id}/edit`} type="button" className="btn btn-outline-primary btn-sm">Edit</a></td>) : (<td></td>)}
                  {reservation.status === "booked" ? (<td><button data-reservation-id-cancel={reservation.reservation_id} className="btn btn-danger btn-sm" onClick={() => handleReservationCancel(reservation.reservation_id)}>Cancel</button></td>) : (<td></td>)}
                </tr>
              )
            })}
          </tbody>
        </table>
    )
}

export default ReservationsList;