/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Creates a new reservation
 * @param {Object} reservation 
 * @returns a promise that resolves to the newly created reservation
 */
export async function createReservation(reservation, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  };
  return await fetchJson(url, options);
}

/**
 * Retrieves the reservation associated with reservationId
 * @param {String} reservationId 
 * @returns promise that resolves to found reservation
 */
export async function readReservation(reservationId, signal) {
  const url = `${API_BASE_URL}/reservations/${reservationId}`; 
  const options = { 
    method: "GET", 
    headers,
    signal, 
  }; 
  return await fetchJson(url, options)
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Updates existing reservation 
 * @param {String} reservationId 
 * @param {Object} updatedReservation 
 * @returns promise that resolves to updated reservation
 */
export async function updateReservation(reservationId, updatedReservation, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservationId}`);
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: updatedReservation }),
    signal,
  }
  return await fetchJson(url, options);
}

/**
 * Lists all tables
 * @returns promise that resolves to array of tables
 */
export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  return await fetchJson(url, { headers, signal }, []);
}

/**
 * Creates a new table free to seat a reservation
 * @param {Object} table 
 * @returns promise that resolves to new table created
 */
export async function createTable(table, signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: table }),
    signal,
  };
  return await fetchJson(url, options);
}

/**
 * Seats a reservation at specified table
 * @param {String} reservationId reservation to seat
 * @param {String} tableId to seat reservation
 * @returns 200 status with updated table
 */
export async function seatReservation(reservationId, tableId, signal) {
  const url = new URL(`${API_BASE_URL}/tables/${tableId}/seat`);
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { reservation_id: reservationId } }),
    signal,
  };
  return await fetchJson(url, options);
}

/**
 * Clears a table to be ready for a new reservation
 * @param {String} table_id to clear
 */
export async function clearTable(table_id, signal) {
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
  const options = {
    method: "DELETE",
    headers,
    signal,
  };
  return await fetchJson(url, options);
}

/**
 * Updates a reservation's status
 * @param {String} reservationId reservation to update
 * @param {String} newStatus status to update reservation with
 * @returns promise that resolves to updated reservation
 */
export async function updateReservationStatus(reservationId, newStatus, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservationId}/status`);
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { status: newStatus }}),
    signal,    
  }
  return await fetchJson(url, options);
}