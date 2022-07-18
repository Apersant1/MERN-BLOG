import React, {useEffect, useRef} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MDEditor from '@uiw/react-md-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {useSelector} from "react-redux";
import {isAuthSelector} from "../../redux/slices/auth";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import axios from "../../axios";

export const AddPost = () => {
    const {id} = useParams();
    const isAuth = useSelector(isAuthSelector);
    const navigate = useNavigate();
    const [text, setText] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const previeRef = useRef(null);

    const isEditing = Boolean(id);

    const handleChangeFile = async (e) => {
        try {
            const formData = new FormData()
            formData.append('image', e.target.files[0]);
            const {data} = await axios.post('/upload', formData);
            setImageUrl(data.url)
        } catch (e) {
            console.log(e)
            alert("Ошибка при загрузки превью")
        }

    };

    const onClickRemoveImage = () => {
        setImageUrl('');
    };
    const onSubmit = async () => {
            try {
                setIsLoading(true);

                const fields = {
                    title,
                    tags,
                    text,
                    imageUrl

                };


                const {data} = isEditing
                    ? await axios.patch(`/posts/${id}`, fields)
                    : await axios.post('/posts', fields);
                const _id = isEditing ? id : data._id


                navigate(`/posts/${_id}`)
            } catch (e) {
                alert("Error")
                console.warn(e)
            }

        };
    const onChange = React.useCallback((value) => {
        setText(value);
    }, []);
    useEffect(() => {
        axios.get(`/posts/${id}`).then(({data}) =>{
            setTitle(data.title)
            setText(data.text)
            setTags(data.tags.join(','))
            setImageUrl(data.imageUrl)
        })
}, [])


const options = React.useMemo(
    () => ({
        spellChecker: false,
        maxHeight: '400px',
        autofocus: true,
        placeholder: 'Введите текст...',
        status: false,
        autosave: {
            enabled: true,
            delay: 1000,
        },
    }),
    [],
);

if (!isAuth) {
    return <Navigate to="/"/>
}


return (
    <Paper style={{padding: 30}} elevation={1} data-color-mode="light">
        <Button onClick={() => previeRef.current.click()} variant="outlined" size="large">
            Загрузить превью
        </Button>
        <input type="file" ref={previeRef} onChange={handleChangeFile} hidden/>
        {imageUrl && (
            <>
                <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                    Удалить
                </Button>
                <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded"/>
            </>
        )}
        <br/>
        <br/>
        <TextField
            classes={{root: styles.title}}
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заголовок статьи..."
            fullWidth
        />
        <TextField
            classes={{root: styles.tags}}
            value={tags}

            onChange={(e) => setTags(e.target.value)}
            variant="standard" placeholder="Тэги"
            fullWidth/>
        <MDEditor
            className={styles.editor}
            value={text}
            height={400}
            onChange={onChange}
            options={options}
        />
        <div className={styles.buttons}>
            <Button onClick={onSubmit} size="large" variant="contained">
                {isEditing ? 'Сохранить' : 'Опубликовать'}
            </Button>
            <a href="/">
                <Button size="large">Отмена</Button>
            </a>
        </div>
    </Paper>
);
}
;
