import { ControleExecucao } from '../../models/ControleExecucao';
import { useEffect, useState } from 'react';
import { API, handleError } from '../../http/API';
import { AxiosError, AxiosResponse } from 'axios';
import { FrequenciaViewModel } from '../../models/FrequenciaViewModel';

export function getAllFrequenciasPorEstudanteId(idEstudante: number) {

  const idPeriodo = 2;
  const [frequencias, setFrequencias] = useState<ControleExecucao[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const {data} = await API.get<ControleExecucao[]>(`/ControleExecucao/FilterByPeriodoIdByEstudanteId/${idPeriodo}/${idEstudante}`)
          setFrequencias(data)
        } catch (error) {
          handleError(error)
        }
      }
      fetchData()
    },[])

  return frequencias;
}


export function getFrequenciaByEstudanteIdByPeriodoId(idEstudante: number, idPeriodo: number) {

  const [frequencias, setFrequencias] = useState<FrequenciaViewModel[]>([]);

  useEffect(() => {
    API.get<FrequenciaViewModel[]>(`/Frequencia/obterFrequenciaByEstudanteIdByPeriodoId/${idEstudante}/${idPeriodo}`)
    .then((response: AxiosResponse) => setFrequencias(response.data))
    .catch((error: AxiosError<FrequenciaViewModel[]>) => {
      handleError(error)
    })

  },[])

  return {frequencias};
}

