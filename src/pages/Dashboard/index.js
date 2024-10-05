import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header"
import Title from "../../components/Title";
import "./dashboard.css"
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, limit, startAfter, query } from "firebase/firestore";
import { db } from "../../services/firebaseconection";
import { format } from "date-fns"
import Modal from "../Customers/Modal";

const listRef = collection(db, "chamados")

function Dashboard() {
    const { logout } = useContext(AuthContext)
    const [chamados, setChamados] = useState([])
    const [loading, setLoading] = useState(true)
    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDocs, setLastDocs] = useState()
    const [loadingMore, setLoadingMore] = useState(false)
    const [showPostModal, setShowPostModal] = useState(false)
    const [detail, setDetail] = useState()

    useEffect(() => {
        async function loadChamados() {
            const q = query(listRef, orderBy('created', 'desc'), limit(5));
            const querySnapshot = await getDocs(q)
            await updateState(querySnapshot)
            setLoading(false)
        }
        loadChamados();
        return () => { }
    }, [])

    async function updateState(querySnapshot) {
        const isCollectionEmpty = querySnapshot.size === 0; // true ou false
        if (!isCollectionEmpty) {
            let lista = [];
            querySnapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created,
                    createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento
                })
            });
            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] // ultimo item reinderizado
            setChamados(chamados => [...chamados, ...lista])
            if (lista.length < 5) { // se a lista conter menos q 5 registros o botao buscar mais nao vai aparecer 
                setLoadingMore(false)
                setIsEmpty(true)
            }
            setLastDocs(lastDoc)
        } else {
            setIsEmpty(true)
            setLoadingMore(false)
        }
    }

    async function handleMore() {
        // Só iniciar o carregamento se ainda houver mais chamados
        if (!isEmpty) {
            setLoadingMore(true);  // Marcar o início da busca
            const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDocs), limit(5));
            const querySnapshot = await getDocs(q);
            await updateState(querySnapshot);
            setLoadingMore(false);  // Marcar o fim da busca
        }
    }

    if (loading) {
        return (
            <div>
                <Header />
                <div className="content">
                    <Title name="Tickets">
                        <FiMessageSquare size={25}></FiMessageSquare>
                    </Title>
                    <div className="container dashboard">
                        <span>Buscando chamados...</span>
                    </div>
                </div>
            </div>
        )
    }

    function toggleModal(item) {
        setShowPostModal(!showPostModal)
        setDetail(item)
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Tickets">
                    <FiMessageSquare size={25} />
                </Title>
                <>
                    {chamados.length === 0 ? (
                        <div className="container dashboard">
                            <span>Nenhum chamado encontrado..</span>
                            <Link to='/new' className="new">
                                <FiPlus size={25} color="#FFF" />
                                Novo Chamado
                            </Link>
                        </div>
                    ) : (
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
                                    {chamados.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td data-label="Cliente">{item.cliente}</td>
                                                <td data-label="Assunto">{item.assunto}</td>
                                                <td data-label="Status">
                                                    <span className="badge" style={{ backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999' }}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td data-label="Cadastrado">{item.createdFormat}</td>
                                                <td data-label="#">
                                                    <button className="action" style={{ backgroundColor: '#3583f6' }}
                                                        onClick={() => toggleModal(item)}>
                                                        <FiSearch color="#FFF" size={17} />
                                                    </button>
                                                    <Link to={`/new/${item.id}`} className="action" style={{ backgroundColor: '#f6a935' }}>
                                                        <FiEdit2 color="#FFF" size={17} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            {loadingMore && !isEmpty && (
                                <h3 className="buscando-chamados">Buscando mais chamados...</h3>
                            )}

                            {!loadingMore && !isEmpty && (
                                <div className="botao-more">
                                    <button className="btn-more" onClick={handleMore}>Buscar mais</button>
                                </div>
                            )}

                        </>
                    )}
                </>
                <div className='container'>
                    <button className='logout-btn' onClick={() => logout()}>Sair</button>
                </div>
            </div>

            {showPostModal && (
                <Modal
                    conteudo={detail}
                    close={() => setShowPostModal(!showPostModal)} />
            )}
        </div >
    )
}

export default Dashboard;