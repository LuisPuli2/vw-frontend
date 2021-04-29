import { useState, useEffect } from 'react';
import Card from '../../components/card/Card';
import './Home.css';

const ENDPOINT = process.env.ENDPOINT || 'https://dev-vw-back.herokuapp.com/cars'

interface carDataInterface  {
  description: string,
  make: string,
  model: string,
  km: number,
  id: number,
  image: string,
  estimatedate?: string
}

const fillCarData  = (data: any) => {
  return data.map((item: carDataInterface, index: number) => {
    const {
      description,
      make,
      model,
      km,
      id,
      image,
      estimatedate
    } = item

    return (
      <Card 
        description={ description || '' }
        make={ make || '' }
        model={ model || '' }
        km={ km || -1 }
        id={ id || -1 }
        image={ image || '' }
        estimatedate={ estimatedate || '' }
        key={ index } 
      />
    )
  })
}

const Home = () => {
  const [carsData, setCarsData]: Array<any> = useState([])

  useEffect(()=>{
    async function fetchAPI() {
      try {
        let response: any = await fetch(ENDPOINT)
        response = await response.json()
        const parsedData = fillCarData(response)

        setCarsData(parsedData)
      } catch (err) {
        // TODO
        console.log(err)
      }
    }

    fetchAPI()
  }, [])

  return (
    <div className="main-container">
      <div className="main-title">
        LISTA DE AUTOS
      </div>
      <div className="main-description">
        <div className="main-description-child">
          <div className="main-box-color-maintenance" />
          MANTENIMIENTO ASIGNADO
        </div>
        <div className="main-description-child">
          <div className="main-box-color-no-maintenance" />
          MANTENIMIENTO SIN ASIGNAR
        </div>
      </div>
      <div className="main-cards-container">
        { carsData }
      </div>
    </div>
  );
}

export default Home;
