import React, {useEffect, useState} from 'react'
import storage from '../services/storage'
import logger from '../services/logger'


function formatDate(ts){
return new Date(ts).toLocaleString()
}


export default function UrlList(){
const [items,setItems] = useState([])


function load(){
const all = storage.getAll()
setItems(all)
}


useEffect(()=>{
load()
window.addEventListener('storage', load)
return ()=>window.removeEventListener('storage', load)
},[])


function del(shortcode){
if(!confirm('Delete this short URL?')) return
storage.remove(shortcode)
logger.info('Deleted short URL', {shortcode})
load()
}


return (
<div>
<h2>Shortened URLs</h2>
{items.length===0 && <div>No URLs created yet.</div>}
{items.map(item=> (
<div key={item.shortcode} className="list-item">
<div><strong>Original:</strong> <a href={item.longUrl} target="_blank" rel="noreferrer">{item.longUrl}</a></div>
<div><strong>Short:</strong> <code className="code">{window.location.origin}/r/{item.shortcode}</code></div>
<div>Created: {formatDate(item.createdAt)}</div>
<div>Expires: {formatDate(item.expiresAt)}</div>
<div>Clicks: {item.clicks}</div>
<div style={{marginTop:6}}>
<button onClick={()=>navigator.clipboard.writeText(`${window.location.origin}/r/${item.shortcode}`)} className="button">Copy Link</button>
<button onClick={()=>del(item.shortcode)} style={{marginLeft:8}}>Delete</button>
</div>
</div>
))}
</div>
)
}