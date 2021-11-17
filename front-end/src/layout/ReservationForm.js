import React from "react";

function ReservationForm() {
    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <form>
            <div className="form-group">
                <label for="exampleInputEmail1">First Name</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="John"/>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Last Name</label>
                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Doe"/>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Mobile Number</label>
                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="555-555-5555"/>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Reservation Date</label>
                <input type="date" className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Reservation Time</label>
                <input type="time" className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Party Size</label>
                <input type="number" className="form-control" id="exampleInputPassword1" placeholder="0"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-primary">Cancel</button>
        </form>
    );
}

export default ReservationForm;