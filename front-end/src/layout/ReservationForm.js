import React from "react";
import { useHistory } from "react-router-dom";
import { createReservation, updateReservation } from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date"
import ErrorAlert from "./ErrorAlert";

function ReservationForm({ reservationId, formData, setFormData, error, setError, isNew }) {
    const history = useHistory();

    async function handleReservationSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        if (isNew) {
            try {
                const newReservation = await createReservation( {...formData, people: Number(formData.people), status: "booked"}, abortController.signal );
                setFormData(formData);
                history.push(`/dashboard?date=${formatReservationDate(newReservation).reservation_date}`);
            } catch (error) {
                setError(error);
            }
        } else if (!isNew) {
            // edit reservation
            try {
                await updateReservation( reservationId, {...formData, people: Number(formData.people), status: "booked"}, abortController.signal )
                setFormData(formData)
            } catch (error) {
                setError(error);
            }
        }
    }

    function handleReservationInputChange(event) {
        setFormData({
            ...formData,
            [ event.target.name ]: event.target.value,
        })
    }

    function handleCancel(event) {
        history.goBack();
    }

    return (
        <div>
            <ErrorAlert error={error} />
            <form onSubmit={ handleReservationSubmit }>
                <div className="form-group">
                    <label htmlFor="first-name">First Name</label>
                    <input name="first_name" required value={formData.first_name} onChange={handleReservationInputChange} type="text" className="form-control" id="first_name" aria-describedby="emailHelp" placeholder="John"/>
                </div>
                <div className="form-group">
                    <label htmlFor="last-name">Last Name</label>
                    <input name="last_name" required value={formData.last_name} onChange={handleReservationInputChange} type="text" className="form-control" id="last_name" placeholder="Doe"/>
                </div>
                <div className="form-group">
                    <label htmlFor="mobile-number">Mobile Number</label>
                    <input name="mobile_number" required value={formData.mobile_number} onChange={handleReservationInputChange} type="text" className="form-control" id="mobile_number" placeholder="555-555-5555"/>
                </div>
                <div className="form-group">
                    <label htmlFor="reservation-date">Reservation Date</label>
                    <input name="reservation_date" required value={formData.reservation_date} onChange={handleReservationInputChange} type="date" className="form-control" id="reservation_date"/>
                </div>
                <div className="form-group">
                    <label htmlFor="reservation-time">Reservation Time</label>
                    <input name="reservation_time" required value={formData.reservation_time} onChange={handleReservationInputChange} type="time" className="form-control" id="reservation_time"/>
                </div>
                <div className="form-group">
                    <label htmlFor="people">Party Size</label>
                    <input name="people" required min={1} value={formData.people} onChange={handleReservationInputChange} type="number" className="form-control" id="people" placeholder="0"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" onClick={handleCancel} className="btn btn-primary">Cancel</button>
            </form>
        </div>
        
    );
}

export default ReservationForm;