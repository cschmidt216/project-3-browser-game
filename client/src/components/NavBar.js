import React, {useState} from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

function NavBar() {
    const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (e, { name }) => setActiveItem(name)

    return (
        <Menu pointing secondary size='massive' color='purple'>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Item
            name='characters'
            active={activeItem === 'characters'}
            onClick={handleItemClick}
            as={Link}
            to="/characters"
          />
          <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
            <Menu.Item
              name='signup'
              active={activeItem === 'signup'}
              onClick={handleItemClick}
                as={Link}
                to="/signup"
            />
          </Menu.Menu>
        </Menu>
    )
}

export default NavBar;