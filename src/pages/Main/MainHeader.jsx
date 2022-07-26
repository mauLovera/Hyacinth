import React from "react"

export default function MainHeader({activeCollection, open, formElement, handleSubmit, formData, handleChange, setOpen, handleTitleClick}) {
  return (
    <header>
      <div className="main-collection-header-container">
        {activeCollection ? (
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
                <>
                  <input type="text" style={{ display: "none" }} />
                  <h1
                    className="main-collection-header-title"
                    onClick={() => handleTitleClick()}
                    style={{ display: "flex" }}
                    key={Math.random()}
                  >
                    {activeCollection.title}
                  </h1>
                </>
              )}
            </div>
            <div className="main-collection-header-details-button">
              <button>Details</button>
            </div>
          </>
        ) : (
          <>
            <div className="main-collection-header-emoji">
              🤷‍♂️
            </div>
            <h1 className="main-collection-header-title">
              No Collection Selected
            </h1>
          </>
        )}
      </div>
    </header>
  )
}
