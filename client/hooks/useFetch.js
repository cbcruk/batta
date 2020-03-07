import { useEffect, useReducer } from 'react'
import fetchData from '../plugins/fetch'

const initialState = {
  data: null,
  status: 'idle'
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH':
      return {
        ...state,
        status: 'loading'
      }
    case 'RESOLVE':
      return {
        ...state,
        status: 'success',
        data: action.payload
      }
    case 'REJECT':
      return {
        ...state,
        status: 'failure',
        error: action.payload
      }
    case 'CANCEL':
      return {
        ...state,
        status: 'idle'
      }
    default:
      return state
  }
}

function useFetch(endpoint, preloadState) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (endpoint) {
      dispatch({
        type: 'FETCH'
      })

      fetchData(endpoint)
        .then(data =>
          dispatch({
            type: 'RESOLVE',
            payload: data
          })
        )
        .catch(e => {
          dispatch({
            type: 'REJECT',
            payload: e
          })
        })
    }
  }, [endpoint])

  return state
}

export default useFetch
