import React from "react";

function TableList({tables}) {
    const tablesTable = (
        <table className="table mt-3">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Table Name</th>
                <th scope="col">Capacity</th>
                <th scope="col">Occupied/Free</th>
            </tr>
        </thead>
        <tbody>
            {tables.map((table, index) => {
            return (
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{table.table_name}</td>
                    <td>{table.capacity}</td>
                    <td data-table-id-status={table.table_id}>{table.occupied}</td>
                </tr>
            )
            })}
        </tbody>
        </table>
    )
    return tablesTable;
}

export default TableList;