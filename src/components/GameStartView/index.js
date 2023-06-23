import {ParticipantBtn, ParticipantImg} from '../styledComponents'

const GameStartView = props => {
  const {imageUrl, id, onUserChoose} = props

  const onButtonClick = () => {
    onUserChoose(id, imageUrl)
  }

  let dataTestIdVal

  switch (id) {
    case 'ROCK':
      dataTestIdVal = 'rockButton'
      break
    case 'SCISSORS':
      dataTestIdVal = 'scissorsButton'
      break
    default:
      dataTestIdVal = 'paperButton'
      break
  }

  return (
    <ParticipantBtn
      type="button"
      data-testid={dataTestIdVal}
      onClick={onButtonClick}
    >
      <ParticipantImg src={imageUrl} alt={id} />
    </ParticipantBtn>
  )
}

export default GameStartView
