import { useState } from "react";
import styled from "styled-components"
import PropTypes from 'prop-types'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.2)
        ),
        url("https://htsport.vn/wp-content/uploads/2020/06/anh-bia-cup-c1-la-gi.jpg") 
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;
// https://htsport.vn/wp-content/uploads/2020/06/anh-bia-cup-c1-la-gi.jpg
// https://assets.manutd.com/AssetPicker/images/0/0/11/241/782617/GettyImages-1052814790-381552654385288_large.jpg
const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
`;

const Link = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

Login.propTypes = {
    onClickLogin: PropTypes.func
};

Login.defaultProps = {
    onClickLogin: null
};



function Login(props) {
    const [input, setInput] = useState({})
    const { onClickLogin } = props
    function handleOnChange(e) {
        const inputcur = input
        setInput({
            ...inputcur,
            [e.target.name]: e.target.value
        })
    }
    function handleClickLogin(event) {
        event.preventDefault()
        if (onClickLogin) {
            onClickLogin(input)
        }
    }
    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder="phone" name="phone" onChange={handleOnChange} value={input.username} />
                    <Input placeholder="password" name="password" onChange={handleOnChange} value={input.password} />
                    <Button onClick={handleClickLogin}>LOGIN</Button>
                    <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
                    <Link>CREATE A NEW ACCOUNT</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login