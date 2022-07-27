import { useState, useRef, useEffect } from "react"
import moment from "moment"
import { Link } from "react-router-dom"

import MainHeader from "./MainHeader"
import AddBookmark from "./AddBookmark"
import Bookmark from "./Bookmark"

export default function Main({
  activeCollection,
  handleUpdateCollection,
  collections,
  handleAddBookmark,
  handleDeleteBookmark,
  handleDeleteCollection,
  setActiveCollection,
  user,
  handleLogout,
}) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(activeCollection)

  const formElement = useRef(null)

  function handleTitleClick() {
    setOpen(!open)
    setFormData(activeCollection)
    const sidebar = document.getElementById("sidebar")
    function closeInput() {
      setOpen(false)
    }
    sidebar.addEventListener("click", () => closeInput())
    sidebar.removeEventListener("click", () => closeInput())
  }

  async function handleSubmit(e) {
    e.preventDefault()
    handleUpdateCollection(formData)
    setOpen(false)
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => console.log("Rerender"), [collections])

  return (
    <main className="main-container">
      <MainHeader
        activeCollection={activeCollection}
        open={open}
        formElement={formElement}
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        setOpen={setOpen}
        handleTitleClick={handleTitleClick}
        handleDeleteCollection={handleDeleteCollection}
        user={user}
      />
      <section className="main-section">
        {activeCollection ? (
          <>
            <AddBookmark
              handleAddBookmark={handleAddBookmark}
              activeCollection={activeCollection}
              setActiveCollection={setActiveCollection}
            />
            <article className="main-section-bookmarks-container">
              {activeCollection.bookmarks.map((bookmark, idx) => (
                <Bookmark
                  bookmark={bookmark}
                  key={idx}
                  idx={idx}
                  handleDeleteBookmark={handleDeleteBookmark}
                  activeCollection={activeCollection}
                />
              ))}
            </article>
          </>
        ) : (
          <section>
            {user ? (
              <div>
                <ul className="main-nav-button-container">
                  <Link to="" onClick={handleLogout}>
                    <li className="main-nav-button">Log Out</li>
                  </Link>
                  <Link to="/changePassword">
                    <li className="main-nav-button">Change Password</li>
                  </Link>
                </ul>
              </div>
            ) : (
              <nav>
                <ul className="main-nav-button-container">
                  <Link to="/login">
                    <li className="main-nav-button">Log In</li>
                  </Link>
                  <Link to="/signup">
                    <li className="main-nav-button">Sign Up</li>
                  </Link>
                </ul>
              </nav>
            )}
          </section>
        )}
      </section>
    </main>
  )
}
