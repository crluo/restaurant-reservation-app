import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listTables, seatReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";


function SeatingForm() {
    const history = useHistory();
    const { reservation_id } = useParams();
    const [ tableId, setTableId ] = useState(null);
    const [ tables, setTables ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(fetchTables, []);

    function fetchTables() {
        const abortController = new AbortController();
        listTables(abortController.signal)
            .then(setTables)
        return () => abortController.abort();
    }

    function onSeatingSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        async function addSeatToReservation() {
            try {
                await seatReservation(reservation_id, Number(tableId), abortController.signal)
                setTableId("");
                history.push(`/dashboard`);
            } catch (error) {
                setError(error);
            }
        }
        addSeatToReservation();
    }

    function handleSeatingInputChange(event) {
        setTableId(event.target.value);
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
                    <select name="table_id" onChange={handleSeatingInputChange} className="form-control" id="table_id">
                        <option>Please select a table</option>
                        {tables ? tables.map((table, index) => <option key={table.table_id} value={table.table_id}>{table.table_name} - {table.capacity}</option>) : null}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mr-3">Submit</button>
                <button type="button" onClick={handleCancel} className="btn btn-primary">Cancel</button>
            </form>
        </div>
    );
}

export default SeatingForm;