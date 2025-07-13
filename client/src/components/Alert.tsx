import type { JSX, ReactNode } from "react"

interface Props {
    children: ReactNode;
    onAlertClick?: () => void; 
}

const Alert = ({ children, onAlertClick}: Props): JSX.Element => {
  return (
<div className="alert alert-warning alert-dismissible fade show" role="alert">
  {children}
  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick = {onAlertClick}></button>
</div>  )
}

export default Alert