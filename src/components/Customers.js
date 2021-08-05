import React from 'react'
import {connect} from "react-redux"
function Customers(props) {
    return (
        <div>
            {
                props.customers.map((customer)=>{
                    return <div>
                        <ul>
                            <li style={{listStyle:"none"}}>
                               <div style={{border:"1px solid black"}}>{customer.customerName}</div>
                            </li>
                        </ul>
                    </div>
                })
            }
        </div>
    )
}

const mapStateToProps=store=>{
    return store.Customers
}

const mapDispatchToProps=dispatch=>{
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Customers)
