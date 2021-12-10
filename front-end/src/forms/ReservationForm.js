import React from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm({ formData, setFormData, error, submitHandler }) {
    const history = useHistory();

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
            <form onSubmit={ submitHandler } className="mt-3">
                <div className="form-group">
                    <label htmlFor="first-name">First Name</label>
                    <input name="first_name" required value={formData.first_name} onChange={handleReservationInputChange} type="text" className="form-control w-25" id="first_name" aria-describedby="emailHelp" placeholder={formData.first_name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="last-name">Last Name</label>
                    <input name="last_name" required value={formData.last_name} onChange={handleReservationInputChange} type="text" className="form-control w-25" id="last_name" placeholder={formData.last_name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="mobile-number">Mobile Number</label>
                    <input name="mobile_number" required value={formData.mobile_number} onChange={handleReservationInputChange} type="text" className="form-control w-25" id="mobile_number" placeholder={formData.mobile_number}/>
                </div>
                <div className="form-group">
                    <label htmlFor="reservation-date">Reservation Date</label>
                    <input name="reservation_date" required value={formData.reservation_date} onChange={handleReservationInputChange} type="date" className="form-control w-25" id="reservation_date"/>
                </div>
                <div className="form-group">
                    <label htmlFor="reservation-time">Reservation Time</label>
                    <input name="reservation_time" required value={formData.reservation_time} onChange={handleReservationInputChange} type="time" className="form-control w-25" id="reservation_time"/>
                </div>
                <div className="form-group">
                    <label htmlFor="people">Party Size</label>
                    <input name="people" required min={1} value={formData.people} onChange={handleReservationInputChange} type="number" className="form-control w-25" id="people" placeholder="0"/>
                </div>
                <button type="submit" className="btn btn-primary mr-3">Submit</button>
                <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
            </form>
        </div>
        
    );
}

export default ReservationForm;