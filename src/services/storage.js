import logger from './logger'


const STORAGE_KEY = 'url_shortener_v1'


function load(){
try{
const raw = localStorage.getItem(STORAGE_KEY)
return raw ? JSON.parse(raw) : { items: [] }
}catch(e){
logger.error('Storage.load failed', e)
return { items: [] }
}
}


function save(state){
try{
localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}catch(e){
logger.error('Storage.save failed', e)
}
}


export default {
getAll(){
const s = load()
return s.items
},
upsert(item){
const s = load()
const idx = s.items.findIndex(i=>i.shortcode===item.shortcode)
if(idx>=0) s.items[idx]=item
else s.items.unshift(item)
save(s)
},
remove(shortcode){
const s = load()
s.items = s.items.filter(i=>i.shortcode!==shortcode)
save(s)
},
find(shortcode){
const s = load()
return s.items.find(i=>i.shortcode===shortcode)
}
}