import { useState, useRef, useEffect } from "react"
import moment from "moment"

import MainHeader from "./MainHeader"

export default function Main({
  activeCollection,
  handleUpdateCollection,
  collections,
}) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState(activeCollection)

  const formElement = useRef(null)

  function handleTitleClick() {
    setOpen(!open)
    setFormData(activeCollection)
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

  useEffect(() => {}, [open])

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
      />
      <section className="main-section">
        
      </section>
    </main>
  )
}
