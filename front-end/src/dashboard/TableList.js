import React from "react";
import { useHistory } from "react-router-dom";
import { clearTable } from "../utils/api";

function TableList({tables}) {
    const history = useHistory();
    async function handleFinish(table_id, reservation_id) {
        let confirmation = window.confirm("Is this table ready to seat new guests? This cannot be undone.")
        const abortController = new AbortController();
        if (confirmation) {
            try{
                await clearTable(table_id, abortController.signal);
                history.go();
            } catch (error) {
                console.error(error)
            }
            
        }
    }
    const tablesTable = (
        <table className="table mt-3">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Table Name</th>
                <th scope="col">Capacity</th>
                <th scope="col">Occupied/Free</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {tables.map((table, index) => {
                return (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{table.table_name}</td>
                        <td>{table.capacity}</td>
                        <td data-table-id-status={table.table_id}>{table.reservation_id ? "Occupied" : "Free"}</td>
                        {table.reservation_id ? (<td><button data-table-id-finish={table.table_id} type="button" className="btn btn-primary" onClick={() => handleFinish(table.table_id, table.reservation_id)}>Finish</button></td>):(<td></td>)}
                    </tr>
                )
            })}
        </tbody>
        </table>
    )
    return tablesTable;
}

export default TableList;