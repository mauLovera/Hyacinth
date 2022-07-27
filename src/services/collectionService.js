import * as tokenService from "./tokenService"
const SERVER_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/collections`

async function create(collection) {
  const res = await fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify(collection),
  })
  return await res.json()
}

async function addBookmark(collection, bookmarkData) {
  const res = await fetch(`${SERVER_URL}/${collection._id}/bookmarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify(bookmarkData),
  })
  return await res.json()
}

async function deleteBookmark(collection, bookmarkData) {
  const res = await fetch(`${SERVER_URL}/bookmarks/${collection._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify(bookmarkData),
  })
  return await res.json()
}

async function update(collection) {
  const res = await fetch(`${SERVER_URL}/${collection._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify(collection),
  })
  return await res.json()
}

async function deleteCollection(id) {
  const res = await fetch(`${SERVER_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
  })
  return await res.json()
}

async function getAll() {
  const res = await fetch(`${SERVER_URL}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
  })
  return await res.json()
}

export { create, addBookmark, deleteBookmark, update, getAll, deleteCollection }
