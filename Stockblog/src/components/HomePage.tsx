import React from 'react'
import {Link} from 'react-router-dom'

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <ul>
                <li>
                  <Link to='/stock/AAPL'>Apple (AAPL)</Link>
                  <Link to='/stock/GOOGL'>Apple (GOOGL)</Link>
                    {/* Add more links for other stocks */}
                </li>
            </ul>
        </div>
    )
}

export default HomePage