import React, { useEffect, useState } from "react";
import { listTables } from "../utils/api";

function TableList() {
    const [tables, setTables] = useState([]);
    useEffect(() => loadTables, []);
    async function loadTables() {
        const abortController = new AbortController();
        const tablesList = await listTables(abortController.signal);
        console.log(tablesList);
        setTables(tablesList);
        return () => abortController.abort();
    }
    const tablesTable = (
        <table className="table mt-3">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Table Name</th>
                <th scope="col">Capacity</th>
                <th scope="col">Free?</th>
            </tr>
        </thead>
        <tbody>
            {tables.map((table, index) => {
            return (
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{table.table_name}</td>
                    <td>{table.capacity}</td>
                    <td>free</td>
                </tr>
            )
            })}
        </tbody>
        </table>
    )
    return tablesTable;
}

export default TableList;