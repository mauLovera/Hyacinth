import React from "react"

export default function MainHeader({
  activeCollection,
  open,
  formElement,
  handleSubmit,
  formData,
  handleChange,
  setOpen,
  handleTitleClick,
  handleDeleteCollection,
  user,
}) {
  return (
    <header>
      <div className="main-collection-header-container">
        {activeCollection && user ? (
          <>
            <div className="main-collection-header-emoji">
              {activeCollection.emoji}
            </div>
            <div>
              {open ? (
                <>
                  <form
                    action=""
                    onSubmit={handleSubmit}
                    ref={formElement}
                    className="main-collection-header-form"
                  >
                    <input
                      type="text"
                      style={{ display: "flex" }}
                      onChange={handleChange}
                      defaultValue={formData.title}
                      name="title"
                      className="main-collection-header-form-input"
                    />
                    <div
                      className="main-collection-header-cancel-button"
                      onClick={() => setOpen(!open)}
                    >
                      Cancel Changes
                    </div>
                  </form>
                  <h1
                    className="main-collection-header-title ease"
                    onClick={() => handleTitleClick()}
                    style={{ display: "none" }}
                    key={Math.random()}
                  >
                    {activeCollection.title}
                  </h1>
                </>
              ) : (
                <div style={{display: 'flex', alignItems: 'baseline', gap : '1rem'}}>
                  <input type="text" style={{ display: "none" }} />
                  <h1
                    className="main-collection-header-title"
                    onClick={() => handleTitleClick()}
                    style={{ display: "flex" }}
                    key={Math.random()}
                  >
                    {activeCollection.title}
                  </h1>
                  <p style={{opacity: '0.5'}}>Click to edit!</p>
                </div>
              )}
            </div>
            <div className="main-collection-header-details-button">
              <button onClick={() => handleDeleteCollection(activeCollection._id)} className='main-collection-header-delete-button'>Delete Collection </button>
            </div>
          </>
        ) : (
          <>
            <div className="main-collection-header-emoji">👋</div>
            <h1 className="main-collection-header-title">
              Welcome to Hyacinth! 
            </h1>
          </>
        )}
      </div>
    </header>
  )
}
