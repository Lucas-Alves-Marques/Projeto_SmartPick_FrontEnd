import  style from './FormCadastro.module.css'

function Form(){
    return(
        <form className={style.form}>
            <input placeholder="Categoria"></input>     
        </form>

    )
}

export default Form;