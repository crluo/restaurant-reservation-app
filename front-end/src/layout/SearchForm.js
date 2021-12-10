import React, { useState } from "react";
import ReservationsList from "../dashboard/ReservationsList";
import { findReservations } from "../utils/api";

function SearchForm() {
    const [ reservations, setReservations ] = useState([]);
    const [ phoneNumber, setPhoneNumber ] = useState("");

    function handleSearch(event) {
        event.preventDefault();
        const abortController = new AbortController();
        setPhoneNumber(phoneNumber.replace(/\D/g,''));
        findReservations(phoneNumber, abortController.signal).then(setReservations);
    }

    function handleInputChange(event) {
        setPhoneNumber(event.target.value);
    }
    return (
        <div>
            <form onSubmit={handleSearch}>
                <label htmlFor="search-prompt">Enter a customer's phone number</label>
                <input type="text" value={phoneNumber} onChange={handleInputChange} className="form-control" id="mobile_number"/>
                <button type="submit" className="btn-primary btn">Find</button>
            </form>
            <ReservationsList reservations={reservations}/>
        </div>
        
    )
}

export default SearchForm;