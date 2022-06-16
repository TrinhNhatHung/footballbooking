import { useState } from "react";
import styled from "styled-components"
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, -0.4),
        rgba(255, 255, 255, -0.4)
        ),
        url("https://images5.alphacoders.com/571/thumb-1920-571559.jpg") 
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Introduce = styled.div`
    color: white;
    width: 40%;
    margin-bottom: 100px;
    margin-right: 100px;
    // background-color: white;
`;
const Caption = styled.h1`
    margin-top: 50px;
    margin-bottom: 50px;
    font-weight: 500px;
`;
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    margin-bottom: 30px;    
`;
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`;
const Detail = styled.button`
    width: 20%;
    // margin-bottom: 30px;
    border: 2px solid lightgray;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: transparent;
    color: white;
    cursor: pointer;
`;

const Wrapper = styled.div`
    width: 30%;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
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
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`;

function ValidateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input?.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

function ValidatePhone(input) {

    var validRegex = /^\d{10}$/;
    if (input?.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

function Register(props) {
    const [input, setInput] = useState({})
    const [passwordAgain, setPasswordAgain] = useState('')
    const { onClickSignup } = props
    function handleOnChange(e) {
        const inputcur = input
        setInput({
            ...inputcur,
            [e.target.name]: e.target.value
        })
    }
    function handleOnChangePasswordAgain(e) {
        setPasswordAgain(e.target.value)
    }
    function handleClickSignUp(event) {
        event.preventDefault()
        if (onClickSignup && passwordAgain === input.password && ValidatePhone(input.phone) && ValidateEmail(input.email)) {
            onClickSignup(input)
        }
    }
    return (
        <div>
            <Container>
                <Introduce>
                    <Caption>PITCH MANAGEMENT, FIND AN OPPONENT, BOOKING PITCH ONLINE</Caption>

                </Introduce>
                <Wrapper>
                    <Title>CREATE AN ACCOUNT</Title>
                    <Form>
                        <Input placeholder="full name" name="fullname" onChange={handleOnChange} value={input.fullname} />
                        <Input placeholder="email" name="email" onChange={handleOnChange} value={input.email} />
                        {(!ValidateEmail(input.email) && input.email !== undefined) ? <div style={{ color: 'red', textAlign: 'start', marginTop: '5px' }}>Email không hợp lại</div> : ""}
                        <Input placeholder="phone" name="phone" onChange={handleOnChange} value={input.phone} />
                        {(!ValidatePhone(input.phone) && input.phone !== undefined) ? <div style={{ color: 'red', textAlign: 'start', marginTop: '5px' }}>Phone không hợp lại</div> : ""}
                        <Input placeholder="password" type={"password"} name="password" onChange={handleOnChange} value={input.password} />
                        <Input placeholder="password again" type={"password"} name="passwordAgain" onChange={handleOnChangePasswordAgain} value={passwordAgain} />
                        {(input.password !== undefined && input.password !== passwordAgain && passwordAgain !== '') ? <div style={{ color: 'red', textAlign: 'start', marginTop: '5px' }}>Mật khẩu không hợp lại</div> : ""}
                        {console.log(input.password + " = " + passwordAgain)}
                        <Agreement>By creating an account, I consent to the processing of my personal
                            data in accordance with the<b> PRIVACY POLICY</b>
                        </Agreement>
                        <Button onClick={handleClickSignUp}>CREATE</Button>
                    </Form>
                </Wrapper>
                {console.log(input)}
            </Container>
        </div>

    );
}

export default Register