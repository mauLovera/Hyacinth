import { useState } from "react"

export default function Bookmark({ bookmark, handleDeleteBookmark }) {
  
  const urlSplit = bookmark.url
  const urlNameArray = urlSplit.split("//")
  const urlSplit2 = urlNameArray[1].split(".")
  const urlName = urlSplit2[0]

  return (
    <div className="main-section-bookmark-container">
      <div className="main-section-bookmark">
        <a href={bookmark.url} target="_blank" rel="noreferrer noope" className="main-section-bookmark-left">
          <header className="main-section-bookmark-header">
            <div
              style={{ textTransform: "capitalize" }}
              className="main-section-bookmark-urlname"
            >
              {urlName}
            </div>
            <div
              className="main-section-bookmark-url"
              href={bookmark.url}
              target="_blank"
              rel="noreferrer noope"
            >
              {bookmark.url}
            </div>
          </header>
        </a>
        <div className="main-section-bookmark-right">
          <button>Edit</button>
          <button onClick={() => handleDeleteBookmark(bookmark._id)}>Delete</button>
          <button>Copy</button>
        </div>
      </div>
      <div className="main-section-bookmark-clear"></div>
    </div>
  )
}
