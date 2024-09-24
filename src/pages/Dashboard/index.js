import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header"
import Title from "../../components/Title";
import "./dashboard.css"
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";

function Dashboard() {
    const { logout } = useContext(AuthContext)
    async function handleLogout() {
        await logout();
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Tickets">
                    <FiMessageSquare size={25} />
                </Title>
                <>
                    <Link to='/new' className="new">
                        <FiPlus size={25} color="#FFF" />
                        Novo Chamado
                    </Link>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Cliente</th>
                                <th scope="col">Assunto</th>
                                <th scope="col">Status</th>
                                <th scope="col">Cadastrado em</th>
                                <th scope="col">#</th>
                            </tr>
                        </thead>


                        
                        <tbody>
                            <tr>
                                <td data-label="Cliente">Mercado</td>
                                <td data-label="Assunto">Suporte</td>
                                <td data-label="Status">
                                    <span className="badge" style={{ backgroundColor: '#999' }}>
                                        Em aberto
                                    </span>
                                </td>
                                <td data-label="Cadastrado">07/05/2024</td>
                                <td data-label="#">
                                    <button className="action" style={{ backgroundColor: '#3583f6' }}>
                                        <FiSearch color="#FFF" size={17} />
                                    </button>
                                    <button className="action" style={{ backgroundColor: '#f6a935' }}>
                                        <FiEdit2 color="#FFF" size={17} />
                                    </button>
                                </td>
                            </tr>




                            <tr>
                                <td data-label="Cliente">Informatica</td>
                                <td data-label="Assunto">Suporte</td>
                                <td data-label="Status">
                                    <span className="badge" style={{ backgroundColor: '#999' }}>
                                        Em aberto
                                    </span>
                                </td>
                                <td data-label="Cadastrado">07/05/2024</td>
                                <td data-label="#">
                                    <button className="action" style={{ backgroundColor: '#3583f6' }}>
                                        <FiSearch color="#FFF" size={17} />
                                    </button>
                                    <button className="action" style={{ backgroundColor: '#f6a935' }}>
                                        <FiEdit2 color="#FFF" size={17} />
                                    </button>
                                </td>
                            </tr>









                        </tbody>
                    </table>
                </>
            </div>
        </div>
    )
}

export default Dashboard;