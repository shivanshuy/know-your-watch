import logo from './logo.svg';
import './App.css';
import Box from '@material-ui/core/Box';
import {HashRouter, Link} from 'react-router-dom';
import WatchSelector from './components/WatchSelector'

function App() {
  return (
    <HashRouter>
      <div className="header">
        <div className="header-content">
          <div className="header-text">Know Your Watch</div>
          <div className="header-logo"></div>
          <div className="header-extra">
            <div class="site-menu-item">
              <Link class="site-menu-item-text" to="/">Home</Link>
              <div class="site-menu-item-devider"></div>
              <Link class="site-menu-item-text" to="/about-watches">About Watches</Link>
              <div class="site-menu-item-devider"></div>
              <Link class="site-menu-item-text" to="/about-me">About Me</Link>
            </div>
          </div>
        </div>
      </div>

      <WatchSelector></WatchSelector>
    </HashRouter>
  );
}

export default App;
