import avatarImg from '../../assets/avatar.png'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';
import './header.css'

function Header() {
    const { user } = useContext(AuthContext)
    return (
        <div className="sidebar">
            <div>
                <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="foto do usuario"></img>
            </div>
            <Link to="/dashboard">
                <FiHome color="#fff" size={24}></FiHome>Chamados
            </Link>
            <Link to="/customers">
                <FiUser color="#fff" size={24}></FiUser>Clientes
            </Link>
            <Link to="/profile">
                <FiSettings color="#fff" size={24}></FiSettings>Perfil
            </Link>
        </div>
    )
}

export default Header;