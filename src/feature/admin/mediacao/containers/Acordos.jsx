import React from 'react';
import bindActionCreators from 'redux/src/bindActionCreators';
import Card from '../../../../core/components/card/Card';
import withRouter from 'react-router-dom/withRouter';
import { connect } from 'react-redux';
import CardHeader from '../../../../core/components/card/CardHeader';
import CardBody from '../../../../core/components/card/CardBody';
import { withStyles } from '@material-ui/core/styles';
import Button from '../../../../core/components/CustomButton';
import CardFooter from '../../../../core/components/card/CardFooter';
import ProporAcordo from './ProporAcordo';
import CancelOutlined from '@material-ui/icons/CancelOutlined';
import Done from '@material-ui/icons/Done';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import { ListItemIcon, ListItem } from '@material-ui/core';
import { compose } from 'recompose';
import * as acordoActions from '../services/acordo/acordoActions';
import * as mediacaoActions from '../services/mediacaoActions'
import moment from 'moment';

import { textSecondaryColor, textSuccessColor, textDangerColor, textWarningColor } from '../../../../assets/jss/styles';
import PropostaAcordo from './PropostaAcordo';
import API from '../../../../core/http/API';
import { TipoUsuarioEnum } from '../utils/tipoUsuarioEnum';

const styles = ({
  textSecondaryColor,
  textDangerColor,
  textSuccessColor,
  textWarningColor,
  semMargen: {
    margin: 0,
  },
  cardPropostas: {
    height: '250px'
  },
  cardBody: {
    overflow: 'overlay',
  },
  listItem: {
    margin: 5,
    padding: 0,
    cursor: 'pointer'
  }
});


class Acordos extends React.Component {

  state = {
    modalOpen: false,
    modalOpenProposta: false,
  }

  abrirProposta(id) {
    this.setState({ modalOpenProposta: true, codigoAcordo: id })
  }
  componentDidMount() {
    this.props.actions.adquirirAcordosMediacao(this.props.codigoMediacao);
  }

  getIcon(status) {
    const { classes } = this.props;

    switch (status) {
      case 'A':
        return (<ListItemIcon className={classes.textSuccessColor} >
          <Done />
        </ListItemIcon>);
      case 'R':
        return (<ListItemIcon className={classes.textDangerColor}>
          <CancelOutlined />
        </ListItemIcon>);
      case 'C':
        return (<ListItemIcon className={classes.textWarningColor}>
          <CancelOutlined />
        </ListItemIcon>);
      default:
        return (<ListItemIcon className={classes.textSecondaryColor}>
          <InfoOutlined />
        </ListItemIcon>);
    }

  }

  _listaAcordos() {
    const { classes } = this.props;

    return (
      <CardBody className={classes.cardBody}>
        {this.props.acordo.acordos.map(el => {
          return <ListItem className={classes.listItem} key={el.id.toString()} onClick={() => this.abrirProposta(el.id)}>
            {this.getIcon(el.status)}
            <span style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}> {'Acordo: ' + el.id + ' - Data: ' + moment(el.dataMediacao).format('DD/MM/YYYY HH:MM:SS')}</span>
          </ListItem>
        })}
      </CardBody>

    )
  }


  finalizarMediacao() {
    const { codigoMediacao } = this.props;

    API.post(`/mediacao/${codigoMediacao}/finalizarMediacao`)
      .then(response => {
        if (response.data.valor) {
          this.props.actions.showNotificacao('success', 'Mediação finalizada com sucesso. Verifique os anexos para visualizar os documentos')
          this.props.actions.buscarMediacao(codigoMediacao);
        }

      })
      .catch(error => {
        this.props.actions.showNotificacao('warning', 'Não foi possível processar sua solicitação. Tente novamente mais tarde.')
      });
  }

  render() {
    const { classes, auth } = this.props;
    let mediacaoFinalizada = this.props.mediacao.mediacao ? this.props.mediacao.mediacao.finalizado : true;
    let exibeFinalizar = true;
    this.props.acordo.acordos.forEach(element => {
      if (!element.status) {
        exibeFinalizar = false;
      }
    });
    let possuiPermissaoAdmin = auth.accessLevel === TipoUsuarioEnum.ADMINISTRADOR || auth.accessLevel === TipoUsuarioEnum.ADMINISTRADOR_NPJ;

    return (
      <React.Fragment>
        <Card className={classes.cardPropostas}>
          <CardHeader color='success'>
            <p className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Propostas de acordo</p>
          </CardHeader>
          {this._listaAcordos()}
          <CardFooter style={{ flexDirection: 'column' }}>
            <Button
              fullWidth
              size="sm"
              color='secondary'
              disabled={mediacaoFinalizada}
              onClick={() => this.setState({ modalOpen: true })}>
              {mediacaoFinalizada ? "Mediação Finalizada" : "Propor Acordo"}
            </Button>
            {this.props.acordo.acordos.length > 0 && exibeFinalizar && possuiPermissaoAdmin ?
              <Button
                fullWidth
                size="sm"
                color={mediacaoFinalizada ? null : 'danger'}
                disabled={mediacaoFinalizada}
                onClick={() => this.finalizarMediacao()}>
                Finalizar Mediação
               </Button> : null}
          </CardFooter>
        </Card>
        {this.state.modalOpen ? <ProporAcordo codigoMediacao={this.props.codigoMediacao} closeModal={() => this.setState({ modalOpen: false, codigoAcordo: 0 })} /> : null}
        {this.state.modalOpenProposta ? <PropostaAcordo codigoAcordo={this.state.codigoAcordo} codigoMediacao={this.props.codigoMediacao} closeModal={() => this.setState({ modalOpenProposta: false, codigoAcordo: 0 })} /> : null}
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => ({
  acordo: state.acordo,
  mediacao: state.mediacao,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...acordoActions,
    ...mediacaoActions,
  }, dispatch)
});

export default withRouter(compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Acordos));
