import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "./ErrorAlert";

const INITIAL_FORM_DATA = {
    table_name: "",
    capacity: 0,
    occupied: "Free",
}
function TableForm() {
    const history = useHistory();
    const [ formData, setFormData ] = useState(INITIAL_FORM_DATA);
    const [ error, setError ] = useState(null);
    function onTableSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        async function addTable() {
            try {
                await createTable( {...formData, capacity: Number(formData.capacity)}, abortController.signal );
                setFormData({...INITIAL_FORM_DATA});
                history.push(`/dashboard`);
            } catch (error) {
                setError(error);
            }
        }
        addTable();
    }

    function handleTableInputChange(event) {
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
            <form onSubmit={ onTableSubmit }>
                <div className="form-group">
                    <label for="exampleInputEmail1">Table Name</label>
                    <input name="table_name" required minlength={2} value={formData.table_name} onChange={handleTableInputChange} type="text" className="form-control" id="first_name" aria-describedby="emailHelp" placeholder="John"/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Capacity</label>
                    <input name="capacity" required min={1} value={formData.capacity} onChange={handleTableInputChange} type="number" className="form-control" id="capacity" placeholder="0"/>
                </div>
                <button type="submit" className="btn btn-primary mr-3">Submit</button>
                <button type="button" onClick={handleCancel} className="btn btn-primary">Cancel</button>
            </form>
        </div>
    );
}

export default TableForm;