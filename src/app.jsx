import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import axios from 'axios'

const urlApi = 'http://localhost:3001/datas'

const favoritesListDefault = [
  {
    id: Number(),
    full_price: Number(),
    price_with_discount: Number(),
    discount_percentage: Number(),
    start_date: '',
    enrollment_semester: '',
    enabled: true,
    course: {
      name: '',
      kind: '',
      level: '',
      shift: ''
    },
    university: {
      name: '',
      score: Number(),
      logo_url: ''
    },
    campus: {
      name: '',
      city: ''
    }
  }
]

const App = () => {
  const modal = document.querySelector('[data-js="modal"]')

  const Modal = props => {
    const elem = document.createElement('div')

    useEffect(() => {
      modal.appendChild(elem)

      return function clear () {
        modal.removeChild(elem)
      }
    })

    return createPortal(props.children, elem)
  }

  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState({})
  const [favoritesList, setFavoritesList] = useState()

  useEffect(() => {
    axios.get(urlApi).then(resp => {
      setData(resp.data)
      console.log(resp.data[0])
    })
  }, [])

  const addFavorites = () => {
    console.log(favoritesList)
  }

  const getFavoritesList = favoritesList => {}

  const updateField = event => {}

  const remove = () => {}

  const cardCompleteFavorites = element => {
    return (
      <section className='card main_cardBg__cardComplete'>
        <div>
          <p>{element.university.logo_url}</p>
          <h2>{element.university.name}</h2>
          <h3>{element.course.name}</h3>
          <h4>Estrelas</h4>
        </div>
        <div>
          <h2>
            {element.course.kind} - {element.course.shift}
          </h2>
          <p>Início das aulas em: {element.start_date}</p>
        </div>
        <div>
          <h3>Mensalidade com o Quero Bolsa</h3>
          <h5>R$ {element.full_price}</h5>
          <h4>R$ {element.price_with_discount}/mês</h4>
          <button onClick={remove}>Excluir</button>
          <button>Ver oferta</button>
        </div>
      </section>
    )
  }

  const renderRows = element => {
    return (
      <tr key={element.id}>
        <td>
          <input
            type='checkbox'
            defaultChecked={false}
            onChange={updateField}
          />
        </td>
        <td>
          <img
            className='imgLogo'
            src={element.university.logo_url}
            title={element.university.name}
            alt={element.university.name}
          />
        </td>
        <td colSpan='3'>
          {element.course.name} <br /> {element.course.level}
        </td>
        <td>
          Bolsa de {element.discount_percentage}% <br />
          R$ {element.price_with_discount}/mês
        </td>
      </tr>
    )
  }

  const renderTable = () => {
    return (
      <table className='containerModal_inputs__table'>
        <thead>
          <tr>
            <th colSpan='3'>Resultado:</th>
            <th>Ordenar por Nome de Faculdade</th>
          </tr>
        </thead>
        <tbody>{data.map(renderRows)}</tbody>
      </table>
    )
  }

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const renderSelectCity = (element, index) => {
    return (
      <option key={index} value={element.campus.city}>
        {element.campus.city}
      </option>
    )
  }

  const renderSelectCourse = (element, index) => {
    return (
      <option key={index} value={element.course.name}>
        {element.course.name}
      </option>
    )
  }

  const renderContentModal = () => (
    <div className='containerModal'>
      <div className='containerModal_buttonHide'>
        <button onClick={closeModal}>Hide modal</button>
      </div>

      <section className='containerModal_bg'>
        <h1>Adicionar bolsa</h1>
        <p>Filtre e adicione as bolsas de seu interesse.</p>

        <div className='containerModal_select'>
          <div>
            <label htmlFor='cidade'>Selecione sua cidade</label>
            <br />
            <select name='cidades'>{data.map(renderSelectCity)}</select>
          </div>

          <div>
            <label htmlFor='cursos'>Selecione o curso de sua preferência</label>
            <br />
            <select name='cursos'>{data.map(renderSelectCourse)}</select>
          </div>
        </div>

        <div className='containerModal_inputs'>
          <div className='containerModal_inputs__check'>
            <h2>Como você quer estudar?</h2>
            <div>
              <div>
                <input type='checkbox' defaultChecked id='presencial' />
                <label htmlFor='presencial'>Presencial</label>
              </div>

              <div>
                <input type='checkbox' defaultChecked id='adistancia' />
                <label htmlFor='adistancia'>A disttância</label>
              </div>
            </div>
          </div>

          <div className='containerModal_inputs__slide'>
            <h2>
              Até quanto pode pagar? <br /> R$ 10.000
            </h2>
            <input type='range' min='0' max='10000' />
          </div>
        </div>

        {renderTable()}

        <div className='containerModal_inputs__buttons'>
          <div>
            <button onClick={closeModal} className='button'>
              Cancelar
            </button>

            <button onClick={addFavorites}>Adicionar bolsa(s)</button>
          </div>
        </div>
      </section>
    </div>
  )

  const sModal = showModal ? <Modal>{renderContentModal()}</Modal> : null

  return (
    <>
      <header className='header'>
        <section className='header_items'>
          <div>
            <h3>Como funciona</h3>
          </div>
          <div>
            <h3>
              0800 123 2222
              <br />
              Envie mensagem ou ligue
            </h3>
          </div>
          <div>Logo Quero Bolsa</div>
          <div>
            <h3>Nome Sobrenome</h3>
          </div>
        </section>

        <section className='header_bgMenu'>
          <nav className='header_bgMenu__menu'>
            <ul>
              <a href='' title='' alt=''>
                <li>Minha conta</li>
              </a>
              <a href='' title='' alt=''>
                <li>Pré-matrículas</li>
              </a>
              <a href='' title='' alt='' className='active'>
                <li>Bolsas favoritas</li>
              </a>
            </ul>
          </nav>
        </section>
      </header>
      <main className='main'>
        <section className='main_sessionMenu'>
          <ul>
            <a href='' title='' alt=''>
              <li>Home</li>
            </a>
            <a href='' title='' alt=''>
              <li>Minha Conta</li>
            </a>
            <a href='' title='' alt=''>
              <li>Bolsas favoritas</li>
            </a>
          </ul>
        </section>

        <h1>Bolsas Favoritas</h1>
        <p>
          Adicione bolsas de cursos e faculdades do seu interesse e receba
          atualizações com as melhores ofertas disponíveis.
        </p>

        <aside className='main_asideMenu'>
          <ul>
            <a href='' title='' alt='' className='active'>
              <li>Todos os semestres</li>
            </a>
            <a href='' title='' alt=''>
              <li>2° semestre de 2019</li>
            </a>
            <a href='' title='' alt=''>
              <li>1° semestre de 2020</li>
            </a>
          </ul>
        </aside>

        <section className='main_cardBg'>
          <section className='card main_cardBg__cardInput'>
            <div>
              <div>
                <button onClick={openModal}>Show modal</button>
                {sModal}
              </div>
              <h2>Adicionar Bolsa</h2>
              <p>Clique para adicionar bolsas de cursos do seu interesse</p>
            </div>
          </section>

          <section className='card main_cardBg__cardComplete'>
            <div>
              <p>Logomarca</p>
              <h2>Universidade</h2>
              <h3>Ciência da Computação</h3>
              <h4>Estrelas</h4>
            </div>
            <div>
              <h2>Presencial - noite</h2>
              <p>Início das aulas em: 05/07/2019</p>
            </div>
            <div>
              <h3>Mensalidade com o Quero Bolsa</h3>
              <h5>R$ 1.487,31</h5>
              <h4>R$ 453,63/mês</h4>
              <button>Excluir</button>
              <button>Ver oferta</button>
            </div>
          </section>
        </section>
      </main>
      <footer className='footer'>
        <section className='footer_bgContacts'>
          <section className='footer_bgContacts__contacts'>
            <div>
              0800 123 2222
              <br />
              Seg - Sex 8h-22h
            </div>
            <div>
              Chat ao vivo
              <br />
              Seg - Sex 8h-22h
            </div>
            <div>
              Mande um e-mail
              <br />
              Respondemos rapidinho
            </div>
            <div>
              Central de ajuda
              <br />
              Encontre todas as respostas
            </div>
          </section>
        </section>
        <section className='footer_copy'>
          <p>Feito com amor pela Quero Educação</p>
        </section>
      </footer>
    </>
  )
}

export default App
