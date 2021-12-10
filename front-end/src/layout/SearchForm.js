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
            <form onSubmit={handleSearch}>
                <label htmlFor="search-prompt">Enter a customer's phone number</label>
                <input type="text" name="mobile_number" value={phoneNumber} onChange={handleInputChange} className="form-control" id="mobile_number"/>
                <button type="submit" className="btn-primary btn">Find</button>
            </form>
            {reservations.length ? <ReservationsList reservations={reservations}/> : <p>No reservations found</p>}
        </div>
        
    )
}

export default SearchForm;