import React, {useState} from 'react'
import storage from '../services/storage'
import logger from '../services/logger'
import { genShortcode, validShortcode } from '../utils/shortcode'
import { isValidUrl } from './validators'


const MAX_CONCURRENT = 5


export default function UrlForm(){
const [longUrl,setLongUrl] = useState('')
const [validity,setValidity] = useState('')
const [custom,setCustom] = useState('')
const [error,setError] = useState('')


function remainingSlots(){
const all = storage.getAll()
return Math.max(0, MAX_CONCURRENT - all.length)
}


function handleSubmit(e){
e.preventDefault()
setError('')
 if(!isValidUrl(longUrl)){
setError('Please enter a valid URL (include http:// or https://)')
return
}


let minutes = 30
if(validity.trim()!==''){
const n = parseInt(validity,10)
if(Number.isNaN(n) || n<=0){ setError('Validity must be a positive integer (minutes)'); return }
minutes = n
}


let shortcode = custom.trim()
if(shortcode===''){
shortcode = genShortcode()
}else{
if(!validShortcode(shortcode)){
setError('Custom shortcode invalid — only alphanumeric, _ and - allowed, length 3-20')
return
}
if(storage.find(shortcode)){
setError('That shortcode is already in use — choose another')
return
}
}

if(remainingSlots()<=0){
setError('Maximum of 5 shortened URLs allowed concurrently. Delete one to add more.')
return
}


const now = Date.now()
const item = {
shortcode,
longUrl,
createdAt: now,
expiresAt: now + minutes*60*1000,
clicks: 0,
records: [] // click records
}


storage.upsert(item)
logger.info('Created short URL', {shortcode, longUrl, expiresAt:item.expiresAt})
setLongUrl('')
setValidity('')
setCustom('')
}


return (
<div>
<h2>Create Short URL</h2>
<p>Slots remaining: {remainingSlots()}</p>
<form onSubmit={handleSubmit}>
<label>Original long URL</label>
<input value={longUrl} onChange={e=>setLongUrl(e.target.value)} placeholder="https://example.com/path"/>


<label>Validity (minutes, optional — default 30)</label>
<input value={validity} onChange={e=>setValidity(e.target.value)} placeholder="30"/>


<label>Preferred shortcode (optional)</label>
<input value={custom} onChange={e=>setCustom(e.target.value)} placeholder="abc123"/>


{error && <div style={{color:'red'}}>{error}</div>}


<button className="button" type="submit">Shorten</button>
</form>


<div style={{marginTop:12}}>
<small>Client-side validation enforces URL format, integer validity, and shortcode characters/uniqueness.</small>
</div>
</div>
)
}