import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listTables } from "../utils/api";
import ErrorAlert from "./ErrorAlert";


function SeatingForm() {
    const history = useHistory();
    const { reservation_id } = useParams();
    const [ formData, setFormData ] = useState({});
    const [ reservation, setReservation ] = useState(null);
    const [ tables, setTables ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(() => fetchTables, [ tables ]);

    function fetchTables() {
        const abortController = new AbortController();
        listTables(abortController.signal)
            .then(setTables)
        return () => abortController.abort();
    }

    // need to get reservation by reservation_id
    function fetchReservation() {

    }

    function onSeatingSubmit(event) {
        event.preventDefault();
        history.push(`/dashboard`);
    }

    function handleSeatingInputChange(event) {
        console.log(formData)
        setFormData({
            ...formData,
            [ event.target.name ]: event.target.value,
        });
    }

    function handleCancel() {
        history.goBack();
    }
    return (
        <div>
            <ErrorAlert error={error} />
            <form onSubmit={ onSeatingSubmit }>
                <div className="form-group">
                    <label for="exampleInputEmail1">Table Number</label>
                    <select name="table_id" value={formData.table_id} onChange={handleSeatingInputChange} className="form-control" id="table_id">
                        {tables ? tables.map((table, index) => <option key={index} >{table.table_name} - {table.capacity}</option>) : null}
                    </select>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Capacity</label>
                    <input name="capacity" required min={1} value={formData.capacity} onChange={handleSeatingInputChange} type="number" className="form-control" id="capacity" placeholder="0"/>
                </div>
                <button type="submit" className="btn btn-primary mr-3">Submit</button>
                <button type="button" onClick={handleCancel} className="btn btn-primary">Cancel</button>
            </form>
        </div>
    );
}

export default SeatingForm;