import React from 'react'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import moment from 'moment'
import 'moment-duration-format'
import {XYPlot, LineSeries, VerticalGridLines,
   HorizontalGridLines, XAxis, YAxis, VerticalBarSeries, RadarChart} from 'react-vis'
import targetData from '../data/targetData'

class DetailView extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      markerPosition: 0,
      timeRemaining: "N/A",
      loaded: false,
      activeContainer: {
        long: 15,
        lat: 0,
        origin: {
          long: -100,
          lat: -10
        },
        targetRig: {
          long: 30,
          lat: 0
        }
      },
      wind: {direction: 210, speed: 41, gusts: 56},
      pressure: 1027
    }

    this.startTime = moment()
  }

  componentDidMount(){
    this.props.socket.on('location-changed', (data) => this.handleLocationChange(data))
    setInterval(() => this.randomiseData(), 4000)
    setInterval(() => this.updateTimeRemaining(), 1000)
    setTimeout(() => this.setState({loaded: true}), 100)
  }

  randomiseData(){
    this.setState({
      wind:{
        direction: Math.round(Math.random() * 10 + 210),
        speed: Math.round(Math.random() + 40),
        gusts: Math.round(Math.random() * 3 + 56)
      },
      pressure: Math.round(Math.random() * 2 + 1026)
    })
  }

  updateTimeRemaining(){
    this.setState(prevState => {
      const {distanceToRig, journeyDistance} = this.getDistances(prevState.activeContainer)
      if((journeyDistance - distanceToRig) <= 0) return "N/A"
      const secondsRemaining = Math.floor(distanceToRig/((journeyDistance - distanceToRig)/(moment().unix() -this.startTime.unix())))

      return {
        timeRemaining: `${moment.duration(Math.floor(secondsRemaining/3600), 'hours').format('HH')}:
        ${moment.duration(Math.floor(secondsRemaining/60)%60, 'minutes').format('mm')}:
        ${moment.duration(secondsRemaining%60, 'seconds').format('ss')}`
      }
    })
  }

  getDistances(container){
    const activeRig = container.targetRig,
          origin = container.origin
    const distanceToRig =
     Math.sqrt(Math.pow(activeRig.long - container.long, 2)+Math.pow(activeRig.lat - container.lat, 2))
    const journeyDistance =
       Math.sqrt(Math.pow(activeRig.long - origin.long, 2)+Math.pow(activeRig.lat - origin.lat, 2))
    return {distanceToRig, journeyDistance}
  }

  handleLocationChange(container){
      if(container.id !== this.state.activeContainer.id){
        return false
      }
  }

  getMarkerPosition(container){
    const {distanceToRig, journeyDistance} = this.getDistances(container)
    return (distanceToRig/journeyDistance)*100
  }

  render(){
    const {activeContainer, wind, pressure, timeRemaining, loaded} = this.state
    const {onPageSwitch} = this.props
    return(
      <Wrapper loaded={loaded}>
        <VisualContainer>
          <ToMap onClick={() => onPageSwitch()}>Map</ToMap>
          <JourneyHeading>Journey</JourneyHeading>
          <JourneyWrapper>
            <SVG src="images/shore2.svg"/>
            <Journey>
              <Marker position={() => this.getMarkerPosition(activeContainer)}/>
            </Journey>
            <SVG src="images/rig2.svg"/>
          </JourneyWrapper>
          <ContainerGrid>
            <tbody>
              <tr>
                <td>
                  <ContainerGridHeader>Target Rig</ContainerGridHeader>
                  <ContainerEmphasizedText>Hibernia A</ContainerEmphasizedText>
                </td>
                <td>
                  <ContainerGridHeader>Time Remaining</ContainerGridHeader>
                  <ContainerEmphasizedText>{timeRemaining}</ContainerEmphasizedText>
                </td>
              </tr>
            </tbody>
          </ContainerGrid>
        </VisualContainer>
        <Data>
          <TargetHeading>Environment at Target</TargetHeading>
          <TargetGraphs>
            <tbody>
              <tr>
                <td>
                  <GraphHeader>Wind</GraphHeader>
                  <ArrowWrapper direction={wind.direction}>
                    <FontAwesome name="location-arrow" tag="i"></FontAwesome>
                    <GraphText>
                      {`From ${wind.direction}° at ${wind.speed} km/h. Gusting at ${wind.gusts} km/h`}
                    </GraphText>
                  </ArrowWrapper>
                </td>
                <td>
                  <GraphHeader>Temperature</GraphHeader>
                    <XYPlot height={200} width={400}>
                      <VerticalGridLines />
                      <HorizontalGridLines />
                      <XAxis title="hour"/>
                      <YAxis title="temperature (°C)"/>
                      <LineSeries color="#306ba7" data={targetData.temperature}/>
                    </XYPlot>
                </td>
              </tr>
              <tr>
                <td>
                  <GraphHeader>Waves</GraphHeader>
                  <XYPlot height={200} width={400} stackBy="y">
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="hour"/>
                    <YAxis title="height (m)"/>
                    <YAxis title="Period (s)" left={330}/>
                    <VerticalBarSeries color="#306ba7" data={targetData.waveMaxHeight}/>
                    <VerticalBarSeries color="#72a5d8" data={targetData.waveAvgHeight}/>
                    <LineSeries color="#007fff" data={targetData.wavePeriod}/>
                  </XYPlot>
                </td>
                <td>
                  <GraphHeader>Precipitation</GraphHeader>
                  <GraphEmphasizedText>5%</GraphEmphasizedText>
                </td>
              </tr>
              <tr>
                <td>
                  <GraphHeader>Pressure</GraphHeader>
                  <GraphEmphasizedText>{`${pressure} mb`}</GraphEmphasizedText>
                </td>
                <td>
                  <GraphHeader>Risk</GraphHeader>
                  <RadarChart data={targetData.riskAreas}
                              width={400}
                              height={300}
                              tickFormat={() => ""}
                              domains={targetData.riskDirections}/>
                </td>
              </tr>
            </tbody>
          </TargetGraphs>
          <ContainerSection>
            <ContainerHeading>Container Details</ContainerHeading>
            <ContainerGrid>
              <tbody>
                <tr>
                  <td>
                    <ContainerGridHeader>Importance</ContainerGridHeader>
                    <ContainerEmphasizedText>Critical</ContainerEmphasizedText>
                  </td>
                  <td>
                    <ContainerGridHeader>ID</ContainerGridHeader>
                    <ContainerEmphasizedText>C22-FG56438A</ContainerEmphasizedText>
                  </td>
                </tr>
                <tr>
                  <td>
                    <ContainerGridHeader>Contents</ContainerGridHeader>
                    <ContainerText>
                      T551B - Alloy Welders<br/>
                      T127F - Secondary Drilling Machinery<br/>
                      F051A - Nutritional Packages
                    </ContainerText>
                  </td>
                  <td>
                    <ContainerGridHeader>Weight</ContainerGridHeader>
                    <ContainerEmphasizedText>9547 kg</ContainerEmphasizedText>
                  </td>
                </tr>
              </tbody>
            </ContainerGrid>
          </ContainerSection>
        </Data>
      </Wrapper>
    )
  }
}

