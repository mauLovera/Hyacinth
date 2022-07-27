import { useState, useRef, useEffect } from "react"
import moment from "moment"

import MainHeader from "./MainHeader"
import AddBookmark from "./AddBookmark"
import Bookmark from "./Bookmark"

export default function Main({
  activeCollection,
  handleUpdateCollection,
  collections,
  handleAddBookmark,
  handleDeleteCollection,
  setActiveCollection,
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

  useEffect(() => console.log('Rerender'), [collections])

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
                <Bookmark bookmark={bookmark} key={idx} />
              ))}
            </article>
          </>
        ) : (
          ""
        )}
      </section>
    </main>
  )
}
