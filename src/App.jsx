import { useState, useEffect } from "react"
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"
import NavBar from "./components/NavBar/NavBar"
import Signup from "./pages/Signup/Signup"
import Login from "./pages/Login/Login"
import Landing from "./pages/Landing/Landing"
import Sidebar from "./pages/Sidebar/Sidebar"
import ChangePassword from "./pages/ChangePassword/ChangePassword"
import Main from "./pages/Main/Main"
import * as authService from "./services/authService"
import * as collectionService from "./services/collectionService"

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [collections, setCollections] = useState([])
  const [activeCollection, setActiveCollection] = useState("")
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate("/")
  }

  async function handleCollectionClick(collectionIdx) {
    setActiveCollection(collections[collectionIdx])
  }

  async function handleAddCollection(newCollectionData) {
    const newCollection = await collectionService.create(newCollectionData)
    setCollections([...collections, newCollection])
  }

  const handleDeleteCollection = async (collectionId) => {
    const deletedCollection = await collectionService.deleteCollection(
      collectionId
    )
    const newCollectionArray = collections.filter(
      (collection, idx) => collection._id !== deletedCollection._id
    )
    setCollections(newCollectionArray)
    setActiveCollection('')
  }

  async function handleAddBookmark(collection, bookmarkData) {
    const newBookmark = await collectionService.addBookmark(
      collection,
      bookmarkData
    )
    setActiveCollection(newBookmark)
  }

  async function handleUpdateCollection(updatedCollectionData) {
    const updatedCollection = await collectionService.update(
      updatedCollectionData
    )
    const newCollectionArray = collections.map((collection) =>
      collection._id === updatedCollection._id ? updatedCollection : collection
    )
    setCollections([...newCollectionArray])
    setActiveCollection(updatedCollection)
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  useEffect(() => {
    const fetchCollections = async () => {
      const collectionsData = await collectionService.getAll()
      setCollections(collectionsData)
    }
    fetchCollections()
  }, [])

  return (
    <>
      {/* <NavBar user={user} handleLogout={handleLogout} /> */}
      <Sidebar
        collections={collections}
        activeCollection={activeCollection}
        handleAddCollection={handleAddCollection}
        handleCollectionClick={handleCollectionClick}
      />
      <Main
        collections={collections}
        activeCollection={activeCollection}
        handleUpdateCollection={handleUpdateCollection}
        handleAddBookmark={handleAddBookmark}
        handleDeleteCollection={handleDeleteCollection}
        setActiveCollection={setActiveCollection}
      />
      <Routes>
        {/* <Route path="/" element={<Landing user={user} />} /> */}
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/changePassword"
          element={
            user ? (
              <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  )
}

export default App
