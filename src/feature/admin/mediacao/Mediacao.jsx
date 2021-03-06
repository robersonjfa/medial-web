import React from 'react';
import GridContainer from '../../../core/components/grid/GridContainer';
import GridItem from '../../../core/components/grid/GridItem';
import Situacao from './containers/Situacao';
import Acordos from './containers/Acordos';
import Anexos from './containers/Anexos';
import Mensagens from './containers/Mensagens';
import Solicitacao from './containers/Solicitacao';
import VideoConferencia from './containers/video/VideoConferencia';
import queryString from 'query-string';


class Mediacao extends React.PureComponent {

  state = {
    codigoMediacao: queryString.parse(this.props.location.search, { ignoreQueryPrefix: true }).id,
    exibirVideoConferencia: false
  }

  handleAlterarVideoConferenciaView() {
    this.setState({ exibirVideoConferencia: !this.state.exibirVideoConferencia });
  }

  getGridColumnsBigScreen() {
    return !this.state.exibirVideoConferencia ? 9 : 12;    
  }

  render() {
    const { codigoMediacao } = this.state;
    
    return (
      <React.Fragment>
        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={this.getGridColumnsBigScreen()} lg={this.getGridColumnsBigScreen()}>
            {
              !this.state.exibirVideoConferencia
              ? <Solicitacao 
                  codigoMediacao={codigoMediacao}
                  onShowVideoConferencia={() => this.handleAlterarVideoConferenciaView()} 
                /> 
              : <VideoConferencia
                  codigoMediacao={codigoMediacao}
                  onShowMediacao={() => this.handleAlterarVideoConferenciaView()} 
                />
            }
            <Mensagens
              codigoMediacao={codigoMediacao}
              isVideoConferencia={this.state.exibirVideoConferencia}
            />
          </GridItem>
          {!this.state.exibirVideoConferencia ? (
            <GridItem xs={12} sm={12} md={3} lg={3}>
              <Situacao codigoMediacao={codigoMediacao} />
            <Acordos codigoMediacao={codigoMediacao} />
            <Anexos codigoMediacao={codigoMediacao} />
            </GridItem>
          ) : null }
        </GridContainer>
      </React.Fragment>
    );
  }
};

export default Mediacao;