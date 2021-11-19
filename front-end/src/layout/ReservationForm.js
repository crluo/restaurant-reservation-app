import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date"
import ErrorAlert from "./ErrorAlert";

function ReservationForm() {
    const history = useHistory();
    const [ formData, setFormData ] = useState({})
    const [ error, setError ] = useState(null);

    function handleReservationSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        async function addReservation() {
            try {
                const newReservation = await createReservation( {...formData, people: Number(formData.people)}, abortController.signal );
                setFormData({});
                history.push(`/dashboard?date=${formatReservationDate(newReservation).reservation_date}`);
            } catch (error) {
                setError(error);
            }
        }
        addReservation();
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
                    <label for="exampleInputEmail1">First Name</label>
                    <input name="first_name" required value={formData.first_name} onChange={handleReservationInputChange} type="text" className="form-control" id="first_name" aria-describedby="emailHelp" placeholder="John"/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Last Name</label>
                    <input name="last_name" required value={formData.last_name} onChange={handleReservationInputChange} type="text" className="form-control" id="last_name" placeholder="Doe"/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Mobile Number</label>
                    <input name="mobile_number" required value={formData.mobile_number} onChange={handleReservationInputChange} type="text" className="form-control" id="mobile_number" placeholder="555-555-5555"/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Reservation Date</label>
                    <input name="reservation_date" required value={formData.reservation_date} onChange={handleReservationInputChange} type="date" className="form-control" id="reservation_date"/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Reservation Time</label>
                    <input name="reservation_time" required value={formData.reservation_time} onChange={handleReservationInputChange} type="time" className="form-control" id="reservation_time"/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Party Size</label>
                    <input name="people" required min={1} value={formData.people} onChange={handleReservationInputChange} type="number" className="form-control" id="people" placeholder="0"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" onClick={handleCancel} className="btn btn-primary">Cancel</button>
            </form>
        </div>
        
    );
}

export default ReservationForm;