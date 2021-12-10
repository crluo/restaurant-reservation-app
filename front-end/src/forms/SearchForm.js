import React, { useState } from "react";
import ReservationsList from "../dashboard/ReservationsList";
import { listReservations } from "../utils/api";

function SearchForm() {
    const [ reservations, setReservations ] = useState([]);
    const [ phoneNumber, setPhoneNumber ] = useState("");

    async function handleSearch(event) {
        event.preventDefault();
        const abortController = new AbortController();
        try {
            const reservationsList = await listReservations({ mobile_number: phoneNumber }, abortController.signal);
            setReservations(reservationsList);
        } catch (error) {
            console.error(error)
        }
    }

    function handleInputChange(event) {
        setPhoneNumber(event.target.value);
    }
    return (
        <div>
            <h2 className="mt-3">Search for an existing reservation</h2>
            <form onSubmit={handleSearch}>
                <label htmlFor="search-prompt">Enter a customer's phone number</label>
                <input type="text" name="mobile_number" value={phoneNumber} onChange={handleInputChange} className="form-control w-25" id="mobile_number"/>
                <button type="submit" className="btn-primary btn mt-3">Find</button>
            </form>
            {reservations.length ? <ReservationsList reservations={reservations}/> : <p className="mt-3">No reservations found</p>}
        </div>
        
    )
}

export default SearchForm;