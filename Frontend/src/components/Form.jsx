import '../styles/form.css'

export const Form = () => {
  const sendRequest = (evt) => {
    evt.preventDefault()
  }

  return (
    <form className="form-card" onSubmit={sendRequest}>
      <input type="text" placeholder='Usuario...' />
      <input type="password" placeholder='********' />
      <input className='submit-button' type="submit" />
    </form>
  )
}