import { useState, useEffect, ChangeEvent } from 'react';
import { Container, Typography, TextField, Button } from "@material-ui/core";
import Tema from '../../../models/Tema';
import { buscaId, post, put } from '../../../services/Service';
import { useNavigate, useParams } from 'react-router-dom';
// import useLocalStorage from 'react-use-localstorage';
import { UserState } from '../../../store/tokens/useReducer';
import './CadastroTema.css';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function CadastroTema() {
    let history = useNavigate();
    const { id } = useParams<{ id: string }>();
    // const [token, setToken] = useLocalStorage('token');
    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    );

    // Vai alterar um tema cadastrado
    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    useEffect(() => {
        if (token === '') {
            // alert("Voce precisa estar logado.")
            toast.error('Você precisa estar logado!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            history("/login")
        }
    }, [token])

    useEffect(() => {
        // Se há um id
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        await buscaId(`/temas/${id}`, setTema, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        // Se o ID for diferente de indefinido tente Atualizar
        if (id !== undefined) {

            // TRY: Tenta executar a atualização 
            try {
                await put(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                // alert('Tema atualizado com sucesso');
                toast.success('Tema atualizado com sucesso !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });

                // CATCH: Caso tenha algum erro, pegue esse erro e mande uma msg para o usuário
            } catch (error) {
                console.log(`Error: ${error}`)
                // alert("Erro, por favor verifique a quantidade minima de caracteres")
                toast.error('Erro, por favor verifique a quantidade minima de caracteres!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
            }

            // Se o ID for indefinido, tente Cadastrar
        } else {

            // TRY: Tenta executar o cadastro
            try {
                await post(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                // alert('Tema cadastrado com sucesso');
                toast.success('Tema cadastrado com sucesso !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });

                // CATCH: Caso tenha algum erro, pegue esse erro e mande uma msg para o usuário
            } catch (error) {
                console.log(`Error: ${error}`)
                // alert("Erro, por favor verifique a quantidade minima de caracteres")
                toast.error('Erro, por favor verifique a quantidade minima de caracteres!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
            }
        }

        back()
    }

    function back() {
        history('/temas')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                <TextField
                    value={tema.descricao}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                    id="descricao"
                    label="descricao"
                    variant="outlined"
                    name="descricao"
                    margin="normal"
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroTema;