import { FC } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'

type CommentFormProps = {
    onSubmit: (data: FormData) => void
}

type FormData = {
    text: string
}

const CommentForm: FC<CommentFormProps> = ({ onSubmit}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<FormData>()

    const onFormSubmit = handleSubmit((data) => {
        onSubmit(data)
        reset()
    })

    return (
        <form onSubmit={onFormSubmit}>
            <TextField
                {...register('text', { required: true})}
                fullWidth
                multiline
                rows={3}
                placeholder="Text your comment"
            />
            {errors.text && (
                <Alert severity="error">Please, text your comment</Alert>
            )}
            <Button type="submit">Send</Button>
        </form>
    )
}

export default CommentForm