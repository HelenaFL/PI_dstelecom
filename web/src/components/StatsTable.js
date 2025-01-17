import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  buttonGroup,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import ip from "../config/ip";


import { useNavigate } from "react-router-dom";


function StatsTable() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(4);
  const [sortFilterValue, setSortFilterValue] = useState("");
  const [operation, setOperation] = useState("");


  const navigate = useNavigate();


  const sortOptions = ["Total de Trabalhos", "Média de Erros", "Média de Tempo"];

  useEffect(() => {
    loadUsersData(0, 4, 0);
  }, []);

  const loadUsersData = async (
    start,
    end,
    increase,
    optType = null,
    filterOrSortValue
  ) => {
    switch (optType) {
      case "search":
        setOperation(optType);
        setSortValue("");
        return await axios
          .get(ip.backend_ip + 'searchstat/' + value)
          .then((response) => {
            setData(response.data);
            //setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      case "sort":
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            ip.backend_ip + 'sortstat/' + filterOrSortValue
          )
          .then((response) => {
            setData(response.data);
            //setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      default:
        return await axios
          .get(ip.backend_ip + 'stats')
          .then((response) => {
            setData(response.data);
            //setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
    }
  };

  console.log("data", data);

  const handleConsulta = (p) => {
    navigate('/equipa', { state: { id: p } })
  }

  const handleReset = () => {
    setOperation("");
    setValue("");
    setSortFilterValue("");
    setSortValue("");
    loadUsersData(0, 4, 0);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    loadUsersData(0, 4, 0, "search");
    // return await axios
    //   .get(`http://localhost:5000/users?q=${value}`)
    //   .then((response) => {
    //     setData(response.data);
    //     setValue("");
    //   })
    //   .catch((err) => console.log(err));
  };

  const handleSort = async (e) => {
    let value = e.target.value;
    loadUsersData(0, 4, 0, "sort", value);
    setSortValue(value);

    // return await axios
    //   .get(`http://localhost:5000/users?_sort=${value}&_order=asc`)
    //   .then((response) => {
    //     setData(response.data);
    //   })
    //   .catch((err) => console.log(err));
  };
  const handleFilter = async (value) => {
    loadUsersData(0, 4, 0, "filter", value);
    // return await axios
    //   .get(`http://localhost:5000/users?status=${value}`)
    //   .then((response) => {
    //     setData(response.data);
    //   })
    //   .catch((err) => console.log(err));
  };

  const horas = (item) => {
    if (item.media_tempo.hours == null) {
      item.media_tempo.hours = 0
    }
    else {
      item.media_tempo.hours = item.media_tempo.hours
    }


    if (item.media_tempo.days == null) {
      item.media_tempo.days = 0
    }
    else {
      item.media_tempo.days = item.media_tempo.days
    }

    if (item.media_tempo.minutes == null) {
      item.media_tempo.minutes = 0
    }
    else {
      item.media_tempo.minutes = item.media_tempo.minutes
    }

    if (item.media_tempo.seconds == null) {
      item.media_tempo.seconds = 0
    }
    else {
      item.media_tempo.seconds = item.media_tempo.seconds
    }


    return item.media_tempo.days + ' d :' + item.media_tempo.hours + ' h :' + item.media_tempo.minutes + ' min :' + item.media_tempo.seconds + ' s'
  }


  const renderPagination = () => {
    if (data.length < 4 && currentPage === 0) return null;
    if (currentPage === 0) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <button onClick={() => loadUsersData(4, 8, 1, operation)}>
              Next
            </button>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <button
              onClick={() =>
                loadUsersData(
                  (currentPage - 1) * 4,
                  currentPage * 4,
                  -1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Prev
            </button>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>

          <MDBPaginationItem>
            <button
              onClick={() =>
                loadUsersData(
                  (currentPage + 1) * 4,
                  (currentPage + 2) * 4,
                  1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Next
            </button>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <button
              onClick={() =>
                loadUsersData(
                  (currentPage - 1) * 4,
                  currentPage * 4,
                  -1,
                  operation
                )
              }
            >
              Prev
            </button>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  return (
    <MDBContainer>
      <form
        style={{
          width: "50%", borderRadius: "2px", height: "35px", marginBottom: "20px",
          margin: "auto",
          padding: "30px",
          maxWidth: "500px",
          alignContent: "start",
        }}
        className="d-flex input-group w-auto"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisa "
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div class='parent'>
          <div className="row">
            <div className="col">
              <button icon="fas fa-sign-out-alt" type="submit" className="child btn btn-outline-dark"> Pesquisar </button>
            </div>
            <div className="col">
              <button icon="fas fa-sign-out-alt" className="child btn btn-outline-dark" onClick={() => handleReset()}> Reset </button>
            </div>
          </div>
        </div>
      </form>
      <div style={{
        marginTop: "50px",
        padding: "20px"
      }}>
        {data.length > 0 && (
          <MDBRow>
            <MDBCol size="8">
              <h5>Filtrar por:</h5>
              <select
                style={{ width: "50%", borderRadius: "12px", height: "35px", marginBottom: "20px" }}
                onChange={handleSort}
                value={sortValue}
              >
                <option>Selecione um Valor</option>
                {sortOptions.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </MDBCol>
          </MDBRow>
        )}
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead light>
                <tr>
                  <th scope="col">Equipa</th>
                  <th scope="col">Total de Trabalhos</th>
                  <th scope="col">Total de Erros</th>
                  <th scope="col">Média de Erros</th>
                  <th scope="col">Média de Tempo/Trabalho</th>
                  <th scope="col"></th>
                </tr>
              </MDBTableHead>
              {data.length === 0 ? (
                <MDBTableBody className="align-center mb-0">
                  <tr>
                    <td colSpan={8} className="text-center mb-0">
                      Sem dados encontrados
                    </td>
                  </tr>
                </MDBTableBody>
              ) : (
                data.map((item, index) => (

                  <MDBTableBody key={index}>
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.total_jobs}</td>
                      <td>{item.total_mistakes}</td>
                      <td>{item.media_erro}</td>
                      <td>{horas(item)} </td>
                      <button icon="fas fa-sign-out-alt" type="button" class="btn btn-outline-dark" onClick={() => handleConsulta(item.id)}> Consultar Equipa </button>
                    </tr>
                  </MDBTableBody>
                ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
        <div
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "250px",
            alignContent: "center",
          }}
        >
        </div>
      </div>
    </MDBContainer >
  );
}

export default StatsTable;
