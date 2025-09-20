import React, {useEffect, useState} from 'react'
import storage from '../services/storage'


function relative(ts){
return new Date(ts).toLocaleString()
}


export default function StatsPage(){
const [items,setItems] = useState([])


useEffect(()=>{
setItems(storage.getAll())
},[])


if(items.length===0) return <div><h3>Statistics</h3><div>No data yet.</div></div>


return (
<div>
<h3>Statistics</h3>
{items.map(it=> (
<div key={it.shortcode} className="list-item">
<div><strong>Short:</strong> <code className="code">{window.location.origin}/r/{it.shortcode}</code></div>
<div>Original: {it.longUrl}</div>
<div>Created: {new Date(it.createdAt).toLocaleString()}</div>
<div>Expires: {new Date(it.expiresAt).toLocaleString()}</div>
<div>Total clicks: {it.clicks}</div>
<div>
<details>
<summary>Click records (most recent first)</summary>
<ul>
{it.records && it.records.length>0 ? it.records.map((r,idx)=> (
<li key={idx}>{relative(r.ts)} — source: {r.source} — locale: {r.locale}</li>
)) : <li>No clicks yet</li>}
</ul>
</details>
</div>
</div>
))}
</div>
)
}