import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToken } from '../../../store/tokens/action';
import { UserState } from '../../../store/tokens/useReducer';
import './Navbar.css';

function Navbar() {

    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    );
    let history = useNavigate();
    const dispatch = useDispatch();

    function goLogout() {
        dispatch(addToken(''));
        // alert("Usuario deslogado")
        toast.info('Usuario deslogado !', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        });
        history('/login')
    }

    var navbarComponent;

    if (token !== "") {
        navbarComponent = <AppBar position="static">
            <Toolbar variant="dense">
                <Box style={{ cursor: "pointer" }} >
                    <Typography variant="h5" color="inherit">
                        BlogPessoal
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="start">

                    <Link to="/home" className='text-decorator-none'>
                        <Box mx={1} style={{ cursor: "pointer", color: "white" }}>
                            <Typography variant="h6">
                                home
                            </Typography>
                        </Box>
                    </Link>

                    <Link to="/posts" className='text-decorator-none'>
                        <Box mx={1} style={{ cursor: "pointer", color: "white" }}>
                            <Typography variant="h6">
                                postagens
                            </Typography>
                        </Box>
                    </Link>

                    <Link to="/temas" className='text-decorator-none'>
                        <Box mx={1} style={{ cursor: "pointer", color: "white" }}>
                            <Typography variant="h6">
                                temas
                            </Typography>
                        </Box>
                    </Link>

                    <Link to="/formulariotema" className='text-decorator-none'>
                        <Box mx={1} style={{ cursor: "pointer", color: "white" }}>
                            <Typography variant="h6">
                                cadastrar tema
                            </Typography>
                        </Box>
                    </Link>

                    <Box mx={1} style={{ cursor: "pointer", color: "white" }} onClick={goLogout}>
                        <Typography variant="h6">
                            logout
                        </Typography>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    }

    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar;