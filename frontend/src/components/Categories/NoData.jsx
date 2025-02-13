import React from 'react'
import styled from 'styled-components'
import noData from '../../assets/images/gif/noData.gif'

const NoData = () => {
  return (
    <Wrapper>
        <img src={noData} alt="No data found" />
    </Wrapper>
  )
}

export default NoData

const Wrapper = styled.div`
    img {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`