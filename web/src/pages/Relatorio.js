import React, { useState } from "react";
import SlideShow from "../components/SlideShow";
import NavBar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

import "./Painel.css"
import ip from '../config/ip';

const Relatorio = ({route}) => {
  const location = useLocation();
  const id = 1

  console.log(id);
  
  const [relatorio,setRelatorio] = React.useState([]);


  async function getRelatorio(id) {
    const res = await fetch(ip.backend_ip + "relatorio/" + id);
    const relatorioAux = await res.json();
    setRelatorio(relatorioAux);
  }

  React.useEffect(() => {
    getRelatorio(id);
  }, []);

  console.log(relatorio)


  return (
    <React.Fragment>
      <div className="row">
        <NavBar />
        <div className='row'>
          <div className="right-panel" style={{ paddingTop: 10, paddingRight: 30 }}>
            <h1 style={{ textAlign: "center" }}>Relatório <b>{id}</b> </h1>
            <div className='card' style={{width:100, height:100}}>
              <div className="card-body">
                <ul className="list-group">
                  {relatorio.map((e) => (
                    <React.Fragment>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col-4'>
                            <b>Data de inicio:</b>
                          </div>
                          <div className='col-8'>
                            {e.data_inicio}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col-4'>
                            <b>Data de fim:</b>
                          </div>
                          <div className='col-8'>
                            {e.data_fim}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col-4'>
                            <b>Id da intervenção:</b>
                          </div>
                          <div className='col-8'>
                            {e.id_intervencao}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col-4'>
                            <b>Passo 1 - Identificar a referencia do PDO e verificar se coincide com a ordem de trabalho:</b>
                          </div>
                          <div className='col-8'>
                            {((e) => {
                              if(e.passo_1 === 0){
                                return "Passo correto"
                              }
                              else{
                                return "Passo incorreto"
                              }
                            })}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col-4'>
                            <b>Passo 3 - Medir a potencia ótica no conetor:</b>
                          </div>
                          <div className='col-8'>
                            {((e) => {
                              if(e.passo_3 === 0){
                                return "Passo correto"
                              }
                              else{
                                return "Passo incorreto"
                              }
                            })}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col-4'>
                            <b>Passo 5 - Passar o cabo de drop pelo slot:</b>
                          </div>
                          <div className='col-8'>
                            {((e) => {
                              if(e.passo_5 === 0){
                                return "Passo correto"
                              }
                              else{
                                return "Passo incorreto"
                              }
                            })}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col-4'>
                            <b>Passo 7 - Identificar o tabuleiro verde para fusão:</b>
                          </div>
                          <div className='col-8'>
                            {((e) => {
                              if(e.passo_7 === 0){
                                return "Passo correto"
                              }
                              else{
                                return "Passo incorreto"
                              }
                            })}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col-4'>
                            <b>Passo 9 - Ligar no conetor:</b>
                          </div>
                          <div className='col-8'>
                            {((e) => {
                              if(e.passo_9 === 0){
                                return "Passo correto"
                              }
                              else{
                                return "Passo incorreto"
                              }
                            })}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col-4'>
                            <b>Passo 11 - Verficar revestimento dos cabos:</b>
                          </div>
                          <div className='col-8'>
                            {((e) => {
                              if(e.passo_11 === 0){
                                return "Passo correto"
                              }
                              else{
                                return "Passo incorreto"
                              }
                            })}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col-4'>
                            <b>Passo 12 - Fechar o Tabuleiro:</b>
                          </div>
                          <div className='col-8'>
                            {((e) => {
                              if(e.passo_12 === 0){
                                return "Passo correto"
                              }
                              else{
                                return "Passo incorreto"
                              }
                            })}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col-4'>
                            <b>Passo 13 - Colocar a tag no cabo de drop:</b>
                          </div>
                          <div className='col-8'>
                            {((e) => {
                              if(e.passo_13 === 0){
                                return "Passo correto"
                              }
                              else{
                                return "Passo incorreto"
                              }
                            })}
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className='row'>
                          <div className='col-4'>
                            <b>Observações:</b>
                          </div>
                          <div className='col-8'>
                            {e.observacoes}
                          </div>
                        </div>
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Relatorio;