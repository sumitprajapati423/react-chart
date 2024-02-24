let initialState = {listdata:[]}
const Reducerjson= (state = initialState ,action)=>{

    switch(action.type) {
        case "GET_DATA":
            console.log(action.payload);
            return {listdata:action.payload};
        default:
            return state;
    }
}

export default Reducerjson;