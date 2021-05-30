import React, { useEffect, useState } from 'react'

const Loader = () => {

    const [widthIndexes, setWidthIndexes] = useState<string[]>(['w-75', 'w-50', 'w-100', 'w-25', 'w-50']);
    const [elipsis, setElipsis] = useState('');

    useEffect(() => {
        setTimeout(() => {
            if (elipsis === '...') {
                setElipsis('');
            } else {
                setElipsis(elipsis + '.');
            }

            if (elipsis.length % 2 === 0) {
                const lazyRandomSort = widthIndexes.sort(() => 0.5 - Math.random());
                setWidthIndexes(lazyRandomSort);
            }
        }, 600);
    }, [elipsis])

    // const cycle = () => {
    //     return setInterval(() => {
    //     }, 500);
    // }

    // useEffect(() => {
    //     const id = cycle();

    //     return () => {
    //         console.log(id);
    //         clearInterval(id);
    //     }
    // }, [widthIndexes])


    return (
        <div className='rounded-3 col-sm-10 col-md-6 col-lg-4 p-5 shadow-lg border-2' style={{ "backgroundColor": "#dadfdf" }}>
            <form className='w-100 mt-5'>
                <h1 style={{ "color": "#223636" }}>Loading{elipsis}</h1>
                {widthIndexes.map((WI, idx) => (
                    <div key={`WI-${idx}`} className="form-group">
                        <div className={`form-control ${WI}`}></div>
                    </div>
                ))}
            </form>
        </div>
    )
}

export default Loader
