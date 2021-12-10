import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readReservation } from "../utils/api";
import ErrorAlert from "./ErrorAlert";
import ReservationForm from "./ReservationForm";

function EditReservation() {
    const [ error, setError ] = useState(null);
    const { reservation_id } = useParams();
    const [ reservation, setReservation ] = useState(null);
    const [ formData, setFormData ] = useState({});

    useEffect(() => fetchReservation, [ reservation_id ]);

    async function fetchReservation() {
        const abortController = new AbortController();
        const foundReservation = await readReservation(reservation_id, abortController.signal);
        setReservation(foundReservation);
    }

    return (
        <div>
            <ErrorAlert error={error} />
            <ReservationForm reservationId={reservation.reservation_id} formData={formData} setFormData={setFormData} error={error} setError={setError} isNew={false}/>
        </div>
    )
}

export default EditReservation;