import './index.css'

const NavbarItem = props => {
  const {activeNavId, onChangeNavButton, itemDetails} = props
  const itemStyle = activeNavId === itemDetails.id ? 'selected' : ''
  const {name, logo} = itemDetails
  const onClickButton = () => onChangeNavButton(itemDetails.id)

  return (
    <li className={`nav-item ${itemStyle}`}>
      <button className="nav-btn" onClick={onClickButton} type="button">
        <logo />
        {name}
      </button>
    </li>
  )
}
export default NavbarItem
