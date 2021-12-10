import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "./ErrorAlert";

const INITIAL_FORM_DATA = {
    table_name: "",
    capacity: 0,
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
            <h2 className="mt-3">Create a new table</h2>
            <form onSubmit={ onTableSubmit }>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Table Name</label>
                    <input name="table_name" required minLength={2} value={formData.table_name} onChange={handleTableInputChange} type="text" className="form-control w-25" id="table_name" aria-describedby="emailHelp"/>
                </div>
                <div className="form-group">
                    <label htmlFor="capacity">Capacity</label>
                    <input name="capacity" required min={1} value={formData.capacity} onChange={handleTableInputChange} type="number" className="form-control w-25" id="capacity" placeholder="0"/>
                </div>
                <button type="submit" className="btn btn-primary mr-3">Submit</button>
                <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
            </form>
        </div>
    );
}

export default TableForm;