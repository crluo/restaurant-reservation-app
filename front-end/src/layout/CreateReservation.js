import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date"
import ReservationForm from "./ReservationForm";

function CreateReservation() {
    const history = useHistory();
    const INITIAL_FORM_DATA = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    }
    const [ error, setError ] = useState(null);
    const [ formData, setFormData ] = useState(INITIAL_FORM_DATA);
    

    async function handleNewReservationSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        try {
            const newReservation = await createReservation( {...formData, people: Number(formData.people), status: "booked"}, abortController.signal );
            setFormData(formData);
            history.push(`/dashboard?date=${formatReservationDate(newReservation).reservation_date}`);
        } catch (error) {
            setError(error);
        }
    }


    return (
        <div>
            <h2 className="mt-3">Create a New Reservation</h2>
            <ReservationForm formData={formData} setFormData={setFormData} error={error} setError={setError} submitHandler={handleNewReservationSubmit} />
        </div>
    )
}

export default CreateReservation;