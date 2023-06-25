
import { render as rtlRender } from "@testing-library/react"
import { Provider } from "react-redux"
import store from "../store/store"
const CustomTestRender=(childer:React.ReactNode)=>{
    rtlRender(
        <Provider store={store}>
            {childer}
        </Provider>
    )

}

export default CustomTestRender