import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, isAuthSelector} from "../../redux/slices/auth";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";

export const Registration = () => {


    const isAuth = useSelector(isAuthSelector)
    const dispatch = useDispatch();


    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            fullname: '', email: '', password: ''
        }, mode: 'onChange',
    })

    const OnSubmit = async (values) => {
        let data = await dispatch(fetchRegister(values))
        if (!data.payload) {
            alert("Не удалось зарегистрироваться!")
        }
        if ('token' in data.payload) {
            window.localStorage.setItem("token", data.payload.token)
        }
    }
    if (isAuth) {
        return <Navigate to="/"/>
    }

    return (
        <Paper classes={{root: styles.root}} elevation={1}>
            <Typography classes={{root: styles.title}} variant="h5">
                Создание аккаунта
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{width: 100, height: 100}}/>
            </div>
            <form onSubmit={handleSubmit(OnSubmit)}>
                <TextField className={styles.field}
                           {...register('fullname', {required: "Введите никнейм"})}
                           error={Boolean(errors.fullname?.message)}
                           label="Полное имя"
                           fullWidth/>
                <TextField className={styles.field}
                           error={Boolean(errors.email?.message)}
                           type="email"
                           {...register('email', {required: "Введите email"})}
                           label="E-Mail"
                           fullWidth/>
                <TextField className={styles.field}
                           {...register('password', {required: "Введите пароль"})}
                           error={Boolean(errors.password?.message)}
                           helperText={errors.password?.message}
                           type='password'
                           label="Пароль"
                           fullWidth/>
                <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
                    Зарегистрироваться
                </Button>
            </form>
        </Paper>);
};
