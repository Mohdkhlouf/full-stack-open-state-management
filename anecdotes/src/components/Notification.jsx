const Notification = ({message}) => {

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    display: message ? "block" : "none"
  }

  return (
    <div style={style} data-testid="notification">
        {message ? ` ${message}` : null}
    </div>
  )
}

export default Notification
