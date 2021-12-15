import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date"
import ReservationForm from "../forms/ReservationForm";

function EditReservation() {
    const INITIAL_FORM_DATA = {
            first_name: "",
            last_name: "",
            mobile_number: "",
            reservation_date: "",
            reservation_time: "",
            people: "",
    }
    const history = useHistory();
    const [ error, setError ] = useState(null);
    const { reservation_id } = useParams();
    const [ formData, setFormData ] = useState(INITIAL_FORM_DATA);

    useEffect(() => {
        async function fetchReservation() {
            const abortController = new AbortController();
            try {
                const foundReservation = await readReservation(reservation_id, abortController.signal);
                if (foundReservation) {
                    const { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = foundReservation;
                    setFormData({ first_name, last_name, mobile_number, reservation_date, reservation_time, people });
                }
            } catch (error) {
                setError(error);
            }
        }
        fetchReservation();
    }, [ reservation_id ]);

    async function handleEditReservationSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        try {
            const updatedReservation = await updateReservation( reservation_id, {...formData, people: Number(formData.people), status: "booked"}, abortController.signal )
            history.push(`/dashboard?date=${formatReservationDate(updatedReservation).reservation_date}`);
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div>
            <h2 className="mt-3">Edit Reservation</h2>
            <ReservationForm formData={formData} setFormData={setFormData} error={error} setError={setError} submitHandler={handleEditReservationSubmit}/>
        </div>
    )
}

export default EditReservation;