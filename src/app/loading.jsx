import React from 'react'

import {
    FadeLoader
} from 'react-spinners'

const loading = () => {
    return (
        <div className='flex min-h-screen justify-center items-center'>
            <FadeLoader color="#36d7b7" />
        </div>
    )
}

export default loading
