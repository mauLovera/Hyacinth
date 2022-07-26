export default function Collection({ collection, handleCollectionClick, idx, activeCollection}) {
  return (
    <div className="sidebar-nav-collection-container" onClick={() => handleCollectionClick(idx)} style={activeCollection === collection ? {backgroundColor: 'white'} : {backgroundColor: ''}}>
      <div className="sidebar-nav-collection-emoji-container">
        <button className="sidebar-nav-collection-emoji" type="button">
          {collection.emoji}
        </button>
      </div>
      <div className="sidebar-nav-collection-title">{collection.title}</div>
    </div>
  )
}
