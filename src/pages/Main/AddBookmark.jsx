import { useState, useEffect, useRef } from "react"

export default function AddBookmark({ handleAddBookmark, activeCollection, setActiveCollection }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    url: "https://",
  })
  
  function handleAddBookarkClick() {
    setOpen(!open)
    const sidebar = document.getElementById("sidebar")
    const addBookmark = document.getElementById("add-bookmark")
    function closeInput() {
      setOpen(false)
    }
    sidebar.addEventListener("click", () => closeInput())
    sidebar.removeEventListener("click", () => closeInput())
  }

  async function handleSubmit(e) {
    e.preventDefault()
    handleAddBookmark(activeCollection, formData)
  }

  function useForceUpdate() {
    const [update, setUpdate] = useState(0)
    return () => setUpdate(update => update + 1)
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const forceUpdate = useForceUpdate()

  return (
    <div className="main-section-add-bookmark-container">
      <div
        className="main-section-bookmark-icon"
        onClick={() => handleAddBookarkClick()}
      >
        {open ? "-" : "+"}
      </div>
      <div>Add Bookmark</div>
      {open ? (
        <div
          className="main-section-add-bookmark-form-container ease"
          id="add-bookmark"
        >
          <form
            action=""
            className="main-section-add-bookmark-form"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="url-input"
              className="main-section-add-bookmark-label"
            >
              URL
            </label>
            <input
              type="text"
              className="main-section-add-bookmark-input"
              name="url"
              autoComplete="off"
              value={formData.url}
              onChange={handleChange}
            />
            <button type="submit" className="main-section-add-bookmark-button">
              Save
            </button>
          </form>
        </div>
      ) : (
        <div
          className="main-section-add-bookmark-form-container deactive"
          id="add-bookmark"
        ></div>
      )}
    </div>
  )
}
