import React from "react";
import {useDispatch,useSelector} from "react-redux"
import {Navigate} from "react-router-dom"
import {useForm} from "react-hook-form";
import {fetchAuth, isAuthSelector} from "../../redux/slices/auth";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";


export const Login = () => {
    const isAuth = useSelector(isAuthSelector)
    const dispatch = useDispatch();


    const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
        defaultValues: {
            email: 'kepich@ya.RU',
            password: 'Appersant'
        },
        mode: 'onChange',
    })

    const OnSubmit = async (values) => {
        let data = await dispatch(fetchAuth(values))
        if(!data.payload){
            alert("Не удалось авторизоваться!")
        }
        if ('token' in data.payload){
            window.localStorage.setItem("token",data.payload.token)
        }
    }
    if(isAuth){
        return <Navigate to="/"/>
    }


    return (
        <Paper classes={{root: styles.root}} elevation={1}>
            <Typography classes={{root: styles.title}} variant="h5">
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(OnSubmit)} >
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    error={Boolean(errors.email?.message)}
                    type="email"
                    helperText={errors.email?.message}
                    {...register('email', {required: "Укажите email"})}
                    fullWidth
                />
                <TextField className={styles.field}
                           label="Пароль"
                           error={Boolean(errors.password?.message)}
                           helperText={errors.password?.message}
                           {...register('password', {required: "Введите пароль"})}
                           fullWidth/>
                <Button type='submit'  size="large" variant="contained" fullWidth>
                    Войти
                </Button>
            </form>
        </Paper>
    );
};
