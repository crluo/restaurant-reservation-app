import React, { useState } from "react";
import ErrorAlert from "./ErrorAlert";
import ReservationForm from "./ReservationForm";

function CreateReservation() {
    const [ error, setError ] = useState(null);
    const INITIAL_FORM_DATA = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    }

    const [ formData, setFormData ] = useState(INITIAL_FORM_DATA);

    return (
        <div>
            <ErrorAlert error={error} />
            <ReservationForm formData={formData} setFormData={setFormData} error={error} setError={setError} isNew={true} />
        </div>
    )
}

export default CreateReservation;