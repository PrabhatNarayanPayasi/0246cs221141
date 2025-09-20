export function isValidUrl(u){
try{
const parsed = new URL(u)
return parsed.protocol==='http:' || parsed.protocol==='https:'
}catch(e){
return false
}
}