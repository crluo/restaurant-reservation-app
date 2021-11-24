import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";

function TableForm() {
    const history = useHistory();
    const [ formData, setFormData ] = useState({});
    function onTableSubmit(event) {
        event.preventDefault();
        history.push("/dashboard");
    }

    function handleTableInputChange(event) {
        setFormData({
            ...formData,
            [ event.target.name ]: event.target.value,
        });
    }

    function handleCancel(event) {
        history.goBack();
    }
    return (
        <div>
            <form onSubmit={ onTableSubmit }>
                <div className="form-group">
                    <label for="exampleInputEmail1">Table Name</label>
                    <input name="table_name" required value={formData.table_name} onChange={handleTableInputChange} type="text" className="form-control" id="first_name" aria-describedby="emailHelp" placeholder="John"/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Capacity</label>
                    <input name="capacity" required min={1} value={formData.capacity} onChange={handleTableInputChange} type="number" className="form-control" id="capacity" placeholder="0"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" onClick={handleCancel} className="btn btn-primary">Cancel</button>
            </form>
        </div>
    );
}

export default TableForm;