export default DetailView

const Wrapper = styled.div`
  opacity: ${({loaded}) => loaded ? `1` : `0`};
  transition: opacity 1s;
`

const VisualContainer = styled.div`
  text-align: center;
  background-color: #007fff;
  padding: 5rem 0;
  color: #fff;
  position: relative;
`

const ToMap = styled.div`
  position: absolute;
  right: 2rem;
  top: 1rem;
  font-weight: 100;
  font-size: 1.5rem;
  padding: 0.5rem;
  border: 1px solid #fff;
  border-radius: 10px;
  cursor: pointer;

  &:hover{
    background-color: rgba(255, 255, 255, 0.1);
  }
`

const JourneyWrapper = styled.div`
  padding: 10vh 0;
`
const SVG = styled.img`
  display: inline-block;
  vertical-align: bottom;
  &:first-of-type{
    width: 20%;
  }
  &:last-of-type{
    height: 200px;
  }
`
const JourneyHeading = styled.div`
  font-size: 4rem;
  font-family: Helvetica, sans-serif;
  color: #fff;
`

const Journey = styled.div`
  border-bottom: 3px solid #fff;
  vertical-align: bottom;
  display: inline-block;
  width: 60%;
  margin-bottom: 10px;
`
const Marker = styled.div`
  width: 0;
  height: 0;
  position: relative;
  border-style: solid;
  border-width: 50px 25px 0 25px;
  border-color: #ffffff transparent transparent transparent;
  margin-bottom: 1rem;
  margin-right: -25px;
  float: right;
  right: ${({position}) => position}%;
  animation: fading;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  @keyframes fading{
    from{opacity: 0;}
    to{opacity: 1;}
  }
`

const Data = styled.div`
  text-align: center;
  padding: 1rem 0;
  padding-bottom: 0;
`

const TargetHeading = styled.p`
  margin: 1rem auto;
  display: inline;
  font-size: 3rem;
  font-weight: 100;
`

const TargetGraphs = styled.table`
  width: 100%;
  td{
    width: 50%;
    .rv-xy-plot{
      margin: 0 auto;
    }
  }
`
const GraphHeader = styled.p`
  font-size: 2rem;
  font-weight: 100;
`

const GraphText = styled.p`
  font-size: 1.25rem;
`

const GraphEmphasizedText = styled(GraphText)`
  font-size: 4rem;
`

const ArrowWrapper = styled.div`
  .fa{
    font-size: 5rem;
    color: #306ba7;
    transition: transform 0.75s;
    transform: rotate(${({direction}) => -45+direction-180}deg);
  }
`
const ContainerSection = styled(VisualContainer)`
  color: #fff;
`

const ContainerHeading = styled(JourneyHeading)``

const ContainerGrid = styled(TargetGraphs)``

const ContainerGridHeader = styled(GraphHeader)``

const ContainerText = styled(GraphText)`
  text-align: left;
  display: inline-block;
`

const ContainerEmphasizedText = styled(GraphEmphasizedText)``
