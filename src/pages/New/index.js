import Title from "../../components/Title"
import Header from "../../components/Header"
import { FiPlusCircle } from "react-icons/fi"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import "./new.css"
import { db } from "../../services/firebaseconection"
import { collection, getDocs, getDoc, doc, addDoc, updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { useParams, useNavigate } from "react-router-dom"

const listRef = collection(db, "customers")

export default function New() {
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate(); 
    const [customers, setCustomers] = useState([])
    const [customerSelected, setCustomerSelected] = useState(0)
    const [complemento, setComplemento] = useState('')
    const [assunto, setAssunto] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')
    const [loadCustomer, setLoadCustomer] = useState(true)
    const [idCustomer, setIdCustomer] = useState(false)

    useEffect(() => {
        async function loadCustomers() {
            const querySnapshot = await getDocs(listRef)
                .then((snapshot) => {
                    let lista = []
                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nomeFantasia: doc.data().nomeFantasia
                        })
                    })
                    if (snapshot.docs.size === 0) {
                        setCustomers([{ id: '1', nomeFantasia: 'Freela' }])
                        setLoadCustomer(false)
                        return
                        // return;
                    }

                    setCustomers(lista);
                    setLoadCustomer(false)

                    if (id) {
                        loadId(lista)
                    }
                })
                .catch((e) => {
                    console.log('Erro ao buscar clientes ', e)
                    setLoadCustomer(false)
                    setCustomers([{ id: '1', nomeFantasia: 'Freela' }])
                })
        }
        loadCustomers()
    }, [id])

    async function loadId(lista) {
        const docRef = doc(db, "chamados", id)
        await getDoc(docRef)
            .then((snapshot) => {
                setAssunto(snapshot.data().assunto)
                setStatus(snapshot.data().status)
                setComplemento(snapshot.data().complemento)
                let index = lista.findIndex(item => item.id === snapshot.data().clienteId)
                setCustomerSelected(index)
                setIdCustomer(true)
            })
            .catch((e) => {
                setCustomers(false)
                console.log("Erro : " & e)
                toast.error("Erro ao acessar o registro...")
            })
    }

    function handleOptionChange(e) {
        setStatus(e.target.value);
    }

    function handleChangeSelect(e) {
        setAssunto(e.target.value)
    }

    function handleChangeCustomer(e) {
        setCustomerSelected(e.target.value)
    }


    async function handleRegister(e) {
        e.preventDefault()

        if (idCustomer) {
            const docRef = doc(db, "chamados", id);
            await updateDoc(docRef, {
                cliente: customers[customerSelected].nomeFantasia,
                clienteId: customers[customerSelected].id,
                assunto: assunto,
                complemento: complemento,
                status: status,
                userId: user.uid
            })
                .then(() => {
                    toast.info("Chamado atualizado com sucesso.")
                    setCustomerSelected(0)
                    setComplemento('')
                    navigate('/dashboard')
                })
                .catch((e) => {
                    console.log(e)
                    toast.error('Ops., erro ao registrar.')
                })
            return
        }

        await addDoc(collection(db, "chamados"), {
            created: new Date(),
            cliente: customers[customerSelected].nomeFantasia,
            clienteId: customers[customerSelected].id,
            assunto: assunto,
            complemento: complemento,
            status: status,
            userId: user.uid
        })
            .then(() => {
                toast.success("Chamado incluído com sucesso.")
                setComplemento('')
                setCustomerSelected(0)
            })
            .catch((e) => {
                console.log(e)
                toast.error('Ops., erro ao registrar.')
            })
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name={idCustomer ? "Editando chamado":"Novo chamado:"}>
                    <FiPlusCircle size={25} />
                </Title>
                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Clientes</label>
                        {
                            loadCustomer ? (
                                <input type="text" disabled={true} value="Carregando..."></input>
                            ) : (
                                <select value={customerSelected} onChange={handleChangeCustomer}>
                                    {customers.map((item, index) => {
                                        return (
                                            <option key={index} value={index}>
                                                {item.nomeFantasia}
                                            </option>
                                        )
                                    })}
                                </select>
                            )
                        }
                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Tecnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>
                        <label>Status</label>
                        <div className="status">
                            <input
                                type="radio"
                                name="radio"
                                value="Aberto"
                                onChange={handleOptionChange}
                                checked={status === 'Aberto'}>
                            </input>
                            <span>Em aberto</span>
                            <input
                                type="radio"
                                name="radio"
                                value="Progresso"
                                onChange={handleOptionChange}
                                checked={status === 'Progresso'}>
                            </input>
                            <span>Progresso</span>
                            <input
                                type="radio"
                                name="radio"
                                value="Atendido"
                                onChange={handleOptionChange}
                                checked={status === 'Atendido'}>
                            </input>
                            <span>Atendido</span>
                        </div>
                        <label>Complemento</label>
                        <textarea
                            type="text"
                            placeholder="Descreva seu problema (opcional)."
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        >
                        </textarea>
                        <button>Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}