import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import GameStartView from '../GameStartView'

import {
  BgContainer,
  ScoreHeader,
  Participant,
  ScoreContainer,
  ScoreTitle,
  ScoreValue,
  PlayStartContainer,
  FirstRow,
  SecondRow,
  ResultContainer,
  ParticipantsContainer,
  PersonContainer,
  PersonName,
  ParticipantImg,
  StatusRestartContainer,
  Result,
  PlayAgainBtn,
  RulesContainer,
  RulesBtn,
  CloseBtn,
  PopUpView,
  PopupBtnContainer,
  RulesImg,
  PopupImgContainer,
} from '../styledComponents'
import 'reactjs-popup/dist/index.css'

class GameHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      choicesList: props.choicesList,
      isUserSelected: false,
      userSelectedUrl: '',
      opponentSelectedUrl: '',
      score: 0,
      result: '',
    }
  }

  onUserChoose = (id, imageUrl) => {
    const {choicesList} = this.state
    let {score} = this.state
    const userSelectedUrl = imageUrl
    const idOfUserSelected = id
    const randomNumber = Math.floor(Math.random() * 3)
    const opponentSelectedUrl = choicesList[randomNumber].imageUrl
    const idOfOpponentSelected = choicesList[randomNumber].id

    let result

    if (idOfUserSelected === 'ROCK') {
      switch (idOfOpponentSelected) {
        case 'SCISSORS':
          result = 'YOU WON'
          score += 1
          break
        case 'PAPER':
          result = 'YOU LOSE'
          score -= 1
          break
        default:
          result = 'IT IS DRAW'
          break
      }
    } else if (idOfUserSelected === 'SCISSORS') {
      switch (idOfOpponentSelected) {
        case 'ROCK':
          result = 'YOU LOSE'
          score -= 1
          break
        case 'PAPER':
          result = 'YOU WON'
          score += 1
          break
        default:
          result = 'IT IS DRAW'
          break
      }
    } else {
      switch (idOfOpponentSelected) {
        case 'ROCK':
          result = 'YOU WON'
          score += 1
          break
        case 'SCISSORS':
          result = 'YOU LOSE'
          score -= 1
          break
        default:
          result = 'IT IS DRAW'
          break
      }
    }

    this.setState({
      isUserSelected: true,
      userSelectedUrl,
      opponentSelectedUrl,
      score,
      result,
    })
  }

  onPlayAgainClick = () => {
    this.setState({
      isUserSelected: false,
      userSelectedUrl: '',
      opponentSelectedUrl: '',
      result: '',
    })
  }

  render() {
    const {
      choicesList,
      isUserSelected,
      userSelectedUrl,
      opponentSelectedUrl,
      score,
      result,
    } = this.state
    const firstRowChoicesList = [choicesList[0], choicesList[1]]
    const secondRowChoicesList = [choicesList[2]]

    return (
      <BgContainer>
        <ScoreHeader>
          <div>
            <Participant> ROCK </Participant>
            <Participant> PAPER </Participant>
            <Participant> SCISSORS </Participant>
          </div>
          <ScoreContainer>
            <ScoreTitle>Score</ScoreTitle>
            <ScoreValue>{score}</ScoreValue>
          </ScoreContainer>
        </ScoreHeader>
        {!isUserSelected && (
          <PlayStartContainer>
            <FirstRow>
              {firstRowChoicesList.map(eachChoice => (
                <GameStartView
                  imageUrl={eachChoice.imageUrl}
                  id={eachChoice.id}
                  key={eachChoice.id}
                  onUserChoose={this.onUserChoose}
                />
              ))}
            </FirstRow>
            <SecondRow>
              {secondRowChoicesList.map(eachChoice => (
                <GameStartView
                  imageUrl={eachChoice.imageUrl}
                  id={eachChoice.id}
                  key={eachChoice.id}
                  onUserChoose={this.onUserChoose}
                />
              ))}
            </SecondRow>
          </PlayStartContainer>
        )}
        {isUserSelected && (
          <ResultContainer>
            <ParticipantsContainer>
              <PersonContainer>
                <PersonName>YOU</PersonName>
                <ParticipantImg src={userSelectedUrl} alt="your choice" />
              </PersonContainer>
              <PersonContainer>
                <PersonName>OPPONENT</PersonName>
                <ParticipantImg
                  src={opponentSelectedUrl}
                  alt="opponent choice"
                />
              </PersonContainer>
            </ParticipantsContainer>
            <StatusRestartContainer>
              <Result>{result}</Result>
              <PlayAgainBtn type="button" onClick={this.onPlayAgainClick}>
                PLAY AGAIN
              </PlayAgainBtn>
            </StatusRestartContainer>
          </ResultContainer>
        )}
        <RulesContainer>
          <Popup
            contentStyle={{width: '80%', maxWidth: 700}}
            modal
            trigger={<RulesBtn type="button">RULES</RulesBtn>}
          >
            {close => (
              <PopUpView>
                <PopupBtnContainer>
                  <CloseBtn type="button" onClick={() => close()}>
                    <RiCloseLine />
                  </CloseBtn>
                </PopupBtnContainer>
                <PopupImgContainer>
                  <RulesImg
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    alt="rules"
                  />
                </PopupImgContainer>
              </PopUpView>
            )}
          </Popup>
        </RulesContainer>
      </BgContainer>
    )
  }
}

export default GameHome
