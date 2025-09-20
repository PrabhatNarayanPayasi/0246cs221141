import { v4 as uuidv4 } from 'uuid'
// generate short-ish shortcode
export function genShortcode(){
// uuid then base36 slice
return uuidv4().replace(/-/g,'').slice(0,7)
}


export function validShortcode(s){
if(!s) return false
if(s.length<3 || s.length>20) return false
if(!/^[a-zA-Z0-9_-]+$/.test(s)) return false
return true
}