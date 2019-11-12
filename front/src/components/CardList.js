import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Row, Col, ButtonGroup } from "react-bootstrap";

import "../styles/cardList.css";
import { checkToken } from "../state/actions/auth";
import { getWatchedList, deleteWatched } from "../state/actions/watched";
import { getToWatchList, deleteToWatch } from "../state/actions/toWatch";
import Message from "./Message";

class WatchedList extends Component {
  componentDidMount() {
    this.props.dispatch(checkToken());

    if (this.props.match.path === "/lista-de-assistidos") {
      this.props.dispatch(getWatchedList());
    }
    if (this.props.match.path === "/lista-para-assistir") {
      this.props.dispatch(getToWatchList());
    }
  }

  render() {
    let tempList;

    if (this.props.match.path === "/lista-de-assistidos") {
      tempList = this.props.watchedList;
    }
    if (this.props.match.path === "/lista-para-assistir") {
      tempList = this.props.toWatchList;
    }

    if (!this.props.token) {
      return <Redirect to="/entrar" />;
    }

    return (
      <>
        <Message />
        <div className="my-container">
          <h1 className="text-center">
            {this.props.match.path === "/lista-de-assistidos" ? "Assistidos" : "Para Assistir"}
          </h1>
          <Link
            to={
              this.props.match.path === "/lista-de-assistidos"
                ? "/add-assistido"
                : "/add-para-assistir"
            }
          >
            <div className="my-button mb-4 text-center">Adicionar Novo</div>
          </Link>
          {tempList && tempList.length > 0 ? (
            <Row>
              {tempList.map((temp, _id) => (
                <Col key={_id} xs={12} sm={6} lg={4} className="mb-4">
                  <Card className="my-card">
                    <Card.Header className="my-card-header">{temp.name}</Card.Header>
                    <Card.Body>
                      <div>
                        {temp.season ? (
                          <p className="my-card-content">Temporada: {temp.season}</p>
                        ) : null}
                        {temp.episode ? (
                          <p className="my-card-content">Episódio: {temp.episode}</p>
                        ) : null}
                        {temp.time ? <p className="my-card-content">Tempo: {temp.time}</p> : null}
                        {temp.link ? (
                          temp.link.charAt(0) === "h" ? (
                            <a href={temp.link} target="__blank" className="my-card-content">
                              Link: {temp.link}
                            </a>
                          ) : (
                            <a href={"//" + temp.link} target="__blank" className="my-card-content">
                              Link: {temp.link}
                            </a>
                          )
                        ) : null}
                      </div>
                      <ButtonGroup className="w-100">
                        {this.props.match.path === "/lista-de-assistidos" ? (
                          <Link className="btn my-button" to={"/assistido/" + temp._id}>
                            Editar
                          </Link>
                        ) : (
                          <Link className="btn my-button" to={"/para-assistir/" + temp._id}>
                            Editar
                          </Link>
                        )}

                        <button
                          className="btn my-button"
                          onClick={() => {
                            if (this.props.match.path === "/lista-de-assistidos") {
                              this.props.dispatch(deleteWatched(temp._id));
                            }
                            if (this.props.match.path === "/lista-para-assistir") {
                              this.props.dispatch(deleteToWatch(temp._id));
                            }
                          }}
                        >
                          Deletar
                        </button>
                      </ButtonGroup>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>Sua lista esta vazia</p>
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    watchedList: state.watched.watchedList,
    toWatchList: state.toWatch.toWatchList
  };
}

export default connect(mapStateToProps)(WatchedList);
