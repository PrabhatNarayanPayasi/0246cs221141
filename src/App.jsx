import React from 'react'
import UrlForm from './components/UrlForm'
import UrlList from './components/UrlList'
import StatsPage from './components/StatsPage'
import { Link } from 'react-router-dom'
import logger from './services/logger'


export default function App(){
logger.info('App mounted')
return (
<div className="container">
<header>
<h1>AFFORDMED URL Shortener (Placement Assessment)</h1>
<nav>
<Link to="/">Create</Link> | <a href="#stats">Statistics</a>
</nav>
</header>


<main>
<section className="left">
<UrlForm/>
</section>
<section className="right">
<UrlList/>
<div id="stats">
<StatsPage/>
</div>
</section>
</main>


<footer>
<small>Client-only demo — shortcodes redirect via client router (/r/:shortcode)</small>
</footer>
</div>
)
}