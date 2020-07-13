import  React from 'react'
import SizesForm from './pageElements/SizesForm.jsx'
import AutoForm from './pageElements/AutoForm.jsx'



export default () => {
    const AppContext = React.createContext('qwe');

    const printedArea = <AutoForm/>
    console.log('printedArea   ',printedArea)
    return (
        <AppContext.Provider>
            <SizesForm L={3} M={5} N={7}/>

            <div id='printedArea'/>
            <div id='Menu'>
                {printedArea}
            </div>
        </AppContext.Provider>
    )
}