import React, {useEffect} from 'react'
import logger from '../services/logger'


// This component is responsible for client-side redirection when path /r/:shortcode is visited
export default function RedirectHandler(){
const {shortcode} = useParams()
const navigate = useNavigate()


useEffect(()=>{
const entry = storage.find(shortcode)
if(!entry){
logger.warn('Redirect - shortcode not found', {shortcode})
alert('Shortcode not found')
navigate('/')
return
}


const now = Date.now()
if(entry.expiresAt && now>entry.expiresAt){
logger.info('Redirect - shortcode expired', {shortcode})
alert('This short link has expired')
// optionally remove
storage.remove(shortcode)
navigate('/')
return
}


// Log the click: timestamp, source, coarse location
const record = {
ts: now,
source: document.referrer || 'direct',
locale: navigator.language || 'unknown'
}
entry.clicks = (entry.clicks||0) + 1
entry.records = entry.records || []
entry.records.unshift(record)
storage.upsert(entry)


logger.info('Redirecting to long URL', {shortcode, longUrl: entry.longUrl, record})


// perform redirect after small delay to show user
window.location.href = entry.longUrl


},[shortcode,navigate])


return (
<div style={{padding:20}}>
<h3>Redirecting...</h3>
<p>If you are not redirected, <a id="redir-link">click here</a></p>
</div>
)
}