
interface Props {
    children: string;
    color?: 'purple' | 'orange' | 'grey';
    onClick: () => void;
}

const Button = ({children, color = 'orange', onClick} : Props) => {
  return (
    <button type="button" className={'btn btn-outline-' + color } onClick = {onClick}>{children}</button>
  )
}

export default Button