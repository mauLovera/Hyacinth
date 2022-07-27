import { useEffect, useState } from "react"

import * as profileService from "../../services/profileService"
import * as collectionService from "../../services/collectionService"

import { emojiArray, randomEmoji } from "./SidebarData"

import Collection from "./Collection"

import moment from "moment"

export default function Sidebar({
  collections,
  handleAddCollection,
  handleCollectionClick,
  activeCollection,
  setActiveCollection,
  user
}) {
  const [profile, setProfile] = useState({})
  const [open, setOpen] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    date: moment().format("hh:mm"),
    emoji: "",
  })

  function handleClick(e) {
    setOpen(!open)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    handleAddCollection(formData)
    setOpen(false)
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    const fetchProfiles = async () => {
      const profileData = await profileService.getAllProfiles()
      setProfile(profileData)
    }
    fetchProfiles()
  }, [])

  return (
    <aside className="sidebar-container" id="sidebar">
      {user && collections ? (
        <>
          <header className="sidebar-header">
            <div className="sidebar-header-profile-photo-container">
              <img
                src={profile?.photo}
                alt="profile avatar"
                className="sidebar-header-profile-photo"
              />
            </div>
            <div className="sidebar-header-profile-name-text" onClick={() => setActiveCollection('')}>
              {profile.name}
            </div>
          </header>
          <nav className="sidebar-nav-container">
            <form action="" onSubmit={handleSubmit}>
              <div className="sidebar-nav-collection-header">
                <label htmlFor="" className="sidebar-nav-heading-label">
                  Collections
                </label>
                <button
                  className="sidebar-nav-add-collection-button"
                  type="button"
                  onClick={() => handleClick()}
                >
                  {open ? "-" : "+"}
                </button>
              </div>
              <div
                className="sidebar-nav-collection-input-container"
                style={open ? { display: "flex" } : { display: "none" }}
              >
                <div className="sidebar-nav-collection-input-flair">+</div>
                <input
                  type="text"
                  name="title"
                  className="sidebar-nav-collection-input"
                  placeholder="New Collection"
                  autoComplete="off"
                  value={formData.title}
                  onChange={handleChange}
                />
                <input type="submit" hidden />
                <input type="text" hidden name="date" />
                <input
                  type="text"
                  hidden
                  name="emoji"
                  value={(formData.emoji = randomEmoji())}
                  onChange={handleChange}
                />
              </div>
            </form>
            {collections?.map((collection, idx) => (
              <Collection
                key={idx}
                idx={idx}
                collection={collection}
                handleCollectionClick={handleCollectionClick}
                activeCollection={activeCollection}
              />
            ))}
          </nav>
        </>
      ) : (
        ""
      )}
    </aside>
  )
}
